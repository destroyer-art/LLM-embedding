import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import Head from 'next/head'
import { VibeCombo } from '@/components/VibeCombo'
import { FeedCard } from '@/components/FeedCard'
import { HeroText } from '@/components/HeroText'
import { Button } from '@/components/Button'
import { CirclesBackground } from '@/components/CirclesBackground'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
const CONSTANTS = require('../constants.json')
console.log(CONSTANTS)

const version = '0.2.0'
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

  async function getOpenAIResponse({ prompt }) {
    const params = {
      ...CONSTANTS.prompts.vibeparse,
    }
    // Add to messages array
    params.messages.push({ role: 'user', content: prompt })
    console.log(params)

    return client
      .post('https://api.openai.com/v1/chat/completions', params)
      .then((result) => {
        console.log('OpenAI result:', result)
        return result.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function begin() {
    console.log('Vibe:', vibeText)
    setBeginButtonActive(false)
    const data = await getOpenAIResponse({ prompt: vibeText })
    const parsedCall = JSON.parse(
      data.choices[0].message.function_call.arguments
    )
    setParsedFnCall(parsedCall)
  }

  let vibeText = `I am ${selectedIdentity?.name} interested in ${selectedInterest?.name} so I can ${selectedGoal?.name}.`
  console.log(vibeText)

  return (
    <>
      <Head>
        <title>FOMO v{version}</title>
        <meta name="description" content="Miss out on nothing. Faster." />
      </Head>
      <CirclesBackground className="absolute left-1/2 top-1/2 -z-10 mt-44 w-[68.125rem] -translate-x-1/2 -translate-y-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />
      <HeroText version={version} />

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
      </div>
      {parsedFnCall && (
        <FeedCard
          title={parsedFnCall?.title}
          summary={parsedFnCall?.short_summary}
          url={parsedFnCall?.url}
          justification={parsedFnCall?.justification}
        />
      )}
    </>
  )
}
