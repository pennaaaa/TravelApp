import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import { FlatList } from "react-native-gesture-handler";
import colors from "../assets/color/colors";
import hotelData from "../assets/data/hotelData";
import kindSearch from "../assets/data/kindSearch";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { Rating } from "react-native-elements";

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
          <View
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <Image source={item.image} style={styles.discorverItem} />
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemName}>
              <FontAwesome name="flash" size={20} color={"#87BB73"} />
              {"  "}
              {item.title}, {item.location}
            </Text>
            <View
              style={{
                margin: 10,
                backgroundColor: "#F7F8FB",
                padding: 5,
              }}
            >
              <Text style={styles.addressText}>
                <Entypo name="location-pin" size={16} color={"#87BB73"} /> {"   "}{" "}
                Đây là chỗ của địa chỉ nè!
              </Text>
              <Text style={styles.addressText}>
                <FontAwesome name="bed" size={16} color={"#87BB73"} /> {"   "} 1
                giường đôi lớn, 1 phòng tắm
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text style={styles.itemPrice}>{item.price}đ/ngày</Text>
              <Rating
                imageSize={20}
                fractions="{1}"
                readonly
                startingValue={item.rating}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderKindSearch = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => alert("bam roi nha!")}>
        <View style={styles.kindSearchView}>
          <Text style={styles.kindSearchText}>{item.title}</Text>
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
    <SafeAreaView style={{ backgroundColor: colors.white }}>
      <SearchBar
        style={{
          height: 68,
          width: 344,
          borderRadius: 10,
          marginTop: 10,
        }}
        fontSize={20}
        searchIconImageStyle={{ height: 25, width:18 }}
        clearIconImageStyle={{ paddingRight: 40 }}
        placeholder="Bạn sắp đến đâu?"
        placeholderTextColor='#919191'
        onChangeText={(text) => onChangeText(text)}
        autoFocus
      />
      <View style={styles.resultView}>
        <Text style={styles.resultText}>Kết quả tìm kiếm</Text>
        <View style={styles.kindSearch}>
          <FlatList
            data={kindSearch}
            renderItem={renderKindSearch}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
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
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 10,
    width: "98%",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
  },
  kindSearch: {
    marginTop: 10,
  },
  kindSearchView: {
    height: 40,
    width: 120,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 0.4,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  kindSearchText: {
    fontFamily: "SourceSans-Regular",
    fontSize: 18,
  },
  resultView: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  resultText: {
    fontSize: 24,
    marginLeft: 10,
  },
  discorverItem: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    marginTop: 15,
    marginHorizontal: 15,
  },
  itemText: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  itemName: {
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
  },
  itemPrice: {
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
  },
  addressText: {
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    marginLeft: 15,
    marginBottom: 5,
  },
});
export default SearchView;
