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
  ListView,
  Modal,
  Dimensions
} from 'react-native';
import FriendCard from '../Components/friendCard';
import UpdateModal from '../Components/updateModal';
var {height, width} = Dimensions.get('window');

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    getFriends().then(value => {
      this.setState({
        data: this.ds.cloneWithRows(value.friends)
      })
    });

    setInterval(()=>{
      getFriends().then(value => {
        this.setState({
          data: this.ds.cloneWithRows(value.friends)
        })
      });
    },800);

    this.state = {
      deleteMode: false,
      updateModal: false,
      data: this.ds.cloneWithRows([
        // {
        //   name: '陳湧淵',
        //   email: 'yui132654@gmail.com',
        //   facebookId:'2213132121'
        // },
        // {
        //   name: '哇哈哈',
        //   email: 'yui132654@yahoo.com.tw',
        //   facebookId:'2213132121'
        // }
      ])
    };

    global.updateData = this.updateData.bind(this);
  }

  render() {
    return (
      <Container>
        <Header >
          <Button transparent onPress={()=>this.toggleDeleteMode()} >
            <Icon name="ios-close-circle-outline" />
          </Button>
          <Title>Friends</Title>
          <Button transparent onPress={()=>this.props.push(this.props.route[1])} >
            <Icon name="ios-add-circle-outline" />
          </Button>
        </Header>


        <Content style={styles.container}>

          <UpdateModal tempData={this.state.tempData} toggleUpdateModal={this.toggleUpdateModal.bind(this)} updateModal={this.state.updateModal} />

          <ListView
            enableEmptySections={true}
            dataSource={this.state.data}
            renderRow={(rowData) => <FriendCard toggleUpdateModal={this.toggleUpdateModal.bind(this)} updateData={this.updateData.bind(this)} deleteMode={this.state.deleteMode} data={rowData} />}
            style={{marginBottom: 15}}
          />

        </Content>
      </Container>
    );
  }

  toggleDeleteMode(){
    this.setState({
      deleteMode: !this.state.deleteMode
    });
  }

  toggleUpdateModal(data){
    this.setState({
      updateModal: !this.state.updateModal,
      tempData: (data)?data:null
    });
  }

  updateData(){
    getFriends().then(value => {
      this.setState({
        data: this.ds.cloneWithRows(value.friends)
      })
    });
  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop:16,
    paddingLeft: 12,
    paddingRight: 12,
  }
});

export default IndexPage;

function getFriends() {
  return new Promise(function(resolve, reject) {
    fetch('https://sails-sample-sakuxz.c9users.io/friend/find').then(res => {
      if (res.ok) {
        res.json().then(function(data) {
          resolve(data)
        });
      } else {
        reject('')
      }
    })
  });
}
