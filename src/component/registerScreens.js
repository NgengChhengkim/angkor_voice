import { Navigation } from 'react-native-navigation';

import HomeArticle from './homepage/home';
import ArticleDetail from "./article/Detail";

export default function registerScreens() {
  Navigation.registerComponent("homepage.home", () => HomeArticle);
  Navigation.registerComponent("article.detail", () => ArticleDetail);
}
