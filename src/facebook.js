/*This is an Example of Facebook Login*/
import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert, Image, Dimensions, TouchableOpacity, AsyncStorage, ToastAndroid } from 'react-native';
import {LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager} from 'react-native-fbsdk';
import { Icon } from "native-base";
 
class FBLogin extends Component {
  constructor() {
    super();
    //Setting the state for the data after login
    this.state = {
      user_name: '',
      token: '',
      profile_pic: '',
      buttonWidth: (Dimensions.get('window').width / 2 ) - 100
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change' ,({window: {width, height}}) => {
      this.setState({buttonWidth: (Dimensions.get('window').width / 2 ) - 100});      
    });
  }

  
  onLogout = () => {
    //Clear the state after logout
    this.setState({ user_name: null, token: null, profile_pic: null });
  };

  onLogin = () => {
    const _this = this;
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
    function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              let accessToken = data.accessToken
              // alert(accessToken.toString())

              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error)
                  alert('Error fetching data: ' + error.toString());
                } else {
                  // console.log('danang', result);                                    

                  let formdata = new FormData();
                  // formdata.append("id", result.id);
                  // formdata.append("email", result.email);
                  // formdata.append("name", result.name);
                  // formdata.append("first_name", result.first_name);
                  // formdata.append("last_name", result.last_name);
                  AsyncStorage.setItem('Name', result.name);    
                  AsyncStorage.setItem('Email', result.email);

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
                    ToastAndroid.show('Welcome ' + result.name, ToastAndroid.SHORT);
                    this.props.navigation.navigate('Home');
                  })
                  .catch(err => {
                    console.log(err);
                  })                    
                  _this.props.ini.goBack();
                }
              }

              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email, name, first_name, middle_name, last_name, picture'
                    }
                  }
                },
                responseInfoCallback
              );

              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start()

            }
          )
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  };
 
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onLogin} style={{flex: 1, flexDirection: 'row', alignItems: 'stretch', alignSelf: 'stretch', backgroundColor: 'transparent', borderRadius: 5, borderWidth:0.7, borderColor:'white', padding: 12, marginTop: 5, marginBottom: 5}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch', alignSelf: 'stretch'}}>
            <Icon  style={{color:'white', marginLeft:30}} type="FontAwesome" name="facebook" />
            <Text style={{color:'white', marginLeft:(Dimensions.get("window").width / 2) - 30 - 70, marginTop: 2}}>Facebook</Text>              
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default FBLogin;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
});
 