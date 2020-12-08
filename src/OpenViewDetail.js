import React, { Component } from 'react'
import {Modal, Text, SafeAreaView, View, FlatList, Image, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, Share, ScrollView, AsyncStorage, BackHandler } from 'react-native'
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import HeaderModule from "./headerClose";
import FooterModule from "./FooterClose";
import f from './function';
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
var dataMagz, dataMagzPage;
var naek = 1
var lengt
var pageMagaz = '';
var OpenViewDetNo = 0;
var OpenViewDetNo2 = 0;
var array = [];

function ImageToFlipBook(param) {
  const navigation = useNavigation();
  var page = param.page - 1;
  OpenViewDetNo = OpenViewDetNo + 1;  
  return (
    <TouchableOpacity style={{backgroundColor:param.global.state.DarkMode == 1 ? param.ini.state.mainBgColor : '#F5F5F5'}} onPress={() => {
      if (param.ini.props.route.params.FromMagazine){
        param.ini.BackToMagazine();
      }
      OpenViewDetNo = OpenViewDetNo + 100;
      navigation.navigate('Magazine', {page:page, OpenViewDetNo:OpenViewDetNo})
    }}>
      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', paddingVertical:20}}>
        <Image style={{width:param.width, height:param.height}} source={{uri:param.cover1}}/>
        <Image style={{width:param.width, height:param.height}} source={{uri:param.cover2}}/>
      </View>
    </TouchableOpacity>  
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
      dataMagz:[],
      dtM:[],
      imageWidth:(Dimensions.get('window').width / 2)-60,
      imageHeight:((Dimensions.get('window').width / 2)-60) * 1.333,
      fontText:18,
      array:[],
      bookmark:false,
      bookmarkIcon:'bookmark-o',
      favorite:false,
      favoriteIcon:'ios-heart-empty',
      mainColor:'#FFFFFF',
      mainBgColor:'#1F1B24',
      DarkMode:0
    };
    this.noPage = '';
    this.page = '';
    this.pageDetail = '';
    this.title = '';
    this.caption = '';
    this.written = '';
    this.noOPD = 0;
    this.OpenViewDetailNo = 1;
    this.realPosition = 0;
    this.heightScroll = 0;
    this.h1 = 0;
    this.h2 = 0;
    this.flagSFT = 0;
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

  async bookmark(){
    var email = await AsyncStorage.getItem('Email')

    let formdata = new FormData();
    formdata.append("login", email);
    formdata.append("page", this.page);
    formdata.append("issue", this.props.route.params.magazine);
    formdata.append("pagedetail", this.pageDetail);
    formdata.append("status", 0);
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
      console.log('sukses')
    })
    .catch(err => {
      console.log(err);
    })
  }

  async favorite(){
    var email = await AsyncStorage.getItem('Email')

    let formdata = new FormData();
    formdata.append("login", email);
    formdata.append("page", this.page);
    formdata.append("issue", this.props.route.params.magazine);
    formdata.append("pagedetail", this.pageDetail);
    formdata.append("status", 0);
    fetch('https://panel.versoview.com/mobile/favorite',{
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
      console.log('sukses')
    })
    .catch(err => {
      console.log(err);
    })
  }

  cekBookmark(){
    if (this.state.bookmarkIcon == 'bookmark'){
      this.setState({bookmarkIcon: 'bookmark-o'})
    }else{
      this.setState({bookmarkIcon: 'bookmark'})
    }
  }

  cekFavorite(){
    if (this.state.favoriteIcon == 'ios-heart-empty'){
      this.setState({favoriteIcon: 'ios-heart'})
    }else{
      this.setState({favoriteIcon: 'ios-heart-empty'})
    }
  }

  backAction = () => {
    if (this.props.route.params.FromMagazine){
      this.BackToMagazine()      
    }
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  };

  BackToMagazine(){
    if (this.props.route.params.FromMagazine){
      var FromMagazine = this.props.route.params.FromMagazine;
      FromMagazine.AddListenerBack();      
    }
  }

  async delbookmark(){
    // var ada = 0;
    // var data = JSON.parse(await AsyncStorage.getItem('bookmark'))
    // var arr = {title: this.title, caption: this.caption, written: this.written, page: this.page, pageDetail: this.pageDetail}
    // if (data != null){
    //   data.map((i, key) => {
    //     if (i.page == arr.page) {
    //       this.removeList(key)
    //     }
    //   })
    // }   

    var email = await AsyncStorage.getItem('Email')
    let formdata = new FormData();
    formdata.append("login", email);
    formdata.append("page", this.page);
    formdata.append("issue", this.props.route.params.magazine);
    formdata.append("status", 1);
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
      console.log('sukses')
    })
    .catch(err => {
      console.log(err);
    }) 
  }

  async delfavorite(){
    var email = await AsyncStorage.getItem('Email')
    let formdata = new FormData();
    formdata.append("login", email);
    formdata.append("page", this.page);
    formdata.append("issue", this.props.route.params.magazine);
    formdata.append("status", 1);
    fetch('https://panel.versoview.com/mobile/favorite',{
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
      console.log('sukses')
    })
    .catch(err => {
      console.log(err);
    }) 
  }

  async removeList(key){
    var data = JSON.parse(await AsyncStorage.getItem('bookmark'))
    data.splice(key, 1);
    AsyncStorage.setItem('bookmark', JSON.stringify(data));    
    data = JSON.parse(await AsyncStorage.getItem('bookmark'))

    var data = JSON.parse(await AsyncStorage.getItem('favorite'))
    data.splice(key, 1);
    AsyncStorage.setItem('favorite', JSON.stringify(data));    
    data = JSON.parse(await AsyncStorage.getItem('favorite'))
  }

  
  thumbCover(noPage) {
    var cover1, cover2;
    var text,title, lead, caption = '', arr, noLength = 0;
    this.noPage = this.props.route.params.noPage;
    return this.state.dataMagz.map((item,i)=>{
        if (i%2 == 0){
          text = '';
          title = '';
          lead = '';
          caption = '';
          cover1 = 'https://panel.versoview.com/pageturner/200122/yzjs0gucd25/files/thumb/'+item.magz_page+'.jpg';
          text = item.body_text;
          title += item.title != null ? item.title : '';
          lead += item.lead != null ? item.lead : '';
          caption = item.caption;  
          if (i == 0){
            this.page = item.magz_page;        
            this.title = title;        
            this.caption = lead;        
            this.written = 'Written by Emma Boyle • 4 min';                    
            this.pageDetail = this.props.route.params.page;                    
          }
        }else{
          text += item.body_text;
          text = text.replace('<h1>', '');
          text = text.replace('</h1>', '');
          title += item.title != null ? item.title : '';
          lead += item.lead != null ? item.lead : '';
          caption += item.caption;
          cover2 = 'https://panel.versoview.com/pageturner/200122/yzjs0gucd25/files/thumb/'+item.magz_page+'.jpg';
          return (
              <View onLayout={(event) => { 
                var {x, y, width, height} = event.nativeEvent.layout;
                arr = {page: item.magz_page,y : y}
                array.push(arr)
                noLength = noLength + 1;
                this.setState({
                  imageWidth:Dimensions.get('window').width < Dimensions.get('window').height ? (Dimensions.get('window').width / 2)-60 : ((Dimensions.get('window').width / 2)-60) * 1.333,
                  imageHeight:Dimensions.get('window').width < Dimensions.get('window').height ? ((Dimensions.get('window').width / 2)-60) * 1.333 : (Dimensions.get('window').width / 2)-60,
                  width:Dimensions.get('window').width,
                  height:Dimensions.get('window').height
                })                
                this.setState({array: array})                
                // console.log(this.state.array)
              }}>
                <ImageToFlipBook ini={this} cover1={cover1} cover2={cover2} width={this.state.imageWidth} height={this.state.imageHeight} page={item.magz_page} global={GLOBAL.screen1}/>
                <View style={{marginHorizontal:20, marginVertical:20, display:this.state.displayText}}>
                  {title != '' ?
                    <Text style={{marginTop:20, fontSize:25, fontFamily:'PT Serif', fontWeight:'bold', color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : 'black'}}>{title}</Text>                  
                    : null
                  }
                  {lead != '' ?
                    <View style={{marginTop:5}}>
                      <Text style={{fontSize:15, marginTop:5, fontFamily:'montserrat', color:'#AAAAAA'}}>{lead}</Text>                  
                      <Text style={{fontSize:12, marginVertical:10, fontFamily:'PT Serif', color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : '#5D5D5D'}}>Written by Emma Boyle * 4 min read</Text>
                      <View style={{borderBottomColor: '#5D5D5D', borderBottomWidth: 1, marginTop:10}} />
                    </View>
                    : null
                  }
                  {text != '' ?
                    <Text style={{marginTop:20, fontSize:this.state.fontText, marginTop:5, fontFamily:'PT Serif', color:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainColor : 'black'}}>{text}</Text>                  
                    : null
                  }
                </View>
              </View>                    
          )                                          
        }            
    })    
  }

  componentDidMount(){    
    this.getPage();
  }

  async getBookmark(){
    var email = await AsyncStorage.getItem('Email')
    let formdata = new FormData();
    formdata.append("login", email);
    formdata.append("page", this.page);
    formdata.append("status", 2);
    // this.setState({bookmark: 'bookmark-o'})
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
      var ada = 0;
      data.map((item,i)=>{
        // console.log('item', item.page)
        // console.log('page', this.page)
        if (item.page == this.page) ada = 1;
      })

      // console.log('ada', ada)
      
      if (ada == 1)
        this.setState({bookmarkIcon: 'bookmark'})
      else  
        this.setState({bookmarkIcon: 'bookmark-o'})

      // console.log('bookmarkIcon', this.state.bookmarkIcon)     
    })
    .catch(err => {
      console.log(err);
    })
  }


  async getFavorite(){
    var email = await AsyncStorage.getItem('Email')
    let formdata = new FormData();
    formdata.append("login", email);
    formdata.append("page", this.page);
    formdata.append("status", 2);    
    fetch('https://panel.versoview.com/mobile/favorite',{
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
      var ada = 0;
      data.map((item,i)=>{
        if (item.page == this.page) ada = 1;
      })

      if (ada == 1)
        this.setState({favoriteIcon: 'ios-heart'})
      else  
        this.setState({favoriteIcon: 'ios-heart-empty'})      
    })
    .catch(err => {
      console.log(err);
    })
  }

  async getPage(){
  	// console.log(this.props.route.params.page)
    var data = await f.fetchData("https://panel.versoview.com/ovjapi/detil_isi_anan/"+ this.props.route.params.magazine + "/" + this.props.route.params.page) 
    dataMagzPage = data
    this.setState({dataMagz: data});
    this.getBookmark();    
    this.getFavorite();    
    // alert(this.props.route.params.page);
    // this.setState({dataMagzPage: data[0].data})
  }

  getPage2(){
    fetch("https://panel.versoview.com/ovjapi/detil_isi_anan/"+ this.props.route.params.magazine + "/" + this.props.route.params.page, {
	    method: 'GET',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	    }
  	}).then((response) => response.json())
    .then((responseData) => {
      	this.setState({dataMagz: responseData});
      	dataMagzPage = responseData;
    })
  }  



  fontText(){
  	this.refs.scroll.scrollTo({y:this.realPosition + 1, x:0, animated:true});
    if (this.state.fontText == 18) {
      this.setState({fontText:24});      
    }else {
      this.setState({fontText:18})    	
    }
  	
    setTimeout(() => {
  		this.refs.scroll.scrollTo({y:this.realPosition + 1, x:0, animated:true});
			setTimeout(() => {
				// console.log(this.h1, this.h2)
				this.proses()
	  	},300)
  	},300)
  }

  proses(){
  	var FT = this.realPosition / this.h1 * 100
  	var FB = this.realPosition / this.h2 * 100
  	if (this.state.fontText == "24")
  		this.refs.scroll.scrollTo({y:(this.h2 * FT / 100)-200, x:0, animated:true});
  	else
  		this.refs.scroll.scrollTo({y:(this.h1 * FB * 100)-200, x:0, animated:true});
  	// console.log('danang', FT)
  }

  // scrollTo(){
  // 	this.refs.scroll.scrollTo({y:10, x:0, animated:true});
  // 	setTimeout(() => {
  // 		this.refs.scroll.scrollTo({y:11, x:0, animated:true});
  // 	},2000)
  // }
    
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
    if (this.props.route.params){
    	if (this.props.route.params.OpenViewNo){
    		if (this.props.route.params.OpenViewNo != this.OpenViewDetNo){
    			this.OpenViewDetNo = this.props.route.params.OpenViewNo;
    			this.getPage2();
    		}

    	}

      if (this.props.route.params.FromMagazine){
        if (this.props.route.params.FromMagazine.state.OpenViewDetNo != OpenViewDetNo2){
          f.lockScreen('portrait');
          BackHandler.addEventListener("hardwareBackPress", this.backAction);
          OpenViewDetNo2 = this.props.route.params.FromMagazine.state.OpenViewDetNo;                   
        }
      } 

      if (this.props.route.params.page){
        // console.log(this.state.array)
        if (pageMagaz != this.props.route.params.page){   
          this.noOPD = this.noOPD + 1;
          pageMagaz = this.props.route.params.page;      
          this.getPage2();
          if (this.refs.scroll) this.refs.scroll.scrollTo({y:0, x:0, animated:true})                    
        }
      }

      if (this.state.array.length > 0){
        this.state.array.map((item,i)=>{
          if ((item.page - 1) == (this.props.route.params.OpenViewNo + 1)){
              if (this.refs.scroll) {
                if (this.state.width < this.state.height)
                  this.refs.scroll.scrollTo({y:item.y, x:0, animated:true})
                else
                  this.refs.scroll.scrollTo({y:0, x:item.y, animated:true})
              }
          }      
        })      
      } 
    }
    if (this.state.dataMagz == undefined)
    return (<View></View>)
    else
    return ( 
      <View style={{flex:1, backgroundColor:GLOBAL.screen1.state.DarkMode == 1 ? this.state.mainBgColor : 'white'}}>
      <HeaderModule ini={this} />
      <ScrollView ref='scroll' 
      	onScroll={(e) => {
      		this.realPosition = e.nativeEvent.contentOffset.y;
      		this.heightScroll = e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;
	      	if (this.flagSFT == 0){
		      	if (this.h1 == 0){
		      		this.h1 = this.heightScroll;
		      	}
		      	if (this.h1 > 0){
			      	if (this.h1 != this.heightScroll){
			      		this.h2 = this.heightScroll;	
			      		this.flagSFT = 1;      		
			      	}	      		
		      	}	      		
	      	}
	      	// console.log(this.realPosition, this.realPosition / this.heightScroll * 100)

      	}}
      > 
        <View style={{paddingVertical:20}} ref={(ref) => this.ref1 = ref}>
          {this.thumbCover((this.props.route.params.OpenViewNo) ? this.props.route.params.OpenViewNo : 0)}         
        </View>           
        <View style={{marginBottom:50}}></View>        
      </ScrollView>      
      <View style={{flex: 1}}>        
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <FooterModule ini={this} page={this.props.route.params.noPage} bookmark={this.state.bookmark} favorite={this.state.favorite} noOPD={this.noOPD}/>
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
