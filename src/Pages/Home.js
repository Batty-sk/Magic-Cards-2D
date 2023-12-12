import Header from "../Components/Header"
import ConfettiGenerator from 'confetti-js';
import Caudio from "../assests/u-got-that-meme.mp3"

import './Home.css'
import card from '../card-pattern-stylish.png'
import card1 from '../card1.png'
import card2 from '../card2.png'
import card3 from '../card3.png'
import card4 from '../card4.png'
import Card from "../Components/Card"



import {useState,useRef } from "react"

const DIFFICULY_LEVELS_COLORS={'lvl1':'#008b8b','lvl2':'#025F5F','lvl3':'#003535','lvl4':'#D00707'}
const DIFFICULTY_LEVELS_SPEED=[900,600,400,200];
const DIFFICULTY_LEVELS_SWAPS=[5,8,10,20];
let First_time=1;
let Choose_card=0
let player_choice=null;

function Home()
{
       
  

    console.log('*****************************************************************')

    const [playGroundHeading,setPlayGroundHeading]=useState('Pick Up Any Card To Start') // using dom api to manuplate this cuz i was a beginner at that time haha
    
    let arr=['c-1','c-2','c-3','c-4']
    // only problem is difficulty leel

    const[difficulty_level,setDifficultyLvl]=useState(1)
    const[playagain,GameOver]=useState(0);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
  


    function PlayAgain()
    {
        First_time=1;
        Choose_card=0;
        player_choice=null
        GameOver(0)
        const confetti = document.getElementById('confetti-canvas');
         if (confetti) {
              confetti.parentNode.removeChild(confetti); // Remove the canvas
        }
          
        audioRef.current.pause();
        audioRef.current.currentTime = 0
        setPlayGroundHeading("Pick Up Any Card To Start")
        addHoverClass()                   

    }

    const setDifficulty=(difficultylevel)=>{
        console.log('difficulty level selected',difficultylevel)
        setDifficultyLvl(difficultylevel)
    /*     while(element.previousSibling)
        {
            element.previousSibling.style.backgroundColor=DIFFICULY_LEVELS_COLORS[element.previousSibling.id];
            element=element.previousSibling;
            difficulty_level+=1;
        } */
    }


    const addHoverClass=()=>
    {
        let ele;
        for(let i=0;i<arr.length;i++)
        {
            ele=document.getElementById(arr[i]);
            ele.classList.add('outer-parent')

            let backEle=ele.getElementsByClassName('card-back');
            backEle[0].classList.add('card-transform-back');
            ele.classList.remove('static-card-hover')
        }
    }

    const playerSelection=(whichclicked)=>{
        if(First_time)
           {
                First_time=0;
                player_choice=whichclicked.currentTarget.id;
                let parentEle=document.getElementById(whichclicked.currentTarget.id)
                let backEle=parentEle.getElementsByClassName('card-back');
                let outerCard=parentEle.getElementsByClassName('outer-parent')
                backEle[0].classList.remove('card-transform-back');
                outerCard[0].classList.remove('outer-parent');

                // countdown for 3 seconds
                let count=2;
                let countinterval=setInterval(function()
                {
                    if (count>=0)
                    {

                        setPlayGroundHeading(count--)
                    }

                    else{
                        //now we have to write down the code for uno-reverse card.
                        backEle[0].classList.add('card-transform-back')
                        outerCard=parentEle.getElementsByClassName('card-outer')
                        outerCard[0].classList.add('outer-parent')
                        console.log(parentEle.getBoundingClientRect())     
                        clearInterval(countinterval);
                        for(let i=0;i<arr.length;i++)
                        {
                            let parentEle=document.getElementById(arr[i]);
                            parentEle.classList.remove('outer-parent')
                            
                
                        }
                        Swap();
                    }
                },1000)}

            else if(Choose_card){
                console.log('dam')
                console.log(player_choice)
                console.log(whichclicked.currentTarget.id);
 
                if(player_choice ==  whichclicked.currentTarget.id)
                {
                    setPlayGroundHeading("<><><><> YOU'VE WON <><><><>")
                    Celebration()
                    audioRef.current.play();
                }
                else{
                    setPlayGroundHeading("<><><><> YOU'VE WEAK EYES <><><><>")
                }


                Show_Cards();
                setTimeout(
                    function()
                    {
                    GameOver(1);
                    Choose_card=0;
                    Reset_Position();
                    }
                ,3000);
            }
            }
       function Show_Cards()
       {
        for(let i=0;i<arr.length;i++)
        {
            let parentEle=document.getElementById(arr[i]);
            let backEle=parentEle.getElementsByClassName('card-back');
            backEle[0].classList.remove('card-transform-back');
            parentEle.classList.remove('outer-parent')
            

        }
       }
            
        function Reset_Position()
        {
            for(let i=0;i<arr.length;i++)
            {
                document.getElementById(arr[i]).style.left='0px';
            
            }
        }
        function Swap()
        {
            setPlayGroundHeading('Watch Your Choosen Card Carefully -><- ')

            let no1=Get_Random();
            let no2=Get_Random();
            let cards_current={'c-1':null,
                       'c-2':null,
                       'c-3':null,
                       'c-4':null,
        }
        let inital_positions={
            'c-1':null,
            'c-2':null,
            'c-3':null,
            'c-4':null,
        }

        //initializing the cards property with its relative left posistion relate to its parent.
            for(let i=0;i<arr.length;i++)
            {       
                cards_current[arr[i]]=document.getElementById(arr[i]).getBoundingClientRect().left;
                inital_positions[arr[i]]=document.getElementById(arr[i]).getBoundingClientRect().left;

            }       
            //configuring the difficulty level settings according to the user . 
            let count=DIFFICULTY_LEVELS_SWAPS[difficulty_level-1]
            let speed=DIFFICULTY_LEVELS_SPEED[difficulty_level-1]
            //setting up the transition speed
            for(let t=0;t<arr.length;t++)
            {
                document.getElementById(arr[t]).style.transitionDuration=`${DIFFICULTY_LEVELS_SPEED[difficulty_level-1]}ms`
            }



           let Swap_interval=setInterval(function(){
            if(no1!==no2){//3,1

                console.log(no1,no2);              
                let c1=document.getElementById(arr[no1-1]); // c-3
                let c2=document.getElementById(arr[no2-1]);//c-1
                let c1_currPosition=cards_current[arr[no1-1]];//84
                let c2_currPosition=cards_current[arr[no2-1]];//761
                cards_current[arr[no1-1]]=c2_currPosition;//c2-761 
                cards_current[arr[no2-1]]=c1_currPosition;//c1=84
                
                console.log('cards chossen',arr[no1-1],arr[no2-1])
                console.log('curr positions',c1_currPosition,c2_currPosition);
                                // c2=curr 20 -c4= curr 10
                if(c1_currPosition<c2_currPosition)
                {
                    console.log('if')
                    console.log('c2_currpos', c2_currPosition, 'c1 initial ',c1.getBoundingClientRect().left)
                    c1.style.left=c2_currPosition-inital_positions[arr[no1-1]]+'px';
                    console.log('c1 style left',c1.style.left);
                    c2.style.left=c1_currPosition-inital_positions[arr[no2-1]]+'px';
                    console.log('c1_currpos', c1_currPosition, 'c2 initial ',c2.getBoundingClientRect().left)
                    console.log('c2 style left',c2.style.left)
                }
                else{
       
                    c2.style.left=c1_currPosition-inital_positions[arr[no2-1]]+'px';
                    c1.style.left=c2_currPosition-inital_positions[arr[no1-1]]+'px';
                    console.log('c2_currpos', c2_currPosition, 'c1 initial ',c1.getBoundingClientRect().left)

                    console.log('c1 style left',c1.style.left)

                }

                  no1=Get_Random();
                  no2=Get_Random();
                  count--;
                    }
                else{
                    no1=Get_Random();
                    no2=Get_Random()

                }
            if(!count)
            {
                let ele;
                setPlayGroundHeading("Click On Your Card (;")   
               for(let i=0;i<arr.length;i++)
               {
                    ele=document.getElementById(arr[i])
                    ele.classList.remove('outer-parent')
                    ele.classList.add('static-card-hover')
               }
            Choose_card=1;
                clearInterval(Swap_interval);
            }
                
           },speed)
           
        }

        function Get_Random()
        {
            return Math.floor(Math.random()*(4-1 +1))+1;
        }



        const Celebration=()=>{
            const canvas = document.createElement('canvas');
            canvas.id = 'confetti-canvas'; // Set an ID for the canvas
            canvas.style.position="absolute"
            canvas.style.top=0
            canvas.style.left=0
            canvas.style.right=0
            canvas.style.bottom=0
            canvas.style.height='100%'
            canvas.style.width='100%';
            canvas.style.pointerEvents = 'none';
            document.body.appendChild(canvas); // Append the canvas to the body or another container
          
            // Configure ConfettiGenerator settings
            const confettiSettings = { target: 'confetti-canvas' ,max: 300,}; // Use the ID of the canvas
            const confetti = new ConfettiGenerator(confettiSettings);
            confetti.render();
        }   
    
        const handlePause = () => {
            audioRef.current.pause();
            setIsPlaying(false);
          };
    //we have to make the card component
    return(
        <>
        <Header></Header>
        <section id='main'>

            <section id='co-name'>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <span id="game-title"><i> Memorize IT </i></span>
                    </div>
                </div>
            </div>
            </section>

            <section id='play-ground' className="h-100">
                <div className="container-fluid mt-5 h-100">
                    <div className="row parentplus">
                        <div className="col-12 text-center mt-5">
                            <h3 id='play-ground-heading' >{playGroundHeading}</h3>
                            {playagain?<buttom onClick={PlayAgain}><i class="bi bi-arrow-clockwise"></i></buttom>:''}
                        </div>
                        <div className="col-12 text-center mt-3">
                                <span>Difficulty Level:</span>
                                    <span id="levels">
                                        {['lvl1','lvl2','lvl3','lvl4'].map((x,i)=>{
                                            if(i+1 <= difficulty_level){
                                                return <div style={{background:`${DIFFICULY_LEVELS_COLORS[x]}`}} onClick={()=>setDifficulty(i+1)}  className={`hover:bg-[${DIFFICULY_LEVELS_COLORS[x]}]`} key={i}></div>
                                            }
                                            else{
                                                return <div onClick={()=>setDifficulty(i+1)} className={`hover:bg-[${DIFFICULY_LEVELS_COLORS[x]}]`} key={i}></div>
                                            }

                                        }  )  }
                                </span>
                        </div>
                        <div className="col-12 mt-5 card-col-parent">
                            <div className="row justify-content-evenly card-parent">
                                    <Card pattern={card} back={card1} id={'co-1'} plrselect={playerSelection} id2={'c-1'}></Card>
                                    <Card pattern={card} back={card2} id={'co-2'} plrselect={playerSelection} id2={'c-2'}></Card>
                                    <Card pattern={card} back={card3} id={'co-3'} plrselect={playerSelection} id2={'c-3'} ></Card>
                                    <Card pattern={card} back={card4} id={'co-4'} plrselect={playerSelection} id2={'c-4'}></Card>
                            </div>
                        </div>
                        
                        <div >
      <audio ref={audioRef} onEnded={handlePause}>
        <source src={Caudio} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio></div>
       </div>
                </div>
            </section>
        </section>

        </>
    )
}
export default Home