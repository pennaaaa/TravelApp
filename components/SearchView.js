import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import { FlatList } from "react-native-gesture-handler";
import colors from "../assets/color/colors";
import hotelData from "../assets/data/hotelData";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

FontAwesome.loadFont();
Entypo.loadFont();

const SearchView = ({ navigation }) => {
  const [data, setData] = useState(hotelData);

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
        <View style={styles.itemContainer}>
          <View>
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
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}đ/ngày</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const onChangeText = (text) => {
    const newData = hotelData.filter((item) => {
      const itemData = `${item.title.toUpperCase()}   
      ${item.location.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
  };
  return (
    <SafeAreaView>
      <SearchBar
        style={{ height: 50, width: 344, borderRadius: 10 }}
        fontSize={20}
        searchIconImageStyle={{ height: 25, width: 25 }}
        clearIconImageStyle={{ paddingRight: 40 }}
        placeholder="Search here"
        onChangeText={(text) => onChangeText(text)}
        autoFocus
      />
      <View style={styles.resultView}>
        <Text style={styles.resultText}>Kết quả tìm kiếm</Text>
      </View>
      <View style={styles.highItemWrapper}>
        <FlatList
          data={data}
          renderItem={renderHotelDataItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  resultView: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  resultText: {
    fontSize: 24,
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
  highItemWrapper: {
    flexDirection: "column",
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 10,
  },
  itemText: {
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemName: {
    fontSize: 22,
  },
  itemPrice: {
    fontSize: 18,
  },
  itemDescription: {
    fontSize: 16,
  },
});
export default SearchView;
