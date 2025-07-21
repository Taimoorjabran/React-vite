import React, { useEffect, useRef, useState } from 'react'

export const Progessbar = () => {
    const [progress, setProgress] = useState(0);
    const progressStatus = useRef<number | null>(null);

    useEffect(() => {
      if (progress < 100) {
        progressStatus.current = setInterval(() => {
          setProgress((prev) => prev + 10)
      }, 300);

      return ()=> {if (progressStatus.current) clearInterval(progressStatus.current)};
      }
    }, [progress])

  return (
    <div style={{border: '1px solid blue', borderRadius: 16, textAlign: 'center'}}>
      <div className="progress-bar" style={{ width: `${progress}%`, borderRadius: 16, background: 'lightPink' }}>
        <span className="progress-text">{progress}%</span>
      </div>
    </div>
  )
}

export default Progessbar
