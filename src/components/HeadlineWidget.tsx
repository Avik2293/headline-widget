import { motion, Variants } from 'framer-motion'
import { HeadlineSettings, SegmentStyle } from '../lib/types'
import { useMemo } from 'react'


interface Props {
    settings: HeadlineSettings
}


const dirToDeg = (dir: HeadlineSettings['gradientDirection']) => {
    switch (dir) {
        case 'right': return '90deg'
        case 'left': return '270deg'
        case 'down': return '180deg'
        case 'up':
        default: return '0deg'
    }
}


const segmentClass = (style: SegmentStyle) => {
    switch (style) {
        case 'highlight': return 'bg-yellow-300/30 rounded px-1'
        case 'underline': return 'underline underline-offset-4 decoration-2'
        case 'block': return 'bg-white text-black rounded-xl px-2 py-0.5'
        default: return ''
    }
}


export default function HeadlineWidget({ settings }: Props) {
    const {
        text, fontSize, fontFamily, fontWeight, letterSpacing, lineHeight,
        gradientEnabled, gradientDirection, gradientFrom, gradientTo,
        perLetterAnimation, hoverGlow, textOutline, segmentStyles
    } = settings


    const words = useMemo(() => text.split(/\s+/), [text])

    const baseStyle: React.CSSProperties = {
        fontFamily,
        fontWeight,
        fontSize,
        letterSpacing,
        lineHeight,
        ...(gradientEnabled
            ? {
                backgroundImage: `linear-gradient(${dirToDeg(gradientDirection)}, ${gradientFrom}, ${gradientTo})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
            }
            : { color: "#ffffff" }),
        ...(textOutline ? ({ WebkitTextStroke: "1px rgba(255,255,255,0.3)" } as any) : {}),
        ...(hoverGlow
            ? {
                // keep filter string constant; animate --glow instead
                filter: "drop-shadow(0 0 calc(12px * var(--glow)) rgba(255,255,255,0.85))",
                ["--glow" as any]: 0, // TS-friendly
            }
            : {}),
    };


    const letterVar: Variants = {
        init: { y: 12, opacity: 0 },
        animate: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.015,
                type: "spring", // must be 'spring' | 'tween' | 'keyframes'
                stiffness: 300,
                damping: 20,
            },
        }),
    };


    const hoverVariants: Variants = {
        rest: { ["--glow" as any]: 0, transition: { duration: 0.25, ease: "easeOut" } },
        hover: { ["--glow" as any]: 1, transition: { duration: 0.25, ease: "easeIn" } },
    };



    // Render either per-letter or per-word with segment styles
    if (perLetterAnimation) {
        const letters = text.split('')
        return (
            <motion.h1
                className="tracking-tight select-text"
                style={baseStyle}
                // initial="init"
                initial="rest"
                whileHover="hover"
                // animate="animate"
                animate="rest"
                variants={hoverGlow ? hoverVariants : {}}
            >
                {letters.map((ch, i) => (
                    ch === ' ' ? (
                        <span key={i}>&nbsp;</span>
                    ) : (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={letterVar}
                            initial="init"
                            animate="animate"
                            className="inline-block"
                        >
                            {ch}
                        </motion.span>
                    )
                ))}
            </motion.h1>
        )
    }


    // Per-word render (honors segmentStyles)
    return (
        <motion.h1
            className="tracking-tight select-text"
            style={baseStyle}
            initial="rest"
            animate="rest"
            whileHover="hover"
            variants={hoverGlow ? hoverVariants : {}}
        >
            {words.map((word, i) => (
                <span key={i} className={`inline ${segmentClass(segmentStyles[i] ?? 'none')} mr-2`}>{word}</span>
            ))}
        </motion.h1>
    )
}