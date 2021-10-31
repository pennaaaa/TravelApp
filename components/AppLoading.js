import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
} from "react-native";
import colors from "../assets/color/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppLoading = ({ navigation, isFirst }) => {
  const [state, setState] = useState({
    LogoAnimation: new Animated.Value(0),
    LogoTextAnimation: new Animated.Value(0),
  });

  useEffect(() => {
    Animated.parallel([
      Animated.spring(state.LogoAnimation, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
        useNativeDriver: false,
      }).start(),
      Animated.timing(state.LogoTextAnimation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }).start(() => {}),
    ]);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          opacity: state.LogoAnimation,
          top: state.LogoAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0],
          }),
        }}
      >
        <Image
          source={require("../assets/image/logo2.png")}
          style={styles.logo}
        />
      </Animated.View>
      <Animated.View
        style={{
          opacity: state.LogoTextAnimation,
        }}
      >
        {/* <Text style={styles.logoText}>Go Go</Text> */}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
    height: "30%",
    width: "50%",
    // flex:1,
    // width: 300,
  },
  logoText: {
    marginTop: 30,
    fontSize: 40,
    fontWeight: "bold",
  },
});

export default AppLoading;
