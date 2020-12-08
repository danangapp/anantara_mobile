import React, { Component } from "react";
import {Header, Title, Button, Icon, Left, Right, Body } from "native-base";
import { Image, Text, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import f from './function';
const logo = require("../assets/logo_anantara.png");

function ButtonClose(param) {
  const navigation = useNavigation();

  return (
    <Button
      transparent
      onPress={() => {
        if (param.FromIni.props.route.name){
          if (param.FromIni.props.route.name == "MagazineDet"){
            param.FromIni.toMagazineBr();
            navigation.goBack(null);
          }else if (param.FromIni.props.route.name == "OpenViewDetail"){
            param.FromIni.BackToMagazine();                      
            navigation.goBack(null);
          }else if (param.FromIni.props.route.name == "Search"){
          	f.lockScreen('unlockAllOrientations');
            param.FromIni.clear();          
            navigation.goBack(null);
          }else if (param.FromIni.props.route.name == "Magazine"){
            if (param.FromIni.state.full == 1)
              param.FromIni.closePortraitFull();
            else
              param.FromIni.removeLockScreen();
          }else
              navigation.goBack(null);         
        }
      }}
    >
      {/*<Text>{param.FromIni.props.route.name}</Text>*/}
      <MaterialIcons style={{color:'#707070', fontSize:30}}  name="close" />
    </Button>
  );
}

class HeaderModule extends Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <Header style={{backgroundColor: "#F5F5F5"}}>
        <Left style={{flex:1, flexDirection:'row'}}>
          <Button transparent style={{marginRight:10, marginLeft:10}}>
            <Image source={logo} style={{width:30, height:30}} />            
          </Button>
          <View>
            <Text style={{color:'#707070', marginTop:3}}>Anantara Journeys</Text>
            <Text style={{color:'#AAAAAA'}}>Luxury lifestyle and travel</Text>
          </View>
        </Left>
        <Right>
          <ButtonClose FromIni={this.props.ini}/>
        </Right>
      </Header>
    );
  }
}

export default HeaderModule;
