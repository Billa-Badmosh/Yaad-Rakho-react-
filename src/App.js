
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './component/SingleCard.js';

const cardImages = [
  {"src":"images/4_daant.jpg",matched:false },
  {"src":"images/chirand.jpg",matched:false },
  {"src":"images/deepa.jpg"  ,matched:false },
  {"src":"images/dutta.jpg"  ,matched:false },
  {"src":"images/jadu.jpg"   ,matched:false },
  {"src":"images/kalu.jpg"   ,matched:false },
  {"src":"images/kesu.jpg"   ,matched:false },
  {"src":"images/me.jpg"     ,matched:false },
  {"src":"images/negi.jpg"   ,matched:false },
  {"src":"images/nitesh.jpg" ,matched:false }
]

function App() {
  const[cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const[choiceOne, setChoiceOne] = useState(null)
  const[choiceTwo, setChoiceTwo] = useState(null)
  const[disabled, setDisabled] = useState(false)



//shuffle card
  const shuffleCards = () =>{
    const shuffleCards=[...cardImages,...cardImages]
    .sort(() => Math.random() -0.5)
    .map((card) => ({...card, id: Math.random() }))

    setCards(shuffleCards)
    setTurns(0)

  }

  //handle a choice

  const handleChoice = (card) =>{
    // console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  
  //compare 2 selected cards 
  useEffect(() =>{
  if(choiceOne && choiceTwo){
    setDisabled(true)
    if(choiceOne.src === choiceTwo.src){
      // console.log('those card match')
      setCards(prevCards =>{
        return prevCards.map(card => {
          if (card.src=== choiceOne.src){
            return{...card, matched: true}
          }else{
            return card
          }
        })
      })
      resetTurn()
    } else{
      // console.log('those card do not match')
        setTimeout(() =>resetTurn(), 1000)
      
    }
  }
  },[choiceOne,choiceTwo])


  console.log(cards)

  // reset choices & increase turn
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }




  console.log(cards,turns)
  return (
    <div className="App">
     <h1>Yaad Rakho</h1>
     <button onClick={shuffleCards}>NEW GAME</button>
     <div className="card-grid">
      {cards.map(card =>(
    //     <div className="card" key={card.id}>
    //     <div>
    //     <img className="front" src={card.src} alt="card front" />
    //     <img className="back" src="/images/card_back.jpg"/> 
    //     </div>
    // </div>

    <SingleCard key={card.id} card={card}
     handleChoice={handleChoice}
     flipped={card === choiceOne || card === choiceTwo || card.matched}
     disabled={disabled}
    />

      ))}

     </div>
    </div>
    
  );
}

export default App;
