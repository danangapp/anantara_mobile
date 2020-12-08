import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Text, ImageBackground, Image, Dimensions, Platform, AsyncStorage} from 'react-native';
import {Header, Left, Icon, Button, Content } from "native-base";
const cardImage = require("../../../assets/drawer-cover.png");
const LogoImage = require("../../../assets/versoview.png");

class LoginActivity extends Component {

  constructor(){
    super();
    this.state={
      imageWidth: Dimensions.get('window').width - 140
    }    
  }

  componentDidMount(){
    Dimensions.addEventListener('change' ,({window: {width, height}}) => {
      this.setState({imageWidth: Dimensions.get('window').width - 140});      
    });
  }

  UserLoginFunction = () =>{ 
    const { UserEmail }  = this.state ;
    fetch('https://panel.versoview.com/loginMobile/getEmail', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        email: UserEmail
    })
    }).then((response) => response.json())
    .then((responseJson) => {
       Alert.alert(responseJson);
    }).catch((error) => {
      console.error(error);
    });       
  }

  
  render() {
    // var obj = this.realm.objects('users');
    // let user_name = obj[0].user_name;
    return (
        <ImageBackground source={cardImage} style={{width: '100%', height: '100%'}}>  
        { Platform.OS === 'ios' 
          ?  
            <Header>
              <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
            </Header>
          : 
          <View />
        } 
        <Content>
        <View style={{margin:20}}>            
            <Image resizeMode="contain" source={LogoImage} style={{width:this.state.imageWidth, margin:10, alignSelf:'center'}}></Image>
            <TextInput
              style={{borderColor: "#A2A6A7", borderWidth: 1, marginBottom:20, padding:12, color:'white'}}
              placeholder="Email or Phone Number"
              placeholderTextColor='#A2A6A7'
              onChangeText={UserEmail => this.setState({UserEmail})}
              underlineColorAndroid='transparent'
              ref={input => { this.textUser = input }}
            />

            <Button title="Sign In" block onPress={this.UserLoginFunction} style={{backgroundColor: "#FF533D"}}>
                <Text style={{color:'white', fontweight:'bold'}}>Submit</Text>
            </Button>
            
            <View
              style={{
                marginTop:20,
                marginBottom:20,
                borderBottomColor: 'white',
                borderBottomWidth: 1,
              }}
            />
        </View>
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