import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
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
        <ImageBackground
          source={item.image}
          style={styles.discorverItem}
          imageStyle={styles.discorverItemImage}
        >
          <View style={styles.discorverItemLocationWrapper}>
            <Entypo name="location-pin" size={18} color={colors.white} />
            <Text style={styles.discorverItemLocationText}>
              {item.location}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.menuWrapper}>
            <Text style={styles.title}>Tìm Kiếm</Text>
            <View style={styles.allActivity}>
              <SearchBar
                style={{ height: 68, width: 344, borderRadius: 40 }}
                fontSize={20}
                searchIconImageStyle={{ height: 25, width: 25 }}
                clearIconImageStyle={{ paddingRight: 40 }}
                placeholder="Search here"
                // onPress={() => navigation.navigate("SearchView")}
                // onChangeText={() => navigation.navigate("SearchView")}
                onFocus={() => navigation.navigate("SearchView")}
              />
            </View>
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
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
  },
  menuWrapper: {
    backgroundColor: colors.orange,
    height: 200,
    width: "100%",
  },
  title: {
    fontSize: 38,
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 10,
    // fontFamily: 'LexendDeca-Bold',
  },
  allActivity: {
    marginLeft: 10,
    marginTop: 30,
  },
  cityHighContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  highTitle: {
    fontSize: 24,
    justifyContent: "center",
  },
  highItemWrapper: {
    flexDirection: "row",
    marginTop: 20,
  },
  discorverItem: {
    width: 177,
    height: 204,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginRight: 20,
  },
  discorverItemImage: {
    borderRadius: 30,
  },
  discorverItemLocationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  discorverItemLocationText: {
    fontSize: 18,
    color: colors.white,
    marginLeft: 5,
  },
  activityItemText: {
    color: colors.black,
    fontSize: 18,
    // fontFamily: 'LexendDeca-Bold',
    // justifyContent: 'center',
  },
  activityItem: {
    flexDirection: "row",
    backgroundColor: colors.white,
    width: 164,
    height: 77,
    borderRadius: 50,
    marginRight: 10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
  },
  allActivity: {
    marginLeft: 10,
    marginTop: 30,
  },
  activityItemImage: {
    marginRight: 10,
    marginLeft: 15,
  },
});
export default Find;
