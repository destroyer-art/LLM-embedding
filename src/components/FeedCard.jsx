import { Button } from '@/components/Button'
export const FeedCard = ({ title, summary, url, justification }) => {
  return (
    <div className="m-4 mx-auto w-2/3 max-w-md rounded-lg border-2 border-black px-2 py-2 text-center">
      <h1 className="text-m font-bold">{title ? title : 'Title'}</h1>
      <p>
        <a
          href={url ? url : '/#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600"
        >
          {url ? url : 'URL to source'}
        </a>
      </p>
      <p className="text-sm">
        {justification ? justification : 'One-line justification'}
      </p>
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
