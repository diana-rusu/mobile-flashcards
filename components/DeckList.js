import React, { Component } from "react";
import { StackNavigator, createStackNavigator } from "react-navigation";
import IndividualDeck from "./IndividualDeck";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { receiveDecks } from "../actions";
import { fetchDecks } from "../utils/api";
import { connect } from "react-redux";

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks().then(entries => dispatch(receiveDecks(entries)));
  }
  actionOnRow(key) {
    console.log("Selected Item :", key);
    this.props.navigation.navigate("IndividualDeck", { deckTitle: key });
  }

  renderDecks() {
    let deckList = [];
    let keyList = [];
    Object.values(this.props.entries).map(entry => {
      deckList.push(Object.keys(entry));
    });
    deckList.forEach(element => {
      element.forEach(el => {
        keyList.push({ key: el });
      });
    });

    return (
      <View>
        {console.log(this.props.entries)}
        <FlatList
          data={keyList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.actionOnRow(item)}>
              <View
                style={{
                  flex: 1,
                  margin: 10,
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: "#CED0CE"
                }}
              >
                <Text style={styles.text}>{item.key}</Text>
                <Text style={{ textAlign: "center", color: "#CED0CE" }}>
                  cards
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        {this.renderDecks()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
export default connect(mapStateToProps)(DeckList);
