import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import AuthContext from "../store/context";

Feather.loadFont();
FontAwesome.loadFont();

const SignUp = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    secureTextEntry: true,
  });

  const { signUp } = React.useContext(AuthContext);

  const signUpHandel = (email, name, password) => {
    signUp(email, name, password);
  };

  const textUserChange = (val) => {
    setData({
      ...data,
      email: val,
    });
  };
  const textNameChange = (val) => {
    setData({
      ...data,
      name: val,
    });
  };
  const textPasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const updateSecureText = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/image/logo2.png")}
        style={styles.logo}
      />
      <View style={{ width: "80%", marginTop: 10 }}>
        <Text>Email của bạn</Text>
        <View style={styles.action}>
          <View style={{ width: 20 }}>
            <Feather name="mail" color={"green"} size={20} />
          </View>
          <TextInput
            placeholder="Nhập email của bạn"
            onChangeText={(val) => textUserChange(val)}
            style={styles.textInput}
          />
        </View>
        <Text style={{ marginTop: 20 }}>Tên của bạn</Text>
        <View style={styles.action}>
          <View style={{ width: 20 }}>
            <FontAwesome name="user-o" color={"green"} size={20} />
          </View>
          <TextInput
            placeholder="Nhập tên của bạn"
            onChangeText={(val) => textNameChange(val)}
            style={styles.textInput}
          />
        </View>
        <Text style={{ marginTop: 20 }}>Mật khẩu</Text>
        <View style={styles.action}>
          <View style={{ width: 20 }}>
            <FontAwesome name="lock" color={"green"} size={20} />
          </View>
          <TextInput
            placeholder="Nhập mật khẩu"
            onChangeText={(val) => textPasswordChange(val)}
            style={styles.textInput}
            secureTextEntry={data.secureTextEntry ? true : false}
          />
          <TouchableOpacity onPress={updateSecureText}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color={"green"} size={20} />
            ) : (
              <Feather name="eye" color={"green"} size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => signUpHandel(data.email, data.name, data.password)}
          >
            <LinearGradient
              colors={["#3FA344", "#8DCA70"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: "#fff" }]}>Đăng kí</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            style={[
              styles.signIn,
              {
                borderColor: "#4EAB4D",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text style={[styles.textSign, { color: "#4EAB4D" }]}>Trở về</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logo: {
    resizeMode: "contain",
    width: 250,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default SignUp;
