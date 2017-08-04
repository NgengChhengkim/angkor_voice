import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import registerScreens from "./component/registerScreens";

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: "category.detail",
    title: "ANGKORVOICE",
  },
  passProps: { url: "https://angkorvoice.com/api/v1/top_page/articles" },

  drawer: {
    left: {
      screen: "side_menu"
    }
  }
});
