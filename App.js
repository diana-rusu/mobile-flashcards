import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import DeckList from "./components/DeckList";
import AddDeck from "./components/NewDeck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { white, purple } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Constants } from "expo";
import { createStore } from "redux";
import { Provider } from "react-redux";
import entriesReducer from "./reducers/index";
import IndividualDeck from "./components/IndividualDeck";
import { setLocalNotification } from "./utils/api";

function DecksStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const RouteConfigs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "AddDeck",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-speedometer" size={30} color={tintColor} />
      )
    }
  }
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 60,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
    : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const Stack = createStackNavigator({
  Home: {
    screen: Tabs
  },
  IndividualDeck: {
    screen: IndividualDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
});

const TabsContainer = createAppContainer(Stack);

const store = createStore(entriesReducer);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <DecksStatusBar backgroundColor={purple} barStyle="light-content" />
          <TabsContainer />
        </View>
      </Provider>
    );
  }
}
