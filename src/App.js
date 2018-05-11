import React, { Component } from 'react';
import './App.css';
import LetterInput from "./LetterInput";

const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hangman Game</h1>
        </header>
        <div className="hangman-body">
          <div className="letter-input-container">
            {letters.map( (letter,index) => (
              <LetterInput letter={letter} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
