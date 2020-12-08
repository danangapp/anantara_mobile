import React, { Component } from 'react'
import {Modal, Text, SafeAreaView, View, FlatList, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, Share, ScrollView, BackHandler } from 'react-native'
import HeaderModule from "./header";
import FooterModule from "./footer";
import f from './function';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { useNavigation } from '@react-navigation/native';
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
const Image = createImageProgress(FastImage);
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
var no = 0;
var noChange = 0;
var noThumbnail = 0;
var noChangeThumbnail = 0;
var noPort = 0;
var noLand = 0;
var orientFirst;
var lengt;
var noThumb = 0;
var paramPage = '';
var HomeNo = 0;
var MagazineNo = 0;
var NoMagazine = 0;
// var noCover = 0;
// var swipp = 0;

function ButtonMagazineDet(param) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {
        MagazineNo = MagazineNo + 1; 
        navigation.navigate('MagazineDet', {MagazineNo:MagazineNo, ini:param.ini})
        BackHandler.removeEventListener("hardwareBackPress", param.ini.backAction);
    }} style={{marginRight:50}}>
      <Image style={{width:20, height:20, resizeMode: 'contain'}} source={require("../assets/grid_icon.png")}/>
    </TouchableOpacity>
  );
}

function ToOpenView(param) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {
        navigation.navigate('OpenViewDetail', {page:param.page, OpenViewNo:param.i})
    }} style={{flexDirection:"row", marginVertical:5}}>
      <Image style={{width:15, height:15, resizeMode: 'contain', marginRight:5}} source={require("../assets/versoview_red_icon.png")}/>                        
      <Text style={{fontSize:12, fontFamily:'PT Serif'}}>OpenView</Text>
    </TouchableOpacity>
  );
}

function MagazineThumbnail(param) {
  const VarGoTo = (param.ini.state.noThumbnail-1)*4,
        Thumb = param.ini.state.dataMagzThumb,
        Uri = param.i*4,
        ThumbnailWidth = param.ini.state.ThumbnailWidth,
        ThumbnailHeight = param.ini.state.ThumbnailHeight
  return (
    param.i < param.ini.state.noThumbnail+3 && param.i > param.ini.state.noThumbnail-3 ? 
    <View style={{flexDirection:'row'}}>
      <View>
        {param.ada == 1 ? <ToOpenView i={Uri-3} page={(Thumb[Uri-3]) ? Thumb[Uri-3].openview : ''} /> : <View style={{marginVertical:10}}/> }
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => {param.ini.toScroll(VarGoTo+3)}}>
            <Image style={{width:ThumbnailWidth, height:ThumbnailHeight}} source={{uri:(Thumb[Uri-1]) ? Thumb[Uri-1].img : null}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {param.ini.toScroll(VarGoTo+4)}}>
            <Image style={{width:ThumbnailWidth, height:ThumbnailHeight}} source={{uri:(Thumb[Uri]) ? Thumb[Uri].img : null}}/>
          </TouchableOpacity>
        </View>
        {param.ada == 1 ? <ToOpenView i={Uri-3} page={(Thumb[Uri-3]) ? Thumb[Uri-3].openview : ''} /> : <View style={{marginVertical:10}}/> }
      </View>
      
      <View style={{marginHorizontal:10}} />
      
      <View>
        <View style={{marginVertical:10}} />
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => {param.ini.toScroll(VarGoTo+5)}}>
            <Image style={{width:ThumbnailWidth, height:ThumbnailHeight}} source={{uri:(Thumb[Uri+1]) ? Thumb[Uri+1].img : null}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {param.ini.toScroll(VarGoTo+6)}}>
            <Image style={{width:ThumbnailWidth, height:ThumbnailHeight}} source={{uri:(Thumb[Uri+2]) ? Thumb[Uri+2].img : null}}/>
          </TouchableOpacity>
        </View>                
      </View>                
      
    </View>
    : null 
  );
}

function MagazineThumbnailLandscape(param) {
  const VarGoTo = param.i*4,
        Thumb = param.ini.state.dataMagzThumb,
        Uri = param.i*8,
        ThumbnailWidth = param.ini.state.ThumbnailWidth*0.55,
        ThumbnailHeight = param.ini.state.ThumbnailHeight*0.55
  return (
    param.i < param.ini.state.noThumbnail+3 && param.i > param.ini.state.noThumbnail-3 ? 
    <View style={{flexDirection:'row'}}>
      <View>
        {param.ada == 1 ? <ToOpenView i={Uri-7} page={(Thumb[Uri-7]) ? Thumb[Uri-7].openview : ''} /> : <View style={{marginVertical:10}}/> }
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {param.ini.toScrollLandscape(VarGoTo)}}>
          <Image style={{width:ThumbnailWidth, height:ThumbnailHeight}} source={{uri:(Thumb[Uri-1]) ? Thumb[Uri-1].img : null}}/>
          <Image style={{width:ThumbnailWidth, height:ThumbnailHeight}} source={{uri:(Thumb[Uri]) ? Thumb[Uri].img : null}}/>
        </TouchableOpacity>
        {param.ada == 1 ? <ToOpenView i={Uri-7} page={(Thumb[Uri-7]) ? Thumb[Uri-7].openview : ''} /> : <View style={{marginVertical:10}}/> }
      </View>
      
      <View style={{marginHorizontal:10}} />
      
      <View>
        <View style={{marginVertical:10}} />
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {param.ini.toScrollLandscape(VarGoTo+1)}}>
          <Image style={{width:ThumbnailWidth, height:ThumbnailHeight}} source={{uri:(Thumb[Uri+1]) ? Thumb[Uri+1].img : null}}/>
          <Image style={{width:ThumbnailWidth, height:ThumbnailHeight}} source={{uri:(Thumb[Uri+2]) ? Thumb[Uri+2].img : null}}/>
        </TouchableOpacity>
      </View>  

      <View style={{marginHorizontal:10}} />
      
      <View>
        <View style={{marginVertical:10}} />
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {param.ini.toScrollLandscape(VarGoTo+2)}}>
          <Image style={{width:ThumbnailWidth, height:ThumbnailHeight}} source={{uri:(Thumb[Uri+3]) ? Thumb[Uri+3].img : null}}/>
          <Image style={{width:ThumbnailWidth, height:ThumbnailHeight}} source={{uri:(Thumb[Uri+4]) ? Thumb[Uri+4].img : null}}/>
        </TouchableOpacity>
      </View>      

      <View style={{marginHorizontal:10}} />
      
      <View>
        <View style={{marginVertical:10}} />
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {param.ini.toScrollLandscape(VarGoTo+3)}}>
          <Image style={{width:ThumbnailWidth, height:ThumbnailHeight}} source={{uri:(Thumb[Uri+5]) ? Thumb[Uri+5].img : null}}/>
          <Image style={{width:ThumbnailWidth, height:ThumbnailHeight}} source={{uri:(Thumb[Uri+6]) ? Thumb[Uri+6].img : null}}/>
        </TouchableOpacity>
      </View>                
      
    </View>
    : null 
  );
}

function Landscape(param) {
  return (
    param.i < param.ini.state.noLandscape+3 && param.i > param.ini.state.noLandscape-3 ? 
    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      <Image style={{width:(param.ini.state.width-140)/2, height:(param.ini.state.width-140)/2*1.2}} source={{uri:(param.ini.state.dataMagz[(param.i*2)-1]) ? param.ini.state.dataMagz[(param.i*2)-1].img : null}}/>
      <Image style={{width:(param.ini.state.width-140)/2, height:(param.ini.state.width-140)/2*1.2}} source={{uri:(param.ini.state.dataMagz[(param.i*2)]) ? param.ini.state.dataMagz[param.i*2].img : null}}/>
    </View>
    : null
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
      ThumbnailWidth:Dimensions.get('window').width,
      ThumbnailHeight:Dimensions.get('window').height,
      orientation:'',
      no:0,
      noLandscape:0,
      noThumbnail:0,
      nom:1,
      noPort:0,
      noLand:0,
      displayHeader:'flex',
      margin: 10,
      countThumb:0,
      modalVisible: false,
      hideSetPage:'none',
      autoplay: false,
      play:'play-circle-outline', 
      dataMagz:[],
      dataMagzThumb:[],
      dataOpenView:[],
      swipp:0,
      swipe:true,
      noCover:0,
      ganjel:0,
      paddingLeftPortrait:(Dimensions.get('window').width != undefined) ? ((Dimensions.get('window').width - (Dimensions.get('window').width * 3/4)) / 2) : 0,
      heightPortrait:(Dimensions.get('window').width != undefined) ? Dimensions.get('window').width * 3/4 * 4/3 : Dimensions.get('window').height,
      marginTop:Dimensions.get('window').width > Dimensions.get('window').height ? 0 : 30,
    };

    this.delayTime = props.delay ? props.delay : 250;
    this.firstPress = true;
    this.lastTime = new Date();
    this.timer = false;
    this.move = false;
    orientFirst = width < height ? 'portrait' : 'landscape'
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }  

  componentDidMount(){
    this.cekLandscape();
    if (width > height){
      this.setState({orientation:'landscape'})
    }else {
      this.setState({orientation:'portrait'})
    }
    this.generatePage()
    this.getPage()    
    // BackHandler.addEventListener("hardwareBackPress", this.backAction); 
  }

  backAction = () => {
    const ini = this.props.route.params.ini;  
    ini.generateHomeNo();
    f.lockScreen('portrait');
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  };

  async getPage(){
    var data = await f.fetchData("https://panel.versoview.com/xhr/api_magz_detil/yzjs0gucd25") 
    var dataOpenView = await f.fetchData("https://panel.versoview.com/ovjapi/detil_isi_anantara/0")
    this.setState({dataMagz: data[0].data})
    this.setState({dataMagzThumb: data[0].thumb})
    this.setState({dataOpenView: dataOpenView})
    // console.log(this.state.dataMagz)    
  }

  generatePage(){
    var arr
    var array = []
    for(let i = 0; i < 10; i++){
      arr = {firstName:"John", lastName:"Doe", age:46}
      array.push(arr)
    }
    // console.log(array)
    // console.log(array)
  }

  hideSetPage(){
    if (this.state.hideSetPage == 'flex') this.setState({hideSetPage: 'none'})
    else this.setState({hideSetPage: 'flex'})
  }

  getOrientation(width, height){
    this.setState({width: width, countThumb: Math.floor((width-60) / 90), margin:(width%(90+30)) / Math.floor(width / (90+30))})
  }
  
  goHide(){
    if (this.state.displayHeader == 'none') {
      this.setState({displayHeader:'flex'})
    }
    else {
      this.setState({displayHeader:'none', hideSetPage:'none'})
    }
  }

  getNo(e){
    this.setState({no:e})    
  }

  getNoLandscape(e){
    this.setState({noLandscape:e})    
  }

  getNoThumbnail(e){
    this.setState({noThumbnail:e})    
  }

  toScroll(nomor){
    var width = (this.state.width != undefined) ? (this.state.width * 3/4)+this.state.paddingLeftPortrait : this.state.width;
    var no = width*nomor
    if (this.refs.scroll)
      this.refs.scroll.scrollTo({y:0, x:width*nomor, animated:true})
    this.setState({no:nomor})
  }

  toScrollLandscape(nomor){
    var width = this.state.width;
    console.log('warna warni', nomor)
    // console.log('width=>', width, 'statwidth=>', this.state.width)
    var no = width*nomor
    this.refs.scrollLandscape.scrollTo({y:0, x:width*nomor, animated:true})
    this.setState({noLandscape:nomor})
  }

  logOutZoomState = (event, gestureState, zoomableViewEventObject) => {
    this.setState({swipe: zoomableViewEventObject.zoomLevel == 1 ? true : false})
  }

  onPinch = (event, gestureState, zoomableViewEventObject) => {
    this.setState({swipe: zoomableViewEventObject.zoomLevel == 1 ? true : false})
    // console.log('ok bro')
  }

  onZoomAfter = (event, gestureState, zoomableViewEventObject) => {
    if (zoomableViewEventObject.zoomLevel == 1){
      if (this.state.swipe == false){
        this.setState({swipe:true})      
      }
    }else if (zoomableViewEventObject.zoomLevel > 1){
      if (this.state.swipe == true){
        this.setState({swipe:false})
      }
    }
  }

  onMove = (event, gestureState, zoomableViewEventObject) => {
    // console.log('move')
    this.move = true;
  }

  onClick = (event, gestureState, zoomableViewEventObject) => {
    this.click = true;
    let now = new Date().getTime();
    if (this.firstPress) {
      this.firstPress = false;
      this.timer = setTimeout(() => {
        this.props.singleTap ? this.props.singleTap() : null;
        this.firstPress = true;
        this.timer = false;
        if (this.move != true){
          if (this.state.width > this.state.height)
            this.goHide()
        }else{
          this.move = false
        }
      }, this.delayTime);
      this.lastTime = now;
    } else {
      if (now - this.lastTime < this.delayTime) {
        this.timer && clearTimeout(this.timer);
        this.props.doubleTap ? this.props.doubleTap() : null;
        this.firstPress = true;
        this.setState({displayHeader:'none', hideSetPage:'none'})
        // console.log('double tap')
      }
    }
  }

  portrait() {
    return this.state.dataMagz.map((item,i)=>{        
        return (
          <View style={{
            width:(this.state.width != undefined) ? (this.state.width * 3/4)+this.state.paddingLeftPortrait : this.state.width, 
            height:(this.state.width != undefined) ? ((this.state.width * 3/4)+this.state.paddingLeftPortrait) *  1.1 : this.state.width, 
          }}>
            {i < this.state.no+3 && i > this.state.no-3 ?
            <ReactNativeZoomableView 
              onPanResponderGrant={this.onMove} 
              onZoomAfter={this.onZoomAfter} 
              onStartShouldSetPanResponder={this.onClick} 
              onZoomEnd={this.onPinch} 
              onDoubleTapAfter={this.logOutZoomState} 
              minZoom={1}
            >
              <Image /*onLoad={(e)=>console.log(i)}*/ source={{uri:item.img}}
                style={{
                  width:(this.state.width != undefined) ? (this.state.width * 3/4) : this.state.width, 
                  height:(this.state.width != undefined) ? ((this.state.width * 3/4)) * 1.334 : this.state.width, 
                  resizeMode: 'contain'
              }}/>
            </ReactNativeZoomableView>
            : null }
          </View>   
        )
    })       
  }

  landscape() {
    var i;
    var output=[];
    var tempItem, temp
    var kiri, kanan
    const isGenap = (this.state.dataMagz.length % 2) == 0 ? true : false;
    for (i = 0; i < Math.floor(this.state.dataMagz.length / 2) + 1; i++) {  
      if (this.state.dataMagz[i] != undefined){
        tempItem=  (
            <ReactNativeZoomableView 
              onPanResponderGrant={this.onMove} 
              onZoomAfter={this.onZoomAfter} 
              onStartShouldSetPanResponder={this.onClick} 
              onZoomEnd={this.onPinch} 
              onDoubleTapAfter={this.logOutZoomState} 
              minZoom={1}
              style={{width:this.state.width, height:this.state.width*1.1}}
            >
              <Landscape ini={this} i={i}/>      
            </ReactNativeZoomableView>
        )
        output[i] = (tempItem);
      }        
    }

    return output;
    // return <View />
  }

  GoToCover(nomor){
    // console.log('cover ', nomor)
    // this.swiper.scrollBy(Math.floor(nomor - no), true)    
  }


  thumbnail() {
    var i, output=[], temp;
    const isGenap = (this.state.dataMagzThumb.length % 2) == 0 ? true : false;
    if (this.state.dataMagzThumb.length > 0){
      for (i = 0; i < Math.floor(this.state.dataMagzThumb.length / 4) + 1; i++) {
        var no1 = ((i-1)*4);
        var no2 = ((i-1)*4)+1;
        var no3 = ((i-1)*4)+2;
        var no4 = ((i-1)*4)+3;
        var x;
        var ada = 0;
        this.state.dataOpenView.map((item,i)=>{
          if (no1 == item.magz_page || no2 == item.magz_page || no3 == item.magz_page || no4 == item.magz_page)
            ada = 1;
        })        

        temp = (
          <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', width:(this.state.width != undefined) ? (this.state.width * 3/4)+this.state.paddingLeftPortrait : this.state.width}}>
            <MagazineThumbnail ini={this} i={i} ada={ada}/>            
          </View>
        )
        
        output[i] = (temp);
      }      
    }

    return output;
  }

  thumbnailLandscape() {
    var i, output=[], temp;
    const isGenap = (this.state.dataMagzThumb.length % 2) == 0 ? true : false;
    if (this.state.dataMagzThumb.length > 0){
      for (i = 0; i < Math.floor(this.state.dataMagzThumb.length / 8) + 1; i++) {
        var no1 = ((i-1)*4);
        var no2 = ((i-1)*4)+1;
        var no3 = ((i-1)*4)+2;
        var no4 = ((i-1)*4)+3;
        var no5 = ((i-1)*4)+4;
        var no6 = ((i-1)*4)+5;
        var no7 = ((i-1)*4)+6;
        var no8 = ((i-1)*4)+7;
        var x;
        var ada = 0;
        this.state.dataOpenView.map((item,i)=>{
          if (
            no1 == item.magz_page || 
            no2 == item.magz_page || 
            no3 == item.magz_page || 
            no4 == item.magz_page ||
            no5 == item.magz_page ||
            no6 == item.magz_page ||
            no7 == item.magz_page ||
            no8 == item.magz_page
          ) ada = 1;
        })        

        temp = (
          <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', width:(this.state.width != undefined) ? (this.state.width*0.85) : this.state.width}}>
            <MagazineThumbnailLandscape ini={this} i={i} ada={ada}/>            
          </View>
        )
        
        output[i] = (temp);
      }      
    }

    return output;
  }

  async cekLandscape(width, height){
    this.setState({
      width:width, 
      height:height,
      ThumbnailWidth:(width != undefined) ? (width * 3/4/4) - 5 : width,
      ThumbnailHeight:(width != undefined) ? ((width * 3/4/4) - 5) * 4/3 : height,
      noPort:await Math.floor(this.state.noLand*2),
      noLand:await Math.floor(this.state.no/2),
      orientation: await width > height ? 'landscape' : 'portrait',
      marginTop:await width > height ? 0 : 30,
    })

    if (width < height){
      var no = Math.ceil(this.state.noLandscape * 2)
      var widthx = width -this.state.paddingLeftPortrait
      this.refs.scroll.scrollTo({y:0, x:widthx*no, animated:true})
      this.setState({no:no})      
    }else{
      var no = Math.round(this.state.no / 2)
      this.refs.scrollLandscape.scrollTo({y:0, x:width*no, animated:true})
      this.setState({noLandscape:no})
    }
  }  

  
  async shareIt(){
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
      } else {
      }
    }else if (result.action === Share.dismissedAction) {
    }
  }

  
  generateGanjel(){
    this.setState({ganjel:1})  
    BackHandler.addEventListener("hardwareBackPress", this.backAction); 
    // console.log('lewat ganjel')  
  }


  render() {    
    NoMagazine = NoMagazine + 1;
    if (this.props.route.params != undefined){      
      if (this.props.route.params.page){
        if (paramPage != this.props.route.params.page) {
          paramPage = this.props.route.params.page; 
          const page =  paramPage - 1;      
          this.toScroll(page)
        }
      }
      if (this.props.route.params.home){
        if (HomeNo != this.props.route.params.home){
          BackHandler.addEventListener("hardwareBackPress", this.backAction); 
          HomeNo = this.props.route.params.home;          
          f.lockScreen('unlockAllOrientations');
        }        
      }
    }

    if (this.state.ganjel == 1){
      f.lockScreen('unlockAllOrientations');
      this.setState({ganjel:0})
      // console.log('lewat sini ganjel bang')  
    }

    var that = this;
    if (this.state.dataMagz == undefined)
    return (<View></View>)
    else
    return ( 
      <View style={{flex:1}}>
        <View style={{display:this.state.width > this.state.height ? this.state.displayHeader : 'flex'}}>  
          <HeaderModule />
        </View>
        <ScrollView onLayout={(event) => this.cekLandscape(Dimensions.get('window').width, Dimensions.get('window').height)} >        
          <View 
            style={{
              width:this.state.width, 
              height:this.state.width > this.state.height ? this.state.height : this.state.heightPortrait,
              alignSelf:'center', 
              marginTop:this.state.marginTop,
              paddingLeft:this.state.width > this.state.height ? 0 : this.state.paddingLeftPortrait
            }}>

            <ScrollView 
              ref='scroll'
              horizontal={true} 
              decelerationRate={'fast'}
              onMomentumScrollEnd={(e) => {/*console.log('offsett', e.nativeEvent.contentOffset.x);*/this.getNo(Math.round(e.nativeEvent.contentOffset.x/(width-(this.state.width > this.state.height ? 0 : this.state.paddingLeftPortrait))))}}
              scrollToEnd={[{animated: false, duration: 100}]}
              showsHorizontalScrollIndicator={false} 
              pagingEnabled={true}
              display={this.state.width < this.state.height ? 'flex' : 'none'}
            >      
              {this.portrait() != null ? this.portrait() : null}
            </ScrollView>

            <ScrollView 
              ref='scrollLandscape'
              horizontal={true} 
              decelerationRate={'fast'}
              onMomentumScrollEnd={(e) => {this.getNoLandscape(Math.round(e.nativeEvent.contentOffset.x/(this.state.width)))}}
              scrollToEnd={[{animated: false, duration: 100}]}
              showsHorizontalScrollIndicator={false} 
              pagingEnabled={true}
              scrollEnabled={this.state.swipe}
              display={this.state.width < this.state.height ? 'none' : 'flex'}
            >      
              {this.landscape()}
            </ScrollView>

            {this.state.width > this.state.height ? null : 
            <View style={{flexDirection:"row",justifyContent:'space-between', marginTop:10}}>
              <Text style={{fontFamily:'PT Serif'}}>{this.state.no===0?'cover':this.state.no+1}</Text>
              <ButtonMagazineDet ini={this} />
            </View>
            }
          </View>
          
          {this.state.width > this.state.height ? null : 
          <View style={{borderBottomColor: '#5D5D5D', borderBottomWidth: 1, marginVertical:20 }} />  
          }
          
          {this.state.width > this.state.height ? null : 
          <View>
            <View>
              <View style={{
                  width:this.state.width, 
                  height:140, 
                  alignSelf:'center',
                  paddingLeft:(this.state.width != undefined) ? ((this.state.width - (this.state.width * 3/4)) / 2) : 0
                }}>
                <ScrollView 
                  ref='scrollThumbnail'
                  horizontal={true} 
                  decelerationRate={'fast'}
                  onMomentumScrollEnd={(e) => {this.getNoThumbnail(Math.round(e.nativeEvent.contentOffset.x/(width-((this.state.width - (this.state.width * 3/4)) / 2))))}}
                  scrollToEnd={[{animated: false, duration: 100}]}
                  showsHorizontalScrollIndicator={false} 
                  pagingEnabled={true}
                >      
                  {this.thumbnail()}
                </ScrollView>
              </View>               
            </View>               
            <View style={{marginVertical:60}} />
          </View>
          }               
          
          
        </ScrollView>
        <View style={{flex: 1, display:this.state.width > this.state.height ? this.state.displayHeader : 'flex'}}>        
          <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
              <View style={{marginBottom:10, marginLeft:(this.state.width != undefined) ? -((this.state.width - (this.state.width * 3/4)) / 2) : 0}}>
                <View style={{
                    width:this.state.width, 
                    height:150, 
                    alignSelf:'center',
                    paddingLeft:(this.state.width != undefined) ? ((this.state.width - (this.state.width * 0.75)) / 2) : 0
                  }}>
                  <ScrollView 
                    ref='scrollThumbnailLandscape'
                    horizontal={true} 
                    decelerationRate={'fast'}
                    onMomentumScrollEnd={(e) => {this.getNoThumbnail(Math.round(e.nativeEvent.contentOffset.x/(width-((this.state.width - (this.state.width * 3/4)) / 2))))}}
                    scrollToEnd={[{animated: false, duration: 100}]}
                    showsHorizontalScrollIndicator={false} 
                    pagingEnabled={true}
                  >      
                    {this.thumbnailLandscape()}
                  </ScrollView>
                </View>               
              </View>               
            <FooterModule NoMagazine={NoMagazine} />
          </View>
        </View>
      </View>
      
    )
  }
}
