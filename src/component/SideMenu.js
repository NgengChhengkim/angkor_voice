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
          id: "home", name: "អត្ថបទថ្មីៗ",
          action: () => this.sideMenuHandle("https://angkorvoice.com/api/v1/top_page/articles", "អត្ថបទថ្មីៗ")
        },
        {
          id: "top", name: "អត្ថបទពេញនិយម",
          action: () => this.sideMenuHandle("https://angkorvoice.com/api/v1/popular/articles", "អត្ថបទពេញនិយម")
        },
        {
          id: 1, name: "សហគ្រិនភាព",
          action: () => this.sideMenuHandle("https://www.angkorvoice.com/api/v1/categories/1/articles", "សហគ្រិនភាព")
        },
        {
          id: 2, name: "ចំណេះដឹងទូទៅ",
          action: () => this.sideMenuHandle("https://www.angkorvoice.com/api/v1/categories/2/articles", "ចំណេះដឹងទូទៅ")
        },
        {
          id: 6, name: "និទានអប់រំ",
          action: () => this.sideMenuHandle("https://www.angkorvoice.com/api/v1/categories/6/articles", "និទានអប់រំ")
        },
        {
          id: 3, name: "សុខភាព",
          action: () => this.sideMenuHandle("https://www.angkorvoice.com/api/v1/categories/3/articles", "សុខភាព")
        },
        {
          id: 4, name: "ជីវិត​ និង ស្នេហា",
          action: () => this.sideMenuHandle("https://www.angkorvoice.com/api/v1/categories/4/articles", "ជីវិត​ និង ស្នេហា")
        },
        {
          id: 5, name: "ប្លែកៗ",
          action: () => this.sideMenuHandle("https://www.angkorvoice.com/api/v1/categories/5/articles", "ប្លែកៗ")
        }
      ]
    }
  }

  sideMenuHandle(url, title) {
    this._toggleDrawer();
    this.props.navigator.resetTo({
      screen: "category.detail",
      title: title,
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

