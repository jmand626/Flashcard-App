import React, { ChangeEvent, Component } from "react";
import { parseStringDeck } from "./Deck";
import { isRecord } from "./record";

type MakeDeckProps = {//Remember, this state is where we are making a new deck

    onBackClick: () => void;
    //call back function to get back to main

    listDeck: string[];
    //to add to our listDeck
}

type MakeDeckState = {
    nameOfDeck: string;

    flashcards: string;
}

export class MakeDeck extends Component<MakeDeckProps, MakeDeckState>{
    constructor(props: MakeDeckProps) {
        super(props);
    
        this.state = {nameOfDeck: "", flashcards: ""};
    }

    render = (): JSX.Element =>{//Rendering the UI of the make screen
        return (<div>
            <h1>Create</h1>
            <label> Name: </label> 
            <input type="text" value={this.state.nameOfDeck} onChange={this.doNameChangedClick}/>

            <br></br>

            <label htmlFor="textbox">Options (one per line, formatted as front|back)</label>
            <br/>
            <textarea id="textbox" rows={3} cols={40} value={this.state.flashcards}
            onChange={this.doFlashcardAreaChangedClick}></textarea>

            <br></br>

            <button type="button" onClick = {this.doAddClick}>Add</button>
            <button type="button" onClick = {this.doBackClick}>Back</button>

        </div>);
    }

    doNameChangedClick = (_evt: ChangeEvent<HTMLInputElement>):void => {//Done this alot, changing name room
        this.setState({nameOfDeck: _evt.target.value});
    };

    doFlashcardAreaChangedClick = (_evt: ChangeEvent<HTMLTextAreaElement>):void => {//Changing update area
        this.setState({flashcards: _evt.target.value});
    };

    doAddClick = (): void => {//Alot of error checking
        if(this.state.nameOfDeck === ""){
            alert("Error: Name should not be empty");
        }else if(this.state.flashcards === ""){
            alert("Error: No Cards");
        }else if(this.state.nameOfDeck === "" && this.state.flashcards === ""){
            alert("Error: The name should not be empty and there are no cards")
        }else if(parseStringDeck(this.state.flashcards) == undefined){//incorrecting formatting in cards
            alert("Error: Incorrect formatting in your flashcards")
        }else if(this.props.listDeck.includes(this.state.nameOfDeck) === true){
            alert("Error: Quiz already exists. That, or you have not sufficently donated to the Church of Jared")
        }
        
    
        //"doSaveClick"
        fetch("/api/save", {
            method: "POST", body: JSON.stringify({name: this.state.nameOfDeck, value: parseStringDeck(this.state.flashcards)
            }),
            headers: {"Content-Type": "application/json"} })
          .then((res) => this.doSaveResp(res))
          .catch(() => this.doSaveError("failed to connect to server"))


    };

    doBackClick = (): void => {//inside the group of save methods, but its just a callback in a cleaner way
        this.props.onBackClick();
    };

    doSaveResp = (res: Response): void => {
        if (res.status === 200) {
          res.json().then((data) => this.doSaveJson(data))
             .catch(() => this.doSaveError("200 response is not valid JSON"));
        } else if (res.status === 400) {
          res.text().then(this.doSaveError)
             .catch(() => this.doSaveError("400 response is not text"));
        } else {
          this.doSaveError(`bad status code ${res.status}`);
        }
    }


    doSaveError = (msg: string): void => {
        console.error(`Error fetching /save: ${msg}`);
    }

    doSaveJson = (data: unknown): void =>{
        if (!isRecord(data)) {
          console.error("bad data from /save: not a record", data)
          return;
        }else{
          alert("You have saved successfully!");
          //Go back to main page after server has saved deck
          this.doBackClick();
        }
    }



    


}