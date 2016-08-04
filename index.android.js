/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Icon, Badge, Tabs, Card, CardItem, ListView } from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Navigator
} from 'react-native';
import IndexPage from './Pages/indexPage'
import AddFriendPage from './Pages/addFriendPage'


class reactnativepractice extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const routes = [
      {page: IndexPage, index: 0},
      {page: AddFriendPage, index: 1},
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) =>{
            const Page = route.page;
            return <Page route={routes} pop={navigator.pop} push={navigator.push} />
          }
        }
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.HorizontalSwipeJump}
        style={{padding: 0}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:16,
    paddingLeft: 18,
    paddingRight: 18
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'rgba(54, 196, 221, 0.5)'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('reactnativepractice', () => reactnativepractice);
