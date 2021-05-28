import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
// import * as ScreenOrientation from "expo-screen-orientation";

import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import BodyText from "./../components/BodyText";
import TitleText from "../components/TitleText";
import DefaultStyles from "../constants/default-styles";
import CustomButton from "../components/CustomButton";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min === max) return min;
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>Guess #{itemData.index + 1}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = (props) => {
  // ScreenOrientation.addOrientationChangeListener

  React.useEffect(() => {
    const initialGuess = generateRandomBetween(1, 100, props.userNumber);
    setCurrentGuess(initialGuess);
    setPastGuesses([initialGuess.toString()]);
    setLayout(Dimensions.get("window").height < 500 ? 2 : 1);
  }, []);
  // const initialGuess = generateRandomBetween(1, 100, props.userNumber);
  // console.log(initialGuess, "initialGuess");
  const [currentGuess, setCurrentGuess] = React.useState();
  const currentLow = React.useRef(1);
  const currentHigh = React.useRef(100);
  const [pastGuesses, setPastGuesses] = React.useState([]); // bilo je ([initialGuess])
  const { userNumber, onGameOver } = props;
  const [layout, setLayout] = React.useState(1);

  React.useEffect(() => {
    const updateLayout = () => {
      setLayout(Dimensions.get("window").height < 500 ? 2 : 1);
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  React.useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  const nextGuess = (direction) => {
    if (
      (direction === "lower" && props.userNumber >= currentGuess) ||
      (direction === "greater" && props.userNumber <= currentGuess)
    ) {
      Alert.alert("Oops", "DO NOT CHEAT !!", [
        { text: "I'm sorry, I won't do that again!" },
      ]);
      return;
    }
    if (direction === "greater") {
      currentLow.current = currentGuess + 1;
    } else if (direction === "lower") {
      currentHigh.current = currentGuess - 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((currentGuesses) => [
      ...currentGuesses,
      nextNumber.toString(),
    ]);
  };

  if (layout === 2) {
    return (
      <View style={styles.screen}>
        {Dimensions.get("window").height > 600 ? (
          <Card style={styles.summaryContainer}>
            <BodyText>You selected</BodyText>
            <NumberContainer>{props.userNumber}</NumberContainer>
          </Card>
        ) : null}
        <Text style={{ ...DefaultStyles.bodyText }}>Opponent's Guess is </Text>
        <Card style={styles.buttonContainer}>
          <CustomButton onPress={nextGuess.bind(this, "lower")}>
            <AntDesign name="arrowdown" size={24} color="white" />
          </CustomButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <CustomButton onPress={nextGuess.bind(this, "greater")}>
            <AntDesign name="arrowup" size={24} color="white" />
          </CustomButton>
        </Card>
        <View style={styles.listView}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, index + 1))}
        </ScrollView> */}
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
          {/* key zahtijeva string, pa moramo brojeve spremati kao stringove*/}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {Dimensions.get("window").height > 600 ? (
        <Card style={styles.summaryContainer}>
          <BodyText>You selected</BodyText>
          <NumberContainer>{props.userNumber}</NumberContainer>
        </Card>
      ) : null}
      <Text style={{ ...DefaultStyles.bodyText }}>Opponent's Guess is </Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <CustomButton onPress={nextGuess.bind(this, "lower")}>
          <AntDesign name="arrowdown" size={24} color="white" />
        </CustomButton>
        <CustomButton onPress={nextGuess.bind(this, "greater")}>
          <AntDesign name="arrowup" size={24} color="white" />
        </CustomButton>
      </Card>
      <View style={styles.listView}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, index + 1))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
        {/* key zahtijeva string, pa moramo brojeve spremati kao stringove*/}
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 400,
    maxWidth: "80%",
  },
  summaryContainer: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "lightgreen",
    borderWidth: 2,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    // width: Dimensions.get("window").width / 2.5,
    width: "100%",
  },
  listView: {
    width: Dimensions.get("window").width > 350 ? "60%" : "80%",
    flex: 1,
  },
  list: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1,
  },
});
