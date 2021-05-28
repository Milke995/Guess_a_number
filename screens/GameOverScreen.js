import React from "react";
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import Colors from "../constants/colors";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import CustomButton from "../components/CustomButton";

const GameOverScreen = (props) => {
  const updateLayout = () => {
    setAvailableWidth(Dimensions.get("window").width);
    setAvailableHeight(Dimensions.get("window").height);
  };
  React.useEffect(() => {
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });
  const [availableWidth, setAvailableWidth] = React.useState(
    Dimensions.get("window").width
  );
  const [availableHeight, setAvailableHeight] = React.useState(
    Dimensions.get("window").height
  );
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.screen}>
        <TitleText style={{ marginVertical: 10 }}>The Game is Over</TitleText>
        <View
          style={{
            ...styles.imageContainer,
            ...{
              width:
                availableHeight > availableWidth
                  ? availableWidth * 0.7
                  : availableHeight * 0.7,
              height:
                availableHeight > availableWidth
                  ? availableWidth * 0.7
                  : availableHeight * 0.7,
            },
          }}
        >
          <Image
            source={require("../assets/success.png")}
            //   source={{
            //     uri: "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg",
            //   }}
            fadeDuration={1000}
            style={styles.image}
            resizeMode="cover" //default
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed{" "}
            <TitleText style={styles.highlight}>{props.guesses}</TitleText>{" "}
            rounds to guess your chosen number{" "}
            <TitleText style={styles.highlight}>{props.userNumber}</TitleText>.
          </BodyText>
        </View>
        <CustomButton onPress={props.onReset}>New Game</CustomButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  // scroll: {
  //   flexGrow: 1,
  // },
  screen: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    // width: Dimensions.get("window").width * 0.7,
    // height: Dimensions.get("window").width * 0.7,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 50,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 40,
    marginVertical: Dimensions.get("window").height / 100,
  },
  highlight: {
    color: Colors.primaryColor,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height > 600 ? 20 : 16,
  },
});
