import React, { Component } from "react";
import {Header, Title, Button, Icon, Left, Right, Body } from "native-base";
import { Image, Text, View } from "react-native";
import { DrawerActions, useNavigation } from '@react-navigation/native';
const logo = require("../assets/logo_anantara.png");
const drawer_icon = require("../assets/drawer_icon.png");

function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <Button transparent style={{marginRight:10}}
      onPress={() => navigation.openDrawer()}>
      <Image source={drawer_icon} style={{width:22, height:18}} />            
    </Button>
  );
}

class HeaderModule extends Component {
  constructor(props){
    super(props);
  }

  render() {
    // const navigation = useNavigation();
    return (
      <Header style={{backgroundColor: "#F5F5F5"}}>
        <Left style={{flex:1, flexDirection:'row'}}>
          <Button transparent style={{marginRight:10, marginLeft:10}}>
            <Image source={logo} style={{width:30, height:30}} />            
          </Button>
          <View style={{marginTop:2}}>
            <Text style={{color:'#707070', marginTop:3, fontFamily:'roboto'}}>Anantara Journeys</Text>
            <Text style={{color:'#AAAAAA', fontFamily:'roboto'}}>Luxury lifestyle and travel</Text>
          </View>
        </Left>
        <Right>
          <GoToButton />
        </Right>
      </Header>
    );
  }
}

export default HeaderModule;
