import React, { useState, useEffect } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
//import * as SplashScreen from "expo-splash-screen";

export default function CustomSplashScreen() {
  const [slideIn] = useState(new Animated.Value(-300));

  // useEffect(() => {
  //   // Any additional initialization code goes here

  //   SplashScreen.hide();
  // }, []);

  useEffect(() => {
    Animated.timing(slideIn, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [slideIn]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, { transform: [{ translateX: slideIn }] }]}
      >
        <Text style={styles.text}>Food Frenzy</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#f77b0f",
    fontSize: 32,
    fontWeight: "bold",
  },
});
