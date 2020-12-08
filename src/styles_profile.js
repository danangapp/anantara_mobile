
import { Platform, StyleSheet, Dimensions, I18nManager } from 'react-native';

const styles = StyleSheet.create({

  main: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: "#FFFFFF",
    flexDirection: 'column'
  },

  header: {
    backgroundColor: '#2d324f',
    height: 65,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    borderBottomColor: 'transparent',
    paddingTop: 15,
  },
  left:{
    flex:1
  },
  backArrow: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  body:{
    flex:2,
    alignItems:'center'
  },
  title:{
    marginTop: 2,
    color:'white',
    fontSize: 18,    
  },
  profileImg: {
    width: (Dimensions.get('window').width) * 0.24,
    height: (Dimensions.get('window').width) * 0.24,
    borderRadius: (Dimensions.get('window').width) * 0.12,
    alignSelf: 'center',
    marginTop: (Dimensions.get('window').height) * 0.03,
    marginBottom: (Dimensions.get('window').height) * 0.03
  },

  nameTxt: {
      color: "#6f6f6f",      
      fontSize: 18,
      alignSelf: 'center',
      marginTop: (Dimensions.get('window').height) * 0.01
  },

  designationTxt: {
      color: "#b7b7b7",
      fontSize: 12,      
      marginTop: 3,
      marginBottom: 10,
      alignSelf: 'center'
  },

  descTxt: {
    width: (Dimensions.get('window').width) * 0.75,
    alignSelf: 'center',
    color: "#6f6f6f",
    fontSize: 12,    
    textAlign: 'center',
    marginTop: (Dimensions.get('window').width) * 0.045,
  },

  connectWithTwitterBg: {
    backgroundColor: "#0691ce",
    width: (Dimensions.get('window').width) * 0.82,
    ...Platform.select({
      android: {
        height: (Dimensions.get('window').height) * 0.07,
      },
      ios:{
        height: (Dimensions.get('window').height) * 0.06,
      }
    }),
    alignSelf: 'center',
    marginTop: (Dimensions.get('window').height) * 0.03,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  connectWithFacebookBg: {
    backgroundColor: "#3b5999",
    width: (Dimensions.get('window').width) * 0.82,
    ...Platform.select({
      android: {
        height: (Dimensions.get('window').height) * 0.07,
      },
      ios:{
        height: (Dimensions.get('window').height) * 0.06,
      }
    }),
    alignSelf: 'center',
    marginTop: (Dimensions.get('window').height) * 0.015,
    marginBottom: (Dimensions.get('window').height) * 0.04,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  connectWithTwitterFbTxt: {
    color: "#fff",
    textAlign: 'center',
    fontSize: 15,    
    marginTop: -1
  },

  dividerHorizontal: {
    backgroundColor: "#d6d6d6",
    height: 1,
    width: (Dimensions.get('window').width),
    alignSelf: 'center'
  },

  accountInfoBg: {
    backgroundColor: "#f1f1f1",
    height: (Dimensions.get('window').height) * 0.072,
    width: Dimensions.get('window').width
  },

  accountInfoTxt: {
    color: "#adadad",
    fontSize: 12,
    width: (Dimensions.get('window').width) * 0.82,
    paddingTop: (Dimensions.get('window').height) * 0.035,
    paddingLeft: I18nManager.isRTL ? 0 : (Dimensions.get('window').width) * 0.09,
    paddingRight: I18nManager.isRTL ? (Dimensions.get('window').width) * 0.09 : 0,    
    textAlign: 'left'
  },

  infoFieldBg: {
    width: (Dimensions.get('window').width) * 0.82,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'column'
  },

  infoFieldTitleTxt: {
    color: "#b7b7b7",
    fontSize: 12,    
    textAlign: 'left'
  },

  infoFieldDetailTxt: {
    color: "#6f6f6f",
    textAlign: 'left',
    ...Platform.select({
      android: {
        fontSize: 18,
      },
      ios: {
        fontSize: 16,
      }
    }),    
  },

  fieldDivider: {
    backgroundColor: "#f2f2f2",
    width: (Dimensions.get('window').width) * 0.91,
    alignSelf: 'flex-end',
    height: 1,
  }

});

export default styles;
