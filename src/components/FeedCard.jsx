import { Button } from '@/components/Button'
export const FeedCard = ({ title, summary, url, justification }) => {
  return (
    <div className="m-4 mx-auto w-2/3 max-w-md rounded-lg border-2 border-black px-2 py-2 text-center">
      <h1 className="text-lg font-bold">{title ? title : 'Title'}</h1>
      <h2 className="text-sm italic">{summary ? summary : 'Summary'}</h2>
      <p>
        <a
          href={url ? url : '/#'}
          target="_blank"
          className="text-sm text-blue-600"
        >
          {url ? url : 'URL to source'}
        </a>
      </p>
      <h2>{justification ? justification : 'One-line justification'}</h2>
      <div className="flex content-center justify-between py-4">
        <Button variant="solid" color="red">
          👎 Not relevant
        </Button>
        <Button variant="solid" color="cyan">
          📍 Save to bank
        </Button>
      </div>
    </div>
  )
}
