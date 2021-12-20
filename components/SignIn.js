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

const SignIn = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    secureTextEntry: true,
  });
  const { signIn, next_guest } = React.useContext(AuthContext);

  const loginHandel = (email, password) => {
    signIn(email, password);
  };

  const nextHandel = () => {
    next_guest();
  };
  const textUserChange = (val) => {
    setData({
      ...data,
      email: val,
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
        <Text>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={"green"} size={20} />
          <TextInput
            placeholder="Your Email"
            onChangeText={(val) => textUserChange(val)}
            style={styles.textInput}
          />
        </View>
        <Text style={{ marginTop: 20 }}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color={"green"} size={20} />
          <TextInput
            placeholder="Your Password"
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
            onPress={() => loginHandel(data.email, data.password)}
          >
            <LinearGradient
              colors={["#3FA344", "#8DCA70"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: "#fff" }]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={[
              styles.signIn,
              { borderColor: "#4EAB4D", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={[styles.textSign, { color: "#4EAB4D" }]}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => nextHandel()}
            style={[
              styles.signIn,
              { borderColor: "#4EAB4D", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={[styles.textSign, { color: "#4EAB4D" }]}>
              Continue without sign in
            </Text>
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
  anotherButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  buttonFB: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  anotherLogin: {
    resizeMode: "contain",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default SignIn;
