import React, { Component } from "react";
import { View, Text, SectionList, Image, ActivityIndicator } from 'react-native';
import Article from "./article";
import navigatorStyle from "./../shared/navigatorStyle";
import Loading from "./../shared/loading";
import Admob from "../shared/admob";

class Home extends Component {
  static navigatorStyle = navigatorStyle;

  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('./../../images/navicon_menu.png'),
        id: "toogleDrawer"
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {categories: [], loading: true};
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    fetch("https://www.angkorvoice.com/api/v1/top_page/categories")
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({categories: responseJson.categories, loading: false});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  onNavigatorEvent(event) {
    if (event.id === "toogleDrawer") {
      this.props.navigator.toggleDrawer({
        side: "left",
        animated: true
      });
    }
  }

  render () {
    if (this.state.loading) {
      return (
        <Loading />
      )
    } else {
      return (
        <View>
          <SectionList
            sections={this.state.categories}
            renderSectionHeader={({section}) =>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryName}>{section.data[0].name}</Text>
                <Text style={styles.seeMore}>ជាច្រើនទៀត</Text>
              </View>
            }
            renderItem={
              ({item}) => <Article navigator={this.props.navigator} articles={item.articles} />
            }
          />
          <Admob />
        </View>
      )
    }
  }
}

const styles = {
  categoryHeader: {
    flexDirection: "row",
    paddingLeft: 6,
    paddingRight: 6
  },

  categoryName: {
    fontSize: 18,
    color: "#000",
    flex: 1
  },

  seeMore: {
    color: "#365899",
    fontSize: 18,
    textAlign: "right",
    flex: 1
  }
};

export default Home;
