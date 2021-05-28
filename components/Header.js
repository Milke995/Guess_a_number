import React from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import Colors from "../constants/colors";
import TitleText from "./TitleText";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: Dimensions.get("window").height > 600 ? 90 : 50,
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white",
    paddingTop: Dimensions.get("window").height > 600 ? 36 : 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: Platform.OS === "ios" ? 2 : 0,
    borderBottomColor: Platform.OS === "ios" ? "#ccc" : "transparent",
  },
  title: {
    color: Platform.OS === "ios" ? Colors.primaryColor : "black",
  },
});
