import React, { Component } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import navigatorStyle from "./../shared/navigatorStyle";
import Loading from "./../shared/loading";
import TopArticle from "./../shared/TopArticle";
import ListArticle from "./../shared/ListArticle";

let page = 1;

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
      loading: true,
      isFetching: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.fetchData()
  }

  onNavigatorEvent(event) {
    if (event.id === "toogleDrawer") {
      this.props.navigator.toggleDrawer({
        side: "left",
        animated: true
      });
    }
  }

  fetchData () {
    fetch(this.props.url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          top_article: responseJson.top_article,
          articles: responseJson.articles,
          loading: false,
          isFetching: false
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onLoadingMoreData () {
    fetch(this.props.url + "?page=" + page)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          articles: [...this.state.articles, ...responseJson.articles],
          loadingMore: false
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onRefresh() {
    this.setState({ isFetching: true })
    this.fetchData();
  }

  onLoadMoreData() {
    if (this.props.canLoadMore) {
      page = page + 1;
      this.setState({loadingMore: true})
      this.onLoadingMoreData();
    }
  }

  renderFooter() {
    if (!this.state.loadingMore) return null;

    return (
      <ActivityIndicator
        animating = {true}
        size = "large"
      />
    );
  };

  render () {
    if (this.state.loading) {
      return (
        <Loading />
      )
    } else {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.container}
          data={this.state.articles}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() =>
            <TopArticle article={this.state.top_article} navigator={this.props.navigator} />
          }
          renderItem={({item}) =>
            <ListArticle navigator={this.props.navigator} article={item} />
          }
          ListFooterComponent={() => this.renderFooter()}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          onEndReached={() => this.onLoadMoreData()}
        />
      )
    }
  }
}

const styles= {
  container: {
    backgroundColor: "#f7f7f7"
  }
}
