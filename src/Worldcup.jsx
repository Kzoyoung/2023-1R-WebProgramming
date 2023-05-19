import { isValidElement, useEffect,useState } from 'react'
import p1 from './assets/김치찌개.jpg'
import p2 from './assets/깻잎.jpg'
import p3 from './assets/꽃게짬뽕.jpg'
import p4 from './assets/두부김치.jpg'
import p5 from './assets/둥지냉면.jpg'
import p6 from './assets/라면볶이.jpg'
import p7 from './assets/리얼치즈.jpg'
import p8 from './assets/마라탕면.jpg'
import p9 from './assets/쌀국수.jpg'
import p10 from './assets/앵그리.jpg'
import p11 from './assets/야끼우동.jpg'
import p12 from './assets/와사비.jpg'
import p13 from './assets/진짜진짜.jpg'
import p14 from './assets/진짬뽕.jpg'
import p15 from './assets/청양고추라면.jpg'
import p16 from './assets/칼빔면.jpg'
import versus from './assets/versus.png'
import './Worldcup.css'


function Worldcup(){
    const candidate = [
        {name:'김치찌개', src:p1},
        {name:'깻잎', src:p2},
        {name:'꽃게짬뽕', src:p3},
        {name:'두부김치', src:p4},
        {name:'둥지냉면', src:p5},
        {name:'라면볶이', src:p6},
        {name:'리얼치즈', src:p7},
        {name:'마라탕면', src:p8},
        {name:'쌀국수', src:p9},
        {name:'앵그리', src:p10},
        {name:'야끼우동', src:p11},
        {name:'와사비', src:p12},
        {name:'진짜진짜', src:p13},
        {name:'진짬뽕', src:p14},
        {name:'청양고추라면', src:p15},
        {name:'칼빔면', src:p16},
    ]
    let sum = 0;
    const [game,setGame]= useState([]);
    const [round,setRound]= useState(0);
    const [nextGame,setNextGame]=useState([]);
    const [Lstate, setLState]=useState(0);
    const [Rstate, setRState]=useState(0);
    const [isDisabled,setIsDisabled]=useState(false);
    const [stat,setStat]=useState({
        "김치찌개":0,
        "깻잎":0,
        "꽃게짬뽕":0,
        "두부김치":0,
        "둥지냉면":0,
        "라면볶이":0,
        "리얼치즈":0,
        "마라탕면":0,
        "쌀국수":0,
        "앵그리":0,
        "야끼우동":0,
        "와사비":0,
        "진짜진짜":0,
        "진짬뽕":0,
        "청양고추라면":0,
        "칼빔면":0,
    });

    useEffect(()=>{

        const 문자열 = localStorage.getItem("월드컵");
        if(문자열 != null){
            setStat(JSON.parse(문자열));
        }

        setGame(candidate.map(c=>{
            return {name: c.name, src: c.src, order: Math.random()}
        }).sort((l,r)=>{
            return l.order - r.order;
        }));
        
    },[]);

    useEffect(()=>{
        if(game.length>1&&round+1>game.length/2){
            setGame(nextGame);
            setNextGame([]);
            setRound(0);
        }
    },[round]);

    if(game.length===1){
        localStorage.setItem("월드컵",JSON.stringify(stat));
        Object.keys(stat).map((name)=>{
            sum += stat[name];
            console.log({sum});
        })
        return (
        <div id="finish">
            <p className='header'>이상형 월드컵 우승</p>
            <img src={game[0].src} id="winImg"/><p id="win">{game[0].name}  {stat[game[0].name]} 번승리</p>
            
                
            
            <table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>우승횟수</th>
                        <th id="bar"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(stat).sort((l,r)=>{
                            return stat[r] - stat[l];
                        }).map(name=>{
                            return (
                                <tr key={name}>
                                    <td>{name}</td>
                                    <td>{stat[name]}</td>
                                    <td>
                                    <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={stat[name]} aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar" style={{width : stat[name]/sum*100 +"%" }}></div>
                                    </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>
        </div>
        )
    }

    const left = round*2;
    const right = round*2+1;
    console.log(stat);
    if(game.length===0 || round+1 > game.length/2) return<p>로딩중입니다</p>

    const leftFunction = ()=>{
        
        if(!isDisabled){
            setLState(1);
            setIsDisabled(true);
            setTimeout(()=>{
                setStat({...stat,[game[left].name]:stat[game[left].name]+1});
                setNextGame((prev)=>prev.concat(game[left]))
                setRound(round=>round+1);
                setLState(0);
                setIsDisabled(false);
            },1000);
        }
    }

    const rightFunction = ()=>{
        
        if(!isDisabled){
            setRState(1);
            setIsDisabled(true);
            setTimeout(()=>{
                setStat({...stat,[game[right].name]:stat[game[right].name]+1});
                setNextGame((prev)=>prev.concat(game[right])) 
                setRound(round=>round+1);
                setRState(0);
                setIsDisabled(false);
            },1000);
        }
    }
    return (<div className='mainbox'>
        <p className='header'>라면 월드컵{round+1}/{game.length/2} <b>{game.length===2?"결승":game.length+"강"}</b></p>
        <img id="versus" src={versus}/>
        
        <div id={"limg"+Lstate}>
            <p id="nameL">{game[left ].name}</p>
            <img id="img" src={game[left ].src} onClick={leftFunction}/>
        </div>
       
        <div id={"rimg"+Rstate}>
            <p id="nameR">{game[right].name}</p>
            <img id="img" src={game[right].src} onClick={rightFunction}/>
        </div>
    </div>
    )
}

export default Worldcup;