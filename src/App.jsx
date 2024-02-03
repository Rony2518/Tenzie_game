import React from "react";
import Confetti from "react-confetti";
import "./App.css";
import Die from "./Die";
import dice1 from "../images/dice1.png";
import dice2 from "../images/dice2.png";
import dice3 from "../images/dice3.png";
import dice4 from "../images/dice4.png";
import dice5 from "../images/dice5.png";
import dice6 from "../images/dice6.png";

import { random } from "nanoid";

export default function App() {
  const allDiceImages = [dice1, dice2, dice3, dice4, dice5, dice6];
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzie, setTenzie] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);
  const [time, setTime] = React.useState(0);

  function randomNumer() {
    return Math.floor(Math.random() * 6)
  }

  React.useEffect(() => {
    const firstDice = dice[0].value;
    const allHeld = dice.every((die) => die.held);
    const allSelected = dice.every((die) => die.value === firstDice);

    if (allHeld && allSelected) {
      setTenzie(true);
    }
  }, [dice]);

  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      const newDie = {
        value: allDiceImages[randomNumer()],
        held: false,
        id: i + 1,
      };
      newArray.push(newDie);
    }
    return newArray;
  }

  function rollDice() {
    if (!tenzie) {
      setDice((olddice) =>
        olddice.map((die, i) =>
          die.held ? die : { value: allDiceImages[randomNumer()], held: false, id: i + 1 }
        )
      );
      setRollCount((prevCount) => prevCount + 1);
    } else {
      setDice(allNewDice())
      setTenzie(false)
      setRollCount(0)
      setTime(0)
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, held: !die.held } : die;
      })
    );
  }

  const diceElement = dice.map((die) => (
    <Die key={die.id} {...die} hold={() => holdDice(die.id)} />
  ));

  React.useEffect(() => {
    let interval;
    
    if (tenzie) {
      clearInterval(interval);
    } else {
      const isHeld = dice.some(die => die.held)
      if(isHeld){
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000)
      }
    }

    return () => clearInterval(interval);
  }, [tenzie,dice]);

  return (
    <main>
      {tenzie && <Confetti />}
      <div className="header flex">
        <h1>Tenzies</h1>
        <div className="score">
          <h3>Roll Count:{rollCount}</h3>
          <h3>Time:{time}s</h3>
        </div>
      </div>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dices">{diceElement}</div>
      <button className="rollDice" onClick={rollDice} disabled={!dice.some(die => die.held)}>
        {tenzie ? "Reset Game" : "Roll"}
      </button>
    </main>
  );
}
