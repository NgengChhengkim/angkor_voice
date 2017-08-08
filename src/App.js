import React, { Component } from 'react';
import {TOKEN} from "react-native-dotenv";
import Settings from "./Settings";
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
    title: "អត្ថបទថ្មីៗ",
  },
  passProps: {url: Settings.topPageUrl + "?" + TOKEN},

  drawer: {
    left: {
      screen: "side_menu"
    }
  }
});
