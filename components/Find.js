import React from "react";
import {
  // SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/color/colors";
import SearchBar from "react-native-dynamic-search-bar";
import hotelData from "../assets/data/hotelData";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import activityData from "../assets/data/activityData";

Entypo.loadFont();
FontAwesome.loadFont();

const Find = ({ navigation }) => {
  const renderActivityData = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.activityItem}>
          <View style={styles.activityItemImage}>
            <FontAwesome name={item.image} size={32} color={colors.black} />
          </View>
          <Text style={styles.activityItemText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
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
          <Image source={item.imageBig} style={styles.discorverItem} />
          <View style={styles.itemViewText}>
            <Text
              style={{
                marginLeft: 10,
                marginTop: 5,
                fontFamily: "SourceSans-SemiBold",
                fontSize: 18,
              }}
            >
              {item.title}
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
              {item.location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      forceInset={{ bottom: "never" }}
      style={{ backgroundColor: colors.white }}
    >
      <ScrollView>
        <View style={styles.logo}>
          <Image
            source={require("../assets/image/logo2.png")}
            style={{
              resizeMode: "stretch",
              height: 50,
              width: 100,
            }}
          />

          <SearchBar
            style={{
              height: 68,
              width: 300,
              borderRadius: 10,
              marginLeft: 10,
              // marginTop: 10,
            }}
            fontSize={20}
            searchIconImageStyle={{ height: 25, width: 18 }}
            // clearIconImageStyle={{ paddingRight: 40 }}
            placeholder="Bạn sắp đến đâu?"
            placeholderTextColor="#919191"
            onFocus={() => navigation.navigate("SearchView")}
          />
          {/* <Text style={styles.logoName}>Go Go</Text> */}
        </View>

        {/* last search */}
        <View style={styles.cityHighContainer}>
          <Text style={styles.highTitle}>Tìm kiếm gần đây của bạn</Text>
          <View style={styles.allActivity}>
            <FlatList
              data={activityData}
              renderItem={renderActivityData}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        {/* Hotel */}
        <View style={styles.cityHighContainer}>
          <Text style={styles.highTitle}>Địa điểm yêu thích</Text>
          <View style={styles.highItemWrapper}>
            <FlatList
              data={hotelData}
              renderItem={renderHotelDataItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
  container: { flex: 1, backgroundColor: colors.white },
  highTitle: {
    fontSize: 24,
    justifyContent: "center",
    fontFamily: "SourceSans-SemiBold",
  },
  highItemWrapper: {
    flexDirection: "row",
    marginTop: 10,
  },
  discorverItem: {
    width: 177,
    height: 204,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginRight: 20,
  },
  itemContainer: {
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  discorverItem: {
    width: 220,
    height: 130,
    resizeMode: "stretch",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  itemViewText: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  },
  activityItem: {
    flexDirection: "row",
    backgroundColor: colors.white,
    width: 164,
    height: 68,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    borderWidth: 0.4,
  },
  allActivity: {
    // marginLeft: 10,
    marginTop: 10,
  },
  activityItemImage: {
    marginRight: 10,
    marginLeft: 15,
  },
  cityHighContainer: {
    marginTop: 15,
    marginLeft: 10,
  },
});
export default Find;
