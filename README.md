# UdaciCards project

## Project Overview

UdaciCards is a project proposed by Udacity as part of React Nanodegree. This project allows a user to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

## Supported platform

The app has been tested using Android platform. There is no guarantee that it works on iOS.

## How to run the project

To get started:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## Backend Server

There is a file [`api.js`](src/utils/api.js) which represents a fake database (for initial data) containing the methods that give access to the data

## Data

There is one type of object stored in the "fake" database:

Entries ( which represent a deck plus the cards attached to that deck)

Example:

```
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
  }
```

## Create React Native App

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app). You can find more information on how to perform common tasks [here](https://github.com/react-community/create-react-native-app/blob/master/README.md).

## Contributors

Diana Rusu
