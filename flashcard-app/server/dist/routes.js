"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetScoresForTesting = exports.resetForTesting = exports.listScores = exports.list = exports.load = exports.saveScore = exports.save = void 0;
const existingDecks = new Map();
let existingScores = [];
/** Handles request for /save by storing the given deck
 *  @param req: the request object
 *  @param res: the response object
 * . */
const save = (req, res) => {
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
    if (existingDecks.get(name) === undefined) {
        existingDecks.set(name, value);
        res.send({ message: "Saved successfully" });
    }
    else {
        res.status(400).send('A deck with the name you just inputted already exists. Please try again with a different name');
    }
};
exports.save = save;
/** Handles request for /saveScore by storing the given score
 *  Takes name, returns if another deck has been overridden
 *  @param req: the request object
 *  @param res: the response object
 * . */
const saveScore = (req, res) => {
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
    if (score === undefined || typeof score !== "number") {
        res.status(400).send('required argument "score" was missing');
        return;
    }
    //  - store the passed in value in the array under the given name, dont need to send in any thing with response
    existingScores.push({ name, deck, score });
    res.send({ message: "Saved successfully" });
};
exports.saveScore = saveScore;
/** Handles request for /load by returning the deck requested.
 *  Takes name, returns the deck requested by the name
 *  @param req: the request object
 *  @param res: the response object
 *
*/
const load = (req, res) => {
    const name = first(req.query.name);
    if (name === undefined) { //Remember, 400 code is if the input is messed up
        res.status(400).send('required argument "name" was missing');
        return;
    }
    if (existingDecks.get(name) === undefined) { //and 404 is for when the server cannot find something that was requested
        res.status(404).send('No previous deck saved under this name');
        return;
    }
    res.send({ value: existingDecks.get(name) });
};
exports.load = load;
/**Lists all current saved existingDecks by names
 * No parameters, returning values based on what has already been saved from other methods
 * Returns a list, from a keyset in our map, of all of the values currently saved
 * @param req: the request object
 * @param res: the response object
*/
const list = (_req, res) => {
    const list_of_existingDecks = Array.from(existingDecks.keys());
    res.send({ list: list_of_existingDecks });
};
exports.list = list;
/**Lists all current save existingScores by names, since thats what we enter
 * No parameters, returning values based on what has already been saved from other methods
 * Returns a list, from a keyset in our map, of all of the values currently saved
 * @param req: the request object
 * @param res: the response object
*/
const listScores = (_req, res) => {
    res.send({ list: existingScores });
};
exports.listScores = listScores;
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param) => {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === 'string') {
        return param;
    }
    else {
        return undefined;
    }
};
/** Used in tests to set the decks map back to empty. */
const resetForTesting = () => {
    // Do not use this function except in tests!
    existingDecks.clear();
};
exports.resetForTesting = resetForTesting;
/** Used in tests to set the scores map back to empty. */
const resetScoresForTesting = () => {
    // Do not use this function except in tests!
    existingScores = [];
};
exports.resetScoresForTesting = resetScoresForTesting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFTQSxNQUFNLGFBQWEsR0FBeUIsSUFBSSxHQUFHLEVBQW1CLENBQUM7QUFTdkUsSUFBSSxjQUFjLEdBQWtCLEVBQUUsQ0FBQztBQUt2Qzs7O09BR087QUFDQSxNQUFNLElBQUksR0FBRyxDQUFDLEdBQWdCLEVBQUUsR0FBaUIsRUFBUyxFQUFFO0lBQ2pFLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzNCLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUM3RCxPQUFPO0tBQ1I7SUFFRCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM3QixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDdkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUM5RCxPQUFPO0tBQ1I7SUFFRCxrR0FBa0c7SUFFbEcsSUFBRyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBQztRQUN2QyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUM5QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFDLENBQUMsQ0FBQTtLQUMxQztTQUFJO1FBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsK0ZBQStGLENBQUMsQ0FBQTtLQUN0SDtBQUdILENBQUMsQ0FBQTtBQXZCWSxRQUFBLElBQUksUUF1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