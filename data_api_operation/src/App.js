import { useEffect, useState } from 'react';
import './App.css';
import { get_number }from './api/fetch.js'

function App() {

  const [numberData, setNumberData] = useState([])

  const [tf, setTF] = useState(false)

  useEffect(() => {
    get_number().then((data) => setNumberData(data))
  },[])

  function clicked(){
    setTF(true)
  }

  return (
    <div className="App">
      <button onClick={clicked}>Get Number</button>
      <p></p> 
      {tf ? numberData.map((item, index) => 
        <div>
          <label key={index} className='number'>Number: {item.number} </label>
          <label key={index} className='ID'>ID: {item.id} </label>
        </div>
      ) : <div></div>}
    </div>
  );
}

export default App;
