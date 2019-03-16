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

class AddDeck extends Component {
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
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> What is the title of your new deck</Text>

        <TextInput
          style={styles.input}
          placeholder="Deck name"
          value={this.state.deck_name}
          // type="text"
          style={{
            height: 40,
            paddingLeft: 6,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={text => this.setState({ deck_name: text })}
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
    backgroundColor: white,
    justifyContent: "space-around"
    // alignItems: "center"
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
    alignSelf: "flex-start",
    justifyContent: "center"
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
export default connect()(AddDeck);
