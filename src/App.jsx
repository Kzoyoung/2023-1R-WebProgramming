import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // const res = await fetch("http://openapi.seoul.go.kr:8088/4d435068454b7a6f38354367495348/json/RealtimeCityAir/1/25/");
  // const res2 = await res.json();
  // res2.RealtimeCityAir.row
  
  const [row,setRow] = useState([]);

  useEffect(()=>{
    console.log("mount or update");

    return()=>{
      console.log('unmount');//내용이 지워질때
    }
  });

  useEffect(()=>{
    console.log("mount only");
  },[]);

  useEffect(()=>{
    console.log("row update only");
  },[row]);

  useEffect(()=>{
    console.log("count update only");
    document.title = 'You clicked' +count+ 'times';

    return () =>{
      document.title = "Vite + React";
    };

  },[count]);

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
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1> */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {/* <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
      </div>
      <h1>미세먼지 현황</h1>
      <button onClick={loadRow}>로드</button> 
     
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>pm10</th>
              <th>o3</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            
            {
            row.map((gu, index)=>{
              return(
                <tr key={index}>
                  <td>{gu.MSRSTE_NM}</td>
                  <td>{gu.PM10}</td>
                  <td>{gu.O3}</td>
                  <td>{gu.IDEX_NM}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>

      

      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
