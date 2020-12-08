import React, { Component } from "react";
import {Header, Title, Button, Icon, Left, Right, Body, Footer, FooterTab } from "native-base";
import { Image, Text, View, ToastAndroid, AsyncStorage, Dimensions, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import f from './function';
const logo = require("../assets/logo_anantara.png");
const home_icon = require("../assets/home_icon.png");
const search_icon = require("../assets/search_icon.png");
const bookmark_icon = require("../assets/bookmark_icon.png");
const user_icon = require("../assets/user_icon.png");
const versoview_red_icon = require("../assets/versoview_red_icon.png");
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
function HomeButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {
    	f.lockScreen('portrait');
    	navigation.navigate('Home')
    }}>
      <Image style={{width:20, height:20}} source={home_icon} />            
    </TouchableOpacity>
  );
}
function BookmarkButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {
    	f.lockScreen('portrait');
    	this.select2()
    }}>
      {this.state.select2 === true ?
        <FontAwesome style={{color:'#6F6D6D', fontSize:22}} name="bookmark" />
        :
        <FontAwesome style={{color:'#6F6D6D', fontSize:22}} name="bookmark-o" />
      }
    </TouchableOpacity>
  );
}

function SearchButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {
    	f.lockScreen('portrait');
    	navigation.navigate('Search')
    }}>
      <Image style={{width:20, height:20}} source={search_icon} />            
    </TouchableOpacity>
  );
}

function GridButton(param) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {
        if (param.adaOpenView == 1) {
          param.FromMagazine.RemoveListener();
          param.FromMagazine.generateOpenViewDetNo();
          navigation.navigate('OpenViewDetail', {
            page:param.PageOpenView, 
            OpenViewNo:param.no*2, 
            OpenViewDetNo:param.FromMagazine.state.OpenViewDetNo, 
            FromMagazine:param.FromMagazine, 
            Home:param.Home
          })
        }
        else 
          console.log('ga ok')
    }}>
      <Image style={{width:25, height:25}} opacity={param.adaOpenView == 1 ? 1 : 0.4} source={versoview_red_icon} />            
    </TouchableOpacity>
  );
}

function ProfileButton(param) {
  const navigation = useNavigation();

  return (
  <TouchableOpacity onPress={() => {
  	f.lockScreen('portrait');
  	console.log('porttrait')
  	param.ini.cekLogin()
  }}>
    <Image style={{width:20, height:20}} source={user_icon} />            
  </TouchableOpacity>
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
  	f.lockScreen('portrait');
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
    // console.log('OpenViewDetNo', this.props.OpenViewDetNo)
    // console.log(this.props.FromMagazine.state.noLandscape)
    var no = this.props.FromMagazine.state.noLandscape*2;
    var adaOpenView, dtM;
    if (this.props.FromMagazine.state.dtM){
    	if (this.props.FromMagazine.state.dtM.length > 1){
	    	dtM = this.props.FromMagazine.state.dtM;
	    	if (no){
			    if (dtM[no].content != null){
			    	adaOpenView = 1;
			    }
	    	}    		
    	}
	}     
    return (
      <View onLayout={(event) => this.cekLandscape(Dimensions.get('window').width, Dimensions.get('window').height)}>
        <FooterTab style={{backgroundColor:'#F5F5F5', paddingVertical:8, paddingHorizontal:40}}>
          <HomeButton />
          {/*<TouchableOpacity onPress={() => {this.select2()}}>
            {this.state.select2 === true ?
              <FontAwesome style={{color:'#6F6D6D', fontSize:22}} name="bookmark" />
              :
              <FontAwesome style={{color:'#6F6D6D', fontSize:22}} name="bookmark-o" />
            }
          </TouchableOpacity>*/}
          <SearchButton FromMagazine={this.props.FromMagazine}/>          
          <TouchableOpacity onPress={() => {          	
          	this.cekLogin()
          }}>
            <Image style={{width:20, height:20}} source={user_icon} />            
          </TouchableOpacity>
          {this.state.width > this.state.height ? 
            <GridButton 
              FromMagazine={this.props.FromMagazine} 
              OpenViewDetNo={this.props.FromMagazine.OpenViewDetNo} 
              adaOpenView={adaOpenView} 
              PageOpenView={this.props.FromMagazine.state.PageOpenView} 
              Home={this.props.Home} 
              no={this.props.FromMagazine.state.noLandscape} /> 
          : null}
          {/*<Button />*/}
        </FooterTab>
      </View>
    );
  }
}

export default FooterModule;
