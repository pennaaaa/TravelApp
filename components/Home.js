import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ViewBase,
  ImageBackground,
  Image,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/color/colors";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from "@use-expo/font";
import cityData from "../assets/data/cityData";
import AppLoading from "./AppLoading";
import ContentLoader from "react-content-loader";
import MyLoader from "./skeleton";
Entypo.loadFont();
FontAwesome.loadFont();

const Home = ({ navigation }) => {
  const [isHotelLoading, setHotelLoading] = useState(true);
  const [hotelData, sethotelData] = useState([]);
  const [isLoaded] = useFonts({
    "SourceSans-Light": require("../assets/fonts/LexendDeca-ExtraBold/SourceSansPro-Light.ttf"),
    "SourceSans-Regular": require("../assets/fonts/LexendDeca-ExtraBold/SourceSansPro-Regular.ttf"),
    "SourceSans-SemiBold": require("../assets/fonts/LexendDeca-ExtraBold/SourceSansPro-SemiBold.ttf"),
    "SourceSans-Bold": require("../assets/fonts/LexendDeca-ExtraBold/SourceSansPro-Bold.ttf"),
  });

  useEffect(() => {
    setTimeout(() => {
      fetch("https://pbl6-travelapp.herokuapp.com/hotel")
        .then((response) => response.json())
        .then((json) => sethotelData(json))
        .catch((error) => console.error(error))
        .finally(() => setHotelLoading(false));
    }, 0);
  }, []);

  const renderHotelDataItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("HotelDetails", {
            item: item,
            name: item.location,
          })
        }
      >
        <View style={styles.itemContainer} shadowOffset={{ height: 10 }}>
          <Image
            source={{ uri: item.imageCover }}
            style={styles.discorverItem}
          />
          <View style={styles.itemViewText}>
            <Text
              style={{
                marginLeft: 10,
                marginTop: 5,
                fontFamily: "SourceSans-SemiBold",
                fontSize: 18,
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                marginVertical: 5,
                fontFamily: "SourceSans-Regular",
                fontSize: 18,
                color: "#7B7B7B",
              }}
            >
              {item.address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderActivityData = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Details", {
            item: item,
            name: item.location,
          })
        }
      >
        <View style={styles.activityItem}>
          <Image
            source={item.image}
            style={{
              resizeMode: "cover",
              width: 60,
              height: 60,
              borderRadius: 30,
              marginHorizontal: 15,
            }}
          />
          <Text style={styles.activityItemText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  if (isHotelLoading) return <MyLoader></MyLoader>;

  if (!isLoaded) {
    return <AppLoading isFirst={true} />;
  } else {
    return (
      <SafeAreaView
        forceInset={{ bottom: "never" }}
        style={{ backgroundColor: colors.white }}
      >
        <View style={styles.logo}>
          <Image
            source={require("../assets/image/logo2.png")}
            style={{
              resizeMode: "stretch",
              height: 50,
              width: 100,
            }}
          />
          <Text style={styles.logoName}>Go Go</Text>
        </View>
        <ScrollView>
          <View>
            <View>
              <Text style={styles.title}>Bạn muốn đi đâu?</Text>
              <View style={styles.allActivity}>
                <FlatList
                  data={cityData}
                  renderItem={renderActivityData}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            {/* Hotel */}
            <View style={styles.cityHighContainer}>
              <Text style={styles.highTitle}>Khách sạn nổi bật</Text>
              <View style={styles.highItemWrapper}>
                {isHotelLoading ? (
                  <Text>Loading...</Text>
                ) : (
                  <FlatList
                    data={hotelData}
                    renderItem={renderHotelDataItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                )}
              </View>
            </View>
            <View style={styles.cityHighContainer}>
              <Text style={styles.highTitle}>Khách sạn nổi bật</Text>
              <View style={styles.highItemWrapper}>
                {isHotelLoading ? (
                  <Text>Loading...</Text>
                ) : (
                  <FlatList
                    data={hotelData}
                    renderItem={renderHotelDataItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  logoName: {
    fontSize: 40,
    fontWeight: "300",
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 34,
    marginTop: 10,
    marginHorizontal: 10,
    fontFamily: "SourceSans-SemiBold",
  },
  cityHighContainer: {
    marginTop: 15,
    marginLeft: 10,
  },
  highTitle: {
    fontSize: 24,
    fontFamily: "SourceSans-SemiBold",
  },
  highItemWrapper: {
    flexDirection: "row",
    marginTop: 15,
  },
  itemContainer: {
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  discorverItem: {
    width: 220,
    height: 130,
    resizeMode: "stretch",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  itemViewText: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  activityItemText: {
    color: colors.black,
    fontSize: 18,
    fontFamily: "SourceSans-Regular",
  },
  activityItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  allActivity: {
    marginLeft: 10,
    marginTop: 10,
  },
});
export default Home;
