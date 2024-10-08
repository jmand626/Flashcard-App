

export type flashcard = {
    front: string;
    back: string;
}

export type deck = {//Not really used, due to the fact that it has just one field
    flashcardList: Array<flashcard>;
}


/**
 * 
 * @param flashcards as a string containing all of the input to be converted into a string
 * @returns a deck, an array of flashcard, built up from this function which will be called in MakeDeck after some error checking
 * @returns undefined if the string flashcards is undefined
 */
export const parseStringDeck = (flashcards: string): Array<flashcard> | undefined => {
    const splitByLines: string[] = flashcards.split("\n");
    const toReturn: Array<flashcard> = []


    if(flashcards === ""){//No input text
        return undefined;
    }else{
        for (const s of splitByLines) {
            if(s.split("|").length > 2){//more than one pipe character, invalid input
                return undefined;
            }else{
                const tempSplit = s.split("|");
                //We contiously set up a flashcard temp object to attack front and back strings to, and then push that
                const temp: flashcard = {front: tempSplit[0], back: tempSplit[1]};
                toReturn.push(temp);
            }
        }
        return toReturn;
    }

}