import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { white, purple, red, green, black } from "../utils/colors";
function CorrectBtn({ props }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios" ? styles.iosCorrectBtn : styles.androidCorrectBtn
      }
      onPress={() =>
        props.navigation.navigate("AddCard", {
          deckTitle: props.navigation.state.params.deckTitle.key
        })
      }
    >
      <Text style={styles.correctBtnText}>Correct</Text>
    </TouchableOpacity>
  );
}

function IncorrectBtn({ props }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios"
          ? styles.iosIncorrectBtn
          : styles.androidIncorrectBtn
      }
      onPress={() =>
        props.navigation.navigate("Quiz", {
          deckTitle: props.navigation.state.params.deckTitle.key
        })
      }
    >
      <Text style={styles.incorrectBtnText}>Incorrect</Text>
    </TouchableOpacity>
  );
}

class Quiz extends Component {
  submit = () => {
    console.log(sumbitting);
  };
  get_random = list => {
    return list[Math.floor(Math.random() * list.length)];
  };
  getQuestionList = deckTitle => {
    let questionList = [];
    Object.values(this.props.entries).map(entry => {
      Object.values(entry).map(item => {
        if (item.title === deckTitle) {
          item.questions.map(q => {
            questionList.push(q.question);
          });
        }
      });
    });
    if (questionList.length > 0) {
      return this.get_random(questionList);
    }
    return null;
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz"
    };
  };
  render() {
    const { deckTitle } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        {this.getQuestionList(deckTitle) !== null ? (
          <View>
            <View style={{ height: 200, alignItems: "center" }}>
              <Text style={styles.text}>{this.getQuestionList(deckTitle)}</Text>
              <Text style={{ color: red }}>Answer</Text>
            </View>
            <View style={{ height: 80 }}>
              <CorrectBtn props={this.props} />
            </View>
            <View style={{ height: 80 }}>
              <IncorrectBtn props={this.props} />
            </View>
          </View>
        ) : (
          <Text style={styles.text}>
            Sorry you cannot take a quiz because there are no cards in the deck.
          </Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center"
  },
  iosCorrectBtn: {
    backgroundColor: green,
    borderColor: black,
    padding: 10,
    borderRadius: 10,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },

  iosIncorrectBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 10,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidIncorrectBtn: {
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 4,
    height: 45,
    textAlign: "center",
    justifyContent: "center"
  },
  androidCorrectBtn: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    borderColor: black,
    borderWidth: 1,
    borderRadius: 4,
    paddingRight: 30,
    height: 45,
    textAlign: "center",
    justifyContent: "center"
  },
  correctBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
    alignItems: "center"
  },
  incorrectBtnText: {
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
    textAlign: "center",
    alignItems: "center"
  }
});
function mapStateToProps(entries) {
  return {
    entries
  };
}
export default connect(mapStateToProps)(Quiz);
