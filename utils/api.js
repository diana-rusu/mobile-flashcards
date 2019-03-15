import { AsyncStorage } from "react-native";
const DECK_STORAGE_KEY = "flashcards:deckss";

export function fetchDecks() {
  //   AsyncStorage.setItem("CALENDAR_STORAGE_KEY", CALENDAR_STORAGE_KEY);
  return AsyncStorage.getItem(DECK_STORAGE_KEY);
}
export function submitEntry({ key, deck_name }) {
  AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [key]: deck_name
    })
  );
}
// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
