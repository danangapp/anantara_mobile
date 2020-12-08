import React, { Component } from "react";
import {Header, Title, Button, Icon, Left, Right, Body, Footer, FooterTab } from "native-base";
import { Image, Text, View, Share, ToastAndroid, AsyncStorage, Platform } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
const logo = require("../assets/logo_anantara.png");
const huruf_icon = require("../assets/huruf_icon.png");
var ShareNo = '';
function LoveButton() {
  const navigation = useNavigation();

  return (
    <Button onPress={() => {this.select1()}}>
      {this.state.select1 === true ?
        <Ionicons style={{color:'#6F6D6D', fontSize:24}} name="ios-heart" />
        :
        <Ionicons style={{color:'#6F6D6D', fontSize:24}} name="ios-heart-empty" />
      }
    </Button>
  );
}
function ShareButton() {
  const navigation = useNavigation();

  return (
    <Button onPress={() => {this.onShare()}}>
      <Feather style={{color:'#6F6D6D', fontSize:22}} name="share" />
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
function FontButton(param) {
  const navigation = useNavigation();
  const tombol = param.fontText;
  return (
    <Button onPress={() => {
  		// param.fontText.scrollTo();
    	tombol.fontText()
    }}>
      <Image style={{width:24, height:24}} source={huruf_icon} />            
    </Button>
  );
}




class FooterClose extends Component {
  constructor(props){
    super(props);
    this.state = {
      select1 : false,
      select2 : false,
    };
    this.noOPD = 0;
  }

  async select1(){
    const ini = this.props.ini;
    console.log('danang sis', this.props.ini.state.favoriteIcon)
	  if (this.props.ini.state.favoriteIcon == 'ios-heart'){
	    ini.delfavorite();
	    this.setState({select1 : false})
	    this.props.ini.cekFavorite();
	    if (Platform.OS === 'android')
	      ToastAndroid.show('Favorite successfully deleted', ToastAndroid.SHORT);     
	    else
	      alert('Favorite successfully deleted')
	  }else{
	    if (await this.getName() == null) {
	      if (Platform.OS === 'android')
	        ToastAndroid.show('You are not logged in', ToastAndroid.SHORT);     
	      else
	        alert('You are not logged in')
	    }
	    else{
	      ini.favorite();
	      this.setState({select1 : true}) 
	      this.props.ini.cekFavorite();
	      if (Platform.OS === 'android')
	        ToastAndroid.show('This book was successfully favorited', ToastAndroid.SHORT);
	      else
	        alert('This book was successfully favorited')
	    }
	  }  
  }

  async getName(){
    var name = await AsyncStorage.getItem('Name')
    return name;    
  }

  async select2(){
    // console.log('Name', await this.getName());    
      const ini = this.props.ini;
      if (this.props.ini.state.bookmarkIcon == 'bookmark'){
        ini.delbookmark();
        this.setState({select2 : false})
        this.props.ini.cekBookmark();
        // this.props.ini.setState({bookmarkIcon : 'bookmark-o'})
        if (Platform.OS === 'android')
          ToastAndroid.show('Bookmark successfully deleted', ToastAndroid.SHORT);     
        else
          alert('Bookmark successfully deleted')
      }else{
        if (await this.getName() == null) {
          if (Platform.OS === 'android')
            ToastAndroid.show('You are not logged in', ToastAndroid.SHORT);     
          else
            alert('You are not logged in')
        }
        else{
          ini.bookmark();
          this.setState({select2 : true}) 
          // this.props.ini.setState({bookmarkIcon : 'bookmark'})
          this.props.ini.cekBookmark();
          if (Platform.OS === 'android')
            ToastAndroid.show('This book was successfully bookmarked', ToastAndroid.SHORT);
          else
            alert('This book was successfully bookmarked')
        }
      }      
    
  }
  
  onShare(ShareNo){
    const ini = this.props.ini;
    Share.share({
      message: 'https://panel.versoview.com/pageturner/200122/yzjs0gucd25/#p='+ShareNo,
      url: 'https://versoview.com',
      title: 'Anantara Magazine?'
    }, {
      dialogTitle: 'Share this link'      
    })
  };

  async bookmarkTo(){
    var ada = 0;
    var data = JSON.parse(await AsyncStorage.getItem('bookmark'))
    if (data != null) {
      data.map((i, key) => {
        if (ada == 0){
          ada = this.props.ini.noPage == i.page - 1 ? 1 : 0;
        }
      })
    }

    if (ada == 1){
      this.setState({select2: true})
    }else{
      this.setState({select2: false})      
    }
  }

  async favoriteTo(){
    var ada = 0;
    var data = JSON.parse(await AsyncStorage.getItem('favorite'))
    if (data != null) {
      data.map((i, key) => {
        if (ada == 0){
          ada = this.props.ini.noPage == i.page - 1 ? 1 : 0;
        }
      })
    }

    if (ada == 1){
      this.setState({select1: true})
    }else{
      this.setState({select1: false})      
    }
  }

  render() {
    // console.log('bookmark', this.props.ini.state.bookmark)
    if (this.noOPD != this.props.noOPD){
      this.bookmarkTo()
      this.favoriteTo()
      this.noOPD = this.props.noOPD;
    }
    if (this.props.ini){
      var ini = this.props.ini
      if (ini.props.route.name == 'OpenViewDetail'){
        ShareNo = ini.props.route.params.noPage+1;
      }
    }

    // console.log('bookmark', this.props.ini.state.bookmark)
    // console.log('page', this.props.ini.page)
    return (
      <View>
        {/*<Text>{this.props.ini.props.route.params.OpenViewNo}</Text>*/}
        <FooterTab style={{backgroundColor:'#F5F5F5'}}>
          <Button onPress={() => {this.select1()}}>
            {this.state.select1 === true ?
              <Ionicons style={{color:'#6F6D6D', fontSize:24}} name="ios-heart" />
              :
              <Ionicons style={{color:'#6F6D6D', fontSize:24}} name="ios-heart-empty" />
            }
          </Button>
          <Button onPress={() => {this.onShare(ShareNo)}}>
            <Feather style={{color:'#6F6D6D', fontSize:22}} name="share" />
          </Button>
          <Button onPress={() => {this.select2()}}>
            <FontAwesome style={{color:'#6F6D6D', fontSize:22}} name={this.props.ini.state.bookmarkIcon} />
          </Button>
          <FontButton fontText={this.props.ini}/>                         
        </FooterTab>
      </View>
    );
  }
}

export default FooterClose;
