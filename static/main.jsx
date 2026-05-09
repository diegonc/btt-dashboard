import React from 'https://esm.sh/react@18.2.0'
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client'

function App() {
  return (
    <div>
      <h1>Hello React! ⚛️</h1>
      <p>Building user interfaces.</p>
    </div>
  )
}

const root = createRoot(document.getElementById('app'))
root.render(<App />)
