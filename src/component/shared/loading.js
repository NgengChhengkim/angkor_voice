import React, {Component} from "react";
import { View, ActivityIndicator } from "react-native";

export default class Loading extends Component {
  render () {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator
           animating = {true}
           size = "large"
        />
      </View>
    )
  }
}

const styles = {
  activityIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
}
