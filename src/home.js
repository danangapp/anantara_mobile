import React, { Component } from "react";
import {Container, Title, Content, Text, Button, Icon, Left, Right, Body, H2, Toast, Fab, Spinner, Footer, FooterTab } from "native-base";
import { View, StyleSheet, Platform, Dimensions, 
  TouchableOpacity, ScrollView, RefreshControl, Modal, 
  Linking, AsyncStorage, StatusBar, BackHandler, Alert, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import f from "./function";
import HeaderModule from "./header";
import FooterModule from "./footer";
import { useNavigation } from '@react-navigation/native';
import GLOBAL from './global.js'
// import Image from 'react-native-image-progress';
// import {createImageProgress} from 'react-native-image-progress';
// import FastImage from 'react-native-fast-image';
// const Image = createImageProgress(FastImage);
const versoview_red_icon = require("../assets/versoview_red_icon.png");
const grid_icon = require("../assets/grid_icon.png");
const grid_icon_dark = require("../assets/grid_icon-dark.png");

const splash = require("../assets/splash.png");
const anantara = require("../assets/Anantara.png");
const versoview = require("../assets/VersoViewWhite.png");
const poweredby = require("../assets/Poweredby.png");
const splashLandscape = require("../assets/splash-landscape.png");
const deviceHeight = Dimensions.get("window").height;
const logo = require("../assets/versoview.png");
let versionx = 1;
var homeNo = 1;

function ButtonFlipBook(param) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction)
        f.lockScreen('unlockAllOrientations');
        navigation.navigate('Magazine', {home:homeNo, ini:param.ini})
    }} style={{flexDirection:"row"}}>
      <Image style={{width:20, height:20, marginRight:5}} source={param.global.state.DarkMode == 0 ? grid_icon : grid_icon_dark} />
      <Text style={{color:param.global.state.DarkMode == 1 ? param.ini.state.mainColor : '#707070'}}>Flip-book</Text>
    </TouchableOpacity>
  );
}

function ButtonCover(param) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{marginBottom:30}} onPress={() => {
    	f.lockScreen('unlockAllOrientations');
      BackHandler.removeEventListener("hardwareBackPress", this.backAction)
      navigation.navigate('Magazine', {home:homeNo, ini:param.ini, magazine:'yzJS0GUCd25'})
    }}>
      <Image source={{uri:'https://panel.versoview.com/pageturner/200122/yzjs0gucd25/files/page/1.jpg'}} style={{width: param.width, height: param.height}}/>
    </TouchableOpacity>
  );
}

function ButtonGrid(param) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{marginBottom:30}}  onPress={() => {
      BackHandler.removeEventListener("hardwareBackPress", this.backAction)
      f.lockScreen('unlockAllOrientations');
      navigation.navigate('Magazine', {home:homeNo, ini:param.ini, magazine:param.magazine})
    }}>
      <Image source={{uri:param.pic}} style={{width: param.width, height: param.height, marginLeft:40, marginRight:40, marginBottom: 10}}/>
      <TouchableOpacity onPress={() => {
      	if (param.openview != null) {
      		homeNo++;
      		navigation.navigate('OpenView', {First:1, Home:homeNo, Magazine:param.magazine})
      	}
      }} style={{flexDirection:"row", marginLeft:40, marginRight:40}}>
        <Image opacity={param.openview != null ? 1 : 0.4} style={{width:12, height:12, marginRight:5, marginTop:3}} source={versoview_red_icon} />
        <Text style={{color:'#6F6D6D', fontSize:12, fontFamily:'PT Serif'}}>{param.title}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function ButtonOpenView(param) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {
      	homeNo++;
    	navigation.navigate('OpenView', {First:1, Home:homeNo, Magazine:'yzjs0gucd25'})
    }} style={{flexDirection:"row"}}>
      <Image style={{width:22, height:22, marginRight:5}} source={versoview_red_icon} />
      <Text style={{color:GLOBAL.screen1.state.DarkMode == 1 ? param.ini.state.mainColor : '#707070', fontFamily:'PT Serif'}}>OpenView</Text>
    </TouchableOpacity>
  );
}


class Home extends Component {

  constructor(){
    super();
    this.state={
      isVisible : true,
      active: 'true',
      orientation: '',
      fabPosition: (Dimensions.get("window").width-54) / 2,
      deviceHeight: Dimensions.get("window").height,
      deviceWidth: Dimensions.get("window").width,
      refreshing: false,
      position: 2,
      interval: null,
      version: '1',
      modalVisible: false,
      pesan: '',
      mainColor:'#FFFFFF',
      mainBgColor:'#1F1B24',
      DarkMode:0
    }
    GLOBAL.screen1 = this;
    this.DarkMode = 0;
  }

  async getNightMode() {
    return await AsyncStorage.getItem('NightMode');
  }

  async cekId() {
    return await AsyncStorage.getItem('Name')
  }

  async cekNightMode(){
    var NightMode = await this.getNightMode();
    if (NightMode == 'white' || NightMode == undefined) {
      // GLOBAL.screen1.setState({DarkMode: 0 });
      this.setState({mainColor:'#696969', mainBgColor:'white', DarkMode:0})
    }
    else {
      // GLOBAL.screen1.setState({DarkMode: 1 });
      this.setState({mainColor:'#FFFFFF', mainBgColor:'#1F1B24', DarkMode:1})
    }
  }
  
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData();
    this.setState({refreshing: false});
  }

  Hide_Splash_Screen=()=>{
    this.setState({ 
      isVisible : false 
    });
  }

  fetchData(){
    f.getData('https://panel.versoview.com/xhr/api_magz_anantara')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      });
    })
  }

  generateHomeNo(){
    homeNo = homeNo + 1;
    // console.log('lewat generateHomeNo', homeNo)
  }

  toPortrait(){
    f.lockScreen('portrait');
  }

  componentDidMount(){    
    Dimensions.addEventListener('change' ,({window: {width, height}}) => {
      this.setState({fabPosition: (width-54) / 2});
      this.setState({deviceHeight : height});
      this.setState({deviceWidth : width});      
    });

    var that = this;
    setTimeout(function(){
      that.Hide_Splash_Screen();
    }, 3000);

    this.fetchData();    
    BackHandler.addEventListener("hardwareBackPress", this.backAction);    
    f.lockScreen('portrait');    
    this.cekNightMode();
  }

  backAction = () => {
    Alert.alert("Exit!", "Are you sure you want to leave?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => {BackHandler.removeEventListener("hardwareBackPress", this.backAction);BackHandler.exitApp();} }
    ]);
    return true;
  };

  render() {
    if (this.DarkMode != GLOBAL.screen1.state.DarkMode){
      this.DarkMode = GLOBAL.screen1.state.DarkMode;
      this.cekNightMode()
    }
    // console.log('home bro', GLOBAL.screen1.state.DarkMode, this.state.mainBgColor)
    let Splash_Screen, ModalUpdate;
    Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
          <View style={styles.SplashScreen_ChildView}>
              <Image style={{alignSelf: "stretch", height: this.state.deviceHeight, width: this.state.deviceWidth, position: "relative", marginBottom: 10}} source={splash} />
              <Image style={{alignSelf: "center", height: this.state.deviceWidth / 4, width: this.state.deviceWidth / 2, top:this.state.deviceHeight / 7, left:this.state.deviceWidth / 4, justifyContent: 'flex-end', position: "absolute", marginBottom: 10}} source={anantara} />
              <Image style={{alignSelf: "center", height: this.state.deviceWidth / 10.2, width: this.state.deviceWidth / 3, top:this.state.deviceHeight - (this.state.deviceHeight / 5), left:this.state.deviceWidth / 3, justifyContent: 'flex-end', position: "absolute", marginBottom: 10}} source={versoview} />
              <Image style={{alignSelf: "center", height: this.state.deviceWidth / 6 / 4.72, width: this.state.deviceWidth / 6, top:(this.state.deviceHeight - (this.state.deviceHeight / 5)) - 25, left:this.state.deviceWidth / 2.4, justifyContent: 'flex-end', position: "absolute", marginBottom: 10}} source={poweredby} />
          </View>
      </View>)

    ModalUpdate = (
      <Modal
        transparent
        animationType="slide"
        visible={this.state.modalVisible}          
        >
        <View style={{flex: 1, marginVertical: (this.state.deviceHeight / 4), backgroundColor: '#F15642'}}>
          <View style={{flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', position: 'relative', padding:30}}>
            <Image resizeMode="contain" style={{width: '100%', height: (this.state.deviceHeight / 5)}} source={logo} />
            <TouchableOpacity
              onPress={() => {
                // this.setModalVisible(false);
                Linking.openURL("https://play.google.com/store/apps/details?id=com.agencyfish.pagechain.app");
              }}>
              <Text style={{textAlign: 'center', backgroundColor: 'transparent', color:'#FFFFFF', fontSize: 13}}>The updated application is available at Playstore</Text>
              <Text style={{textAlign: 'center', backgroundColor: 'transparent', color:'#FFFFFF', fontSize: 13}}>This version is no longer supported</Text>
              <Text style={{textAlign: 'center', backgroundColor: 'transparent', color:'#FFFFFF', fontSize: 13}}>Click here for update !!</Text>
            </TouchableOpacity>
          </View>          
        </View>
      </Modal>
    )
    
    return (      
      <View style = {{flex: 1, backgroundColor:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainBgColor : '#F5F5F5', paddingTop: ( Platform.OS === 'ios' ) ? 0 : 0}}>
        <StatusBar hidden />
        <View style={{backgroundColor: GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainBgColor : '#F5F5F5'}}>            
          <HeaderModule />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <View style={{marginHorizontal:40, marginVertical:40}}>
              <ButtonCover ini={this} width={this.state.deviceWidth - 80} height={(this.state.deviceWidth - 80) * 1.217}/>
              <Text style={{marginTop:5, color: GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#AAAAAA', fontFamily:'PT Serif'}}>Edition 3, 2020</Text>
              <View style={{borderBottomColor: '#5D5D5D', borderBottomWidth: 1, marginVertical:10 }} />            
              <Text style={{color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#AAAAAA', fontFamily:'PT Serif'}}>Welcome to Journeys, where Anantara’s exceptional experiences converge, inspiring you to your next adventure. </Text>
              <View style={{borderBottomColor: GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#5D5D5D', borderBottomWidth: 1, marginVertical:10 }} />            
              <View style={{flex:1, flexDirection:"row",justifyContent:'space-between'}}>
                <ButtonOpenView ini={this} />
                <ButtonFlipBook ini={this} global={GLOBAL.screen1} />                            
              </View>
            </View>

            <View style={{backgroundColor:'white', paddingVertical:20}}>
            <FlatGrid
              itemDimension={130}
              items={this.state.dataSource}
              renderItem={({ item }) => {
                // console.log(item)
                let pic = `${item.image}`;
                let href = 'https://panel.versoview.com/pageturner/'+`${item.href}`;
                return (
                  <View style={{alignSelf:'center'}}>                  
                    <ButtonGrid magazine={item.issue_id} openview={item.issue} ini={this} title={item.title} pic={pic}  width={(this.state.deviceWidth/2)-40} height={((this.state.deviceWidth/2)-40) * 1.333}/>                  
                  </View>
                )
              }}
            />
            </View>
          </ScrollView>                
        </View>  
        {(this.state.isVisible === true) ? Splash_Screen : null}         
        {(this.state.isVisible === false) ? ModalUpdate : null}         

      </View>      
    );
  }
}

export default Home;


const styles = StyleSheet.create(
{
    MainContainer:
    {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor:'yellow',
        paddingTop: ( Platform.OS === 'ios' ) ? 0 : 0        
    },

    fabHidden:{
      width:0,
      height:0,
      backgroundColor: '#F15642'
    },

    fabShow:{
      backgroundColor: '#F15642'
    },

    SplashScreen_RootView:
    {
        justifyContent: 'center',
        flex:1,
        // margin: 10,
        position: 'absolute',
        width: '100%',
        height: '100%',
        
    },
 
    SplashScreen_ChildView:
    {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        flex:1,
    }
});