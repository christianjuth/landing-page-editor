import * as React from 'react'

import { landingPageSchema, LandingPageSchema } from '../lib/zod-parsers';
import { fromZodError } from 'zod-validation-error';

import { LandingPage } from '../components/landing-page.tsx';


const DEFAULT_VALUE: LandingPageSchema = [
  {
    "type": "hero",
    "imageURI": "https://images.unsplash.com/photo-1579963333765-b4129b3250fc"
  },
  {
    "type": "image-text",
    "imageURI": "https://images.unsplash.com/photo-1579963333765-b4129b3250fc",
    "text": "Sunset from the sky....",
    "title": "Airplane",
    "leftToRight": true
  },
  {
    "type": "image-text",
    "imageURI": "https://images.unsplash.com/photo-1579963333765-b4129b3250fc",
    "text": "Sunset from the sky....",
    "title": "Airplane",
    "leftToRight": false
  },
  {
    "type": "data",
    "url": "https://dog.ceo/api/breeds/image/random"
  }
]

export function LandingPageEditor() {
  const [editorValue, setEditorValue] = React.useState(JSON.stringify(DEFAULT_VALUE, null, 2))
  const [landingPage, setLandingPage] = React.useState(DEFAULT_VALUE)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let json: object;

    try {
      json = JSON.parse(editorValue);
    } catch (err) {
      let errorMessage = "Unable to parse JSON";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      setError(errorMessage);
      return;
    }

    const parsed = landingPageSchema.safeParse(json);

    if (parsed.error) {
      const formattedError = fromZodError(parsed.error);
      setError(formattedError.message);
      return;
    }

    setError(null);
    setLandingPage(parsed.data);

  }, [editorValue]);

  return (
    <div className="md:h-[100svh] grid md:grid-cols-2">

      <section className="flex flex-col bg-slate-700 text-white max-md:h-[50svh] max-md:row-start-2">
        <h1 className="text-center font-bold py-2 border-b border-slate-800">Editor</h1>
        <textarea 
          value={editorValue}
          onChange={(e) => setEditorValue(e.target.value)}
          className="p-4 flex-1 bg-transparent resize-none"
        />
        {error && (
          <div className="bg-red-500 text-white p-2 max-md:hidden">
            {error}
          </div>
        )}
      </section>

      <div className="overflow-y-auto max-md:h-[50svh]">
        <h1 className="text-center font-bold py-2 sticky top-0 bg-white/90 backdrop-blur">Preview</h1>
        <div className="px-4 pb-4">
          <LandingPage landingPage={landingPage} />
        </div>

        {error && (
          <div className="bg-red-500 text-white p-2 sticky bottom-0 md:hidden">
            {error}
          </div>
        )}
      </div>

    </div>
  )
}
