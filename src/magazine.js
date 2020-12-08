import React, { Component } from 'react'
import {
  Text, View, Dimensions,
  TouchableOpacity, Share, ScrollView, BackHandler, Image, AsyncStorage, ActivityIndicator, StyleSheet
} from 'react-native'
import HeaderModule from "./headerClose";
import FooterModule from "./footerLandscape";
import FooterPortrait from "./footerPortraitFull";
import f from './function';
import ImageZoom from 'react-native-image-pan-zoom';
import { useNavigation } from '@react-navigation/native';
import GLOBAL from './global.js'

const full_icon = require("../assets/full.png");
const grid_icon = require("../assets/grid_icon.png");
const full_icon_dark = require("../assets/full_icon-dark.png");
const grid_icon_dark = require("../assets/grid_icon-dark.png");
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
var orientFirst;
var paramPage = '';
var HomeNo = 0;
var MagazineNo = 0;
var NoMagazine = 0;
var OpenViewDetNo = 1;
var full = 0;
var FF = 0;
const api_magz_detl = "https://panel.versoview.com/xhr/api_magz_detl/";

function ButtonMagazineDet(param) {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => {
        full = 1;
        FF = 1;
        param.ini.cekOpenView('Portrait');
        param.ini.setState({
          heightPortrait: height,
          full: 1,
          displayHeader: 'none'
        });
        param.ini.toScroll(param.ini.state.no);
      }}>
        <Image style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 8 }} source={GLOBAL.screen1.state.DarkMode == 1 ? full_icon_dark : full_icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        MagazineNo = MagazineNo + 1;
        param.ini.generateOpenViewDetNo()
        param.ini.RemoveListener();
        navigation.navigate('MagazineDet', { MagazineNo: MagazineNo, ini: param.ini })
        // BackHandler.removeEventListener("hardwareBackPress", param.ini.backAction);
      }} style={{ marginRight: 50 }}>
        <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={GLOBAL.screen1.state.DarkMode == 1 ? grid_icon_dark : grid_icon} />
      </TouchableOpacity>
    </View>
  );
}

function ToOpenView(param) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => {
      param.ini.generateOpenViewDetNo()
      param.ini.RemoveListener();
      navigation.navigate('OpenViewDetail', { page: param.page, OpenViewNo: param.i, OpenViewDetNo: OpenViewDetNo, FromMagazine: param.ini, magazine: param.magazine })
    }} style={{ flexDirection: "row", marginTop: 5 }}>
      <Image style={{ width: 15, height: 15, resizeMode: 'contain', marginRight: 5 }} source={require("../assets/versoview_red_icon.png")} />
      <Text style={{ fontSize: 12, fontFamily: 'PT Serif', color: GLOBAL.screen1.state.DarkMode == 1 ? 'white' : 'black' }}>OpenView</Text>
    </TouchableOpacity>
  );
}

function MagazineThumbnail(param) {
  const { noThumbnail, dtM, ThumbnailWidth, ThumbnailHeight } = param.ini.state;
  const VarGoTo = (noThumbnail - 1) * 4,
    Thumb = dtM,
    Uri = param.i * 4
  const page1 = VarGoTo + 3, page2 = VarGoTo + 4, page3 = VarGoTo + 5, page4 = VarGoTo + 6;

  return (
    <View style={{ flexDirection: 'row' }}>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => { param.ini.toScroll(page1) }}>
            {
              (Thumb[Uri - 1]) ?
                <Image style={{ width: ThumbnailWidth, height: ThumbnailHeight }} source={{ uri: Thumb[Uri - 1].t }} />
                :
                <View style={{ width: ThumbnailWidth, height: ThumbnailHeight }}></View>
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { param.ini.toScroll(page2) }}>
            {
              (Thumb[Uri]) ?
                <Image style={{ width: ThumbnailWidth, height: ThumbnailHeight }} source={{ uri: Thumb[Uri].t }} />
                :
                <View style={{ width: ThumbnailWidth, height: ThumbnailHeight }}></View>
            }
          </TouchableOpacity>
        </View>
        {(Thumb[Uri - 1]) ? (Thumb[Uri - 1].content != null) ? <ToOpenView magazine={Thumb[Uri - 1].id} ini={param.ini} i={Uri - 1} page={(Thumb[Uri - 1]) ? Thumb[Uri - 1].content : ''} /> : <View style={{ marginVertical: 10 }} /> : <View style={{ marginVertical: 10 }} />}
      </View>

      <View style={{ marginHorizontal: 10 }} />

      <View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => { param.ini.toScroll(page3) }}>
            {
              (Thumb[Uri + 1]) ?
                <Image style={{ width: ThumbnailWidth, height: ThumbnailHeight }} source={{ uri: Thumb[Uri + 1].t }} />
                :
                <View style={{ width: ThumbnailWidth, height: ThumbnailHeight }}></View>
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { param.ini.toScroll(page4) }}>
            {
              (Thumb[Uri + 2]) ?
                <Image style={{ width: ThumbnailWidth, height: ThumbnailHeight }} source={{ uri: Thumb[Uri + 2].t }} />
                :
                <View style={{ width: ThumbnailWidth, height: ThumbnailHeight }}></View>
            }
          </TouchableOpacity>
        </View>
        {(Thumb[Uri + 1]) ? (Thumb[Uri + 1].content != null) ? <ToOpenView magazine={Thumb[Uri - 1].id} ini={param.ini} i={Uri + 1} page={(Thumb[Uri + 1]) ? Thumb[Uri + 1].content : ''} /> : <View style={{ marginVertical: 10 }} /> : <View style={{ marginVertical: 10 }} />}
      </View>

    </View>
    /*: null */
  );
}

function Landscape(param) {
  return (
    param.i < param.ini.state.noLandscape + 3 && param.i > param.ini.state.noLandscape - 3 ?
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {
          (param.ini.state.dtM[(param.i * 2) - 1]) ?
            <Image style={{ width: (param.ini.state.width - 160) / 2, height: (param.ini.state.width - 140) / 2 * 1.2 }} source={{ uri: param.ini.state.dtM[(param.i * 2) - 1].m }} />
            :
            <View style={{ width: (param.ini.state.width - 160) / 2, height: (param.ini.state.width - 140) / 2 * 1.2 }}></View>
        }
        {
          (param.ini.state.dtM[(param.i * 2)]) ?
            <Image style={{ width: (param.ini.state.width - 160) / 2, height: (param.ini.state.width - 140) / 2 * 1.2 }} source={{ uri: param.ini.state.dtM[(param.i * 2)].m }} />
            :
            <View style={{ width: (param.ini.state.width - 160) / 2, height: (param.ini.state.width - 140) / 2 * 1.2 }}></View>
        }

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
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      ThumbnailWidth: Dimensions.get('window').width,
      ThumbnailHeight: Dimensions.get('window').height,
      orientation: '',
      no: 0,
      noLandscape: 0,
      noThumbnail: 0,
      nom: 1,
      noPort: 0,
      noLand: 0,
      displayHeader: 'none',
      margin: 10,
      countThumb: 0,
      modalVisible: false,
      hideSetPage: 'none',
      autoplay: false,
      play: 'play-circle-outline',
      dtM: [],
      dtMT: [],
      dtOV: [],
      swipp: 0,
      swipe: true,
      noCover: 0,
      ganjel: 0,
      adaOpenView: 0,
      PageOpenView: 0,
      OpenViewDetNo: 1,
      paddingLeftPortrait: (Dimensions.get('window').width != undefined) ? ((Dimensions.get('window').width - (Dimensions.get('window').width * 3 / 4)) / 2) : 0,
      heightPortrait: (Dimensions.get('window').width != undefined) ? Dimensions.get('window').width * 3 / 4 * 4 / 3 : Dimensions.get('window').height,
      marginTop: Dimensions.get('window').width > Dimensions.get('window').height ? 0 : 30,
      mainColor: '#FFFFFF',
      mainBgColor: '#1F1B24',
      Loading: 1,
      full: 0
    };

    this.delayTime = props.delay ? props.delay : 250;
    this.firstPress = true;
    this.lastTime = new Date();
    this.timer = false;
    this.move = false;
    this.ganjelFull = 0;
    this.search = 0;
    orientFirst = width < height ? 'portrait' : 'landscape'
  }

  async getNightMode() {
    return await AsyncStorage.getItem('NightMode');
  }

  async setNightMode(NightMode) {
    AsyncStorage.setItem('NightMode', NightMode);
  }

  async cekNightMode() {
    var NightMode = await this.getNightMode();
    if (NightMode == 'white')
      this.setState({ select1: false, mainColor: '#696969', mainBgColor: 'white' })
    else
      this.setState({ select1: true, mainColor: '#FFFFFF', mainBgColor: '#1F1B24' })
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  closePortraitFull() {
    full = 0;
    this.setState({
      heightPortrait: (this.state.width != undefined) ? this.state.width * 3 / 4 * 4 / 3 : this.state.height,
      full: 0,
      displayHeader: 'flex'
    });

    f.lockScreen('portrait');
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);

    if (this.state.width < this.state.height)
      this.toScroll(this.state.no)
  }



  componentDidMount() {
    this.cekLandscape();
    if (width > height) {
      this.setState({ orientation: 'landscape', displayHeader: 'none' })
    } else {
      this.setState({ orientation: 'portrait' })
    }
    this.generatePage()
    this.getPage()
  }

  backAction = () => {
    f.lockScreen('portrait');
    if (this.props.route.params) {
      if (this.props.route.params.ini) {
        const ini = this.props.route.params.ini;
        if (ini.props) {
          if (ini.props.route.name == 'Home') {
            ini.generateHomeNo();
          }
        }
      }
    }
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  };

  removeLockScreen() {
    f.lockScreen('portrait');
    if (this.props.route.params) {
      if (this.props.route.params.ini) {
        const ini = this.props.route.params.ini;
        if (ini.props) {
          if (ini.props.route.name == 'Home') {
            ini.generateHomeNo();
          }
        }
      }
    }
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    this.props.navigation.goBack(null);
  }

  AddListenerBack() {
    // this.toScroll(0)
    f.lockScreen('unlockAllOrientations');
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  AddListenerBackTo() {
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  async getPage() {
    const { home, magazine } = this.props.route.params;
    if (home) {
      const dt = await f.fetchData(api_magz_detl + magazine)
      this.setState({ dtM: dt })
    }
  }

  getPage2(mag = '', nomor = 0) {
    fetch(api_magz_detl + mag, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((responseData) => {
        this.setState({ dtM: responseData })
        setTimeout(() => {
          var width = (this.state.width != undefined) ? (this.state.width * 3 / 4) + this.state.paddingLeftPortrait : this.state.width;
          var no = width * nomor
          if (this.refs.scroll) {
            this.refs.scroll.scrollTo({ y: 0, x: width * nomor, animated: true })
            if (this.state.width < this.state.height) {
              this.toScrollThumbnail(nomor)
            }
          }
          this.setState({ no: this.state.width < this.state.height ? nomor : (nomor) * 2 })
        }, 1000
        )
      })

  }

  generateOpenViewDetNo() {
    OpenViewDetNo = OpenViewDetNo + 1;
    this.setState({ OpenViewDetNo: this.state.OpenViewDetNo + 1 })
  }

  RemoveListener() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }

  generatePage() {
    var arr
    var array = []
    for (let i = 0; i < 10; i++) {
      arr = { firstName: "John", lastName: "Doe", age: 46 }
      array.push(arr)
    }
  }

  hideSetPage() {
    if (this.state.hideSetPage == 'flex') this.setState({ hideSetPage: 'none' })
    else this.setState({ hideSetPage: 'flex' })
  }

  getOrientation(width, height) {
    this.setState({ width: width, countThumb: Math.floor((width - 60) / 90), margin: (width % (90 + 30)) / Math.floor(width / (90 + 30)) })
  }

  goHide() {
    if (this.state.width > this.state.height)
      this.toScroll(this.state.noLandscape)
    if (this.state.displayHeader == 'none') {
      this.setState({ displayHeader: 'flex' })
    }
    else {
      this.setState({ displayHeader: 'none', hideSetPage: 'none' })
    }
  }

  getNo(e) {
    this.setState({ no: e })
    if (this.state.width < this.state.height) {
      this.toScrollThumbnail(e)
    }

    var ada = 0;
    this.state.dtM.map((item, i) => {
      if (ada === 0) {
        if (item.magz_page - 1 == e) {
          ada = 1;
          this.setState({ PageOpenView: item.content })
        }
      }
    })
    this.setState({ adaOpenView: ada == 1 ? 1 : 0 })
  }

  cekOpenView(Orientation) {
    var ada = 0;
    this.state.dtM.map((item, i) => {
      if (ada === 0) {
        if (Orientation == 'Portrait') {
          if (item.magz_page - 1 == this.state.no) {
            ada = 1;
            this.setState({ PageOpenView: item.content })
          }
        } else {
          if (item.magz_page == (this.state.noLandscape * 2)) {
            ada = 1;
            this.setState({ PageOpenView: item.content })
          }
        }
      }
    })
    this.setState({ adaOpenView: ada == 1 ? 1 : 0 })
  }

  getNoLandscape(e) {
    this.setState({ noLandscape: e })
    var ada = 0;
    this.state.dtM.map((item, i) => {
      if (ada === 0) {
        if (item.magz_page == (e * 2)) {
          ada = 1;
          this.setState({ PageOpenView: item.content })
        }
      }
    })

    this.setState({ adaOpenView: ada == 1 ? 1 : 0 })
  }

  getNoThumbnail(e) {
    this.setState({ noThumbnail: e })
  }

  toScroll(nomor) {
    var width = (this.state.width != undefined) ? (this.state.width * 3 / 4) + this.state.paddingLeftPortrait : this.state.width;
    if (full == 1) width = this.state.width
    var no = width * nomor
    if (this.refs.scroll) {
      this.refs.scroll.scrollTo({ y: 0, x: width * nomor, animated: true })
      if (this.state.width < this.state.height) {
        this.toScrollThumbnail(nomor)
      }
    } else this.toScroll2(nomor)
    this.setState({ no: this.state.width < this.state.height ? nomor : (nomor) * 2 })
  }

  toScroll2(nomor) {
    var mag = (this.props.route.params.magazine) ? this.props.route.params.magazine : 'yzJS0GUCd25';
    this.getPage2(mag, nomor);
  }

  toScrollThumbnail(nomor) {
    var no = Math.round((nomor + 3) / 4) - 1;
    var w = width * 0.875;
    if (this.refs.scrollThumbnail) {
      // console.log('kesini ya ren', nomor)
      this.refs.scrollThumbnail.scrollTo({ y: 0, x: w * no, animated: true })
      this.setState({ noThumbnail: no })
    } else {
      setTimeout(() => {
        if (this.refs.scrollThumbnail) {
          this.refs.scrollThumbnail.scrollTo({ y: 0, x: w * no, animated: true })
          this.setState({ noThumbnail: no })
        }
      }, 300)
    }
  }

  toScrollLandscape(nomor) {
    var width = (this.state.width != undefined) ? (this.state.width - 140) / 2 : this.state.width;
    var no = width * nomor
    this.refs.scrollLandscape.scrollTo({ y: 0, x: width * nomor, animated: true })
    this.setState({ noLandscape: nomor })
  }

  logOutZoomState = (event, gestureState, zoomableViewEventObject) => {
    this.setState({ swipe: zoomableViewEventObject.zoomLevel == 1 ? true : false })
  }

  onPinch = (event, gestureState, zoomableViewEventObject) => {
    this.setState({ swipe: zoomableViewEventObject.zoomLevel == 1 ? true : false })
  }

  onZoomAfter = (event, gestureState, zoomableViewEventObject) => {
    if (zoomableViewEventObject.zoomLevel == 1) {
      if (this.state.swipe == false) {
        this.setState({ swipe: true })
      }
    } else if (zoomableViewEventObject.zoomLevel > 1) {
      if (this.state.swipe == true) {
        this.setState({ swipe: false })
      }
    }
  }

  onMove = (event, gestureState, zoomableViewEventObject) => {
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
        if (this.move != true) {
          if (this.state.width > this.state.height)
            this.goHide()
        } else {
          this.move = false
        }
      }, this.delayTime);
      this.lastTime = now;
    } else {
      if (now - this.lastTime < this.delayTime) {
        this.timer && clearTimeout(this.timer);
        this.props.doubleTap ? this.props.doubleTap() : null;
        this.firstPress = true;
        this.setState({ displayHeader: 'none', hideSetPage: 'none' })
      }
    }
  }

  setLoading(i) {
    if (this.state.Loading == 1) {
      if (i == 0) {
        setTimeout(
          function () {
            this.setState({ Loading: 0 })
          }
            .bind(this),
          1000
        );
      }
    }
  }

  portrait() {
    var paddingLeftPortrait = full == 0 ? this.state.paddingLeftPortrait : 0;
    var wdView = (this.state.width != undefined) ? (this.state.width * 3 / 4) + paddingLeftPortrait : this.state.width;
    var hgView = (this.state.width != undefined) ? ((this.state.width * 3 / 4) + paddingLeftPortrait) * 1.1 : this.state.width;
    var wdImage = (this.state.width != undefined) ? (this.state.width * 3 / 4) : this.state.width;
    var hgImage = (this.state.width != undefined) ? ((this.state.width * 3 / 4)) * 1.234 : this.state.width;
    // console.log('length', this.state.dtM)
    return this.state.dtM.map((item, i) => {
      return (
        <View style={{
          width: full == 0 ? wdView : this.state.width,
          height: full == 0 ? hgView : this.state.height,
        }}>
          {i < this.state.no + 3 && i > this.state.no - 3 ?
            <ImageZoom
              cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height}
              imageWidth={Dimensions.get('window').width}
              imageHeight={Dimensions.get('window').height}
              minScale={1}
              doubleClickInterval={250}
              enableCenterFocus={false}
              onClick={() => { this.goHide() }}
            >
              <Image source={{ uri: item.m }}
                onLoad={() => { this.setLoading(i) }}
                style={{
                  width: full == 0 ? wdImage : this.state.width,
                  height: full == 0 ? hgImage : this.state.height,
                  resizeMode: 'contain'
                }} />
            </ImageZoom>

            : <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" /></View>}
        </View>
      )
    })
  }

  landscape() {
    var i;
    var output = [];
    var tempItem, temp
    var kiri, kanan
    const isGenap = (this.state.dtM.length % 2) == 0 ? true : false;
    for (i = 0; i < Math.floor(this.state.dtM.length / 2) + 1; i++) {
      if (this.state.dtM[i] != undefined) {
        tempItem = (
          <View style={{ flex: 1, width: this.state.width, height: this.state.height }}>
            <ImageZoom
              cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height}
              imageWidth={Dimensions.get('window').width}
              imageHeight={Dimensions.get('window').height}
              minScale={1}
              doubleClickInterval={250}
              enableCenterFocus={false}
              onClick={() => { this.goHide() }}
            >
              <Landscape ini={this} i={i} />
            </ImageZoom>
          </View>

        )
        output[i] = (tempItem);
      }
    }

    return output;
    // return <View />
  }

  GoToCover(nomor) {
    // this.swiper.scrollBy(Math.floor(nomor - no), true)    
  }

  toUnlock = () => {
    f.lockScreen('unlockAllOrientations');
    // BackHandler.addEventListener("hardwareBackPress", this.backAction); 
  }


  thumbnail() {
    var i, output = [], temp;
    const isGenap = (this.state.dtM.length % 2) == 0 ? true : false;
    if (this.state.dtM.length > 0) {
      for (i = 0; i < Math.floor(this.state.dtM.length / 4) + 1; i++) {
        var no1 = ((i - 1) * 4);
        var no2 = ((i - 1) * 4) + 1;
        var no3 = ((i - 1) * 4) + 2;
        var no4 = ((i - 1) * 4) + 3;
        var x;
        temp = (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: (this.state.width != undefined) ? (this.state.width * 3 / 4) + this.state.paddingLeftPortrait : this.state.width }}>
            <MagazineThumbnail ini={this} i={i} />
          </View>
        )

        output[i] = (temp);
      }
    }

    return output;
  }

  async cekLandscape(width, height) {
    if (this.state.width != undefined) {
      if (this.state.width < this.state.height && full == 0) {
        this.setState({
          heightPortrait: this.state.width * 3 / 4 * 4 / 3,
          hideSetPage: 'none',
        })
      }
    }

    if (this.state.orientation != 'landscape' && width > height) {
      this.setState({
        displayHeader: height < width ? 'none' : this.state.full == 0 ? 'flex' : 'none',
      })
    }

    this.setState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      ThumbnailWidth: (width != undefined) ? (width * 3 / 4 / 4) - 5 : width,
      ThumbnailHeight: (width != undefined) ? ((width * 3 / 4 / 4) - 5) * 4 / 3 : height,
      noPort: await Math.floor(this.state.noLand * 2),
      noLand: await Math.floor(this.state.no / 2),
      orientation: width > height ? 'landscape' : 'portrait',
      marginTop: await width > height ? 0 : 30,
      paddingLeftPortrait: (Dimensions.get('window').width != undefined) ? ((Dimensions.get('window').width - (Dimensions.get('window').width * 3 / 4)) / 2) : 0
    })

    if (width < height) {
      this.setState({
        displayHeader: 'flex',
      })
    }

    console.log(this.state.paddingLeftPortrait)



    if (width < height) {
      var no = FF == 0 ? Math.ceil(this.state.noLandscape * 2) : Math.ceil(this.state.no);
      var widthx = width - this.state.paddingLeftPortrait
      var noThumb = Math.round((no + 3) / 4) - 1;
      var w = width * 0.875;
      if (FF == 0) {
        no = no > 0 ? no - 1 : 0;
        this.refs.scroll.scrollTo({ y: 0, x: widthx * no, animated: true })
        this.refs.scrollThumbnail.scrollTo({ y: 0, x: w * noThumb, animated: true })
        this.setState({ no: no })
      } else {
        if (full == 0) {
          FF = 0;
        }
      }
    } else {
      if (full == 1) this.closePortraitFull()
      var no = Math.round(this.state.no / 2)
      this.refs.scrollLandscape.scrollTo({ y: 0, x: width * no, animated: true })
      this.setState({ noLandscape: no, paddingLeftPortrait: (Dimensions.get('window').width != undefined) ? ((Dimensions.get('window').width - (Dimensions.get('window').width * 3 / 4)) / 2) : 0 })
      this.cekOpenView('Landscape')
    }
  }


  async shareIt() {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
      } else {
      }
    } else if (result.action === Share.dismissedAction) {
    }
  }


  generateGanjel() {
    this.setState({ ganjel: 1 })
  }

  async cekLogin() {
    if (await this.getName() != null)
      this.props.navigation.navigate('Profile');
    else
      this.props.navigation.navigate('Login');
  }

  async getName() {
    return await AsyncStorage.getItem('Name')
  }

  scrollToPage() {
    const page = paramPage - 1;
    paramPage = this.props.route.page;
    this.toScroll(page)
  }

  backToPage() {
    this.setState({ Loading: 1 });
    this.getPage()
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
    HomeNo = this.props.route.params.home;
    this.toScroll(0)
    f.lockScreen('unlockAllOrientations');
  }

  unlockTo() {
    OpenViewDetNo = params.OpenViewDetNo;
    f.lockScreen('unlockAllOrientations');
    this.AddListenerBackTo()
  }

  beforeRender() {
    const { params } = this.props.route;
    const { Loading } = this.state;
    if (params != undefined) {
      if (params.page) {
        if (Loading == 1) this.setState({ Loading: 0 })
        this.setLoading(0);

        if (paramPage != params.page) {
          this.scrollToPage();
        }
      }

      if (params.home) {
        if (HomeNo != params.home) {
          this.backToPage();
        }
      }

      if (params.OpenViewDetNo) {
        if (params.OpenViewDetNo != OpenViewDetNo) {
          this.unlockTo();
        }
      }
    }


    if (this.refs.scrollThumbnail) {
      if (full != this.ganjelFull) {
        this.toScrollThumbnail(this.state.no)
        this.ganjelFull = full;
      }
    }
  }

  render() {
    NoMagazine = NoMagazine + 1;
    const { params } = this.props.route;
    const { Loading, dtM, mainBgColor, displayHeader, heightPortrait, full, swipe } = this.state;
    this.beforeRender();

    var paddingLeftPortrait = full == 0 ? this.state.paddingLeftPortrait : 0;
    var that = this;
    if (dtM == undefined)
      return (<View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" /></View>)
    else
      return (
        <View style={{ flex: 1, backgroundColor: GLOBAL.screen1.state.DarkMode == 1 ? mainBgColor : '#F5F5F5' }}>
          <View style={{ display: displayHeader, zIndex: 1 }}>
            <HeaderModule ini={this} />
          </View>

          <View style={s.view1} onLayout={(event) => this.cekLandscape(Dimensions.get('window').width, Dimensions.get('window').height)} >
            {Loading == 1 ?
              <View style={s.view2}><ActivityIndicator size="large" /></View>
              :
              <View></View>
            }

            <View
              style={{
                width: this.state.width,
                height: this.state.width > this.state.height ? this.state.height : full == 0 ? heightPortrait : heightPortrait - 30,
                alignSelf: 'center',
                marginTop: width < height ? full == 1 ? (displayHeader == 'none' ? 0 : -30) : 0 : 0,
                paddingLeft: this.state.width > this.state.height ? 0 : paddingLeftPortrait
              }}>
              <ScrollView
                ref='scroll'
                horizontal
                decelerationRate={'fast'}
                onMomentumScrollEnd={(e) => { this.getNo(Math.round(e.nativeEvent.contentOffset.x / (width - (this.state.width > this.state.height ? 0 : paddingLeftPortrait)))) }}
                scrollToEnd={[{ animated: false, duration: 100 }]}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                scrollEnabled={swipe}
                display={this.state.width < this.state.height ? 'flex' : 'none'}
              >
                {this.portrait() != null ? this.portrait() : null}
              </ScrollView>

              <ScrollView
                ref='scrollLandscape'
                horizontal={true}
                decelerationRate={'fast'}
                onMomentumScrollEnd={(e) => { this.getNoLandscape(Math.round(e.nativeEvent.contentOffset.x / (this.state.width))) }}
                scrollToEnd={[{ animated: false, duration: 100 }]}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                scrollEnabled={this.state.swipe}
                display={this.state.width < this.state.height ? 'none' : 'flex'}
                style={{ flex: 1 }}
              >
                {this.landscape()}
              </ScrollView>

              {this.state.width > this.state.height ? null :
                full == 1 ? null :
                  <View style={s.view4}>
                    <ButtonMagazineDet ini={this} />
                  </View>
              }
            </View>

            {this.state.width > this.state.height ? null :
              full == 1 ? null :
                <View>
                  {this.state.width > this.state.height ? null :
                    this.state.full == 1 ? null :
                      <View style={{ borderBottomColor: '#5D5D5D', borderBottomWidth: 1, marginVertical: this.state.height < 550 ? 0 : 20, marginTop: this.state.height < 550 ? 10 : 20 }} />
                  }
                  <View style={{ marginLeft: (this.state.width != undefined) ? - (this.state.width * 0.125) : 0 }}>
                    <View style={{
                      width: this.state.width,
                      height: 120,
                      alignSelf: 'center',
                      paddingLeft: (this.state.width != undefined) ? ((this.state.width - (this.state.width * 3 / 4)) / 2) : 0
                    }}>
                      <ScrollView
                        ref='scrollThumbnail'
                        horizontal={true}
                        decelerationRate={'fast'}
                        onMomentumScrollEnd={(e) => { this.getNoThumbnail(Math.round(e.nativeEvent.contentOffset.x / (width - ((this.state.width - (this.state.width * 3 / 4)) / 2)))) }}
                        scrollToEnd={[{ animated: false, duration: 100 }]}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                      >
                        {this.thumbnail()}
                      </ScrollView>
                    </View>
                  </View>
                  <View style={{ marginVertical: 60 }} />
                </View>
            }
          </View>
          <View style={{ display: this.state.width > this.state.height ? this.state.displayHeader : full == 1 ? 'none' : 'flex' }}>
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
              <FooterModule
                Home={params.ini}
                NoMagazine={NoMagazine}
                FromMagazine={this}
                OpenViewDetNo={OpenViewDetNo}
              />
            </View>
          </View>
          <View style={{ display: this.state.width < this.state.height && full == 1 ? this.state.displayHeader : 'none' }}>
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
              <FooterPortrait
                Home={params.ini}
                NoMagazine={NoMagazine}
                FromMagazine={this}
                OpenViewDetNo={OpenViewDetNo}
              />
            </View>
          </View>
        </View>

      )
  }
}


const s = StyleSheet.create({
  view1: {
    alignItems: 'center', justifyContent: 'center', flex: 1
  },
  view2: {
    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', width, height, backgroundColor: '#F5F5F5', zIndex: 2
  },
  view4: {
    alignSelf: 'flex-end', marginTop: 10
  }
});