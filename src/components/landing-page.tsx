import type { LandingPageSchema, HeroSchema, ImageTextSchema, DataShema } from '../lib/zod-parsers';
import { Button } from './ui/button';
import { useFetch } from '../lib/hooks';

function Hero({
  hero
}: {
  hero: HeroSchema
}) {
  return (
    <section>
      <img src={hero.imageURI} className="object-cover object-center h-72 w-full border" />
    </section>
  )
}

function ImageText({
  imageText
}: {
  imageText: ImageTextSchema
}) {
  const leftToRight = imageText.leftToRight ?? true;
  return (
    <section className="flex flex-row border">
      {leftToRight && <img src={imageText.imageURI} className="w-1/3 aspect-square object-cover object-center " />}
      <div className="flex-1 space-y-2 p-4">
        <h2 className="font-bold">{imageText.title}</h2>
        <p>{imageText.text}</p>
      </div>
      {!leftToRight && <img src={imageText.imageURI} className="w-1/3 aspect-square object-cover object-center " />}
    </section>
  )
}

function Data({
  data
}: {
  data: DataShema
}) {
  const { data: fetchedData, loading, error, refresh } = useFetch({ url: data.url });

  return (
    <section className="border p-4 flex flex-row gap-4 items-start">
      <Button onClick={refresh}>Refresh</Button>
      <div className="overflow-x-auto">
        {fetchedData && <pre>{JSON.stringify(fetchedData, null, 2)}</pre>}
        {loading && <p>Loading...</p>}
        {/* TODO: render this in a way that prevents layout shift */}
        {error && <p>Error: {String(error)}</p>}
      </div>
    </section>
  )
}

export function LandingPage({
  landingPage
}: {
  landingPage: LandingPageSchema
}) {
  return (
    <div className="space-y-4">
      {landingPage.map((section, index) => {
        switch (section.type) {
          case 'hero':
            return <Hero key={index} hero={section} />
          case 'image-text':
            return <ImageText key={index} imageText={section} />
          case 'data':
            return <Data key={index} data={section} />
        }
      })}
    </div>
  );
}
