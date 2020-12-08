import React, { Component } from "react";
import {Header, Title, Button, Icon, Left, Right, Body } from "native-base";
import { Image, Text, View, TouchableOpacity, Platform } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
const logo = require("../assets/logo_anantara.png");
const drawer_icon = require("../assets/drawer_icon.png");
const user_icon = require("../assets/user_icon.png");
const bookmark_icon = require("../assets/bookmark_icon.png");

function ButtonClose(param) {
  const navigation = useNavigation();

  return (
    <Button
      transparent
      onPress={() => {
        navigation.goBack(null);
      }}
      style={{paddingBottom:Platform.OS === 'ios' ? 20 : 0}}
    >
      {/*<Text>{param.FromIni.props.route.name}</Text>*/}
      <MaterialIcons style={{color:'#707070', fontSize:30, paddingBottom:Platform.OS === 'ios' ? 30 : 0}}  name="close" />
    </Button>
  );
}

class HeaderModule extends Component {
  constructor(props){
    super(props);

  }
  render() {
    var ini = this.props.ini;
    var icon;
    if (this.props.param == 'Bookmarks'){
        icon = <Image style={{width:14, height:17, marginRight:10}} source={bookmark_icon} />
    }else if(this.props.param == 'My Profile'){
        icon = <Image style={{width:14, height:17, marginRight:10}} source={user_icon} />
    }
    return (
      <Header style={{backgroundColor: "#F5F5F5"}}>
        <Left style={{flex:1, width:'100%'}}>
        
        </Left>
        <Body>
          <View style={{flexDirection:'row', alignSelf:'center'}}>
            {icon}
            <Text style={{color:'#5D5D5D', paddingBottom:Platform.OS === 'ios' ? 20 : 0}}>{this.props.param}</Text>
          </View>
        </Body>
        <Right style={{flex:1, width:'100%'}}>
          <ButtonClose FromIni={this.props.ini}/>
        </Right>
      </Header>
    );
  }
}

export default HeaderModule;
