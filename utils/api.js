import { AsyncStorage } from "react-native";
const DECK_STORAGE_KEY = "flashcards:deckss";
const CARD_STORAGE_KEY = "flashcards:cardss";

let data = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
};
// getDecks: return all of the decks along with their titles, questions, and answers.
export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    return results === null
      ? AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
      : JSON.parse(results);
  });
}
// getDeck: take in a single id argument and return the deck associated with that id.
export function fetchDeck(deckTitle) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    return results === null
      ? AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
      : JSON.parse(results);
  });
}
export function submitEntry(deck_name) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck_name));
}
export function addCardToDeck(question, answer, deckTitle) {
  const newCard = {
    question: question,
    answer: answer
  };
  return AsyncStorage.mergeItem(
    CARD_STORAGE_KEY,
    JSON.stringify({ [deckTitle]: newCard })
  );
}

// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
