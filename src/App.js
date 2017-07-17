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
    screen: 'homepage.home',
    title: 'ANGKORVOICE'
  }
});
