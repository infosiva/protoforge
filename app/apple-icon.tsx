import { ImageResponse } from 'next/og'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export default function AppleIcon() {
  return new ImageResponse(
    (<div style={{ width: 180, height: 180, background: '#0c0a1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="110" height="110" viewBox="0 0 32 32" fill="none" stroke="#818cf8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22h16M11 22l2-7h6l2 7M16 15V8M12.5 10.5 16 8l3.5 2.5"/></svg>
    </div>), size)
}
