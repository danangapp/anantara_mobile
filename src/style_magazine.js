import { Platform, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

import GLOBAL from './global'

const styles = StyleSheet.create({
    view1: {
        alignItems: 'center', justifyContent: 'center', flex: 1
    },
    view2: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', width, height, backgroundColor: '#F5F5F5', zIndex: 2
    }
});

export default styles;
