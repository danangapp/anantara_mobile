import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Text, ImageBackground, Image, Dimensions, Platform, AsyncStorage} from 'react-native';
import {Button, Header, Left, Icon, Content } from "native-base";
import { sha256 } from 'react-native-sha256';
const cardImage = require("../../../assets/drawer-cover.png");
const LogoImage = require("../../../assets/versoview.png");

class SignUpActivity extends Component {


UserLoginFunction = () =>{
 
  const { UserEmail }  = this.state ;
  const { Name }  = this.state ;
  const { UserPhone }  = this.state ;
  const { UserPassword }  = this.state ;
  // const { UserConfirmPassword }  = this.state ;
  sha256(UserPassword).then(hash => {
    let formdata = new FormData();
    formdata.append("email", UserEmail);
    formdata.append("name", Name); 
    formdata.append("nohp", UserPhone); 
    formdata.append("password", UserPassword); 
    

    fetch('https://panel.versoview.com/loginMobile/SignUp',{
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
       if(data  === 'Invalid Username or Password Please Try Again'){
            Alert.alert(data );
        }else{
          console.log('owalah', data[0] )
          const ini = this.props.navigation.state.params.ini;
          ini.setLogin(data[0]['user_name'], data[0]['name'], data[0]['user_email'], '');
          
          this.setState({UserEmail: ''})
          this.setState({Name: ''})
          this.setState({UserPhone: ''})
          this.setState({UserPassword: ''})
          this.setState({UserConfirmPassword: ''})
          this.props.navigation.navigate('Drawer');
          this.props.navigation.closeDrawer();
          this.props.navigation.navigate('Home');

        }
    })
    .catch(err => {
      console.log(err)
    })      
  });  
}

constructor(){
  super();
  this.state={
    imageWidth: Dimensions.get('window').width - 140,
    UserEmail:'',
    Name:'',
    UserPhone:'',
    UserPassword:'',
    UserConfirmPassword:'',
  }
}

componentDidMount(){
  Dimensions.addEventListener('change' ,({window: {width, height}}) => {
    this.setState({imageWidth: Dimensions.get('window').width - 140});      
  });
}
 
  render() {    
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
                <Image resizeMode="contain" source={LogoImage} style={{width:this.state.imageWidth, alignSelf:'center', margin:20}}></Image>
                <TextInput
                  style={{borderColor: "#A2A6A7", borderWidth: 1, marginBottom:20, padding:10, color:'white'}}
                  placeholder="Email"
                  placeholderTextColor='#A2A6A7'
                  onChangeText={UserEmail => this.setState({UserEmail})}
                  underlineColorAndroid='transparent'
                  value={this.state.UserEmail}
                  ref={input => { this.textUserEmail = input }}
                />

                <TextInput
                  style={{borderColor: "#A2A6A7", borderWidth: 1, marginBottom:20, padding:10, color:'white'}}
                  placeholder="User Name"
                  placeholderTextColor='#A2A6A7'
                  onChangeText={Name => this.setState({Name})}
                  underlineColorAndroid='transparent'
                  value={this.state.Name}
                  ref={input => { this.textName = input }}
                />

                <TextInput
                  style={{borderColor: "#A2A6A7", borderWidth: 1, marginBottom:20, padding:10, color:'white'}}
                  placeholder="Phone Number"
                  placeholderTextColor='#A2A6A7'
                  onChangeText={UserPhone => this.setState({UserPhone})}
                  underlineColorAndroid='transparent'
                  value={this.state.UserPhone}
                  ref={input => { this.textUserPhone = input }}
                />
         
                <TextInput
                  style={{borderColor: "#A2A6A7", borderWidth: 1, marginBottom:20, padding:10, color:'white'}}
                  placeholder="Password"
                  placeholderTextColor='#A2A6A7'
                  onChangeText={UserPassword => this.setState({UserPassword})}
                  underlineColorAndroid='transparent'
                  value={this.state.UserPassword}
                  ref={input => { this.textUserPassword = input }}
                  secureTextEntry={true}
                />

                <TextInput
                  style={{borderColor: "#A2A6A7", borderWidth: 1, marginBottom:20, padding:10, color:'white'}}
                  placeholder="Confirm Password"
                  placeholderTextColor='#A2A6A7'
                  onChangeText={UserConfirmPassword => this.setState({UserConfirmPassword})}
                  underlineColorAndroid='transparent'
                  value={this.state.UserConfirmPassword}
                  ref={input => { this.textUserConfirmPassword = input }}
                  secureTextEntry={true}
                />

                <Button title="Click Here To Login" onPress={this.UserLoginFunction} block danger  style={{backgroundColor: "#FF533D"}}>
                  <Text style={{color:'white'}}>Sign Up</Text>
                </Button>                
              
        </View>
        </Content>
        </ImageBackground>   
            
    );
  }
}


export default SignUpActivity;
