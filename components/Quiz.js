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
import { white, purple } from "../utils/colors";
function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>Add Card</Text>
    </TouchableOpacity>
  );
}

class Quiz extends Component {
  submit = () => {
    console.log(sumbitting);
  };

  render() {
    return (
      <View>
        <Text>Question test</Text>
        <Text>Answer</Text>
        <SubmitBtn onPress={this.submit} />
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
    justifyContent: "space-around",
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  }
});
function mapStateToProps(entries) {
  return {
    entries
  };
}
export default connect(mapStateToProps)(Quiz);
