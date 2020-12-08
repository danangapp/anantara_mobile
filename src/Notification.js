import React, { Component } from "react";
import { Platform, Image, View, TouchableOpacity, BackHandler, AsyncStorage } from "react-native";
import {Container, Content, Button, Icon, ListItem, Text, Badge, Left, Right, Body, Header, Title, H1, List, Switch } from "native-base";
import HeaderModule from "./headerCenter";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import GLOBAL from './global.js'

const logo = require("../assets/versoview.png");

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: "key1",
      results: {
        items: []
      },
      select1 : true,
      select2 : true,
      select3 : true,
      mainColor:'#FFFFFF',
      mainBgColor:'#1F1B24',
      DarkMode:0
    };
  }

  componentDidMount(){
  }
  
  onValueChange(value: string) {r
    this.setState({
      selected1: value
    });
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
      this.setState({select1 : false, mainColor:'#696969', mainBgColor:'white', DarkMode:0})
    else
      this.setState({select1 : true, mainColor:'#FFFFFF', mainBgColor:'#1F1B24', DarkMode:1})
  }

  select1(){
    if (this.state.select1 == true){
      this.setState({select1 : false})
    }else{
      this.setState({select1 : true})      
    }
  }

  select2(){
    if (this.state.select2 == true){
      this.setState({select2 : false})
    }else{
      this.setState({select2 : true})      
    }
  }
  
  select3(){
    if (this.state.select3 == true){
      this.setState({select3 : false})
    }else{
      this.setState({select3 : true})      
    }
  }

  render() {
    return (
      <Container style={{backgroundColor:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainBgColor : '#F5F5F5'}}>

        <HeaderModule param='Notification Settings' ini={this}/>

        <Content>
          <View style={{margin:40}}>
            <Text style={{color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>Enable or disable push notifications 
            under Setting / Notifications / Anantara</Text>
          </View>
            <View style={{borderBottomColor: '#F5F5F5', borderBottomWidth: 2, }} />
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:40, marginVertical:10}}>
              <View>
                <Text style={{color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>New editions</Text> 
                <Text style={{fontSize:12, color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>Notify me when new issues become available</Text>                 
              </View>
              <TouchableOpacity onPress={() => {this.select1()}}>
                {this.state.select1 === true ? 
                  <FontAwesome5 style={{color:'#FF533D', fontSize:30}} name="toggle-on" />              
                  :
                  <FontAwesome5 style={{color:'#FF533D', fontSize:30}} name="toggle-off" />              
                }
              </TouchableOpacity>
            </View>
            <View style={{borderBottomColor: '#F5F5F5', borderBottomWidth: 2, }} />
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:40, marginVertical:10}}>
              <View>
                <Text style={{color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>Renewals</Text> 
                <Text style={{fontSize:12, color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>Notify me when new issues become available</Text>                 
              </View>
              <TouchableOpacity onPress={() => {this.select2()}}>
                {this.state.select2 === true ? 
                  <FontAwesome5 style={{color:'#FF533D', fontSize:30}} name="toggle-on" />              
                  :
                  <FontAwesome5 style={{color:'#FF533D', fontSize:30}} name="toggle-off" />              
                }
              </TouchableOpacity>
            </View>
            <View style={{borderBottomColor: '#F5F5F5', borderBottomWidth: 2, }} />
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:40, marginVertical:10}}>
              <View>
                <Text style={{color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>App Updates</Text> 
                <Text style={{fontSize:12, color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>Notify me when new issues become available</Text>                 
              </View>
              <TouchableOpacity onPress={() => {this.select3()}}>
                {this.state.select3 === true ? 
                  <FontAwesome5 style={{color:'#FF533D', fontSize:30}} name="toggle-on" />              
                  :
                  <FontAwesome5 style={{color:'#FF533D', fontSize:30}} name="toggle-off" />              
                }
              </TouchableOpacity>
            </View>
            <View style={{borderBottomColor: '#F5F5F5', borderBottomWidth: 2, }} />
            
        </Content>
      </Container>
    );
  }
}

export default Notification;
