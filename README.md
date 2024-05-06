# FOMO: LLM embeddings to keep up with AI

The MVP of a newsreader app that uses LLM embeddings to semantically prioritise arXiv and Github updates.

Read more about it [on my blog](http://gianluca.ai/fomo-embeddings/).

![fomo-demo](https://github.com/gianlucatruda/fomo/assets/1952799/b4a4eff9-01e6-4e17-8bab-995cd7db9af8)

I'm no longer actively working on this. If you want a great tool for semantic searching of arXiv papers, my good friend [Tom Tumiel](https://twitter.com/tomtumiel) built [arXiv Xplorer](https://arxivxplorer.com/), which was part of the inspiration for this project.

## Usage

If you want to spin this up yourself, you're going to need to do the following:
- Deploy the UI webapp in `webapp/`, it's built with Next.js and Tailwind. Update the URLs to point at the embedding server.
- Deploy the embedding server in `embed-server/api.py`, it's Python app that uses FastAPI and just stores the embeddings in memory.
- Generate some embeddings with the Python code in `embed-server/notebooks/`. They pull data from Github (you'll need an API key) and arXiv APIs, wrangle it, and then run it via OpenAI's embeddings API (you'll need an API key), before saving them in a pickled NumPy array and metadata CSV.

(Yeah, not really production-ready, I know. This was just a hacky MVP to prove the idea).

You could probably make life easier for yourself by refactoring the notebooks code into a new FastAPI API endpoint in `api.py`. Then you can deploy that somewhere (Replit or AWS EC2). Then use something like Vercel to deploy the front-end with minimal hassle (use the free tier). Then you can trigger the embeddings to update by hitting the new API endpoint you made. (I might do that myself if I feel like picking this up again).

---

