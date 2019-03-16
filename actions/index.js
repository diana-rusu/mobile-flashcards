export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_DECK = "ADD_DECK";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAddQuestion(text1, text2) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    let question = {
      optionOneText: text1,
      optionTwoText: text2
    };
    return _saveQuestion(question)
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}
