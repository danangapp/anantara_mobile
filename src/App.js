import React, { Component } from 'react'
import { View, Text, Image, AsyncStorage } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import Home from './home';
import Bookmark from './bookmark';
import Search from './search';
import Profile from './profile';
import ProfileDetail from './profiledetail';
import Notification from './Notification';
import About from './About';
import Magazine from './magazine';
import MagazineDet from './magazineDetail';
import OpenView from './OpenView';
import OpenViewDetail from './OpenViewDetail';
import Help from './Help';
import Term from './Term';
import Privacy from './Privacy';
import Facebook from './facebook';
import Google from './google';
import Twitter from './TwitterButton';
import Login from './Login';
import LoginEmail from './LoginEmail';
import SignUpEmail from './SignUpEmail';
// import About from './About';
const Drawer = createDrawerNavigator();

console.disableYellowBox = true;
const home_icon = require("../assets/home_icon_putih.png");
const search_icon = require("../assets/search_icon_putih.png");
const bookmark_icon = require("../assets/bookmark_icon_putih.png");
const user_icon = require("../assets/user_icon_putih.png");
const Stack = createStackNavigator();
var noBookmark = 0;
function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function ToProfile(navigation) {
  // console.log('danang ya bro')
  var app = new App();
  app.cekId()
  .then((respon) => {
      if (respon == null){
          navigation.navigate('Login')
      }else{
          navigation.navigate('Profile', {name: respon})
      }        
  })
  .catch((error) =>{
    console.error('danang', error);
  });   
}

function CustomDrawerContent({ navigation, progress, ...rest }, param) {
  return (
    <DrawerContentScrollView {...rest}>
      <DrawerItem label={({ focused, color }) => 
        <View style={{flexDirection:'row'}}>
          <Image style={{width:20, height:20, marginRight:15}} source={home_icon} />
          <Text style={{ color:'white' }}>Home</Text>
        </View>
      } onPress={() => navigation.navigate('Home')} />

      <DrawerItem label={({ focused, color }) => 
        <View style={{flexDirection:'row'}}>
          <Image style={{width:15, height:20, marginRight:20}} source={bookmark_icon} />
          <Text style={{ color:'white' }}>Bookmark</Text>
        </View>
      } onPress={() => {
          noBookmark = noBookmark + 1;
          navigation.navigate('Bookmark', {noBookmark : noBookmark, onGoBack: () => this.refresh()})
        }} />
    
      <DrawerItem label={({ focused, color }) => 
        <View style={{flexDirection:'row'}}>
          <Image style={{width:20, height:20, marginRight:15}} source={user_icon} />
          <Text style={{ color:'white' }}>My Profile</Text>
        </View>
      } onPress={() => {
        ToProfile(navigation);      
      }} />

      <View
        style={{
          borderBottomColor: 'white',
          borderBottomWidth: 1,
          marginTop: 280,
          marginBottom: 10,
          marginLeft: 20,
          marginRight: 30,
        }}
      />

      <DrawerItem label={({ focused, color }) => 
        <View style={{flexDirection:'row'}}>
          <Text style={{ color:'white' }}>Notification Settings</Text>
        </View>
      } onPress={() => navigation.navigate('Notification', {onGoBack: () => this.refresh()})} />

      <DrawerItem label={({ focused, color }) => 
        <View style={{flexDirection:'row'}}>
          <Text style={{ color:'white' }}>About</Text>
        </View>
      } onPress={() => navigation.navigate('About', {onGoBack: () => this.refresh()})} />
      
    </DrawerContentScrollView>
  );
}



export default class App extends Component {

  async cekId() {
    return await AsyncStorage.getItem('Name')
  }

  MyDrawer() {
    return (
      <Drawer.Navigator 
        drawerStyle={{backgroundColor:'#FF533D', paddingLeft:30, paddingTop:60}} 
        drawerContent={props => CustomDrawerContent(props, {ini:'ok'})}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Bookmark" component={Bookmark} />
        <Drawer.Screen name="Search" component={Search} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="ProfileDetail" component={ProfileDetail} />
        <Drawer.Screen name="Notification" component={Notification} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="Magazine" component={Magazine} />
        <Drawer.Screen name="MagazineDet" component={MagazineDet} />      
        <Drawer.Screen name="OpenView" component={OpenView} />      
        <Drawer.Screen name="OpenViewDetail" component={OpenViewDetail} />      
        <Drawer.Screen name="Help" component={Help} />      
        <Drawer.Screen name="Term" component={Term} />      
        <Drawer.Screen name="Privacy" component={Privacy} />      
        <Drawer.Screen name="Login" component={Login} />      
        <Drawer.Screen name="LoginEmail" component={LoginEmail} />      
        <Drawer.Screen name="SignUpEmail" component={SignUpEmail} />      
      </Drawer.Navigator>
    );
  }

  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName="Home">
          <Stack.Screen name="Drawer" component={this.MyDrawer} />
          <Stack.Screen name="Bookmark" component={Bookmark} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Magazine" component={Magazine} />
          <Stack.Screen name="MagazineDet" component={MagazineDet} />
          <Stack.Screen name="OpenView" component={OpenView} />
          <Stack.Screen name="OpenViewDetail" component={OpenViewDetail} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Term" component={Term} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="Facebook" component={Facebook} />
          <Stack.Screen name="Google" component={Google} />
          <Stack.Screen name="Twitter" component={Twitter} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="LoginEmail" component={LoginEmail} />
          <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
        </Stack.Navigator>      
      </NavigationContainer>
    );
  }
}
