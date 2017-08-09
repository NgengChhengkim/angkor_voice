import React, {Component} from "react";
import {TOKEN} from "react-native-dotenv";
import Settings from "./../Settings";
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
          action: () => this.sideMenuHandle(Settings.topPageUrl + "?" + TOKEN, "អត្ថបទថ្មីៗ"),

        },
        {
          id: "top", name: "អត្ថបទពេញនិយម",
          action: () => this.sideMenuHandle(Settings.popularCategoryUrl + "?" + TOKEN, "អត្ថបទពេញនិយម"),
        },
        {
          id: 1, name: "សហគ្រិនភាព",
          action: () => this.sideMenuHandle(Settings.entrepreneurCategoryUrl + "?" + TOKEN, "សហគ្រិនភាព", true)
        },
        {
          id: 2, name: "ចំណេះដឹងទូទៅ",
          action: () => this.sideMenuHandle(Settings.knowledgeCategoryUrl + "?" + TOKEN, "ចំណេះដឹងទូទៅ", true)
        },
        {
          id: 6, name: "និទានអប់រំ",
          action: () => this.sideMenuHandle(Settings.legenCategoryUrl + "?" + TOKEN, "និទានអប់រំ", true)
        },
        {
          id: 3, name: "សុខភាព",
          action: () => this.sideMenuHandle(Settings.healthCategoryUrl + "?" + TOKEN, "សុខភាព", true)
        },
        {
          id: 4, name: "ជីវិត​ និង ស្នេហា",
          action: () => this.sideMenuHandle(Settings.lifeAndLoveCategoryUrl + "?" + TOKEN, "ជីវិត​ និង ស្នេហា")
        },
        {
          id: 5, name: "ប្លែកៗ",
          action: () => this.sideMenuHandle(Settings.otherCategoryUrl + "?" + TOKEN, "ប្លែកៗ")
        }
      ]
    }
  }

  sideMenuHandle(url, title, canLoadMore) {
    this._toggleDrawer();
    this.props.navigator.handleDeepLink({
      link: "category",
      payload: {
        url: url,
        title: title,
        canLoadMore: canLoadMore
      }
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
          <View style={styles.imageBorder}>

          <Image source={require("./../images/logo.png")} style={styles.sideMenuLogo} />
          </View>
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

  imageBorder: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#fff",
    padding: 10
  },

  sideMenuLogo: {
    height: 70,
    width: 70,
  },

  sideMenuText: {
    color: "#fff",
    fontSize: 25,
    marginTop: 5
  }
}

