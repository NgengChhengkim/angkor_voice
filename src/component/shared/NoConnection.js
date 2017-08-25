import React, {Component} from "react";
import { View, Text } from "react-native";

export default class NoConnection extends Component {
  render () {
    return (
      <View style={styles.wraper}>
        <Text style={styles.text}>គ្មានអ៊ីនធឺណិត</Text>
      </View>
    )
  }
}

const styles = {
  wraper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 20,
    color: "#7c7c7c"
  }
}
