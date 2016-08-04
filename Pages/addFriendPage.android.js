/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Icon, Badge, Tabs, Card, CardItem, List, ListItem, InputGroup, Input } from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  Alert
} from 'react-native';


class AddFriendPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true
    };
  }
  render() {
    return (
      <Container>
        <Header >
          <Button transparent onPress={()=>this.props.pop()} >
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>New Friend</Title>
        </Header>


        <Content style={styles.container}>
          <List>
            <ListItem style={{marginTop:12}}>
                <InputGroup>
                    <Icon name="ios-person" />
                    <Input placeholder="Name" onChangeText={(name) => this.setState({name})} />
                </InputGroup>
            </ListItem>

            <ListItem style={{marginTop:12}}>
                <InputGroup>
                    <Icon name="ios-mail" />
                    <Input keyboardType='email-address' placeholder="Email" onChangeText={(email) => this.setState({email})} />
                </InputGroup>
            </ListItem>

            <ListItem style={{marginTop:12}}>
                <InputGroup>
                    <Icon name="ios-apps" />
                    <Input keyboardType='numeric' placeholder="FacebookId" onChangeText={(facebookId) => this.setState({facebookId})} />
                </InputGroup>
            </ListItem>
          </List>
          <Button style={{margin: 15,elevation:0}} block info onPress={this.addFriend.bind(this)} >新增朋友</Button>
        </Content>
      </Container>
    );
  }
  addFriend(){
    if(this.state.name && this.state.email && this.state.facebookId){
      addFriendAjax({
        name: this.state.name,
        email: this.state.email,
        facebookId: this.state.facebookId
      }).then(data => {this.props.pop()})
    }else{
      Alert.alert('Info','尚有欄位未填寫')
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8
  }
});

export default AddFriendPage;

function addFriendAjax(newFriend) {
  return new Promise(function(resolve, reject) {
    var str = Object.keys(newFriend).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(newFriend[key]);
    }).join('&');
    fetch('https://sails-sample-sakuxz.c9users.io/friend/create',{
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: str
    }).then(res => {
      if (res.ok) {
        res.json().then(function(data) {
          resolve(data)
        });
      } else {
        reject('err')
      }
    })
  });
}
