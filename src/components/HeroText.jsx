import { Container } from '@/components/Container'
export const HeroText = () => {
  return (
    <>
      <div className="flex h-1/3 flex-col items-center justify-center py-2">
        <Container className="relative isolate flex h-full flex-col items-center justify-center py-8 text-center sm:py-8">
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-900">
            FOMO
          </h1>
          <p className="mt-2 text-lg text-gray-600">Never miss a thing</p>
          <p className="text-sm font-semibold text-gray-900">v0.1</p>
        </Container>
      </div>
    </>
  )
}
