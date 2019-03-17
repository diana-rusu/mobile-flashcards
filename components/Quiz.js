import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { white, red, green, black } from "../utils/colors";

class Quiz extends Component {
  state = {
    showHideAnswerState: false,
    showScore: 0,
    countCardsRemaining: this.props.navigation.state.params.cardsCount - 1,
    correct: 0,
    incorrect: 0
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz"
    };
  };
  showHideAnswer = () => {
    this.setState({
      showHideAnswerState: !this.state.showHideAnswerState
    });
  };
  handleCorrect = () => {
    if (this.state.countCardsRemaining >= 0) {
      this.setState({
        correct: (this.state.correct += 1),
        countCardsRemaining: (this.state.countCardsRemaining -= 1)
      });
      if (this.state.countCardsRemaining < 0) {
        this.setState({
          showScore: true
        });
      }
    }
  };
  handleIncorrect = () => {
    if (this.state.countCardsRemaining >= 0) {
      this.setState({
        incorrect: (this.state.incorrect += 1),
        countCardsRemaining: (this.state.countCardsRemaining -= 1)
      });
      if (this.state.countCardsRemaining < 0) {
        this.setState({
          showScore: true
        });
      }
    }
  };
  render() {
    const { deckTitle, questions } = this.props.navigation.state.params;
    const { showHideAnswerState, showScore, countCardsRemaining } = this.state;
    const cardIndex =
      this.props.navigation.state.params.cardsCount - countCardsRemaining - 1;
    return (
      <View style={styles.container}>
        {this.props.navigation.state.params.cardsCount > 0 ? (
          <View>
            {showScore ? (
              <View>
                <View style={{ height: 200 }}>
                  <Text style={styles.text}>
                    Correct questions: {this.state.correct}
                  </Text>
                  <Text style={styles.text}>
                    Incorrect questions: {this.state.incorrect}
                  </Text>
                </View>
                <View style={{ height: 80 }}>
                  <TouchableOpacity
                    style={
                      Platform.OS === "ios"
                        ? styles.iosCorrectBtn
                        : styles.androidCorrectBtn
                    }
                    onPress={() =>
                      this.props.navigation.navigate("IndividualDeck")
                    }
                  >
                    <Text style={styles.correctBtnText}>Restart Quiz</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ height: 80 }}>
                  <TouchableOpacity
                    style={
                      Platform.OS === "ios"
                        ? styles.iosIncorrectBtn
                        : styles.androidIncorrectBtn
                    }
                    onPress={() => this.props.navigation.navigate("Home")}
                  >
                    <Text style={styles.incorrectBtnText}>Back to Deck</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <Text>
                  Questions remaining: {countCardsRemaining} /
                  {this.props.navigation.state.params.cardsCount}
                </Text>
                {showHideAnswerState ? (
                  <View>
                    <View style={{ height: 200, alignItems: "center" }}>
                      <Text style={styles.text}>
                        {questions[cardIndex].answer}
                      </Text>
                      <TouchableOpacity onPress={this.showHideAnswer}>
                        <Text style={{ color: red }}>Question</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={{ height: 200, alignItems: "center" }}>
                      <Text style={styles.text}>
                        {questions[cardIndex].question}
                      </Text>
                      <TouchableOpacity onPress={this.showHideAnswer}>
                        <Text style={{ color: red }}>Answer</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <View style={{ height: 80 }}>
                  <TouchableOpacity
                    style={
                      Platform.OS === "ios"
                        ? styles.iosCorrectBtn
                        : styles.androidCorrectBtn
                    }
                    onPress={this.handleCorrect}
                  >
                    <Text style={styles.correctBtnText}>Correct</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ height: 80 }}>
                  <TouchableOpacity
                    style={
                      Platform.OS === "ios"
                        ? styles.iosIncorrectBtn
                        : styles.androidIncorrectBtn
                    }
                    onPress={this.handleIncorrect}
                  >
                    <Text style={styles.incorrectBtnText}>Incorrect</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
