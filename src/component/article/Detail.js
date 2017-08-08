import React, { Component } from "react";
import { View, Text, Image, ScrollView, Dimensions, PixelRatio, TouchableOpacity, FlatList } from "react-native";
import HTML from "react-native-fence-html";
import navigatorStyle from "./../shared/navigatorStyle";
import Loading from "./../shared/loading";
import ListArticle from "./../shared/ListArticle";
import {TOKEN} from "react-native-dotenv";
import Settings from "./../../Settings";

import FBSDK from 'react-native-fbsdk';

const {
  ShareDialog,
} = FBSDK;

export default class Detail extends Component {
  static navigatorStyle = navigatorStyle;
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require("./../../images/share/share.png"),
        id: "share_facebook"
      }
    ]
  };

  constructor(props) {
    super(props);

    this.state = {
      article: {content: ""},
      loading: true
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    fetch(Settings.articleUrl + this.props.id + "?" + TOKEN)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({article: responseJson.data, articles: responseJson.related_articles,loading: false});
      })
      .catch((error) => {
        console.log(error);
      }
    );
  }

  onNavigatorEvent(event) {
    if (event.id === "share_facebook") {
      this.shareLinkWithShareDialog();
    }
  }

  shareLinkWithShareDialog() {
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: "https://www.angkorvoice.com/articles/" + this.props.id
    }

    var tmp = this;
    ShareDialog.canShow(shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
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
    const renderers = {
      img: (htmlAttribs, children, passProps) => {
        return (
          <View style={styles.imageContainer}>
            <Image style={styles.image}
              source={{uri: "https://www.angkorvoice.com" + htmlAttribs.src}} />
          </View>
        )
      }
    }

    if (this.state.loading) {
      return (
        <Loading />
      )
    } else {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.articleDetail}
          data={this.state.articles}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() =>
            <View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: this.state.article.image_url}} />
              </View>

              <View style={styles.bodyContainer}>
                <Text style={styles.title}>{this.state.article.title}</Text>
                <Text style={styles.publishedAt}>{this.state.article.published_at}</Text>
                <HTML html={this.state.article.content.replace(/<p>/g, "  ").replace(/<\/p>/g, "<br>")}
                  htmlStyles={styles} renderers={renderers} />
              </View>

              <View style={styles.relatedArticle}>
                <Text style={styles.relatedText}>អត្ថបទផ្សេងទៀត</Text>
              </View>
            </View>
          }
          renderItem={({item}) =>
            <ListArticle navigator={this.props.navigator} article={item} />
          }
        />
      )
    }
  }
}

const windowWidth = Dimensions.get('window').width * PixelRatio.get()

const styles = {
  bodyContainer: {
    padding: 5,
    backgroundColor: "white"
  },

  title: {
    fontWeight: "bold",
    fontSize: 17
  },

  publishedAt: {
    fontSize: 11,
    fontStyle: "italic",
    color: "#7E7E7E"
  },

  image: {
    flex: 1,
    resizeMode: "cover"
  },

  imageContainer: {
    flex: 1,
    height: 200,
    flexDirection: "row"
  },

  relatedArticle: {
    backgroundColor: "white",
    borderBottomWidth: 3,
    borderBottomColor: "#13548a"
  },

  relatedText: {
    fontWeight: "bold",
    backgroundColor: "#13548a",
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 2,
    paddingBottom: 2,
    alignSelf: "flex-start",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginLeft: 5
  }
}
