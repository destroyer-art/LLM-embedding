import { Button } from '@/components/Button'
export const FeedCard = ({ title, summary, url, reason, justification }) => {
  return (
    <div className="m-4 mx-auto w-2/3 max-w-md rounded-lg border-2 border-black px-2 py-2 text-center">
      <h1 className="text-lg font-bold">{title ? title : "Title"}</h1>
      <h2>One-line summary</h2>
      <p><a href="" className="text-blue-600">{url ? url : "URL to source"}</a></p>
      <div className="border-2 border-blue-400 bg-blue-100">
        <p>{reason ? reason : "As ..."}</p>
      </div>
      <h2>{justification ? justification : "One-line justification"}</h2>
      <div className="flex content-center justify-between">
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
