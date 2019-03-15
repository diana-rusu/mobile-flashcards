import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { white, purple } from "../utils/colors";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

class AddCard extends Component {
  state = {
    question: "diana?",
    answer: "yes"
  };

  handleTextChange = question => {
    this.setState(() => ({
      question: question,
      answer: answer
    }));
  };
  submit = () => {
    const deck = this.state;
    console.log("DECK", key, this.state);

    this.props.dispatch(
      AddCard({
        [key]: deck
      })
    );

    this.setState(() => ({
      question: "a"
    }));
  };

  // Navigate to home

  //Submit

  //Clear local notifications
  render() {
    const { question, answer } = this.state;
    return (
      <View>
        <Text> Add Deck</Text>
        {/* <TextInput value={question} onChange={this.setState.handleTextChange} /> */}
        <TextInput
          value={question}
          type="text"
          style={{
            height: 40,
            paddingLeft: 6,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChange={this.setState.handleTextChange}
        />
        <TextInput
          value={answer}
          type="text"
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChange={this.setState.handleTextChange}
        />
        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  }
});

export default AddCard;
