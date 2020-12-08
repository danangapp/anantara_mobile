import React from 'react';
import {StyleSheet, Text, View, Alert, Image, ActivityIndicator, TouchableOpacity, Dimensions, AsyncStorage, ToastAndroid } from 'react-native';
import {GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
import { Icon } from "native-base";

class GoogleLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      gettingLoginStatus: true,
    };
  }
 
  componentDidMount() {
    GoogleSignin.configure({
      webClientId: '701925772951-eg5i1pq0ttk8tjsp9q61ebrocvpc1vdo.apps.googleusercontent.com',
    });
    this.getData();
    this._isSignedIn();
  }

  async set_Users(user_name){
    AsyncStorage.setItem('user_name', user_name);    
    AsyncStorage.setItem('logout', '1');  
    this.props.navigation.navigate('Drawer', {userName: user_name, logOut: 1});
    this.props.navigation.navigate('Home');
  }

  async getData(){      
      let user = await AsyncStorage.getItem('user_name');
      if (user != null){
        this.props.navigation.navigate('Drawer', {userName: user, logOut: 1});
      }else{
        this.props.navigation.navigate('Drawer', {userName: '', logOut: 0});
      }      
  }
 
  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    this.setState({ gettingLoginStatus: false });
  };

  
  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
      AsyncStorage.setItem('Name', userInfo.user.name);      
      AsyncStorage.setItem('email', userInfo.user.email);      
      this.props.ini.goBack();
    } catch (error) {
      // if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      //   alert('User has not signed in yet');
      //   console.log('User has not signed in yet');
      // } else {
      //   alert("Something went wrong. Unable to get user's info");
      //   console.log("Something went wrong. Unable to get user's info");
      // }
    }
  };
 
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const result = await GoogleSignin.signIn();

      let formdata = new FormData();
      // formdata.append("id", result.user.id);
      formdata.append("email", result.user.email);
      // formdata.append("name", result.user.name); 

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
        ToastAndroid.show('Welcome ' + result.user.name, ToastAndroid.SHORT);
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
      })             
      AsyncStorage.setItem('Name', result.user.name);            
      AsyncStorage.setItem('Email', result.user.email);
      this.props.ini.goBack();
    } catch (error) {
      console.log('Message', error.message);
      console.log('Message', error.code);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
        console.log('Message', error);
        console.log('Message', error.code);
      }
    }
  };
 
  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
 
  render() {
    //returning Loader untill we check for the already signed in user
    if (this.state.gettingLoginStatus) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this._signIn} style={{flex: 1, flexDirection: 'row', alignItems: 'stretch', alignSelf: 'stretch', backgroundColor: 'transparent', borderRadius: 5, borderWidth:0.7, borderColor:'white', padding: 12, marginTop: 5, marginBottom: 5}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch', alignSelf: 'stretch'}}>
              <Icon  style={{color:'white', marginLeft:30}} type="FontAwesome" name="google" />
              <Text style={{color:'white', marginLeft: 100, marginTop:5, marginLeft:(Dimensions.get("window").width / 2) - 30 - 70}}>Google</Text>              
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
 
export default GoogleLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1, flexDirection: 'row', alignItems: 'stretch', alignSelf: 'stretch'
  },
  button: {
    color: '#000000',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: '100%',
  },
});