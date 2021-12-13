import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import moment from "moment";
import DateRangePicker from "react-native-daterange-picker";
import colors from "../assets/color/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import Calendar from "react-native-calendar-range-picker";

AntDesign.loadFont();
MaterialIcons.loadFont();

export default class HotelCityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      displayedDate: moment(),
    };
  }

  setDates = (dates) => {
    this.setState({
      ...dates,
    });
  };

  render() {
    const { startDate, endDate, displayedDate } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <DateRangePicker
            onChange={this.setDates}
            endDate={endDate}
            startDate={startDate}
            displayedDate={displayedDate}
            range
            minDate={Date()}
          >
            <View style={styles.pickerButton}>
              <AntDesign
                name="calendar"
                size={18}
                style={{ paddingLeft: 10 }}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 14 }}>
                  {this.state.startDate &&
                    this.state.startDate.format("MM/DD/YYYY")}{" "}
                  -{" "}
                  {this.state.endDate &&
                    this.state.endDate.format("MM/DD/YYYY")}
                </Text>
              </View>
            </View>
          </DateRangePicker>
          <View style={styles.containerPickerGroups}>
            <MaterialIcons
              name="groups"
              size={18}
              style={{ paddingLeft: 10 }}
            />
            <Text style={{ marginLeft: 5 }}> 2 </Text>
          </View>
          <View style={styles.containerPickerGroups}>
            <MaterialIcons
              name="filter-list"
              size={18}
              style={{ paddingLeft: 10 }}
            />
            <Text style={{ marginLeft: 5 }}> Bo loc </Text>
          </View>
        </View>
        <View>
          <Calendar
            startDate="2020-05-05"
            endDate="2020-05-12"
            onChange={({ startDate, endDate }) =>
              console.log({ startDate, endDate })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  pickerButton: {
    flexDirection: "row",
    backgroundColor: colors.white,
    height: 40,
    width: 195,
    borderRadius: 20,
    alignItems: "center",
  },
  containerPickerGroups: {
    backgroundColor: colors.white,
    height: 40,
    width: 80,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
