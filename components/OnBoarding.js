import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import colors from "../assets/color/colors";

const { height, width } = Dimensions.get("screen");
const slides = [
  {
    key: 1,
    title: "Chào mừng đến với GoGo",
    text: "Trải nghiệm homestay tốt nhất mà bạn từng có",
    image: require("../assets/image/Intro1.jpeg"),
  },
  {
    key: 2,
    title: "Ở nhà người địa phương",
    text: "Mang lại những trải nghiệm du lịch độc đáo, phong phú và chân thực",
    image: require("../assets/image/Intro2.jpeg"),
  },
  {
    key: 3,
    title: "Chọn ngôi nhà mơ ước của bạn",
    text: "Từ hàng ngàn ngôi nhà, căn phòng và căn hộ",
    image: require("../assets/image/Intro3.jpeg"),
  },
];
const _renderItem = ({ item }) => {
  return (
    <View>
      <ImageBackground
        source={item.image}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <View style={styles.intro}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
const _renderNextBunton = () => {
  return (
    <View style={styles.button}>
      <Text>Tiếp tục</Text>
    </View>
  );
};
const _renderDoneBunton = () => {
  return (
    <View style={styles.button}>
      <Text>Xong</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  intro: {
    marginTop: 0.55 * height,
    marginLeft: 0.1 * width,
    marginRight: 0.05 * width,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },
  text: {
    fontSize: 32,
    color: colors.white,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "#9ae6b4",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
  },
});

const OnBoarding = ({ navigation }) => {
  return (
    <AppIntroSlider
      keyExtractor={(item) => item.key.toString()}
      renderItem={_renderItem}
      data={slides}
      renderNextButton={_renderNextBunton}
      renderDoneButton={_renderDoneBunton}
      onDone={() => {
        navigation.navigate("SignIn");
      }}
    />
  );
};

export default OnBoarding;
