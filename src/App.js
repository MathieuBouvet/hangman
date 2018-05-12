import React, { Component } from 'react';
import './App.css';
import LetterInput from "./LetterInput";
import MysteryLetter from "./MysteryLetter";
import getMysteryWord from "./Dictionary";
import HangDrawing from "./HangDrawing";
import RemainingTries from "./RemainingTries";

function importAll(r){
  let images = {};
  r.keys().forEach( function (item) {
      images[item.replace('./','')] = r(item);
  });
  return images;
}
const hangmanDrawings = importAll(require.context('../img/HangmanDrawings',false));

const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const hangingElements = ["bottom","pole","top","support","rope","head","torso","left-arm","right-arm","left-leg","right-leg","left-eye-1","left-eye-2","right-eye-1","right-eye-2","mouth"];


class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      mysteryWord: getMysteryWord(),
      triedLettersCorrect: [],
      triedLettersIncorrect: [],
    }

  }

  /** EVENT HANDLERS */

  // Arrow function to ensure proper this binding
  handleInputLetterClick = (triedLetter) => {
    const {mysteryWord, triedLettersCorrect, triedLettersIncorrect } = this.state;
    if(mysteryWord.includes(triedLetter) && !triedLettersCorrect.includes(triedLetter)){
      this.setState({ triedLettersCorrect: [...triedLettersCorrect, triedLetter] });
    }
    else if(!mysteryWord.includes(triedLetter) && !triedLettersIncorrect.includes(triedLetter)){
      this.setState({ triedLettersIncorrect: [...triedLettersIncorrect, triedLetter] });
    }
  }

  /** LOGIC METHODS */
  getDisplayDrawingFor(){
    const { triedLettersIncorrect } = this.state;
    if(triedLettersIncorrect.length < 8){
      return hangmanDrawings[`hangman-${(triedLettersIncorrect.length)-1}.png`];
    }else{
      return hangmanDrawings["hangman-8.png"];
    }
  }

  render() {
    const { mysteryWord, triedLettersIncorrect, triedLettersCorrect } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hangman Game</h1>
        </header>
        <div className="hangman-body">
          <RemainingTries remainingTries={8 - triedLettersIncorrect.length} />
          <div className="mystery-word">
            {mysteryWord.map((mysteryLetter, index) => (
              <MysteryLetter 
                key={index}
                letter={mysteryLetter}
                show={triedLettersCorrect.includes(mysteryLetter)}
               />
            ))}
          </div>
          { triedLettersIncorrect.length > 0 && 
            <div className="hang-drawing">
              <HangDrawing name={this.getDisplayDrawingFor()} />
            </div>
          }
          <div className="tried-letter-container">
            {triedLettersIncorrect.map((incorrectLetter) => (
              `${incorrectLetter} `
            ))}
          </div>
          <div className="letter-input-container">
            {letters.map((letter,index) => (
              <LetterInput letter={letter} key={index} onClick={this.handleInputLetterClick}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
