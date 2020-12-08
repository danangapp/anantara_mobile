import React, { Component } from "react";
import {Header, Title, Button, Icon, Left, Right, Body, Footer, FooterTab } from "native-base";
import { Image, Text, View, ToastAndroid, AsyncStorage, Dimensions } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const logo = require("../assets/logo_anantara.png");
const home_icon = require("../assets/home_icon.png");
const search_icon = require("../assets/search_icon.png");
const bookmark_icon = require("../assets/bookmark_icon.png");
const user_icon = require("../assets/user_icon.png");
const versoview_red_icon = require("../assets/versoview_red_icon.png");
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
var fullFromFooter = 0;
function HomeButton() {
  const navigation = useNavigation();

  return (
    <Button onPress={() => {navigation.navigate('Home')}}>
      <Image style={{width:20, height:20}} source={home_icon} />            
    </Button>
  );
}
function BookmarkButton() {
  const navigation = useNavigation();

  return (
    <Button onPress={() => {this.select2()}}>
      {this.state.select2 === true ?
        <FontAwesome style={{color:'#6F6D6D', fontSize:22}} name="bookmark" />
        :
        <FontAwesome style={{color:'#6F6D6D', fontSize:22}} name="bookmark-o" />
      }
    </Button>
  );
}

function SearchButton() {
  const navigation = useNavigation();

  return (
    <Button onPress={() => {navigation.navigate('Search')}}>
      <Image style={{width:20, height:20}} source={search_icon} />            
    </Button>
  );
}

function GridButton(param) {
  const navigation = useNavigation();

  return (
    <Button onPress={() => {
        if (param.FromMagazine.state.adaOpenView == 1) {
        param.FromMagazine.RemoveListener();
        param.FromMagazine.generateOpenViewDetNo();
        navigation.navigate('OpenViewDetail', {
          page:param.FromMagazine.state.PageOpenView, 
          OpenViewNo:param.FromMagazine.state.no, 
          OpenViewDetNo:param.FromMagazine.OpenViewDetNo, 
          FromMagazine:param.FromMagazine.FromMagazine, 
          Home:param.Home
        })
      }
      else 
        console.log('ga ok')
    }}>
      <Image style={{width:25, height:25}} opacity={param.FromMagazine.state.adaOpenView == 1 ? 1 : 0.4} source={versoview_red_icon} />            
    </Button>
  );
}

function ProfileButton(param) {
  const navigation = useNavigation();

  return (
  <Button onPress={() => {param.ini.cekLogin()}}>
    <Image style={{width:20, height:20}} source={user_icon} />            
  </Button>
  )
}


class FooterModule extends Component {
  constructor(props){
    super(props);
    this.state = {
      select1 : false,
      select2 : false,
    };
  }

  async cekLogin(){
    this.props.FromMagazine.cekLogin();
  }

  cekLandscape(width, height){
    this.setState({
      width:width, 
      height:height,
    })
  }  

  select1(){
    if (this.state.select1 == true){
      this.setState({select1 : false})
      ToastAndroid.show('Thank you', ToastAndroid.SHORT);
    }else{
      this.setState({select1 : true})      
      ToastAndroid.show('Thank you', ToastAndroid.SHORT);
    }
  }

  select2(){
    if (this.state.select2 == true){
      this.setState({select2 : false})
      ToastAndroid.show('Bookmark successfully deleted', ToastAndroid.SHORT);     
    }else{
      this.setState({select2 : true}) 
      ToastAndroid.show('This book was successfully bookmarked', ToastAndroid.SHORT);
    }
  }

  render() {
    if (fullFromFooter != this.props.FromMagazine.ganjelFull){
      fullFromFooter = this.props.FromMagazine.ganjelFull;
    }
        
    return (
      <View onLayout={(event) => this.cekLandscape(Dimensions.get('window').width, Dimensions.get('window').height)}>
        <FooterTab style={{backgroundColor:'#F5F5F5'}}>
          <HomeButton />
          <SearchButton FromMagazine={this.props.FromMagazine}/>          
          <Button onPress={() => {this.cekLogin()}}>
            <Image style={{width:20, height:20}} source={user_icon} />            
          </Button>
          
          <GridButton 
            FromMagazine={this.props.FromMagazine} 
            OpenViewDetNo={this.props.FromMagazine.OpenViewDetNo} 
            adaOpenView={this.props.FromMagazine.state.adaOpenView} 
            PageOpenView={this.props.FromMagazine.state.PageOpenView} 
            Home={this.props.Home} 
            ini={this}
            no={this.props.FromMagazine.state.no} /> 
        </FooterTab>
      </View>
    );
  }
}

export default FooterModule;
