import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import colors from "../assets/color/colors";
import AuthContext from "../store/context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

MaterialIcons.loadFont();

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const UserInfo = ({ navigation }) => {
  const authContext = React.useContext(AuthContext);
  return (
      
    <View>
      <Text>{authContext.birth.slice(8, 10)+"-"+authContext.birth.slice(5, 8)+authContext.birth.slice(0, 4)}</Text>
    </View>
  );
};
export default UserInfo;
const styles = StyleSheet.create({});
