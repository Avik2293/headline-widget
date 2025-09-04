import type { HeadlineSettings } from '../lib/types'


export function toBase64Config(settings: HeadlineSettings) {
    const json = JSON.stringify(settings)
    return btoa(unescape(encodeURIComponent(json)))
}


export function fromBase64Config(b64: string): HeadlineSettings | null {
    try {
        const json = decodeURIComponent(escape(atob(b64)))
        return JSON.parse(json)
    } catch {
        return null
    }
}


export function embedSnippet(hostUrl: string, settings: HeadlineSettings) {
    const cfg = toBase64Config(settings)
    const src = `${hostUrl.replace(/\/$/, '')}/?config=${cfg}`
    return `<iframe src="${src}" style="width:100%;height:120px;border:0;overflow:hidden" loading="lazy" title="Headline Widget"></iframe>`
}