import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Button, AsyncStorage, TextInput, Text, TouchableOpacity, ToastAndroid, Platform} from 'react-native';
import {Content } from "native-base";
import Twitter from './TwitterButton';
import Google from './google';
import Facebook from './facebook';
const cardImage = require("../assets/Login.png");

class LoginEmail extends Component {

  constructor(props){
    super(props);
    this.state={      
      textEmail:'',
      textPass:'',
      textPass2:'',
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

  submit(){
    let formdata = new FormData();
    formdata.append("email", this.state.textEmail);
    formdata.append("password", this.state.textPass);
    fetch('https://panel.versoview.com/mobile/signin_email',{
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
      if (data == 0){
        this.setState({textEmail: '', textPass: ''});
        if (Platform.OS == 'android')
        ToastAndroid.show('Login or Password is wrong', ToastAndroid.SHORT);
        else
        alert('Login or Password is wrong')
      }else if(data == 1){
        this.textEmail = '';
        this.textPass = '';
        AsyncStorage.setItem('Name', this.state.textEmail); 
        if (Platform.OS == 'android')
        ToastAndroid.show('Welcome ' + this.state.textEmail, ToastAndroid.SHORT);
        else
        alert('Welcome ' + this.state.textEmail)
        this.props.navigation.navigate('Home');        
      }
    })
    .catch(err => {
      console.log(err);
    })     
  }

  componentDidMount(){
    this.getName()
  }

  render() {
    return (
        <ImageBackground source={cardImage} style={{width: '100%', height: '100%'}}>  
        <Content style={{paddingTop:20, paddingLeft:30, paddingRight:30, top:'40%'}}>
          {/*<Twitter ini={this}/>
          <Google ini={this}/>
          <Facebook ini={this} />*/}
          <TextInput
            style={{borderColor: "#A2A6A7", borderWidth: 1, marginBottom:10, padding:10, color:'white'}}
            placeholder="Email"
            placeholderTextColor='#A2A6A7'
            onChangeText={textEmail => this.setState({textEmail})}
            underlineColorAndroid='transparent'
            value={this.textEmail}
            ref={input => { this.textEmail = input }}
          />

          <TextInput
            style={{borderColor: "#A2A6A7", borderWidth: 1, marginBottom:10, padding:10, color:'white'}}
            placeholder="Password"
            placeholderTextColor='#A2A6A7'
            onChangeText={textPass => this.setState({textPass})}
            underlineColorAndroid='transparent'
            value={this.state.textPass}
            secureTextEntry={true}
            ref={input => { this.textPass = input }}
          />

          <TouchableOpacity onPress={()=>{this.submit()}} style={{flex:1, backgroundColor:'#FF533D', marginTop:8, borderRadius: 5}}>
              <Text style={{color:'white', fontweight:'bold', margin:12, alignSelf:'center'}}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('SignUpEmail')}} style={{flex:1, marginTop:8, borderRadius: 5, borderWidth:0.7, borderColor:'white'}}>
              <Text style={{color:'white', fontweight:'bold', margin:12, alignSelf:'center'}}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={{flex:1, marginTop:8, borderRadius: 5, borderWidth:0.7, borderColor:'white'}}>
              <Text style={{color:'white', fontweight:'bold', margin:12, alignSelf:'center'}}>Cancel</Text>
          </TouchableOpacity>

        </Content>
        </ImageBackground>   
            
    );
  }
}


export default LoginEmail;

const styles = StyleSheet.create({
  button: {
    height: 50,
  },  
});