/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Icon, Badge, Tabs, Card, CardItem } from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';


class FriendCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.card}>
        {
          this.props.deleteMode?
            <Button rounded danger style={styles.deleteBtn} onPress={()=>{this.removeFriend();}} > <Icon name="ios-close" /> </Button>:
            null
        }
        <View style={styles.row}>
          <Text style={styles.title}>
            {this.props.data.name}
          </Text>
          <Text style={styles.facebookId}>
            {this.props.data.facebookId}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.email}>
            {this.props.data.email}
          </Text>
          <Button transparent onPress={this.openUpdateModal.bind(this)}>
            <Icon name={'md-create'} style={{fontSize: 20, color: '#9e9e9e', marginTop: -15}} />
          </Button>
        </View>
      </View>
    );
  }

  removeFriend(){
    removeFriendAjax(this.props.data.id).then(value => {
      this.props.updateData();
    });
  }

  openUpdateModal(){
    var data = {
      name: this.props.data.name,
      email: this.props.data.email,
      facebookId: this.props.data.facebookId,
      id: this.props.data.id
    };
    this.props.toggleUpdateModal(data);
  }

}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    paddingTop: 11,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 6,
    marginBottom: 10,
    borderRadius: 2,
    elevation: 0.5
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 6,
    height: 25
  },
  title: {
    fontSize: 18
  },
  email: {
    fontSize: 12,
    color: 'rgb(89, 196, 255)'
  },
  facebookId: {
    fontSize: 15,
    color: 'rgb(190, 190, 190)'
  },
  deleteBtn: {
    width: 38,
    paddingLeft:15,
    position: 'absolute',
    top: 8,
    right: 0
  }
});

export default FriendCard;

function removeFriendAjax(fid) {
  return new Promise(function(resolve, reject) {
    fetch('https://sails-sample-sakuxz.c9users.io/friend/destroy/' + fid,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
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
