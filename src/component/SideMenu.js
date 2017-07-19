import React, {Component} from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  Image
} from "react-native";

export default class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: "home", name: "ទំព័រដើម",
          action: () => this.sideMenuHandle("https://angkorvoice.com/api/v1/top_page/articles"),
          icon: "favoriteIcon"
        },
        {
          id: "top", name: "Top 30",
          action: () => this.sideMenuHandle("https://angkorvoice.com/api/v1/popular/articles"),
          icon: "favoriteIcon"
        },
        {
          id: 1, name: "សហគ្រិនភាព",
          action: () => this.sideMenuHandle("https://www.angkorvoice.com/api/v1/categories/1/articles"),
          icon: "favoriteIcon"
        },
        {
          id: 2, name: "ចំណេះដឹងទូទៅ",
          action: () => this.sideMenuHandle("https://www.angkorvoice.com/api/v1/categories/2/articles"),
          icon: "favoriteIcon"
        },
        {
          id: 6, name: "និទានអប់រំ",
          action: () => this.sideMenuHandle("https://www.angkorvoice.com/api/v1/categories/6/articles"),
          icon: "favoriteIcon"
        },
        {
          id: 3, name: "សុខភាព",
          action: () => this.sideMenuHandle("https://www.angkorvoice.com/api/v1/categories/3/articles"),
          icon: "favoriteIcon"
        },
        {
          id: 4, name: "ជីវិត​ និង ស្នេហា",
          action: () => this.sideMenuHandle("https://www.angkorvoice.com/api/v1/categories/4/articles"),
          icon: "favoriteIcon"
        },
        {
          id: 5, name: "ប្លែកៗ",
          action: () => this.sideMenuHandle("https://www.angkorvoice.com/api/v1/categories/5/articles"),
          icon: "favoriteIcon",
        }
      ]
    }
  }

  sideMenuHandle(url) {
    this._toggleDrawer();
    this.props.navigator.resetTo({
      screen: "category.detail",
      title: "ANGKORVOICE",
      passProps: { url: url }
    });
  }

  _toggleDrawer() {
    this.props.navigator.toggleDrawer({
      to: "closed",
      side: "left",
      animated: true
    });
  }

  renderRow(item) {
    return(
      <TouchableHighlight
        onPress={item.action}
        underlayColor={"#44a9fc"} >
        <View style={styles.rowContainer}>
          <Image source={icons[item.icon]} />
          <Text style={styles.textStyle}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.sideMenuHeader}>
          <Text style={styles.sideMenuLogo}>A</Text>
          <Text style={styles.sideMenuText}>ANGKORVOICE</Text>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.renderRow(item)}
          ItemSeparatorComponent={() => <View style={styles.separatorStyle} />}
          keyExtractor={item => item.id}
          style={styles.listStyle}
        />
    </View>
    );
  }
}

const icons = {
  homeIcon: require("./../images/home/home.png"),
  favoriteIcon: require("./../images/navicon_menu.png"),
  historyIcon: require("./../images/navicon_menu.png"),
  aboutIcon: require("./../images/navicon_menu.png"),
  rateIcon: require("./../images/navicon_menu.png")
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: "#fff"
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    paddingLeft: 10,
    alignItems: "center"
  },
  textStyle: {
    color: "#3b3b3b",
    paddingTop: 2,
    marginLeft: 10
  },
  separatorStyle: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#dddddd",
  },

  sideMenuHeader: {
    height: 150,
    backgroundColor: "#13548a",
    alignItems: "center",
    justifyContent: "center"
  },

  sideMenuLogo: {
    height: 100,
    width: 100,
    borderWidth: 0.4,
    borderRadius: 10,
    borderColor: "#fff",
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center"
  },

  sideMenuText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  }
}

