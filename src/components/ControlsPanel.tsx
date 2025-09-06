import { HeadlineSettings, SegmentStyle } from '../lib/types'

interface Props {
    settings: HeadlineSettings
    onChange: (next: HeadlineSettings) => void
}

export default function ControlsPanel({ settings, onChange }: Props) {
    const update = (patch: Partial<HeadlineSettings>) => onChange({ ...settings, ...patch })

    const setSegment = (idx: number, style: SegmentStyle) => {
        const next = { ...settings.segmentStyles }
        if (style === 'none') delete next[idx]
        else next[idx] = style
        update({ segmentStyles: next })
    }

    const words = settings.text.split(/\s+/)

    return (
        <div className="space-y-6">
            {/* text input  */}
            <div>
                <label className="block text-sm text-neutral-400 mb-1">Headline Text</label>

                <textarea
                    value={settings.text}
                    onChange={e => update({ text: e.target.value })}
                    className="w-full min-h-[90px] rounded-xl bg-neutral-900/60 border border-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="Type your headline..."
                />
            </div>

            {/* text styles */}
            <div className="grid grid-cols-5 gap-4">
                {/* Font Family */}
                <div>
                    <label className="block text-sm text-neutral-400 mb-1">Font Family</label>
                    <select
                        value={settings.fontFamily}
                        onChange={e => update({ fontFamily: e.target.value as any })}
                        className="w-full rounded-lg bg-neutral-900/60 border border-neutral-800 px-3 py-2"
                    >
                        <option>Inter</option>
                        <option>Poppins</option>
                        <option>Merriweather</option>
                    </select>
                </div>

                {/* Font Weight */}
                <div>
                    <label className="block text-sm text-neutral-400 mb-1">Font Weight</label>
                    <select
                        value={settings.fontWeight}
                        onChange={e => update({ fontWeight: Number(e.target.value) as any })}
                        className="w-full rounded-lg bg-neutral-900/60 border border-neutral-800 px-3 py-2"
                    >
                        <option value={300}>300</option>
                        <option value={400}>400</option>
                        <option value={600}>600</option>
                        <option value={800}>800</option>
                    </select>
                </div>

                {/* Font Size */}
                <div>
                    <label className="block text-sm text-neutral-400 mb-1">Font Size (px)</label>
                    <input type="number" min={12} max={160} value={settings.fontSize}
                        onChange={e => update({ fontSize: Number(e.target.value) })}
                        className="w-full rounded-lg bg-neutral-900/60 border border-neutral-800 px-3 py-2" />
                </div>

                {/* Letter Spacing */}
                <div>
                    <label className="block text-sm text-neutral-400 mb-1">Letter Spacing (px)</label>
                    <input type="number" step="0.5" value={settings.letterSpacing}
                        onChange={e => update({ letterSpacing: Number(e.target.value) })}
                        className="w-full rounded-lg bg-neutral-900/60 border border-neutral-800 px-3 py-2" />
                </div>

                {/* Line Height */}
                <div>
                    <label className="block text-sm text-neutral-400 mb-1">Line Height</label>
                    <input type="number" step="0.05" value={settings.lineHeight}
                        onChange={e => update({ lineHeight: Number(e.target.value) })}
                        className="w-full rounded-lg bg-neutral-900/60 border border-neutral-800 px-3 py-2" />
                </div>
            </div>

            {/* Gradient */}
            <div className="space-y-3 rounded-xl border border-neutral-800 p-3">
                <div className="flex items-center justify-between">
                    <div className="font-medium">Gradient</div>
                    <label className="inline-flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={settings.gradientEnabled} onChange={e => update({ gradientEnabled: e.target.checked })} />
                        <span className="text-neutral-400">Enabled</span>
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Direction</label>
                        <select
                            value={settings.gradientDirection}
                            onChange={e => update({ gradientDirection: e.target.value as any })}
                            className="w-full rounded-lg bg-neutral-900/60 border border-neutral-800 px-3 py-2"
                        >
                            <option value="right">→ Right</option>
                            <option value="left">← Left</option>
                            <option value="down">↓ Down</option>
                            <option value="up">↑ Up</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">From</label>
                            <input type="color" value={settings.gradientFrom} onChange={e => update({ gradientFrom: e.target.value })} className="h-10 w-full rounded" />
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">To</label>
                            <input type="color" value={settings.gradientTo} onChange={e => update({ gradientTo: e.target.value })} className="h-10 w-full rounded" />
                        </div>
                    </div>
                </div>
            </div>

            {/* check boxs */}
            <div className="grid grid-cols-3 gap-4">
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={settings.perLetterAnimation} onChange={e => update({ perLetterAnimation: e.target.checked })} /><span>Per-letter animation</span></label>

                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={settings.hoverGlow} onChange={e => update({ hoverGlow: e.target.checked })} /><span>Hover glow</span></label>

                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={settings.textOutline} onChange={e => update({ textOutline: e.target.checked })} /><span>Text outline</span></label>
            </div>

            {/* Word / Segment Styling */}
            <div className="space-y-2">
                <div className="font-medium">Word / Segment Styling</div>
                <div className="text-sm text-neutral-400">(active when per-letter animation is off)</div>

                <div className="max-h-44 overflow-auto rounded-lg border border-neutral-800 p-2 grid grid-cols-5 gap-4 bg-neutral-900/40">
                    {words.map((w, i) => (
                        <div key={i} className="flex items-center justify-between gap-2">
                            <div className="truncate"><span className="text-neutral-500">#{i + 1}</span> {w}</div>
                            <select
                                value={settings.segmentStyles[i] ?? 'none'}
                                onChange={e => setSegment(i, e.target.value as any)}
                                className="rounded bg-neutral-900/60 border border-neutral-800 px-2 py-1 text-sm"
                            >
                                <option value="none">None</option>
                                <option value="highlight">Highlight</option>
                                <option value="underline">Underline</option>
                                <option value="block">Block</option>
                            </select>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}