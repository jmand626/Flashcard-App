import * as assert from 'assert';
import { parseStringDeck } from './Deck';

describe('Deck', function() {

    it('parseStringDeck', function(){
        /*We will have a test for the first error branch, checking for the simple return undefined. 
        Then, for the else statement, we will have 
        3 tests for the undefined case, and 4 cases for where we have succesfully parsed */

      //1st branch, flashcards error test by undefined
      assert.deepStrictEqual(parseStringDeck(""), undefined);


      //2nd branch, undefined by having one or more line with one or more vertical bar per line, 1st test
      assert.deepStrictEqual(parseStringDeck("string|hello|helloagain\nihate|jared"), undefined);

      //2nd branch, undefined by having one or more line with one or more vertical bar per line, 2nd test
      assert.deepStrictEqual(parseStringDeck("anyone|who\nsaid|what\ni|just\nsaid|shouldbe|executed"), undefined);

      //2nd branch, undefined by having one or more line with one or more vertical bar per line, 3rd test
      assert.deepStrictEqual(parseStringDeck("oh|no|ohnonono|whyisntthisworking|imgonnajustgiveup"), undefined);


      //3rd branch, correct parse into an array of flashcards, 1st test
      assert.deepStrictEqual(parseStringDeck("ineed|mentalhelpbecause\nihate|jared"), [{front: "ineed", back: "mentalhelpbecause"}, 
      {front: "ihate", back: "jared"}]);

      //3rd branch, correct parse into an array of flashcards, 2nd test
      assert.deepStrictEqual(parseStringDeck("vanilla|clears\neverything|but\nchocolate|whichissimilar"), 
      [{front: "vanilla", back: "clears"}, 
      {front: "everything", back: "but"}, {front: "chocolate", back: "whichissimilar"}]);

      //3rd branch, correct parse into an array of flashcards, 3rd test
      assert.deepStrictEqual(parseStringDeck("anyonewhoeats|pineapple\non|pizza\nshould|be\nthrown|from\na|building"), 
      [{front: "anyonewhoeats", back: "pineapple"}, 
      {front: "on", back: "pizza"},
      {front: "should", back: "be"},
      {front: "thrown", back: "from"},
      {front: "a", back: "building"}]);

      //3rd branch, correct parse into an array of flashcards, 4st test
      assert.deepStrictEqual(parseStringDeck("itwouldbeverynicebeingacat|heademptynothoughts"), 
      [{front: "itwouldbeverynicebeingacat", back: "heademptynothoughts"}]);

    });
  
  
    
  });
  