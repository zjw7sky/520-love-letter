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

const colors = ['#ff6b9d', '#ff8fab', '#ffc0cb', '#ff4757', '#ff7f50']

function App() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const newHearts: Heart[] = []
    for (let i = 0; i < 20; i++) {
      newHearts.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    setHearts(newHearts)
  }, [])

  const messages = [
    '你是我生命中最美的遇见',
    '爱你永不止息',
    '余生请多指教',
    '遇见你是我的幸运',
    '每一天都想对你说我爱你',
    '你是我的唯一',
    '心有灵犀一点通',
    '愿与你共度余生'
  ]

  const handleClick = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setMessage(randomMessage)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
  }

  return (
    <div className="container">
      <div className="background-gradient"></div>
      
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
            backgroundColor: heart.color
          }}
        />
      ))}

      <div className="content">
        <div className="main-title">
          <span className="number">5</span>
          <span className="heart-icon">❤️</span>
          <span className="number">2</span>
          <span className="heart-icon">❤️</span>
          <span className="number">0</span>
        </div>
        
        <div className="subtitle">我爱你</div>
        
        <div className="message-card" onClick={handleClick}>
          <div className="card-inner">
            <div className="card-front">
              <div className="card-heart">💕</div>
              <p>点击打开情书</p>
            </div>
            <div className="card-back">
              <p className="love-message">{message || '💕'}</p>
            </div>
          </div>
        </div>

        <div className="decorative-text">
          <span>L</span>
          <span>O</span>
          <span>V</span>
          <span>E</span>
        </div>
      </div>

      {showMessage && (
        <div className="message-popup">
          <p>{message}</p>
        </div>
      )}

      <div className="falling-petals">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 10}s`,
              '--rotation': `${Math.random() * 360}deg`
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  )
}

export default App
