import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from "../actions/index";
import { combineReducers } from "redux";

const entriesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case ADD_CARD:
      const newCard = {
        question: action.question,
        answer: action.answer
      };
      return {
        ...state,
        [action.deckTitle]: {
          ...state[action.deckTitle],
          questions: state[action.deckTitle].questions.concat(newCard)
        }
      };
    default:
      return state;
  }
  a;
};
export default combineReducers({
  entries: entriesReducer
});
