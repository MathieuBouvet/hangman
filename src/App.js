import React, { Component } from 'react';
import './App.css';
import LetterInput from "./LetterInput";
import MysteryLetter from "./MysteryLetter";
import getMysteryWord from "./Dictionary";
import HangDrawing from "./HangDrawing"

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
  getDisplayDrawingFor(index){
    const { triedLettersIncorrect } = this.state;
    const nbIncorrect = triedLettersIncorrect.length;
    if(nbIncorrect < 4){
      return index < nbIncorrect;
    }else if(nbIncorrect < 7){
      return index < nbIncorrect+1;
    }else if(nbIncorrect < 8){
      return index < nbIncorrect+2;
    }else if(nbIncorrect < 9){
      return index < nbIncorrect+3;
    }else{
      return true;
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
          <div className="mystery-word">
            {mysteryWord.map((mysteryLetter, index) => (
              <MysteryLetter 
                key={index}
                letter={mysteryLetter}
                show={triedLettersCorrect.includes(mysteryLetter)}
               />
            ))}
          </div>
          <div className="hang-drawing">
            {hangingElements.map((elementName,index) => (
              <HangDrawing 
                key={index} 
                name={elementName} 
                show={this.getDisplayDrawingFor(index)}
              />
            ))}
          </div>
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
