import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import Head from 'next/head'
import { VibeCombo } from '@/components/VibeCombo'
import { FeedCard } from '@/components/FeedCard'
import { Loader } from '@/components/Loader'
import { HeroText } from '@/components/HeroText'
import { Button } from '@/components/Button'
import { CirclesBackground } from '@/components/CirclesBackground'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
const CONSTANTS = require('../constants.json')
console.log(CONSTANTS)

const version = 'v0.4.2'
const axios = require('axios')
const APIKEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY
const client = axios.create({
  headers: { Authorization: 'Bearer ' + APIKEY },
})

// Unpack constants from CONSTANTS json file
const identities = CONSTANTS.vibes.identities.map((identity, index) => {
  return { id: 'identity-' + index, name: identity }
})

const interests = CONSTANTS.vibes.interests.map((interest, index) => {
  return { id: 'interest-' + index, name: interest }
})

const goals = CONSTANTS.vibes.goals.map((goal, index) => {
  return { id: 'goal-' + index, name: goal }
})

export default function Home() {
  const [selectedIdentity, setSelectedIdentity] = useState(identities[0])
  const [selectedInterest, setSelectedInterest] = useState('')
  const [selectedGoal, setSelectedGoal] = useState('')
  const [beginButtonActive, setBeginButtonActive] = useState(true)
  const canBegin = selectedIdentity && selectedInterest && selectedGoal
  const [parsedFnCall, setParsedFnCall] = useState()

  async function getOpenAIResponse({ prompt, promptParams }) {
    // Add to messages array
    promptParams.messages.push({ role: 'user', content: prompt })

    return client
      .post('https://api.openai.com/v1/chat/completions', promptParams)
      .then((result) => {
        console.log('OpenAI result:', result)
        return result.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function searchKnowledgebase({ searchText }) {
    console.log('Searching for:', searchText)
    const response = await fetch(
      `https://fomo-embed-server-bountyful.replit.app/search/?text=${encodeURIComponent(
        searchText
      )}`
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.results
  }

  async function begin() {
    console.log('Vibe:', vibeText)
    setBeginButtonActive(false)
    const sources = await searchKnowledgebase({ searchText: vibeText })
    console.log('Search results:', sources)
    setParsedFnCall(sources)
  }

  let vibeText = `I am ${selectedIdentity?.name} interested in ${selectedInterest?.name} so I can ${selectedGoal?.name}.`
  console.log(vibeText)

  return (
    <>
      <Head>
        <title>FOMO {version}</title>
        <meta name="description" content="Miss out on nothing. Faster." />
      </Head>
      <HeroText version={version} />

      {!parsedFnCall && (
        <>
          <VibeCombo
            prefixText={'I am'}
            entities={identities}
            selectedEntity={selectedIdentity}
            setSelectedEntity={setSelectedIdentity}
            disabled={canBegin && !beginButtonActive}
          />
          <VibeCombo
            prefixText={'interested in'}
            entities={interests}
            selectedEntity={selectedInterest}
            setSelectedEntity={setSelectedInterest}
            disabled={canBegin && !beginButtonActive}
          />
          <VibeCombo
            prefixText={'so I can'}
            entities={goals}
            selectedEntity={selectedGoal}
            setSelectedEntity={setSelectedGoal}
            disabled={canBegin && !beginButtonActive}
          />
          <div className="mx-auto mt-4 w-1/2 w-3/4 max-w-md justify-center py-4 text-center">
            <p className="mt-4 text-sm text-gray-500">
              I am{' '}
              <em className="font-bold">
                {selectedIdentity ? selectedIdentity.name : '...'}
              </em>{' '}
              interested in{' '}
              <em className="font-bold">
                {selectedInterest ? selectedInterest.name : '...'}
              </em>{' '}
              so I can{' '}
              <em className="font-bold">
                {' '}
                {selectedGoal ? selectedGoal?.name : '... '}
              </em>
            </p>
            {beginButtonActive && canBegin ? (
              <Button className="mt-4 w-1/2" onClick={begin}>
                Go
              </Button>
            ) : (
              <Button className="mt-4 w-1/2 disabled:opacity-50" disabled>
                Go
              </Button>
            )}
            {!beginButtonActive && canBegin && <Loader />}
          </div>
        </>
      )}
      {parsedFnCall &&
        parsedFnCall.map((result, index) => (
          <FeedCard
            key={index}
            title={result.title}
            url={result.url}
            justification={result.reason}
          />
        ))}
    </>
  )
}
