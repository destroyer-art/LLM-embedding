import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import Head from 'next/head'
import { VibeCombo } from '@/components/VibeCombo'
import { HeroText } from '@/components/HeroText'
import { Button } from '@/components/Button'
import { CirclesBackground } from '@/components/CirclesBackground'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const version = '0.1.2'

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
  const [canBegin, setCanBegin] = useState(false)

  function begin() {
    console.log('Vibe:', vibeText, canBegin)
    setCanBegin(true)
  }

  let vibeText = `I am ${selectedIdentity?.name} interested in ${selectedInterest?.name} so I can ${selectedGoal?.name}.`
  console.log(vibeText)

  return (
    <>
      <Head>
        <title>FOMO v{version}</title>
      </Head>
      <CirclesBackground className="absolute left-1/2 top-1/2 -z-10 mt-44 w-[68.125rem] -translate-x-1/2 -translate-y-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />
      <HeroText version={version} />

      <VibeCombo
        prefixText={'I am'}
        entities={identities}
        selectedEntity={selectedIdentity}
        setSelectedEntity={setSelectedIdentity}
      />
      <VibeCombo
        prefixText={'interested in'}
        entities={interests}
        selectedEntity={selectedInterest}
        setSelectedEntity={setSelectedInterest}
      />
      <VibeCombo
        prefixText={'so I can'}
        entities={goals}
        selectedEntity={selectedGoal}
        setSelectedEntity={setSelectedGoal}
      />
      <div className="mt-4 flex justify-center">
        <Button className="" onClick={begin}>
          Go
        </Button>
      </div>
      {canBegin && (
        <p className="mt-4 text-center text-sm text-gray-500">
          I am{' '}
          <span className="text-brand-accent inline-flex h-8 animate-type overflow-x-hidden whitespace-nowrap pt-2 will-change-transform group-hover:animate-type-reverse">
            <em className="bg-blue-200 font-bold">
              {' '}
              {selectedIdentity?.name}{' '}
            </em>{' '}
            interested in{' '}
            <em className="bg-yellow-200 font-bold">
              {' '}
              {selectedInterest?.name}{' '}
            </em>{' '}
            so I can{' '}
            <em className="bg-green-200 font-bold"> {selectedGoal?.name} </em>.
          </span>
        </p>
      )}
    </>
  )
}
