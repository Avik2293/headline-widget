import { HeadlineSettings } from './types'


export const defaultSettings: HeadlineSettings = {
    text: 'Design bold headlines in seconds',
    fontSize: 64,
    fontFamily: 'Inter',
    fontWeight: 800,
    letterSpacing: 0,
    lineHeight: 1.05,
    gradientEnabled: true,
    gradientDirection: 'right',
    gradientFrom: '#22d3ee',
    gradientTo: '#a78bfa',
    perLetterAnimation: true,
    hoverGlow: true,
    textOutline: false,
    segmentStyles: { 2: 'highlight' }, // highlights the 3rd word by default
}