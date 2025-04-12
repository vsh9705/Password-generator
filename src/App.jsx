import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAll, setNumAll] = useState(false);
  const [charAll, setCharAll] = useState(false);
  const [pwd, setPwd] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVQXYZabcdefghijklmnopqrstuvwxyz"
    if(numAll) str+= "1234567890" 
    if(charAll) str += "/<>{}[]!@#"

    for(let i = 0 ; i < length ; i ++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPwd(pass)

  }, [setPwd, length, numAll, charAll])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pwd)
  }, [pwd])

  //useRef hook
  const passwordRef = useRef(null);

  useEffect(() => {passwordGenerator()}, [setPwd, length, numAll, charAll]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-lg rounded-2xl px-6 py-6 my-12 text-orange-400 bg-gray-800'>
        <div className='rounded-lg overflow-hidden mb-6'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>🔐 Password Generator</h1>
          <div className='flex items-center gap-2'>
            <input
              type="text"
              value={pwd}
              className='bg-white text-gray-800 font-mono rounded-md outline-none w-full py-2 px-4 text-sm shadow-inner'
              placeholder='password'
              readOnly
              ref={passwordRef}
            />
            <button onClick={copyPassword}className='bg-blue-600 hover:bg-blue-700 transition text-white text-sm px-4 py-2 rounded-md'>
              Copy
            </button>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center justify-between text-sm'>
            <label className='text-white font-medium'>Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='w-2/3 accent-orange-400 cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className='flex items-center gap-x-2 text-sm'>
            <input
              type="checkbox"
              defaultChecked={numAll}
              id="numberInput"
              className='accent-orange-500 scale-125'
              onChange={() => setNumAll((prev) => !prev)}
            />
            <label htmlFor="numberInput" className='text-white'>Include Numbers</label>
          </div>

          <div className='flex items-center gap-x-2 text-sm'>
            <input
              type="checkbox"
              defaultChecked={charAll}
              id="charInput"
              className='accent-orange-500 scale-125'
              onChange={() => setCharAll((prev) => !prev)}
            />
            <label htmlFor="charInput" className='text-white'>Include Symbols</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
