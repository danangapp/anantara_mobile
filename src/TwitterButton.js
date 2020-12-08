import React, { Component } from "react"
import {AppRegistry, Button, StyleSheet, Text, View, Alert, NativeModules, TouchableOpacity, AsyncStorage, Dimensions, ToastAndroid } from "react-native"
import { Icon } from "native-base";
// import { useNavigation } from '@react-navigation/native';
// var Realm = require('realm');

const { RNTwitterSignIn } = NativeModules

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "YHhremrw3QgPnxHhVy9NfiZSE",
  TWITTER_CONSUMER_SECRET: "3Yk81cLTV13C66nOrgmcadG5mQexqfGDnurbBLayDa2gPfvs7U"
}

class TwitterButton extends Component {
  state = {
    isLoggedIn: false
  }

  constructor(props){
    super(props);
  }  

  _twitterSignIn = () => {
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
    RNTwitterSignIn.logIn()
      .then(result => {
        
        console.log('result', result)
        let formdata = new FormData();
        formdata.append("email", result.email);
        AsyncStorage.setItem('Name', result.userName);  
        AsyncStorage.setItem('Email', result.email);  
        this.props.ini.goBack();

        fetch('https://panel.versoview.com/mobile/login',{
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
        },
          body: formdata
        })
        .then(
          response => response.json()
        )
        .then(data  => {
          ToastAndroid.show('Welcome ' + result.userName, ToastAndroid.SHORT);
          this.props.navigation.navigate('Home');
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(error => {
        console.log(error)
      }
    )
  }

  handleLogout = () => {
    RNTwitterSignIn.logOut()
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    const { isLoggedIn } = this.state
    return (
      <View style={this.props.style}>
        <TouchableOpacity onPress={this._twitterSignIn} style={{flex: 1, flexDirection: 'row', 
        backgroundColor: 'transparent', borderRadius: 5, borderWidth:0.7, 
        borderColor:'white', padding: 12, marginTop: 5, marginBottom: 5}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon  style={{color:'white', marginLeft:30}} type="FontAwesome" name="twitter" />
            <Text style={{color:'white', marginTop: 2, marginLeft:(Dimensions.get("window").width / 2) - 30 - 70}}>Twitter</Text>              
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default TwitterButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1b95e0',
    color: 'white',
    width: 200,
    height: 50
  }
})