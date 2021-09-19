import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import colors from '../assets/color/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont();

const Details = ({route, navigation}) => {
  const {item} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  titleDetails: {
    flexDirection: 'row',
  },
});
export default Details;
