import React, { Component } from 'react'
import {Modal, Text, SafeAreaView, View, FlatList, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, Share, ScrollView, BackHandler, Image } from 'react-native'
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import HeaderModule from "./headerClose";
import FooterModule from "./footer";
import func from './function';
import f from './function';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { useNavigation } from '@react-navigation/native';
// import {createImageProgress} from 'react-native-image-progress';
// import FastImage from 'react-native-fast-image';
// const Image = createImageProgress(FastImage);
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
var no = 0;
var noChange = 0;
var noPort = 0;
var noLand = 0;
var noUdh = 0;
var orientFirst, dataMagz, dataMagzPage;
var naek = 1
var lengt
var HomeNo = 0;
var MagazineNo = 0;
var MagazineDetNo = 0;
var OpenViewDetNo = 1000
// const DATA = [
//   {id: 1, title: 'First Item', }, {id: 2, title: 'Second Item', }, {id: 3, title: 'Third Item', }, {id: 4, title: 'Second Item', }, {id: 5, title: 'Third Item', }, {id: 6, title: 'Second Item', }, {id: 7, title: 'Third Item', }, {id: 8, title: 'Second Item', }, {id: 9, title: 'Third Item', }, {id: 10, title: 'Second Item', }, {id: 11, title: 'Third Item', }, {id: 12, title: 'Second Item', }, {id: 13, title: 'Third Item', }, {id: 14, title: 'Third Item', }, {id: 15, title: 'Third Item', }, {id: 16, title: 'Third Item', }, {id: 17, title: 'Third Item', }, {id: 18, title: 'Third Item', }, {id: 19, title: 'Third Item', }, {id: 20, title: 'Third Item', },
// ];
// const imgs = [
//   {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/1.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/2.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/3.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/4.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/5.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/6.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/7.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/8.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/9.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/10.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/11.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/12.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/13.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/14.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/15.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/16.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/17.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/18.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/19.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/20.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/21.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/22.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/23.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/24.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/25.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/26.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/27.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/28.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/29.jpg'}, {'img':'https://agencyfish.com/Garuda_Colours_Magazine/2019/November/files/page/30.jpg'}
// ];
function ToOpenView(param) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {
      BackHandler.removeEventListener("hardwareBackPress", param.ini.backAction);
      param.FromMagazine.generateOpenViewDetNo()
      param.FromMagazine.RemoveListener();
      OpenViewDetNo = OpenViewDetNo + 1;
      // console.log('OpenViewNo', param.OpenViewNo)
      navigation.navigate('OpenViewDetail', {page:param.page, OpenViewNo:param.OpenViewNo - 1, OpenViewDetNo:OpenViewDetNo, FromMagazine:param.FromMagazine})
      // navigation.navigate('OpenView')
    }} style={{flexDirection:"row", marginTop:5}}>
      <Image style={{width:15, height:15, resizeMode: 'contain', marginRight:5}} source={require("../assets/versoview_red_icon.png")}/>                        
      <Text style={{fontSize:12, fontFamily:'PT Serif'}}>OpenView</Text>
    </TouchableOpacity>
  );
}

function ToMagazine(param) {
  const navigation = useNavigation();

  return (
    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', paddingTop:15, paddingBottom:10}}>                    
      <TouchableOpacity onPress={() => {
          param.ini.toMagazineBr();
          navigation.navigate('Magazine', {page:param.page1})
      }}>
        <Image style={{width:param.widthImage, height:param.heightImage}} source={{uri:param.cover1}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        param.ini.toMagazineBr();
        navigation.navigate('Magazine', {page:param.page2})
      }}>
        <Image style={{width:param.widthImage, height:param.heightImage}} source={{uri:param.cover2}}/>
      </TouchableOpacity>
    </View>
  );
}

export default class magazine extends Component {  

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
      heightImage:(Dimensions.get('window').width-40)/2*1.33,
      widthImage:(Dimensions.get('window').width-40)/2,
      dataOpenView:[]
    };
    orientFirst = width < height ? 'portrait' : 'landscape'
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }  

  componentDidMount(){
    this.getPage()
  }

  async getPage(){
    var data = await func.fetchData("https://panel.versoview.com/xhr/api_magz_detil/yzjs0gucd25") 
    dataMagzPage = data[0].thumb
    this.setState({dataMagz: data})
    var dataOpenView = await func.fetchData("https://panel.versoview.com/ovjapi/detil_isi_anantara/0")
    this.setState({dataOpenView: dataOpenView})
    // this.setState({dataMagzPage: data[0].data})
  }

  toMagazineBr(){
    const ini = this.props.route.params.ini;
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    if (ini.props.route.name == 'Magazine'){
      ini.toUnlock();
      ini.AddListenerBackTo();
    }
  }

  backAction = () => {
    this.toMagazineBr();
  };

  thumbCover() {
    var cover1, cover2, page1, page2;
    return dataMagzPage.map((item,i)=>{
        if (i%2 == 1){
          cover1 = item.img;
          page1 = i+1;
        }else{
          cover2 = item.img;
          page2 = i+1;
          var ada = 0;
          var page = '';
          this.state.dataOpenView.map((item,i)=>{
            if (page1 == item.magz_page || page2 == item.magz_page) {
              ada = 1;
              page = item.content;
            }
          })
          return (
              <View style={{paddingHorizontal:20, paddingVertical:20}} ref={(ref) => this.ref1 = ref}>
                <ToMagazine widthImage={this.state.widthImage} heightImage={this.state.heightImage} cover1={cover1} cover2={cover2} page1={page1} page2={page2} ini={this}/>
                <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                  {
                    ada == 1 ? <ToOpenView page={page} OpenViewNo={page1} FromMagazine={this.props.route.params.ini} ini={this} /> : <View></View>
                  } 
                  <Text style={{fontFamily:'PT Serif'}}>{page1 ? page1-2 : ''}{page1&&page2 ? '/' : ''}{page2-2 == -1 ? 'Cover' : page2-2}</Text>
                </View>
              </View>
          )                                
        }
    })    
  }

  
  
  
  render () {
    if (this.props.route.params != undefined){      
      if (this.props.route.params.MagazineNo){
        if (MagazineNo != this.props.route.params.MagazineNo){
          f.lockScreen('portrait');
          BackHandler.addEventListener("hardwareBackPress", this.backAction); 
          MagazineNo = this.props.route.params.MagazineNo;          
        }        
      }
    }
    if (this.state.dataMagz == undefined)
    return (<View></View>)
    else
    return ( 
      <View style={{flex:1}}>
      <ScrollView ref='_scrollView'>        
        <HeaderModule ini={this}/>
        {this.thumbCover()}          
        <View style={{marginVertical:40}}></View>
      </ScrollView> 
      <View style={{flex: 1}}>        
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <FooterModule />
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
