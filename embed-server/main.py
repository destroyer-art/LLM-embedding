from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import pickle
from sklearn.metrics.pairwise import cosine_similarity
import openai
import os
from copy import deepcopy
import json

openai.api_key = os.environ["OPENAI_API_KEY"]

# Load data at startup
df_metadata = pd.read_csv('data/metadata.csv')
with open('data/embeddings.pkl', 'rb') as f:
    embeddings_array = pickle.load(f)
with open('constants.json', 'r') as f:
    CONSTANTS = json.load(f)
    print(CONSTANTS)


def extend_vibe(raw_vibe: str):
    params = deepcopy(CONSTANTS['prompts']['vibeparse'])
    params['messages'].append({"role": "user", "content": raw_vibe})
    vibe_ext = openai.ChatCompletion.create(**params,
                                            ).choices[0].message.content
    return vibe_ext


def get_embeddings(text: str):
    response = openai.Embedding.create(
        model="text-embedding-ada-002",
        input=text,
    )
    return response['data'][0]['embedding']


def search_knowledgebase(query, min_score=0.78):
    # Get the embedding of the query
    query_embedding = get_embeddings(query)
    query_embedding = np.array(query_embedding).reshape(1, -1)

    # Calculate cosine similarities
    similarities = cosine_similarity(query_embedding, embeddings_array)
    similarities = similarities.flatten()

    # Create a DataFrame for easy manipulation
    df = df_metadata.copy()
    df['similarity'] = similarities

    # Sort by similarity
    df_sorted = df.sort_values(by='similarity', ascending=False)

    # Get the ranked list of titles and descriptions
    results = df_sorted[['title', 'url', 'description', 'similarity']]
    results = results[results['similarity'] >= min_score]

    return results


def justify_result(raw_vibe: str, result: dict):
    params = deepcopy(CONSTANTS['prompts']['justify'])
    params['messages'].extend([
        {
            "role": "user",
            "content": f"RESOUCE: {str(result)}",
        },
        {
            "role": "user",
            "content": f"{raw_vibe}. Why is the resource relevant to me?"
        },
    ])
    justification = openai.ChatCompletion.create(**params,
                                                 ).choices[0].message.content
    print(f"{params=}")
    print(f"{justification=}")
    return justification


app = FastAPI()
# Allow any origin
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/search/")
async def search(text: str):
    # Extend the vibe of the user's input
    vibe_ext = extend_vibe(text)

    # Perform search
    results = search_knowledgebase(f"{text}. {vibe_ext}")

    # Convert top 5 results to desired format
    top_results = results.head(5)
    top_results_list = top_results.to_dict('records')

    # Apply justifications to each result
    returned_results = []
    for result in top_results_list:
        reason = justify_result(text, result)
        returned_results.append({
            'title': result['title'],
            'url': result['url'],
            'reason': reason,
        })

    # Prepare response
    response = {'results': returned_results}
    return response
