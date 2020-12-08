import React, { Component } from "react";
import { Platform, Image, View, TouchableOpacity, AsyncStorage } from "react-native";
import {Container, Content, Button, ListItem, Text, Badge, Left, Right, Body, Header, Title, H1, List, Switch, Thumbnail, Icon } from "native-base";
import HeaderModule from "./headerCenter";
import GLOBAL from './global.js'

const logo = require("../assets/versoview.png");
const bookmark_icon = require("../assets/bookmark_icon.png");
const love_icon = require("../assets/love_icon.png");
const recent_icon = require("../assets/recent_icon.png");
const love_icon_dark = require("../assets/love_icon-dark.png");
const recent_icon_dark = require("../assets/recent_icon-dark.png");
const versoview_red_icon = require("../assets/versoview_red_icon.png");
const book = require("../assets/book.png");
var itung = 0;
var noBookmark = 0;

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: "key1",
      results: {
        items: []
      },
      data:[],
      mainColor:'#FFFFFF',
      mainBgColor:'#1F1B24',
      DarkMode:0
    };
    this.no = 0;
  }
  onValueChange(value: string) {r
    this.setState({
      selected1: value
    });
  }

  componentDidMount(){
    
  }

  async getbookmark(){
    var email = await AsyncStorage.getItem('Email')
    let formdata = new FormData();
    formdata.append("login", email);
    formdata.append("page", this.page);
    formdata.append("status", 2);
    // console.log(email)
    if (email != null){
      fetch('https://panel.versoview.com/mobile/bookmark',{
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
        // console.log('data', data[0])
        this.setState({data:data})
      })
      .catch(err => {
        console.log(err);
      })
    }
    // console.log('berlibur disini')
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

  render() {
    if (this.no != this.props.route.params.noBookmark){
      console.log(this.props.route.params.noBookmark, this.no)
      this.getbookmark();
      this.no = this.props.route.params.noBookmark
    }
    let BookmarkText;
    if (this.state.data.length > 0){
      BookmarkText = (
        this.state.data.map((i, key) => {
          return (
              <View>
                <View style={{flex: 1, flexDirection: 'row', marginVertical:20, marginHorizontal:40}}>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <Image style={{width:15, height:22, color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}} source={bookmark_icon} />                          
                    <Text style={{marginLeft:5, marginRight:20, color:'#FF533D'}}>Saved (1)</Text> 
                    <Image style={{width:22, height:22}} source={GLOBAL.screen1.state.DarkMode == 0 ? love_icon : love_icon_dark} />                          
                    <Text style={{marginLeft:5, marginRight:20, color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>(1)</Text> 
                    <Image style={{width:22, height:22}} source={GLOBAL.screen1.state.DarkMode == 0 ? recent_icon : recent_icon_dark} />                          
                    <Text style={{marginLeft:5, color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>Recently Viewed</Text>                 
                  </View>
                </View>
                <View style={{borderBottomColor: '#F5F5F5', borderBottomWidth: 2, }} />
                <View style={{margin:20}}>
                  <TouchableOpacity onPress={()=>{/*this.props.navigation.navigate('Magazine', {page:i.page})*/}}>
                    <Text style={{fontSize:30, fontWeight: 'bold', color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : 'black'}}>{i.title}</Text>                 
                    <Text style={{fontSize:20, marginTop:10, color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>{i.lead}</Text>                 
                    <Text style={{fontSize:12, marginTop:10, color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>Written by {i.written} - 4 min</Text>                 
                  </TouchableOpacity>
                  <View style={{flex:1, flexDirection:"row",justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('OpenViewDetail', {page:i.pagedetail})}} style={{flex:1, flexDirection:'row', marginTop:10}}>
                      <Image style={{width:18, height:18}} source={versoview_red_icon} />                          
                      <Text style={{marginLeft:5, marginRight:20, color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>OpenView</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Magazine', {page:i.page})}} style={{flex:1, flexDirection:'row', marginTop:10, right:0, position:'absolute'}}>
                      <Image style={{width:18, height:20}} source={book} />                          
                      <Text style={{marginLeft:5, marginRight:20, color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#777575'}}>Flipbook</Text> 
                    </TouchableOpacity>
                  </View>
                  <View style={{borderBottomColor: '#A9A7A7', borderBottomWidth: 2, marginTop:10, marginBottom:30 }} /> 
                </View>
              </View>
          )
        })      
      )      
    }
    // console.log(this.state.data)   

    var B = "The emerald island’s diverse topography and abundant ocean contain a wealth of riches".toUpperCase() ;
    return (
      <Container style={{backgroundColor: GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainBgColor : '#F5F5F5'}}>

        <HeaderModule param='Bookmarks' ini={this}/>

        <Content>
          {BookmarkText}
        </Content>
      </Container>
    );
  }
}

export default Bookmark;
