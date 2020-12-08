import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Button, AsyncStorage, TouchableOpacity, Text, Image, Dimensions, View} from 'react-native';
import {Content } from "native-base";
import Twitter from './TwitterButton';
import Google from './google';
import Facebook from './facebook';
import HeaderModule from './headerClose';
import Fontisto from 'react-native-vector-icons/Fontisto'
// const cardImage = require("../assets/splash_front.jpg");
const cardImage = require("../assets/screens.png");
const anantara = require("../assets/Anantara.png");
const versoview = require("../assets/VersoViewWhite.png");
const poweredby = require("../assets/Poweredby.png");

class LoginActivity extends Component {

  constructor(props){
    super(props);
    this.state={      
      UserPassword:''
    }    
  }

  goBack(){
    this.props.navigation.goBack()
  }

  async getName(){
    var name = await AsyncStorage.getItem('Name')        
    if (name!=null) this.props.navigation.navigate('Profile')
  }

  componentDidMount(){
    this.getName()
  }

  render() {
    return (
        <ImageBackground source={cardImage} style={{width: '100%', height: '100%'}}>  
        <HeaderModule ini={this} />
        <Image style={{
            alignSelf: "center", 
            height: Dimensions.get("window").width / 4, 
            width: Dimensions.get("window").width / 2, 
            top:Dimensions.get("window").height / 7, 
            left:Dimensions.get("window").width / 4, 
            justifyContent: 'flex-end', 
            position: "absolute"
        }} source={anantara} />
        <Image style={{
            alignSelf: "center", 
            height: Dimensions.get("window").width / 10.2, 
            width: Dimensions.get("window").width / 3, 
            top:Dimensions.get("window").height - (Dimensions.get("window").height / 7), 
            left:Dimensions.get("window").width / 3, 
            justifyContent: 'flex-end', position: "absolute", marginBottom: 10
        }} source={versoview} />
        <Image style={{
            alignSelf: "center", 
            height: Dimensions.get("window").width / 6 / 4.72, 
            width: Dimensions.get("window").width / 6, 
            top:(Dimensions.get("window").height - (Dimensions.get("window").height / 7)) - 25, 
            left:Dimensions.get("window").width / 2.4, 
            justifyContent: 'flex-end', position: "absolute", marginBottom: 10
        }} source={poweredby} />
        <Content style={{padding:30, top:'25%'}}>
          <Twitter ini={this}/>
          <Google ini={this}/>
          <Facebook ini={this} />
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('LoginEmail')}} style={{flex:1, marginTop:5, borderRadius: 5, borderWidth:0.7, borderColor:'white'}}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch', alignSelf: 'stretch', padding:10}}>
                <Fontisto  style={{color:'white', marginLeft:30, fontSize:25}} name="email" />
                <Text style={{color:'white', marginLeft: 100, marginTop:5, marginLeft:(Dimensions.get("window").width / 2) - 30 - 70}}>Email</Text>              
              </View>
          </TouchableOpacity>
        </Content>
        </ImageBackground>   
            
    );
  }
}


export default LoginActivity;

const styles = StyleSheet.create({
  button: {
    height: 50,
  },  
});