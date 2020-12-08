import React, { Component } from "react";
import { Platform, View, TouchableOpacity, AsyncStorage, ToastAndroid } from "react-native";
import {Container, Content, Button, Icon, ListItem, Text, Badge, Left, Right, Body, Header, Title, H1, List, Switch, Thumbnail } from "native-base";
import HeaderModule from "./headerCenter";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import GLOBAL from './global.js'

const logo = require("../assets/versoview.png");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: "key1",
      results: {
        items: []
      },
      select1: false,
      mainColor:'#696969',
      mainBgColor:'#F5F5F5'
    };    
  }
  onValueChange(value: string) {r
    this.setState({
      selected1: value
    });
  }

  async getNightMode() {
    return await AsyncStorage.getItem('NightMode');
  }

  async cekId() {
    return await AsyncStorage.getItem('Name')
  }

  async cekNightMode2(){
    var NightMode = await this.getNightMode();
    console.log(NightMode)
    if (NightMode == 'white' || NightMode == undefined)
      this.setState({mainColor:'#696969', mainBgColor:'white', DarkMode:0, select1:false})
    else
      this.setState({mainColor:'#FFFFFF', mainBgColor:'#1F1B24', DarkMode:1, select1:true})      
  }

  async cekNightMode(){
    this.cekId()
    .then((respon) => {
      if (respon != null){
        this.cekNightMode2()
      }              
    })
    .catch((error) =>{
      console.error('danang', error);
    });   
  }

  async setNightMode(NightMode){
    AsyncStorage.setItem('NightMode', NightMode); 
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  componentDidMount(){
    this.cekNightMode()
  }

  select1(){
    if (this.state.select1 == true){
      this.setState({select1 : false, mainColor:'#696969', mainBgColor:'white'})
      this.setNightMode('white')
      GLOBAL.screen1.setState({DarkMode: 0 });
    }else{
      this.setState({select1 : true, mainColor:'#FFFFFF', mainBgColor:'#1F1B24'}) 
      this.setNightMode('dark')
      GLOBAL.screen1.setState({DarkMode: 1 });
    }
  }

  signOut(){
    this.setState({select1 : false, mainColor:'#696969', mainBgColor:'white'})
    this.setNightMode('white')
    GLOBAL.screen1.setState({DarkMode: 0 });
    
    this.removeItemValue('Name');
    this.props.navigation.navigate('Home');
    if (Platform.OS === 'android')
      ToastAndroid.show('You have successfully logged out', ToastAndroid.SHORT);
    else
      alert('You have successfully logged out')
  }
  
  render() {
    // console.log('lewat sini')
    return (
      <Container style={{backgroundColor:this.state.mainBgColor}}>

        <HeaderModule param='My Profile' ini={this}/>

        <Content>
          <View style={{margin:40}}>
            <View style={{flex: 1, flexDirection: 'row', marginVertical:10}}>
              <Thumbnail source={logo} />
              <View style={{marginLeft:10}}>
                <Text style={{color:this.state.mainColor, marginTop:8}}>{(this.props.route.params) ? this.props.route.params.name : ''}</Text> 
                <Text style={{fontSize:13, color:'#FF533D'}}>Member Since 2020</Text>                 
              </View>
            </View>
          </View>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ProfileDetail', {name:this.props.route.params.name})}}>
              <Text style={{color:this.state.mainColor, marginVertical:10, marginHorizontal:40, color:'#FF533D'}}>View Profile (anonymus)</Text>               
            </TouchableOpacity>
            {/*<Text style={{marginHorizontal:40, marginVertical:10, color:'#FF533D'}}>Customize your interests</Text> 
            <View style={{borderBottomColor: '#F5F5F5', borderBottomWidth: 20, }} />*/}
            
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:40, marginVertical:10}}>
              <Text style={{color:this.state.mainColor}}>Night Mode</Text>   
              <TouchableOpacity onPress={() => {this.select1()}}>
                {this.state.select1 === true ? 
                  <FontAwesome5 style={{color:'#FF533D', fontSize:30}} name="toggle-on" />              
                  :
                  <FontAwesome5 style={{color:'#FF533D', fontSize:30}} name="toggle-off" />              
                }
              </TouchableOpacity>                         
            </View>
            
            <View style={{borderBottomColor: '#F5F5F5', borderBottomWidth: 20, }} />
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Notification')}}>
              <Text style={{color:this.state.mainColor, marginVertical:10, marginHorizontal:40}}>Settings</Text>               
            </TouchableOpacity>
            {/*<View style={{borderBottomColor: '#F5F5F5', borderBottomWidth: 2, }} />
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Help')}}>
              <Text style={{color:'#696969', marginVertical:10, marginHorizontal:40}}>Help</Text>               
            </TouchableOpacity>*/}
            <View style={{borderBottomColor: '#F5F5F5', borderBottomWidth: 2, }} />
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Term')}}>
              <Text style={{color:this.state.mainColor, marginVertical:10, marginHorizontal:40}}>Term of Service</Text>               
            </TouchableOpacity>
            <View style={{borderBottomColor: '#F5F5F5', borderBottomWidth: 2, }} />
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Privacy')}}>
              <Text style={{color:this.state.mainColor, marginVertical:10, marginHorizontal:40}}>Privacy Policy</Text>               
            </TouchableOpacity>
            <View style={{borderBottomColor: '#F5F5F5', borderBottomWidth: 2, }} />
            <TouchableOpacity onPress={() => {this.signOut()}}>
              <Text style={{color:this.state.mainColor, marginVertical:10, marginHorizontal:40}}>Sign Out</Text>               
            </TouchableOpacity>
            <View style={{borderBottomColor: '#F5F5F5', borderBottomWidth: 20, }} />
            

        </Content>
      </Container>
    );
  }
}

export default Profile;
