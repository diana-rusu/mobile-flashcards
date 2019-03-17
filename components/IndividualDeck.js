import React, { Component } from "react";
import { connect } from "react-redux";
import AddCard from "./AddCard";
import Quiz from "./Quiz";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { white, purple, black, red } from "../utils/colors";
function AddCardBtn({ props }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios" ? styles.iosAddCardBtn : styles.androidAddCardBtn
      }
      onPress={() =>
        props.navigation.navigate("AddCard", {
          deckTitle: props.navigation.state.params.deckTitle.key
        })
      }
    >
      <Text style={styles.addCardBtnText}>Add Card</Text>
    </TouchableOpacity>
  );
}

function StartQuizBtn({ props, questions, count }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios"
          ? styles.iosStartQuizBtn
          : styles.androidStartQuizBtn
      }
      onPress={() =>
        props.navigation.navigate("Quiz", {
          deckTitle: props.navigation.state.params.deckTitle.key,
          cardsCount: count,
          questions: questions
        })
      }
    >
      <Text style={styles.startQuizBtnText}>Start Quiz</Text>
    </TouchableOpacity>
  );
}

class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Deck"
    };
  };
  render() {
    const deckTitle =
      this.props.navigation.state.params.deckTitle &&
      this.props.navigation.state.params.deckTitle.key;
    const questions =
      this.props.entries.entries[deckTitle] &&
      this.props.entries.entries[deckTitle].questions;
    return (
      <View style={styles.container}>
        <View style={{ height: 100 }}>
          <Text style={styles.text}>{deckTitle}</Text>
          <Text style={{ textAlign: "center", fontSize: 18, color: "#CED0CE" }}>
            cards {this.props.entries.entries[deckTitle].questions.length}
          </Text>
        </View>
        <AddCardBtn props={this.props} />
        <StartQuizBtn
          props={this.props}
          questions={questions}
          count={this.props.entries.entries[deckTitle].questions.length}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: "space-around",
    alignItems: "center"
  },
  iosAddCardBtn: {
    backgroundColor: white,
    borderColor: black,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidAddCardBtn: {
    backgroundColor: white,
    padding: 10,
    paddingLeft: 30,
    borderColor: black,
    borderWidth: 1,
    borderRadius: 2,
    paddingRight: 30,
    height: 45,
    textAlign: "center",
    justifyContent: "center"
  },
  iosStartQuizBtn: {
    backgroundColor: black,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidStartQuizBtn: {
    backgroundColor: black,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    textAlign: "center",
    justifyContent: "center"
  },
  addCardBtnText: {
    color: black,
    fontSize: 22,
    textAlign: "center",
    alignItems: "center"
  },
  startQuizBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
    alignItems: "center"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  },
  text: {
    fontSize: 30,
    textAlign: "center"
  }
});
function mapStateToProps(entries) {
  return {
    entries
  };
}
export default connect(mapStateToProps)(IndividualDeck);
