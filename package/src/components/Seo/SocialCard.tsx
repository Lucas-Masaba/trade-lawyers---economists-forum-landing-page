import { siteConfig } from '@/config/site'

export default function SocialCard() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f4f7f9 55%, #e8eef2 100%)',
        color: '#143545',
        fontFamily: 'Inter, sans-serif',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div
          style={{
            width: '92px',
            height: '92px',
            borderRadius: '28px',
            backgroundColor: '#143545',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: 800,
            letterSpacing: '0.14em',
          }}>
          TLEF
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#4a7991' }}>
            tralef.org
          </div>
          <div style={{ marginTop: '8px', fontSize: '18px', color: '#636e77' }}>{siteConfig.name}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '980px' }}>
        <div style={{ fontSize: '62px', lineHeight: 1.05, fontWeight: 800, letterSpacing: '-0.04em' }}>
          Evidence-based trade policy, law, and economic governance across Africa.
        </div>
        <div style={{ marginTop: '24px', fontSize: '30px', lineHeight: 1.35, color: '#4b5563' }}>
          A regional non-profit knowledge institution headquartered in Kampala, Uganda.
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '22px', color: '#636e77' }}>
        <span style={{ width: '18px', height: '18px', borderRadius: '999px', backgroundColor: '#4a7991' }} />
        Trade law, trade economics, institutional capacity, and regional integration.
      </div>
    </div>
  )
}