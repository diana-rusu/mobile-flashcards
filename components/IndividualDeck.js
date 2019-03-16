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
import { white, purple, black } from "../utils/colors";
function AddCardBtn({ props }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios" ? styles.iosAddCardBtn : styles.androidAddCardBtn
      }
      onPress={() => props.navigation.navigate("AddCard")}
    >
      <Text style={styles.addCardBtnText}>Add Card</Text>
    </TouchableOpacity>
  );
}

function StartQuizBtn({ props }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios"
          ? styles.iosStartQuizBtn
          : styles.androidStartQuizBtn
      }
      onPress={() => props.navigation.navigate("Quiz")}
    >
      <Text style={styles.startQuizBtnText}>Start Quiz</Text>
    </TouchableOpacity>
  );
}

class IndividualDeck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.navigation.state.params.itemTitle.key}
        </Text>
        <Text>Number of Cards</Text>
        <AddCardBtn props={this.props} />
        <StartQuizBtn props={this.props} />
        <Text>Delete Deck</Text>
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
