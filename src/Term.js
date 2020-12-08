import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import HeaderModule from "./headerClose";

export default class Term extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <HeaderModule ini={this}/>
        <WebView source={{ uri: 'https://versoview.com/TermofServices.html' }} />
      </View>
    )
  }
}