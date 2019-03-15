import {
  RECEIVE_DECKS,
  RECEIVE_QUESTIONS,
  ADD_DECK,
  ADD_QUESTION
} from "../actions/index";
import { combineReducers } from "redux";

const entriesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      {
        console.log("Adding deck", state, action);
      }
      return {
        ...state,
        [action.deck.key]: action.deck
      };
    case ADD_QUESTION:
      return {
        ...state,
        ...action.question
      };
    default:
      return state;
  }
};
export default combineReducers({
  entries: entriesReducer
});
