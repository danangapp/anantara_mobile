import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity,
  View,
  ListView,
  BackHandler,
  I18nManager,
  AsyncStorage
} from "react-native";
import {
  Container,
  Right,
  Left,
  Content,
  Body,
  Header,
  Icon,
  Button,
  Title
} from "native-base";
import HeaderModule from "./headerCenter";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles_profile";

const profileImg =
  "https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg";

export default class ProfileAccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};        
  }

  getProfile(){
    AsyncStorage.getItem('Name', (error, result) => {
        if (result) {
            this.setState({
                name: result
            });
        }
    });    
  }

  render() {
    console.log(this.state.name)
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container style={styles.main}>
        <HeaderModule ini={this}/>
        <Content>
          <Image source={{ uri: profileImg }} style={styles.profileImg} />
          {/*<Text style={styles.nameTxt}>Johnie Cornwall</Text>
          <Text style={styles.designationTxt}>Graphic Design</Text>*/}
          <View style={styles.dividerHorizontal} />
          <View style={styles.accountInfoBg}>
            <Text style={styles.accountInfoTxt}>ACCOUNT INFORMATION</Text>
          </View>
          <View style={styles.dividerHorizontal} />
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Name</Text>
              <Text style={styles.infoFieldDetailTxt}>{this.props.route.params.name}</Text>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Email</Text>
              <Text style={styles.infoFieldDetailTxt}>
                johnie_cornwall@gmail.com
              </Text>
            </View>
            <View style={styles.fieldDivider} />
          </View>          
          <View style={styles.infoFieldBg}>
            <Button transparent style={{backgroundColor: '#f1f1f1', justifyContent:'center'}}>
              <Text style={{color: "#6f6f6f", fontSize: 14, alignSelf: 'center'}}>Change Password</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
  _renderTruncatedFooter = handlePress => {
    return (
      <Text style={styles.viewMoreLessTxt} onPress={handlePress}>
        View more
      </Text>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <Text style={styles.viewMoreLessTxt} onPress={handlePress}>
        View less
      </Text>
    );
  };
}
