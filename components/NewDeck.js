import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { white, purple } from "../utils/colors";
import { addDeck } from "../actions";
import { submitEntry } from "../utils/api";
import { connect } from "react-redux";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  );
}

class NewDeck extends Component {
  state = {
    deck_name: ""
  };

  handleTextChange = deck_name => {
    this.setState(() => ({
      deck_name
    }));
  };
  submit = () => {
    const deck_name = this.state;
    const newDeck = {
      [deck_name.deck_name]: { title: deck_name.deck_name, questions: [] }
    };
    this.props.dispatch(addDeck(newDeck));
    submitEntry(newDeck);
    this.setState(() => ({
      deck_name: ""
    }));
    const key = { key: deck_name.deck_name };
    const count = 0;
    this.props.navigation.navigate("IndividualDeck", {
      deckTitle: key,
      cardsCount: count
    });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={([styles.box], { flex: 2 })}>
          <Text style={{ fontSize: 36, textAlign: "center" }}>
            What is the title of your new deck
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Deck name"
            value={this.state.deck_name}
            style={{
              height: 40,
              margin: 10,
              paddingLeft: 6,
              borderColor: "gray",
              borderWidth: 1
            }}
            onChangeText={text => this.setState({ deck_name: text })}
          />
        </View>
        <View style={([styles.box], { flex: 2 })}>
          <SubmitBtn onPress={this.submit} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
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
    textAlign: "center",
    justifyContent: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
    alignItems: "center"
  },
  box: {
    width: "100%",
    height: "40%",
    marginTop: 20,
    backgroundColor: "#e76e63",
    margin: 10
  }
});
export default connect()(NewDeck);
