import { Button } from '@/components/Button'

export const FeedCard = ({ title, summary, url, justification }) => {
  return (
    <div className="m-4 mx-auto mx-auto w-3/4 max-w-7xl max-w-md overflow-hidden rounded-lg rounded-md bg-white px-2 px-4 py-2 text-center shadow hover:bg-gray-200 sm:px-6 lg:px-8">
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
    </div>
  )
}
