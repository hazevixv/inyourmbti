import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0EA5E9 0%, #14B8A6 50%, #6366F1 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background circles */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-80px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          display: 'flex',
        }} />

        {/* Logo area */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px',
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px',
          }}>
            ✨
          </div>
          <span style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', letterSpacing: '-1px' }}>
            inyourmbti
          </span>
        </div>

        {/* Main headline */}
        <div style={{
          fontSize: '64px', fontWeight: '900', color: 'white',
          textAlign: 'center', lineHeight: 1.1, marginBottom: '24px',
          maxWidth: '900px',
        }}>
          Kenali Dirimu,{' '}
          <span style={{ color: '#FDE68A' }}>Lebih Dalam.</span>
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: '24px', color: 'rgba(255,255,255,0.85)',
          textAlign: 'center', maxWidth: '700px', lineHeight: 1.5,
          marginBottom: '40px',
        }}>
          Tes MBTI berbasis sains dengan AI Psychologist. Temukan tipe kepribadianmu secara gratis!
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '32px' }}>
          {[
            { num: '96', label: 'Pertanyaan' },
            { num: '16', label: 'Tipe MBTI' },
            { num: '100%', label: 'Gratis' },
          ].map((stat) => (
            <div key={stat.label} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              background: 'rgba(255,255,255,0.15)', borderRadius: '16px',
              padding: '16px 28px',
            }}>
              <span style={{ fontSize: '32px', fontWeight: '900', color: 'white' }}>{stat.num}</span>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{
          position: 'absolute', bottom: '28px',
          fontSize: '18px', color: 'rgba(255,255,255,0.6)',
        }}>
          mbti.haze.biz.id
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
