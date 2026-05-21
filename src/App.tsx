import { useState, useEffect } from 'react'
import './App.css'

interface Heart {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
  type: 'sparkle' | 'star' | 'circle'
}

const heartColors = ['#ff6b9d', '#ff8fab', '#ffc0cb', '#ff4757', '#ff7f50', '#ff1493', '#c44569']
const particleColors = ['#fff', '#ffd700', '#ff69b4', '#ffa07a', '#ffc0cb']

function App() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const newHearts: Heart[] = []
    for (let i = 0; i < 25; i++) {
      newHearts.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 25 + 15,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 6,
        color: heartColors[Math.floor(Math.random() * heartColors.length)]
      })
    }
    setHearts(newHearts)
  }, [])

  useEffect(() => {
    const newParticles: Particle[] = []
    const types: ('sparkle' | 'star' | 'circle')[] = ['sparkle', 'star', 'circle']
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        type: types[Math.floor(Math.random() * types.length)]
      })
    }
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const messages = [
    '你是我生命中最美的遇见',
    '爱你永不止息',
    '余生请多指教',
    '遇见你是我的幸运',
    '每一天都想对你说我爱你',
    '你是我的唯一',
    '心有灵犀一点通',
    '愿与你共度余生',
    '我爱你，不止今天',
    '你是我心之所向',
    '我的眼里只有你',
    '爱你三千遍'
  ]

  const handleClick = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setMessage(randomMessage)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 4000)
  }

  return (
    <div className="container">
      <div className="background-gradient"></div>
      <div className="background-blur"></div>
      
      <div 
        className="cursor-trail"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle particle-${particle.type}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}

      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            backgroundColor: heart.color,
            boxShadow: `0 0 ${heart.size}px ${heart.color}40`
          }}
        />
      ))}

      <div className="content">
        <div className="main-title">
          <span className="number digit-5">5</span>
          <span className="heart-icon icon-1">❤️</span>
          <span className="number digit-2">2</span>
          <span className="heart-icon icon-2">🧡</span>
          <span className="number digit-0">0</span>
        </div>
        
        <div className="subtitle-container">
          <div className="subtitle">我爱你</div>
          <div className="subtitle-shadow">我爱你</div>
        </div>
        
        <div className="message-card" onClick={handleClick}>
          <div className="card-inner">
            <div className="card-front">
              <div className="card-heart">💕</div>
              <p>点击打开情书</p>
              <div className="card-decoration"></div>
            </div>
            <div className="card-back">
              <div className="back-decoration"></div>
              <p className="love-message">{message || '💕'}</p>
            </div>
          </div>
        </div>

        <div className="decorative-text">
          <span className="letter-l">L</span>
          <span className="letter-o">O</span>
          <span className="letter-v">V</span>
          <span className="letter-e">E</span>
        </div>

        <div className="confetti-container">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${20 + i * 7}%`,
              animationDelay: `${i * 0.15}s`
            }} />
          ))}
        </div>
      </div>

      {showMessage && (
        <div className="message-popup">
          <div className="popup-glow"></div>
          <p>{message}</p>
          <div className="popup-hearts">
            <span>❤️</span>
            <span>🧡</span>
            <span>💛</span>
            <span>💚</span>
            <span>💙</span>
            <span>💜</span>
          </div>
        </div>
      )}

      <div className="falling-petals">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 8 + 6}s`,
              animationDelay: `${Math.random() * 12}s`,
              '--rotation': `${Math.random() * 360}deg`,
              '--size': `${Math.random() * 10 + 10}px`
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="ripple-container">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="ripple"
            style={{
              animationDelay: `${i * 1.5}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default App
