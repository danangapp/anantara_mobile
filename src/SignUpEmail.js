import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Button, AsyncStorage, TextInput, Text, TouchableOpacity, ToastAndroid, Platform} from 'react-native';
import {Content } from "native-base";
import Twitter from './TwitterButton';
import Google from './google';
import Facebook from './facebook';
const cardImage = require("../assets/Login.png");

class SignUpEmail extends Component {

  constructor(props){
    super(props);
    this.state={      
      textName:'',
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

  validate = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === true) {      
      return true;
    }else{
      return false
    }  
  }

  submit(){
    let formdata = new FormData();
    formdata.append("name", this.state.textName);
    formdata.append("email", this.state.textEmail);
    formdata.append("password", this.state.textPass);
    fetch('https://panel.versoview.com/mobile/login_email',{
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
      if (data == this.state.textName){
        if (Platform.OS == 'android')
          ToastAndroid.show('You have successfully registered', ToastAndroid.SHORT);
        else
          alert('You have successfully registered')
        this.props.navigation.navigate('LoginEmail');
      }else if(data == 1){
        if (Platform.OS == 'android')
          ToastAndroid.show('Email already registered', ToastAndroid.SHORT);
        else
          alert('Email already registered')
        this.props.navigation.navigate('LoginEmail')
      }
      this.setState({textName: '', textEmail: '', textPass: '', textPass2: ''})
    })
    .catch(err => {
      console.log(err);
    })     
  }

  signup(){
    if (this.state.textPass != this.state.textPass2){
      alert('Passwords are not the same')
    } else if (this.state.textName == '') {
      alert('Your Name cannot empty')
    } else{
      if (this.validate(this.state.textEmail)){
        this.submit();
      }else{
        ToastAndroid.show('Email format is incorrect', ToastAndroid.SHORT);
      }
    }
    // alert(this.state.textEmail)
  }

  componentDidMount(){
    this.getName()
  }

  render() {
    return (
        <ImageBackground source={cardImage} style={{width: '100%', height: '100%'}}>  
        <Content style={{paddingTop:20, paddingLeft:30, paddingRight:30, top:'30%'}}>
          {/*<Twitter ini={this}/>
          <Google ini={this}/>
          <Facebook ini={this} />*/}
          <TextInput
            style={{borderColor: "#A2A6A7", borderWidth: 1, marginBottom:10, padding:10, color:'white'}}
            placeholder="Full Name"
            placeholderTextColor='#A2A6A7'
            onChangeText={textName => this.setState({textName})}
            underlineColorAndroid='transparent'
            value={this.state.textName}
            ref={input => { this.textName = input }}
          />

          <TextInput
            style={{borderColor: "#A2A6A7", borderWidth: 1, marginBottom:10, padding:10, color:'white'}}
            placeholder="Email"
            placeholderTextColor='#A2A6A7'
            onChangeText={textEmail => this.setState({textEmail})}
            underlineColorAndroid='transparent'
            value={this.state.textEmail}
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
   
          <TextInput
            style={{borderColor: "#A2A6A7", borderWidth: 1, marginBottom:5, padding:10, color:'white'}}
            placeholder="Repeat Password"
            placeholderTextColor='#A2A6A7'
            onChangeText={textPass2 => this.setState({textPass2})}
            underlineColorAndroid='transparent'
            secureTextEntry={true}
            value={this.state.textPass2}
            ref={input => { this.textPass2 = input }}
          />

          <TouchableOpacity onPress={()=>{this.signup()}} style={{flex:1, backgroundColor:'#FF533D', marginTop:8, borderRadius:5}}>
              <Text style={{color:'white', fontweight:'bold', margin:12, alignSelf:'center'}}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={{flex:1, marginTop:8, borderRadius: 5, borderWidth:0.7, borderColor:'white'}}>
              <Text style={{color:'white', fontweight:'bold', margin:12, alignSelf:'center'}}>Cancel</Text>
          </TouchableOpacity>

        </Content>
        </ImageBackground>   
            
    );
  }
}


export default SignUpEmail;

const styles = StyleSheet.create({
  button: {
    height: 50,
  },  
});