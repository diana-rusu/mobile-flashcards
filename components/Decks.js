import React, { Component } from "react";
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

class Decks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks().then(entries => dispatch(receiveDecks(entries)));
  }
  actionOnRow(item) {
    console.log("Selected Item :", item);
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
        <FlatList
          data={keyList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.actionOnRow(item)}>
              <Text style={styles.text}>{item.key}</Text>
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
  view: {
    paddingTop: 30
  },
  text: {
    flex: 1,
    fontSize: 40,
    textAlign: "center"
  }
});
function mapStateToProps(entries) {
  return {
    entries
  };
}
export default connect(mapStateToProps)(Decks);
