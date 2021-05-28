import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = React.useState(); //()
  const [rounds, setRounds] = React.useState([]); //(1)
  const [dataLoaded, setDataLoaded] = React.useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  const gameOverHandler = (rounds) => {
    setRounds(rounds);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setRounds(0);
  };

  const resetGameHandler = () => {
    setUserNumber();
    setRounds(0);
  };

  let content = <StartGameScreen startTheGame={startGameHandler} />;
  if (userNumber && rounds === 0) {
    content = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (rounds > 0) {
    content = (
      <GameOverScreen
        guesses={rounds}
        userNumber={userNumber}
        onReset={resetGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a number"></Header>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
