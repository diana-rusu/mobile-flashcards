import { AsyncStorage } from "react-native";
import { Permissions, Notifications } from "expo";
const DECK_STORAGE_KEY = "flashcards:deckss";
const CARD_STORAGE_KEY = "flashcards:cardss";
const NOTIFICATION_KEY = "flashcards:notifications";

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

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    return results === null
      ? AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
      : JSON.parse(results);
  });
}

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

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  );
}

function createNotification() {
  return {
    title: "Log your stats",
    body: "!!!don't forget to log your stats for today",
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        console.log("DATA NULL");
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
