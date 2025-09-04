export type GradientDirection = 'right' | 'left' | 'up' | 'down'


export type SegmentStyle = 'none' | 'highlight' | 'underline' | 'block'


export interface HeadlineSettings {
    text: string
    fontSize: number // in px
    fontFamily: 'Inter' | 'Poppins' | 'Merriweather'
    fontWeight: 300 | 400 | 600 | 800
    letterSpacing: number // in px
    lineHeight: number // unitless multiplier
    gradientEnabled: boolean
    gradientDirection: GradientDirection
    gradientFrom: string // hex
    gradientTo: string // hex
    perLetterAnimation: boolean
    hoverGlow: boolean
    textOutline: boolean
    segmentStyles: Record<number, SegmentStyle> // by word index
}