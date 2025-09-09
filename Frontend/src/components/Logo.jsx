import React from 'react'
import '../styles/auth.css'

export default function Logo({ size = 36 }){
  return (
    <div className="im-logo" aria-hidden style={{display:'inline-flex', alignItems:'center', gap:8}}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="var(--primary)"/>
        <path d="M7 12h10" stroke="var(--primary-contrast)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 7v10" stroke="var(--primary-contrast)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div style={{display:'flex', flexDirection:'column', lineHeight:1}}>
        <strong style={{fontSize:14}}>InstaMato</strong>
        <small style={{fontSize:10, color:'var(--muted)'}}>Serve. Share. Repeat.</small>
      </div>
    </div>
  )
}
