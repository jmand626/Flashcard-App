import React, { Component, MouseEvent } from "react";
import { isRecord } from './record';
import { MakeDeck } from "./MakeDeck";
import { flashcard } from "./Deck";
import { PracDeck } from "./PracDeck";



// TODO: When you're ready to get started, you can remove all the example 
//   code below and start with this blank application:

type scoreRecord = {//A copied version from routes.ts
  name: string;
  deck: string;
  score: number;
}

// Indicates which page to show, based on the kind field. Main is this piece
type Page = {kind: "main"} | {kind: "make"} | {kind: "prac"} | {kind: "save"}; 


 type FlashcardAppState = {//Pretty self explantory states i hope
    listDeck: string[];

    listScore: scoreRecord[];

    page: Page;

    linkedDeck: flashcard[];
    //linked list btw, no kapp 

    linkedDeckName: string;

}
 
 /** Displays the UI of the Flashcard application. */
 export class FlashcardApp extends Component<{}, FlashcardAppState> {
 
  constructor(props: {}) {
    super(props);

    this.state = {listDeck: [], listScore: [], page: {kind: "main"}, linkedDeck: [], linkedDeckName: ""};
  }
  componentDidMount = (): void => {//First time the page is loaded
    this.doListUpdateClick();

    this.doListScoresUpdateClick();
  }
  //Lists for decks and scores

  
  render = (): JSX.Element => {

    if(this.state.page.kind === "main"){//Conditonally render based on kind field from page state
      return <div>

        <h1> List </h1> 

            <ul>
              {this.renderDeckList()}
            </ul>

            <button type="button" onClick = {this.doNewClick}>New</button>

            <br></br>

        <h1> Scores </h1>
        <ul>
              {this.renderScoreList()}
        </ul>
      </div>;
    }else if(this.state.page.kind === "make"){
      return <MakeDeck listDeck={this.state.listDeck}
      onBackClick={this.doBackClick}/>
    }else if(this.state.page.kind === "prac"){
      return <PracDeck linkedDeck={this.state.linkedDeck} linkedDeckName={this.state.linkedDeckName} onBackClick={this.doBackClick}/>;
    }else{//The only we can get to the saveScore scene is if we get from finishing practing a deck, so its combined with pracDeck
      return <div></div>;
    }
  };

  renderDeckList = (): JSX.Element[] =>{
    const toReturn : JSX.Element[] = [];
    
  
    // Inv: toReturn.push(i) = renderDeckList[0 ... i] and i < this.state.listDeck.length
    for (const s of this.state.listDeck){//Pretty similar to HW8
      
      toReturn.push(<li key={s}><a href = "#" onClick = {() => this.doLoadClick(s)}>
      {s}</a></li>);
  
    }
    
    return toReturn;
    
  }

  renderScoreList = (): JSX.Element[] => {
    const toReturn : JSX.Element[] = [];
    
  
    // Inv: toReturn.push(i) = renderScoreList[0 ... i] and i < this.state.listScore.length
    for (const s of this.state.listScore){//Similar to renderDeckList but without link
      
      toReturn.push(<li key={s.name}><a>{s.name}, {s.deck}, {s.score}</a></li>);
  
    }
    return toReturn;
  }

  doNewClick = (_evt: MouseEvent<HTMLButtonElement>): void => {//New button
    this.setState({page: {kind: "make"}});
  };


  doBackClick = (): void => {//Everytime we come back we call updates for our list instead of componentDidMount
    this.setState({page: {kind: "main"}});

    this.doListUpdateClick();

    this.doListScoresUpdateClick();
  };

  

  //the goon squad for list INSIDE the component class

  doListUpdateClick = (): void => {
    fetch("/api/list").then(this.doListResp)
        .catch(() => this.doListError("failed to connect to server"));
  };


  doListResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then((data) => this.doListJson(data))
         .catch(() => this.doListError("200 response is not valid JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doListError)
         .catch(() => this.doListError("400 response is not text"));
    } else {
      this.doListError(`bad status code ${res.status}`);
    }
    
  }

  doListJson = (data: unknown): void =>{
    if (!isRecord(data)) {
      console.error("bad data from /list: not a record", data)
      return;
    }

    if(!Array.isArray(data.list)){
      console.error("bad data from /list: data.names is not an array", data);
      return;
    }

    const currentSDecks: string[] = [];
    for (const names of data.list) {
      const saved = names;
      if (saved === undefined){
        return;
      }
      currentSDecks.push(saved);
      //Remember common array methods
    }
    this.setState({listDeck: currentSDecks});
  }

  doListError = (msg: string): void => {
    console.error(`Error fetching /list: ${msg}`);
  };


  //Load methods

  doLoadClick = (s: string): void => {
    const temp: string = "/api/load?name=" + s;

    fetch(temp)
    .then((res) => this.doLoadResp(res))
    .catch(() => this.doLoadError("failed to connect to server"))

    this.setState({linkedDeckName: s});

  }

  doLoadResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then((data) => this.doLoadJson(data))
         .catch(() => this.doLoadError("200 response is not valid JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doLoadError)
         .catch(() => this.doLoadError("400 response is not text"));
    } else {
      this.doLoadError(`bad status code ${res.status}`);
    }

  }

  doLoadJson = (data: unknown): void =>{
    if (!isRecord(data)) {
      console.error("bad data from /list: not a record", data)
      return;
    }

    if(!Array.isArray(data.value)){
      console.error("bad data from /list: data.names is not an array", data);
      return;
    }

    const currentSDecks: flashcard[] = [];
    for (const names of data.value) {
      const saved = names;
      if (typeof saved === "object" && saved.front !== undefined && saved.back !== undefined){
        currentSDecks.push(saved);      
      }
    }

    this.setState({linkedDeck: currentSDecks, page: {kind: "prac"}});
  }


  doLoadError = (msg: string): void => {
    console.error(`Error loading /load: ${msg}`);
  };

  //ListScore methods
  doListScoresUpdateClick = (): void => {
    fetch("/api/listScores").then(this.doListScoresResp)
        .catch(() => this.doListScoresError("failed to connect to server"));
  };

  doListScoresResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doListScoresJson)
         .catch(() => this.doListScoresError("200 response is not valid JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doListScoresError)
         .catch(() => this.doListScoresError("400 response is not text"));
    } else {
      this.doListScoresError(`bad status code ${res.status}`);
    }
  }

  doListScoresJson = (data: unknown): void =>{
    if (!isRecord(data)) {
      console.error("bad data from /listScores: not a record", data)
      return;
    }


    if(!Array.isArray(data.list)){
      console.error("bad data from /listScores: data.names is not an array", data);
      return;
    }

    
    this.setState({listScore: data.list});
  }

  doListScoresError = (msg: string): void => {
    console.error(`Error fetching /listScores: ${msg}`);
  };




}





