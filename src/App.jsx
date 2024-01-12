import { useCallback, useEffect, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("second");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <>
      <div className="bg-white/40 p-8 rounded-lg backdrop-blur-lg shadow-lg w-full md:w-96 mx-auto transparent-bg">
        <h2 className="text-2xl font-bold mb-4">Password Generator</h2>
        <input className='w-full font-bold size-6 mb-4 text-center py-3 px-2 bg-blue-100 rounded-lg' type="text" value={password} readOnly />
        <label className="block mb-4">
          <span className="text-gray-700">Password Length</span>
          <input type="range" min="8" max="16" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full mt-1"/>
          <label>length: {length}</label>
        </label>

        <div className="mb-4">
          <input type="checkbox" id="includeCharacters" checked={charAllowed} onChange={() => setCharAllowed((prev) => !prev)} className="mr-2"/>
          <label htmlFor="includeCharacters" className="text-gray-700">Include Characters</label>
        </div>

        <div className="mb-4">
          <input type="checkbox" id="includeNumbers" checked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} className="mr-2"/>
          <label htmlFor="includeNumbers" className="text-gray-700">Include Numbers</label>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full" onClick={()=>window.navigator.clipboard.writeText(password)}>Copy</button>
      </div>
    </>
  );
}

export default App;
