import React, { Component } from "react";
import { Platform, Switch, Image, View, TouchableOpacity } from "react-native";
import {Container, Content, Button, Icon, ListItem, Text, Badge, Left, Right, Body, Header, Title, H1, List } from "native-base";
import HeaderModule from "./headerCenter";

const logo = require("../assets/versoview.png");

class NHListIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: "key1",
      results: {
        items: []
      }
    };
  }
  onValueChange(value: string) {r
    this.setState({
      selected1: value
    });
  }
  render() {
    return (
      <Container style={{backgroundColor: "#F5F5F5"}}>

        <HeaderModule  param='Help' ini={this}/>

        <Content>
          <View style={{margin:20}}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <H1 style={{margin:20}}>Help</H1>
            </View>
            <Text>Lorem Ipsum is simply dummy</Text>
            <Text style={{marginBottom:20}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</Text>
            <Text style={{marginBottom:20}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</Text>
            <Text style={{marginLeft:30}}>Lorem Ipsum is simply dummy text</Text>
            <Text style={{marginLeft:30}}>Lorem Ipsum is simply dummy text</Text>
            <Text style={{marginLeft:30, marginBottom:20}}>Lorem Ipsum is simply dummy text</Text>
            <Text style={{marginBottom:20}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default NHListIcon;
