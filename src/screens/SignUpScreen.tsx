import {
  StyleSheet,
  Text,
  View,
  //SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
//import { TextInput, IconButton } from "@react-native-material/core";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
//import { useTheme } from "@react-native-material-ui";
//import theme from "../../theme.js";
import { Input, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
//import LogInScreen from "./LogInScreen.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import AuthStack from "../navigation/AuthStack.js";
import tw from "twrnc";

const auth = getAuth();

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignUp() {
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      //navigation.navigate("Login");
    } catch (error) {
      setError(error.message);
      if (error.code === "auth/weak-password") {
        Alert.alert("Error!", "password is weak");
      } else if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error!", "This email is already in use");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Error!", "This email is invalid");
      } else {
        Alert.alert("Error", error.message);
      }
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome</Text>
        <Text style={tw`text-4`}>Enter your details to sign up</Text>
      </View>
      <View style={styles.input}>
        <Input
          placeholder="e.g John"
          leftIcon={{ name: "person" }}
          label="Name"
          onChangeText={(text: string) => setName(text)}
        />

        <Input
          placeholder="e.g john@gmail.com"
          leftIcon={{ name: "email" }}
          label="Email"
          onChangeText={(text: string) => setEmail(text)}
        />

        {isLoading && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        <Input
          placeholder="not less than 6 characters"
          leftIcon={{ name: "lock" }}
          label="Password"
          secureTextEntry={true}
          onChangeText={(text: string) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <View>
          <Text style={styles.buttonText}>Sign up</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 128,
  },
  headerText: {
    fontFamily: "InterBold",
    fontSize: 32,
    //fontWeight: "bold",
    color: "#eb9409",
  },
  input: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  button: {
    marginBottom: 32,
    marginHorizontal: 8,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: "#eb9409",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
  },
  activityIndicatorContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
});
