import { Navigation } from 'react-native-navigation';

import HomeArticle from './homepage/home';
import ArticleDetail from "./article/Detail";
import SideMenu from "./SideMenu";
import categoryDetail from "./Category/Detail";

export default function registerScreens() {
  Navigation.registerComponent("homepage.home", () => HomeArticle);
  Navigation.registerComponent("article.detail", () => ArticleDetail);
  Navigation.registerComponent("side_menu", () => SideMenu);
  Navigation.registerComponent("category.detail", () => categoryDetail);
}
