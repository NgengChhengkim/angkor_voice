import React, { Component } from "react";
import {View} from "react-native";
import {AdMobBanner} from "react-native-admob"

export default class Admob extends Component {

  bannerError() {
    console.log("error Admob");
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID="ca-app-pub-1800326461459225/3054883199"
        testDeviceID=""
        didFailToReceiveAdWithError={this.bannerError} />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  }
}
