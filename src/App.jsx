import React from "react";
import Confetti from "react-confetti";
import "./App.css";
import Die from "./Die";
import { random } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzie, setTenzie] = React.useState(false)

  function randomNumer() {
    return Math.ceil(Math.random() * 6);
  }

  React.useEffect(() =>{
    const firstDice = dice[0].value
    const allHeld = dice.every(die => die.held)
    const allSelected = dice.every(die => die.value === firstDice)

    if(allHeld && allSelected){
      setTenzie(true)
    }
  }, [dice])

  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      const newDie = {
        value: randomNumer(),
        held: false,
        id: i + 1,
      }
      newArray.push(newDie);
    }
    return newArray;
  }

  function rollDice() {
    setDice(olddice => olddice.map((die,i) => (
      die.held ? die : {value:randomNumer(),held:false,id:i+1}
    )))
  }

  function holdDice(id){
    if(!tenzie){
      setDice(prevDice => prevDice.map((die) => {
        return die.id === id ? {...die, held: !die.held} : die
      }))
    }
    else{
      setDice(allNewDice())
      setTenzie(false)
    }
  }

  const diceElement = dice.map((die) => (
    <Die key={die.id} {...die} hold={() => holdDice(die.id)}/>
  ));

  return (
    <main>
      {tenzie && <Confetti/>}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dices">{diceElement}</div>
      <button className="rollDice" onClick={rollDice}>
        {tenzie ? "Reset Game" : "Roll"}
      </button>
    </main>
  );
}
