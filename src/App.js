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
    const [isGameOver] = this.isGameOverAndHow();
    if(isGameOver){
      return;
    }
    if(mysteryWord.includes(triedLetter) && !triedLettersCorrect.includes(triedLetter)){
      this.setState({ triedLettersCorrect: [...triedLettersCorrect, triedLetter] });
    }
    else if(!mysteryWord.includes(triedLetter) && !triedLettersIncorrect.includes(triedLetter)){
      this.setState({ triedLettersIncorrect: [...triedLettersIncorrect, triedLetter] });
    }
  }

  handleReplayButtonClick = () => {
    this.setState({
      mysteryWord: getMysteryWord(),
      triedLettersCorrect: [],
      triedLettersIncorrect: [],
    });
  }

  /** LOGIC METHODS */
  getDisplayDrawingFor(){
    const { triedLettersIncorrect } = this.state;
    if(triedLettersIncorrect.length === 0){
      return hangmanDrawings['hangman-start.png'];
    }
    if(triedLettersIncorrect.length <= 8){
      return hangmanDrawings[`hangman-${(triedLettersIncorrect.length)-1}.png`];
    }else{
      return hangmanDrawings["hangman-8.png"];
    }
  }

  getDisplayMysteryLetter(letter){
    const { triedLettersCorrect } = this.state;
    const [isGameOver, overHow] = this.isGameOverAndHow();
    if(!isGameOver){
      return triedLettersCorrect.includes(letter) ? "normal" : "hidden";
    }else{
      if(overHow === "won"){
        return "success";
      }else{
        return triedLettersCorrect.includes(letter) ? "normal" : "missed";
      }
    }
  }

  getNbLetterInMysteryWord(){
    const { mysteryWord } = this.state;
    const mysteryWordLetters = [];
    mysteryWord.forEach( (letter) => {
      if(!mysteryWordLetters.includes(letter)){
        mysteryWordLetters.push(letter);
      }
    });
    return mysteryWordLetters.length;
  }

  isGameOverAndHow(){
    const { triedLettersIncorrect, triedLettersCorrect } = this.state;
    if(triedLettersIncorrect.length > 8){
      return [true, "lost"];
    }
    if(this.getNbLetterInMysteryWord() === triedLettersCorrect.length){
      return [true, "won"];
    }
    return [false, ""];
  }

  render() {
    const { mysteryWord, triedLettersIncorrect, triedLettersCorrect } = this.state;
    const [isGameOver] = this.isGameOverAndHow();
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hangman Game</h1>
        </header>
        {!isGameOver ? 
          <RemainingTries remainingTries={8 - triedLettersIncorrect.length} />
          :
          <div className="replay-button" onClick={this.handleReplayButtonClick}>
            Rejouer
          </div>
        }
        <div className="mystery-word">
          {mysteryWord.map((mysteryLetter, index) => (
            <MysteryLetter 
              key={index}
              letter={mysteryLetter}
              show={this.getDisplayMysteryLetter(mysteryLetter)}
             />
          ))}
        </div>
        <div className="hang-drawing">
          <HangDrawing name={this.getDisplayDrawingFor()} />
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
    );
  }
}

export default App;
