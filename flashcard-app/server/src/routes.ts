import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check


const existingDecks: Map<string, unknown> = new Map<string, unknown>();

//Record storing a score by its three fields: name, deck, and score
type scoreRecord = {//These come in after you finish a practice run
  name: string;
  deck: string;
  score: number;
}

let existingScores: scoreRecord[] = [];




/** Handles request for /save by storing the given deck 
 *  @param req: the request object
 *  @param res: the response object
 * . */
export const save = (req: SafeRequest, res: SafeResponse): void  => {
  const name = req.body.name;
  if (name === undefined || typeof name !== 'string') {
    res.status(400).send('required argument "name" was missing');
    return;
  }

  const value = req.body.value;
  if (value === undefined) {
    res.status(400).send('required argument "value" was missing');
    return;
  }

  //  - store the passed in value in the map under the given name IF the deck has not existed before
  
  if(existingDecks.get(name) === undefined){
    existingDecks.set(name, value)
    res.send({message: "Saved successfully"})
  }else{
    res.status(400).send('A deck with the name you just inputted already exists. Please try again with a different name')
  }


}

/** Handles request for /saveScore by storing the given score 
 *  Takes name, returns if another deck has been overridden
 *  @param req: the request object
 *  @param res: the response object
 * . */
export const saveScore = (req: SafeRequest, res: SafeResponse): void  => {
  const name = req.body.name;
  if (name === undefined || typeof name !== 'string') {
    res.status(400).send('required argument "name" was missing');
    return;
  }

  const deck = req.body.deck;
  if (deck === undefined || typeof deck !== "string") {
    res.status(400).send('required argument "deck" was missing');
    return;
  }

  const score = req.body.score;
  if (score === undefined || typeof score !== "number"){
    res.status(400).send ('required argument "score" was missing');
    return;
  }


  //  - store the passed in value in the array under the given name, dont need to send in any thing with response

  existingScores.push({ name, deck, score });
  res.send({message: "Saved successfully"});


}




/** Handles request for /load by returning the deck requested. 
 *  Takes name, returns the deck requested by the name
 *  @param req: the request object
 *  @param res: the response object
 * 
*/
export const load = (req: SafeRequest, res: SafeResponse): void => {
  
  const name = first(req.query.name);
  if (name === undefined) {//Remember, 400 code is if the input is messed up
    res.status(400).send('required argument "name" was missing');
    return;
  }
  
  if(existingDecks.get(name) === undefined){//and 404 is for when the server cannot find something that was requested
    res.status(404).send('No previous deck saved under this name');
    return;
  }

  res.send({value: existingDecks.get(name)});
}

/**Lists all current saved existingDecks by names
 * No parameters, returning values based on what has already been saved from other methods
 * Returns a list, from a keyset in our map, of all of the values currently saved
 * @param req: the request object
 * @param res: the response object
*/
export const list = (_req: SafeRequest, res: SafeResponse): string[] | void =>{

    const list_of_existingDecks : string[] = Array.from(existingDecks.keys());


    res.send({list: list_of_existingDecks});

}

/**Lists all current save existingScores by names, since thats what we enter
 * No parameters, returning values based on what has already been saved from other methods
 * Returns a list, from a keyset in our map, of all of the values currently saved
 * @param req: the request object
 * @param res: the response object
*/
export const listScores = (_req: SafeRequest, res: SafeResponse): string[] | void =>{

  res.send({list: existingScores});

}


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};

/** Used in tests to set the decks map back to empty. */
export const resetForTesting = (): void => {
  // Do not use this function except in tests!
  existingDecks.clear();
};

/** Used in tests to set the scores map back to empty. */
export const resetScoresForTesting = (): void => {
  // Do not use this function except in tests!
  existingScores = [];
};
