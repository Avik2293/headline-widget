import { useEffect, useMemo, useState } from 'react'
import HeadlineWidget from './components/HeadlineWidget'
import ControlsPanel from './components/ControlsPanel'
import { defaultSettings } from './lib/defaults'
import { HeadlineSettings } from './lib/types'
import { embedSnippet, fromBase64Config } from './utils/embed'


export default function App() {

  // initial state and URL sync
  const init = useMemo(() => {
    const qs = new URLSearchParams(location.search)
    const cfg = qs.get('config')
    if (cfg) {
      const parsed = fromBase64Config(cfg)
      if (parsed) return parsed
    }
    return defaultSettings
  }, [])


  const [settings, setSettings] = useState<HeadlineSettings>(init)


  // persist in URL so the preview can be shared
  useEffect(() => {
    const { history } = window
    const base = location.pathname
    const json = JSON.stringify(settings)
    const b64 = btoa(unescape(encodeURIComponent(json)))
    history.replaceState({}, '', `${base}?config=${b64}`)
  }, [settings])


  const settingsJson = JSON.stringify(settings, null, 2)
  const snippet = embedSnippet('https://headline-widget-avik.netlify.app', settings)


  return (
    <div className="min-h-screen max-w-screen">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/50 bg-neutral-950/80 border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="text-lg text-neutral-400">Headline Widget · React + TS + Tailwind + Framer Motion</div>
          {/* <a
            href="https://github.com/"
            target="_blank"
            className="text-xs rounded-lg border border-neutral-800 px-2 py-1 hover:bg-neutral-900"
          >View Source</a> */}
        </div>
      </header>

      {/* <main className="mx-auto max-w-7xl px-4 grid gap-8 md:grid-cols-[360px,1fr] py-8"> */}
      <main className="px-4 grid gap-8 md:grid-cols-[360px,1fr] py-8">

        {/* display box */}
        {/* <section className="order-1 md:order-2"> */}
        <section className="order-1 md:order-1">
          <div className="rounded-2xl border border-neutral-800 p-10 bg-neutral-900/20 min-h-[280px] flex items-center justify-center">
            <HeadlineWidget settings={settings} />
          </div>

          <div className="mt-3 text-xs text-neutral-500">Tip: toggle off <span className="font-mono">Per-letter animation</span> to style specific words.</div>
        </section>

        {/* control box */}
        {/* <aside className="order-2 md:order-1"> */}
        <aside className="order-2 md:order-2">
          <div className="rounded-2xl border border-neutral-800 p-5 bg-neutral-900/30">
            <ControlsPanel settings={settings} onChange={setSettings} />
          </div>

          {/* Export Settings (JSON) */}
          <div className="mt-6 grid gap-4">
            <section className="rounded-2xl border border-neutral-800 p-5 bg-neutral-900/30 ">
              <div className="flex items-center justify-between mb-3 ">
                <h3 className="font-semibold">Export Settings (JSON)</h3>
                <button
                  onClick={() => navigator.clipboard.writeText(settingsJson)}
                  className="text-xs rounded-lg border border-neutral-700 px-2 py-1 hover:bg-neutral-800"
                >Copy</button>
              </div>
              <pre className="text-xs bg-neutral-950/70 rounded-xl p-3 overflow-auto max-h-52">{settingsJson}</pre>
            </section>

            {/* Embed Snippet */}
            <section className="rounded-2xl border border-neutral-800 p-5 bg-neutral-900/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Embed Snippet</h3>

                <button
                  onClick={() => navigator.clipboard.writeText(snippet)}
                  className="text-xs rounded-lg border border-neutral-700 px-2 py-1 hover:bg-neutral-800"
                >Copy</button>
              </div>

              <div className='max-w-7xl'>
                <code className="text-xs bg-neutral-950/70 rounded-xl p-3 block overflow-auto whitespace-pre">{snippet}</code>
              </div>
            </section>
          </div>
        </aside>
      </main>


      <footer className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-neutral-500">
        © 2025 Headline Widget. Built using React, TypeScript, Tailwind & Framer Motion.
      </footer>
    </div>
  )
}