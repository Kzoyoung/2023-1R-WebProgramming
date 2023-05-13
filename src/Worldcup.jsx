import { useEffect,useState } from 'react'
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

    const [game,setGame]= useState([]);
    const [round,setRound]= useState(0);
    const [nextGame,setNextGame]=useState([]);
    const [Lstate, setLState]=useState(0);
    const [Rstate, setRState]=useState(0);
    const [isDisabled,setIsDisabled]=useState(false);

    useEffect(()=>{
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
        return (
        <div id="finish">
            <p className='header'>이상형 월드컵 우승</p>
            <img src={game[0].src}/><p id="win">{game[0].name}</p>
        </div>
        )
    }
    
    if(game.length===0 || round+1 > game.length/2) return<p>로딩중입니다</p>

    return (<div className='mainbox'>
        <p className='header'>라면 월드컵{round+1}/{game.length/2} <b>{game.length===2?"결승":game.length+"강"}</b></p>
        <img id="versus" src={versus}/>
        <p id="name1">{game[round*2].name}</p>
        <div id={"limg"+Lstate}>
            <img src={game[round*2].src} onClick={()=>{
                if(!isDisabled){
                    setLState(1);
                    setIsDisabled(true);
                    setTimeout(()=>{
                        setNextGame((prev)=>prev.concat(game[round*2]))
                        setRound(round=>round+1);
                        setLState(0);
                        setIsDisabled(false);
                    },1000);
                }
                   
                    
            }}/>
        </div>
        <p id="name2">{game[round*2+1].name}</p>
        <div id={"rimg"+Rstate}>
            <img src={game[round*2+1].src} onClick={()=>{
                if(!isDisabled){
                    setRState(1);
                    setIsDisabled(true);
                    setTimeout(()=>{
                        setNextGame((prev)=>prev.concat(game[round*2+1])) 
                        setRound(round=>round+1);
                        setRState(0);
                        setIsDisabled(false);
                    },1000);
                }
                
               
            }}/>
        </div>
    </div>
    )
}

export default Worldcup;