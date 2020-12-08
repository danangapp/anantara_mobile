import React, { Component } from "react";
import { Platform, Switch, Image, View, TextInput, TouchableOpacity, BackHandler } from "react-native";
import {Container, Content, Button, Icon, ListItem, Text, Badge, Left, Right, Body, Header, Title, H1, H3, Item, Input } from "native-base";
import HeaderModule from "./headerClose";
import f from './function';
const logo = require("../assets/versoview.png");
const versoview_logo = require("../assets/versoview_logo.png");
let magazine = { uri:"https://www.agencyfish.com/Garuda_Colours_Magazine/2019/November/files/thumb/1.jpg" } ;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typingTimer:'',
      search:'',
      source:[]
    };
  }

  componentDidMount(){
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  clear(){
    this.setState({search: '', source: '0'});
    f.lockScreen('unlockAllOrientations');
  }

  backAction = () => {    
    this.clear();
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  };

  textSearch(value: string) {
    this.setState({
      search: value
    });

    clearTimeout(this.state.typingTimer);
    this.setState({
      typingTimer: setTimeout(() => {
        fetch('https://panel.versoview.com/mobile/search?find='+value)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({source: responseJson });
          // console.log('length', responseJson)
        })
        .catch((error) =>{
          console.error(error);
        });
      }, 1000)
    })
  }
  
  render() {
    
    var that  = this;
    var contents;
    if (this.state.source != '0')
    contents = this.state.source.map(function (item) {
      const page = item.page - 2;
      return (
        <View style={{flex:1}}>
          <TouchableOpacity style={{flex:1, flexDirection:'row', marginBottom:10}} onPress={() => {that.props.navigation.navigate('Magazine', {page:item.page})}}>
            {/*<Image style={{height:100, width:66}} resizeMode="contain" source={{uri:item.image}} />*/}
            <View style={{flex:1, flexDirection:'column', marginLeft:10}}>
              <H3 style={{fontWeight: "bold", fontSize: 15}}>Hal. {page}</H3>
              <Text style={{flex: 1, flexWrap: 'wrap', justifyContent: 'space-between'}}>{item.detail.substring(0, 50)}</Text>            
            </View>                      
          </TouchableOpacity>
        </View>
      );
    });
    return (
      <Container style={{backgroundColor: "#FFF"}}>

        <HeaderModule ini={this}/>
        <Content>
          <View style={{ flex: 1, margin:10 }}>
            <Item>
              <Icon active name="search" />
              <Input placeholder="Search" onChangeText={(text) => this.textSearch(text) } value={this.state.search}/>
            </Item>
            {/*<TextInput style={{backgroundColor:'#BCB9B9', marginBottom:20, marginTop:20}} onChangeText={(text) => this.textSearch(text) } value={this.state.search} />*/}
            {/*<View style={{borderBottomColor: 'black', borderBottomWidth: 0.3, marginBottom:10 }} />*/}
            {contents}
          </View>
                          
        </Content>
      </Container>
    );
  }
}

export default Search;
