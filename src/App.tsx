import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((count) => count + 1)} className='bg-blue-500 text-white p-1'>Click me</button>
    </>
  )
}

export default App
