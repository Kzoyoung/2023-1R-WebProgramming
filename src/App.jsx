import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  // const res = await fetch("http://openapi.seoul.go.kr:8088/4d435068454b7a6f38354367495348/json/RealtimeCityAir/1/25/");
  // const res2 = await res.json();
  // res2.RealtimeCityAir.row
  
  const [row,setRow] = useState([]);

  const loadRow =()=>{
    if(row.length ===0){
  
      const res = fetch("http://openapi.seoul.go.kr:8088/4d435068454b7a6f38354367495348/json/RealtimeCityAir/1/25/").then(
      function(res2){
        res2.json().then(function(res3){
          setRow(res3.RealtimeCityAir.row);
        })
      }
    )
    }
  }

 

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}

      <button onClick={loadRow}>로드</button> 

      <table>
        <thead>
          <th>이름</th>
          <th>pm10</th>
          <th>o3</th>
          <th>상태</th>
        </thead>
        <tbody>
          {row.map(function(obj){
            return <tr>
              <td>{obj.MSRSTE_NM}</td>
              <td>{obj.PM10}</td>
              <td>{obj.O3}</td>
              <td>{obj.IDEX_NM}</td>
            </tr>
          })}
        </tbody>
      </table>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
