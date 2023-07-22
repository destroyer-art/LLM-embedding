import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import Head from 'next/head'
import { VibeCombo } from '@/components/VibeCombo'
import { HeroText } from '@/components/HeroText'
import { Button } from '@/components/Button'
import { CirclesBackground } from '@/components/CirclesBackground'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const version = '0.1.3'

const identities = [
  { id: 'identity-' + 1, name: 'an Investor' },
  { id: 'identity-' + 2, name: 'a Tech Founder' },
]
const interests = [
  { id: 'interest-' + 1, name: 'Generative AI' },
  { id: 'interest-' + 2, name: 'AI Agents' },
]
const goals = [
  { id: 'goal-' + 1, name: 'know what insiders are talking about' },
  { id: 'goal-' + 2, name: 'assess early-stage tech startups' },
]

export default function Home() {
  const [selectedIdentity, setSelectedIdentity] = useState(identities[0])
  const [selectedInterest, setSelectedInterest] = useState('')
  const [selectedGoal, setSelectedGoal] = useState('')
  const [beginButtonActive, setBeginButtonActive] = useState(true)
  const canBegin = selectedIdentity && selectedInterest && selectedGoal

  function begin() {
    console.log('Vibe:', vibeText)
    setBeginButtonActive(false)
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
    </>
  )
}
