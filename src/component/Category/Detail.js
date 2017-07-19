import React, { Component } from "react";
import { View, Text, Image, FlatList, TouchableOpacity} from "react-native";
import navigatorStyle from "./../shared/navigatorStyle";
import Loading from "./../shared/loading";
import TopArticle from "./../shared/TopArticle";

export default class Detail extends Component {
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

    this.state = {
      articles: [],
      loading: true
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    fetch(this.props.url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          top_article: responseJson.top_article ,articles: responseJson.articles, loading: false
        });
      })
      .catch((error) => {
        console.log(error);
      })
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
        <FlatList
          style={styles.container}
          data={this.state.articles}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() =>
            <TopArticle article={this.state.top_article}/>
          }
          renderItem={({item}) =>
            <TouchableOpacity style={styles.article} onPress={() =>
              this.props.navigator.push({
                screen: "article.detail",
                title: "ANGKORVOICE",
                passProps:
                  { id: item.id }
              }) }>
              <Image source={{uri: item.image_url}} style={styles.articleImage} />
              <View style={styles.articleTitle}>
                <Text style={styles.title} numberOfLines={4} renderTruncatedFooter={() => <ReadMoreButton />}>{item.title}</Text>
                <Text style={styles.publishDate}>{item.published_at}</Text>
              </View>
            </TouchableOpacity>
          } />
      )
    }
  }
}

const styles= {
  container: {
    backgroundColor: "#f7f7f7"
  },

  article: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    backgroundColor: "white",

    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ececec',
  },

  articleImage: {
    flex: 0.4,
    height: 100
  },

  articleTitle: {
    padding: 8,
    flex: 0.6
  },

  publishDate: {
    color: "#a7a7a7",
    fontSize: 11,
    fontStyle: "italic",
    marginTop: 5
  }
}
