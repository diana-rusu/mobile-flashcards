import React, { Component } from "react";
import { View, Text } from "react-native";
import { receiveDecks } from "../actions";
import { fetchDecks } from "../utils/api";
import { connect } from "react-redux";

class Decks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks().then(entries => dispatch(receiveDecks(entries)));
  }

  render() {
    return (
      <View>
        <Text>HELLLOOO</Text>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    );
  }
}
function mapStateToProps(entries) {
  return {
    entries
  };
}
export default connect(mapStateToProps)(Decks);
