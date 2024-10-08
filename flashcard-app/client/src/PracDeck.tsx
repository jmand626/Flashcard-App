import React, { ChangeEvent, Component } from "react";
import { flashcard } from "./Deck";
import "./style.css";
import { isRecord } from "./record";

type PracDeckProps = {//Alot of props and states here, but they should be clear (note that a SaveScore component is just attached to this component)
    linkedDeck: flashcard[]

    linkedDeckName: string;

    onBackClick: () => void;

}

type PracDeckState = {
    correctCount: number;

    incorrectCount: number

    onFrontCard: boolean

    onBackCard: boolean

    currentCard: flashcard

    nameOfScoreRun: string
    //This is a run after practicing a deck

}

export class PracDeck extends Component<PracDeckProps, PracDeckState>{
    constructor(props: PracDeckProps){
        super(props)

        //Set our current card to the first card in the deck we clicked on
        this.state = {correctCount: 0, incorrectCount: 0, onFrontCard: true, onBackCard: false, currentCard: this.props.linkedDeck[0], nameOfScoreRun: ""}

    }

    render = (): JSX.Element =>{//Conditionaly render end screens
        if(this.state.correctCount + this.state.incorrectCount >= this.props.linkedDeck.length){
            return this.renderEndScreen();
            //renderEndScreen is below
        }else{//Main case
        
        return (<div>
            <h2>{this.props.linkedDeckName}</h2>

            <br></br>

            <h3>Correct: {this.state.correctCount.toString()}</h3>
            <h3>Incorrect: {this.state.incorrectCount.toString()}</h3>

            <br></br>

            <div className="card">{this.getFrontOrBack()}</div>
            

            <button type="button" onClick = {this.doFlipClick}>Flip</button>
            <button type="button" onClick = {this.doCorrectClick}>Correct</button>
            <button type="button" onClick = {this.doIncorrectClick}>Incorrect</button>



        </div>);
        }

    }

    doFlipClick = (): void => {//If we want to flip our card to show the other side, we just logically not our booleans
        this.setState({onFrontCard: !this.state.onFrontCard, onBackCard: !this.state.onBackCard});
    };

    doCorrectClick = (): void => {//As long as we dont break the array length, we can increment correctCount
        if(this.state.correctCount + this.state.incorrectCount < this.props.linkedDeck.length){
            this.setState({correctCount: this.state.correctCount + 1, onFrontCard: true, onBackCard: false, currentCard: this.props.linkedDeck[Number(this.state.correctCount + this.state.incorrectCount + 1)]});
        }
    
    };


    doIncorrectClick = (): void => {//As long as we dont break the array length, we can increment incorrectCount
        if(this.state.correctCount + this.state.incorrectCount < this.props.linkedDeck.length){
            this.setState({incorrectCount: this.state.incorrectCount + 1, onFrontCard: true, onBackCard: false, currentCard: this.props.linkedDeck[Number(this.state.correctCount + this.state.incorrectCount + 1)]});
        }
    };

    getFrontOrBack = (): string =>{//Based on our booleans, we get whatever side of the card we want
        if(this.state.onFrontCard){
            return this.state.currentCard.front;
        }else{//onFrontCard is false, onBackCard is true
            return this.state.currentCard.back;
        }
    }

    renderEndScreen = (): JSX.Element =>{//Conditionally rendered in the main render method (otherwise it just doesnt work)
        return (<div>
            <h2>{this.props.linkedDeckName}</h2>

            <br></br>

            <h3>Correct: {this.state.correctCount.toString()}</h3>
            <h3>Incorrect: {this.state.incorrectCount.toString()}</h3>

            <h5>End of Quiz</h5>
            <label> Name: </label> 
            <input type="text" value={this.state.nameOfScoreRun} onChange={this.doNameChangedClick}/>

            <button type="button" onClick = {this.doFinishClick}>Finish</button>


        </div>);
    }

    doNameChangedClick = (_evt: ChangeEvent<HTMLInputElement>):void => {
        this.setState({nameOfScoreRun: _evt.target.value});
    };

    //saveScore methods
    
    doFinishClick = (): void => {
        if(this.state.nameOfScoreRun === ""){
            alert("Error: Name should not be empty");
        }else if(typeof this.state.nameOfScoreRun !== 'string'){
            alert("Error: Please enter a string");
        }else{
            //doSaveScoreClick
            fetch("/api/saveScore", {
                method: "POST", body: JSON.stringify({name: this.state.nameOfScoreRun, deck: this.props.linkedDeckName, 
                score: Math.floor((Number(this.state.correctCount)/this.props.linkedDeck.length)* 100) }),
                headers: {"Content-Type": "application/json"} })
              .then((res) => this.doSaveScoreResp(res))
              .catch(() => this.doSaveScoreError("failed to connect to server"))

        }
    }


    doSaveScoreResp = (res: Response): void => {
        if (res.status === 200) {
          res.json().then((data) => this.doSaveScoreJson(data))
             .catch(() => this.doSaveScoreError("200 response is not valid JSON"));
        } else if (res.status === 400) {
          res.text().then(this.doSaveScoreError)
             .catch(() => this.doSaveScoreError("400 response is not text"));
        } else {
          this.doSaveScoreError(`bad status code ${res.status}`);
        }
    }

    doSaveScoreError = (msg: string): void => {
        console.error(`Error fetching /saveScore: ${msg}`);
    }

    doSaveScoreJson = (data: unknown): void =>{
        if (!isRecord(data)) {
          console.error("bad data from /save: not a record", data)
          return;
        }else{
          alert("You have saved successfully!");
          //Go back to main page after server has saved deck
          this.doBackClick();
        }
    }

    doBackClick = (): void => {
        this.props.onBackClick();
    };



 
    
}


