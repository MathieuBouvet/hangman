import React, { Component } from 'react';
import './App.css';
import LetterInput from "./LetterInput";
import MysteryLetter from "./MysteryLetter";
import getMysteryWord from "./Dictionary";

const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


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
  render() {
    const { mysteryWord, triedLettersIncorrect } = this.state;
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
                show
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
