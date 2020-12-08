import React, { Component } from 'react'
import {Modal, Text, SafeAreaView, View, FlatList, Image, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, Share, ScrollView, BackHandler, AsyncStorage } from 'react-native'
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import HeaderModule from "./headerClose";
import FooterModule from "./footer";
import func from './function';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { useNavigation } from '@react-navigation/native';
import GLOBAL from './global.js'
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
var no = 0;
var noChange = 0;
var noPort = 0;
var noLand = 0;
var noUdh = 0;
var orientFirst, dataMagz, dataMagzPage;
var naek = 1
var lengt;
var backgroundColor

function PageDetail(param){
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {
    	param.ini.OpenViewNo++;
    	navigation.navigate('OpenViewDetail', {page: param.page,noPage: param.noPage, first:'1', magazine:param.ini.props.route.params.Magazine, OpenViewNo:param.ini.OpenViewNo})
    }}>
      <View style={{paddingHorizontal:40, paddingVertical:10, backgroundColor:param.global.state.DarkMode == 1 ? param.ini.state.mainBgColor : param.backgroundColor}}>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', paddingVertical:10}}>
          <Image style={{width:(param.width / 2) - 40, height:((param.width / 2) - 40)*1.33}} source={{uri:param.cover1}}/>
          <Image style={{width:(param.width / 2) - 40, height:((param.width / 2) - 40)*1.33}} source={{uri:param.cover2}}/>
        </View>
        <View style={{flexDirection:"row", display:param.readDisplay}}>
          <Image style={{width:15, height:15, resizeMode: 'contain', marginRight:5}} source={require("../assets/versoview_red_icon.png")}/>                        
          <Text style={{fontSize:12, color:param.global.state.DarkMode == 1 ? param.ini.state.mainColor : 'black'}}>Travel / Srilanka - 4 min read</Text>
        </View>
      </View>                                        
    </TouchableOpacity> 
  );
}

function PageDetailText(param){
  const navigation = useNavigation();

  return (
    <View style={{display:param.extend, paddingVertical:10, paddingHorizontal:20, backgroundColor:param.backgroundColor}}>
      <Text style={{fontSize:28, fontFamily:'PT Serif', fontWeight:'bold', color:param.global.state.DarkMode == 1 ? param.ini.state.mainColor : 'black'}}>{param.title}</Text>
      <Text style={{fontSize:15, marginTop:5, fontFamily:'montserrat', color:param.global.state.DarkMode == 1 ? param.ini.state.mainColor : '#AAAAAA'}}>{param.lead}</Text>
      <Text style={{fontSize:12, marginTop:5, fontFamily:'PT Serif', color:param.global.state.DarkMode == 1 ? param.ini.state.mainColor : '#5D5D5D'}}>Written by Emma Boyle * 4 min read</Text>
    </View>
  );
}

export default class openview extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: false,
      currentImageIndex: 0,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
      orientation:'',
      no:0,
      nom:1,
      noPort:0,
      noLand:0,
      displayHeader:'none',
      margin: 10,
      countThumb:0,
      modalVisible: false,
      hideSetPage:'none',
      autoplay: false,
      play:'play-circle-outline',
      displayText:'flex',
      readDisplay:'flex',
      widthImage:Dimensions.get('window').width,
      disabledThumbnail:false,
      disabledExtend:true,
      colorThumbnail:'#9B9B9B',
      colorExtend:'#000000',
      mainColor:'#FFFFFF',
      mainBgColor:'#1F1B24',
      DarkMode:0
    };
    orientFirst = width < height ? 'portrait' : 'landscape'
    this.flagMagazine = 0;
    this.OpenViewNo = 1;
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
      this.setState({select1 : false, mainColor:'#696969', mainBgColor:'white', DarkMode:0, colorExtend:'#000000'})
    else
      this.setState({select1 : true, mainColor:'#FFFFFF', mainBgColor:'#1F1B24', DarkMode:1, colorExtend:'white'})
  }

  thumb(){
    this.setState({displayText:'none', readDisplay:'flex', colorThumbnail:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#000000', disabledThumbnail:true, colorExtend:'#9B9B9B', disabledExtend:false})    
  }

  extend(){
    this.setState({displayText:'flex', readDisplay:'none', colorThumbnail:'#9B9B9B', disabledThumbnail:false, colorExtend:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#000000', disabledExtend:true})
  }

  thumbCover() {
    var cover1, cover2;
    return dataMagzPage.map((item,i)=>{
        var no2 = parseFloat(item.magz_page)+1;
        cover1 = 'https://panel.versoview.com/pageturner/200122/yzjs0gucd25/files/thumb/'+item.magz_page+'.jpg';
        cover2 = 'https://panel.versoview.com/pageturner/200122/yzjs0gucd25/files/thumb/'+no2+'.jpg';
        if (i%2 == 1){
          backgroundColor = '#F5F5F5';
        }else{
          backgroundColor = 'white';
        }
        if (this.state.displayText == "none"){
          return (
              <View style={{flex:1}}>
                <PageDetail noPage={item.magz_page - 1} backgroundColor={backgroundColor} cover1={cover1} cover2={cover2} page={item.content} readDisplay={this.state.readDisplay} width={this.state.widthImage} ini={this} global={GLOBAL.screen1}/>
              </View>
          )   
        }else{
          return (
              <View style={{flex:1}}>
                <PageDetailText title={item.title} lead={item.lead} backgroundColor={GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainBgColor : 'white'} extend={this.state.displayText} ini={this} global={GLOBAL.screen1}/>
                <PageDetail noPage={item.magz_page - 1} backgroundColor={'#F5F5F5'} cover1={cover1} cover2={cover2} page={item.content} readDisplay={this.state.readDisplay} width={this.state.widthImage} ini={this} global={GLOBAL.screen1} />
              </View>
          )                    
        }
    })    
  }

  componentDidMount(){
    this.cekLandscape();
    if (width > height){
      this.setState({orientation:'landscape'})
    }else {
      this.setState({orientation:'portrait'})
    }
    // this.getPage()
    // console.log('GLOBAL', GLOBAL.screen1.state.DarkMode)
  }

  async cekLogin(){
    // console.log('getName', await this.getName());
    if (await this.getName() != null)
      this.props.navigation.navigate('Profile');
    else
      this.props.navigation.navigate('Login');
  }

  async getName(){
    return await AsyncStorage.getItem('Name')        
  }
  
  async getPage(){
    var data = await func.fetchData("https://panel.versoview.com/ovjapi/yang_isi_anantara") 
    // console.log(data)
    dataMagzPage = data;
    this.setState({dataMagz: data})
  }  

  getPage2(){
    fetch("https://panel.versoview.com/ovjapi/anantara_isi/" + this.props.route.params.Magazine, {
	    method: 'GET',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	    }
  	}).then((response) => response.json())
    .then((responseData) => {
      	dataMagzPage = responseData;
    	this.setState({dataMagz: responseData})
    	console.log('lewat sini ya', this.props.route.params)
    })
  }  

  async cekLandscape(width, height){
    this.setState({
      width:width, 
      height:height,
      noPort:await Math.floor(this.state.noLand*2),
      noLand:await Math.floor(this.state.no/2),
      orientation: await width > height ? 'landscape' : 'portrait'
    })    
  }  

  cek(){    
    if (this.state.width > this.state.height){
      noUdh++;
      if (noUdh > 0) noLand = no / 2;
      else noLand = no;
      return noLand;
    }
    else {
      noUdh++;
      if (noUdh > 0) noPort = no;
      else noPort = no;
      return noPort;
    }
  }

  async shareIt(){
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    }else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  }

  
  render () {
  	if (this.flagMagazine != this.props.route.params.Home){
  		this.flagMagazine = this.props.route.params.Home;
  		this.getPage2();
  	}
    if (this.state.dataMagz == undefined)
    return (<View></View>)
    else
    return ( 
      <View style={{flex:1, backgroundColor:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainBgColor : '#F5F5F5'}}>
      <HeaderModule ini={this} />
      <ScrollView onLayout={(event) => this.cekLandscape(Dimensions.get('window').width, Dimensions.get('window').height)} ref='_scrollView'>        
        <View style={{paddingVertical:10, paddingLeft:40, backgroundColor:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainBgColor : 'white'}}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity disabled={this.state.disabledThumbnail} onPress={() => {this.thumb()}}>
              <Text style={{color:this.state.colorThumbnail}}>thumbnail</Text>
            </TouchableOpacity>
            <Text> * </Text>
            <TouchableOpacity disabled={this.state.disabledExtend} onPress={() => {this.extend()}}>
              <Text style={{color:GLOBAL.screen1.state.DarkMode == 0 ? this.state.colorExtend : '#F5F5F5'}}>extended</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingVertical:10}} ref={(ref) => this.ref1 = ref}>
          {this.thumbCover()}         
        </View> 
        <View style={{height:70}}></View>
        
      </ScrollView>      
      <View style={{flex: 1}}>        
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <FooterModule FromOpenView={this}/>
        </View>
      </View>         
      </View>
    )
  }
}

const styles = {
  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  
  view1: {
    flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'
  },

}
