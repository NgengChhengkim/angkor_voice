import React, { Component } from "react";
import { View, Text, SectionList, Image, ActivityIndicator, TouchableHighlight } from 'react-native';
import Article from "./article";
import FBSDK from 'react-native-fbsdk';

const {
  ShareDialog,
} = FBSDK;

const shareLinkContent = {
  contentType: 'link',
  contentUrl: "http://www.angkorvoice.com/articles/1088",
  contentDescription: 'Wow, check out this great site!',
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {categories: [], loading: true, shareLinkContent: shareLinkContent};
  }

  componentDidMount() {
    fetch("http://www.angkorvoice.com/api/v1/top_page/categories")
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({categories: responseJson.categories, loading: false});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  shareLinkWithShareDialog() {
  var tmp = this;
  ShareDialog.canShow(this.state.shareLinkContent).then(
    function(canShow) {
      if (canShow) {
        return ShareDialog.show(tmp.state.shareLinkContent);
      }
    }
  ).then(
    function(result) {
      if (result.isCancelled) {
        alert('Share cancelled');
      } else {
        alert('Share success with postId: '
          + result.postId);
      }
    },
    function(error) {
      alert('Share fail with error: ' + error);
    }
  );
}

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Twitter and Facebook share
        </Text>

        <Text style={styles.instructions}>
          Try tapping one of the buttons
        </Text>

        <View style={styles.seperator}/>

        <TouchableHighlight onPress={() => this.shareLinkWithShareDialog()}>
          <View style={{alignItems: 'center',justifyContent:'center', width: 150, height: 50,backgroundColor:'#00aced'}}>
           <Text style={{color:'#ffffff',fontWeight:'800',}}>Share on Twitter</Text>
          </View>
        </TouchableHighlight>
      </View>

    )
  }
}

const styles = {
  categoryHeader: {
    flexDirection: "row",
    paddingLeft: 6,
    paddingRight: 6
  },

  categoryName: {
    color: "#025268",
    fontSize: 18,
    flex: 1
  },

  seeMore: {
    color: "#025268",
    fontSize: 18,
    textAlign: "right",
    flex: 1
  },

  activityIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  seperator:{
    marginBottom: 20
  }
};


export default Home;
