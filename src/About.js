import React, { Component } from "react";
import { Platform, Switch, Image, View, TouchableOpacity, Dimensions, StyleSheet, AsyncStorage } from "react-native";
import {Container, Content, Button, Icon, ListItem, Text, Badge, Left, Right, Body, Header, Title, H1, List } from "native-base";
import HeaderModule from "./headerCenter";
import GLOBAL from './global.js'

const anantara = require("../assets/anantara1.png");
const poweredby = require("../assets/Poweredby1.png");
const anantara_dark = require("../assets/anantara1-dark.png");
const poweredby_dark = require("../assets/Poweredby1-dark.png");
const logo = require("../assets/versoview.png");
const versoview = require("../assets/VersoViewWhite.png");

class About extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      mainColor:'#FFFFFF',
      mainBgColor:'#1F1B24',
      DarkMode:0
    };
  }

  componentDidMount(){
  }

  async getNightMode() {
    return await AsyncStorage.getItem('NightMode');
  }

  async setNightMode(NightMode){
    AsyncStorage.setItem('NightMode', NightMode); 
  }

  async cekNightMode(){
    var NightMode = await this.getNightMode();
    if (NightMode == 'white')
      this.setState({select1 : false})
    else
      this.setState({select1 : true})
  }
  
  render() {
    return (
      <Container style={{backgroundColor:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainBgColor : '#F5F5F5'}}>

        <HeaderModule param='About' ini={this}/>

        <Content style={s.content}>
          <View style={s.contentView}>
            <View style={s.viewLogo}>
              <Image style={s.imageLogo} source={GLOBAL.screen1.state.DarkMode == 0 ? anantara : anantara_dark} />              
            </View>
            
            <Text style={{margin:40, color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>Welcome to Journeys, where Anantara’s exceptional experiences converge, inspiring you to your next adventure.</Text>            
            <View style={s.viewVersoView}>
              <Image style={s.poweredby} source={GLOBAL.screen1.state.DarkMode == 0 ? poweredby : poweredby_dark} />
              <Image style={s.versoviewLogo} source={versoview} />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default About;

const s = StyleSheet.create({
  content: {
    marginTop:50
  },
  contentView: {
    margin:20
  },
  viewLogo: {
    flex: 1, alignItems: "center", alignSelf:"center"
  },
  imageLogo: {
    alignSelf: "stretch", height: Dimensions.get("window").width / 4, width: Dimensions.get("window").width / 2, position: "relative", marginBottom: 10
  },
  viewVersoView: {
    marginTop:80
  },
  poweredby: {
    alignSelf: "center", height: Dimensions.get("window").width / 6 / 4.72, width: Dimensions.get("window").width / 6, justifyContent: 'flex-end', marginBottom: 10
  },
  versoviewLogo: {
    alignSelf: "center", height: Dimensions.get("window").width / 6.8, width: Dimensions.get("window").width / 2, justifyContent: 'flex-end', marginBottom: 10
  }
});