import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import Head from 'next/head'
import { VibeCombo } from '@/components/VibeCombo'
import { HeroText } from '@/components/HeroText'
import { Button } from '@/components/Button'
import { CirclesBackground } from '@/components/CirclesBackground'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

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
  const [selectedInterest, setSelectedInterest] = useState(interests[0])
  const [selectedGoal, setSelectedGoal] = useState(goals[0])

  return (
    <>
      <Head>
        <title>FOMO v0.1</title>
      </Head>
      <CirclesBackground className="absolute left-1/2 top-1/2 -z-10 mt-44 w-[68.125rem] -translate-x-1/2 -translate-y-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />
      <HeroText />

      <VibeCombo
        prefixText={'I am'}
        entities={identities}
        selectedEntity={selectedIdentity}
        onEntityChange={setSelectedIdentity}
      />
      <VibeCombo
        prefixText={'interested in'}
        entities={interests}
        selectedEntity={selectedInterest}
        onEntityChange={setSelectedInterest}
      />
      <VibeCombo
        prefixText={'so I can'}
        entities={goals}
        selectedEntity={selectedGoal}
        onEntityChange={setSelectedGoal}
      />
      <p className="mt-4 text-center text-sm text-gray-500">
        I am <b>{selectedIdentity?.name}</b> interested in{' '}
        <b>{selectedInterest?.name}</b> so I can <b>{selectedGoal?.name}</b>.
      </p>
    </>
  )
}
