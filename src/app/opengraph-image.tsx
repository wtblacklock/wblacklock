import { ImageResponse } from 'next/og'

export const alt = 'William Blacklock — Design, AI & Systems'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * The card people see when the site is shared. Deliberately the same black
 * field and thin mark as the favicon and the nav wordmark.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000000',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 92, fontWeight: 300, color: '#ffffff', letterSpacing: '0.02em' }}>
          WTB
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 76,
              fontWeight: 300,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            William Thames Blacklock
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 32,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.62)',
              letterSpacing: '0.01em',
            }}
          >
            Design · AI · Systems — Austin, TX
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 24,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.42)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          wblacklock.com
        </div>
      </div>
    ),
    size
  )
}
