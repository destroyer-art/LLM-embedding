import { Layout as DefaultLayout } from '@/components/Layout'

import '@/styles/tailwind.css'
import 'focus-visible'

export default function App({ Component, pageProps }) {
  let Layout = Component.Layout ?? DefaultLayout

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
