import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import Card from "./../components/Card";
import Colors from "../constants/colors";
import colors from "../constants/colors";
import NumberCointainer from "./../components/NumberContainer";
import Input from "./../components/Input";
import BodyText from "./../components/BodyText";
import TitleText from "../components/TitleText";
import CustomButton from "./../components/CustomButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);
  const [selectedNumber, setSelectedNumber] = React.useState();
  const [buttonWidth, setButtonWidth] = React.useState(
    Dimensions.get("window").width / 4
  );

  React.useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput = null;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberCointainer>{selectedNumber}</NumberCointainer>
        <CustomButton onPress={props.startTheGame.bind(this, selectedNumber)}>
          START GAME
        </CustomButton>
      </Card>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <KeyboardAvoidingView behaviour="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{ ...styles.button, width: buttonWidth }}>
                  <Button
                    title="Reset"
                    color={Colors.secondaryColor}
                    onPress={resetInputHandler}
                  />
                </View>
                <View
                  style={{
                    ...styles.button,
                    width: buttonWidth,
                  }}
                >
                  <Button
                    title="Confirm"
                    color={colors.primaryColor}
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 10,
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    width: "100%",
  },
  button: {
    // width: 100,
    // width: Dimensions.get("window").width / 4, //// OVO SE RACUNA KAD SE APP STARTA; TREBA VODITI RACUNA KADA SE USRED APP PROMIJENI ORIJENTACIJA EKRANA
    borderWidth: 0,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: "80%",
    minWidth: 300,
    // maxWidth: "80%",
    maxWidth: "93%",
    alignItems: "center",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
});
