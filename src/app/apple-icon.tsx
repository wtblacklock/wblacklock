import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/**
 * Home-screen icon for iOS, which ignores SVG favicons. Same mark as icon.svg.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
        }}
      >
        <svg width="180" height="180" viewBox="0 0 100 100">
          <path
            d="M17 28 L32 73 L50 39 L68 73 L83 28"
            fill="none"
            stroke="#ffffff"
            strokeWidth="9"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeMiterlimit="6"
          />
        </svg>
      </div>
    ),
    size
  )
}
