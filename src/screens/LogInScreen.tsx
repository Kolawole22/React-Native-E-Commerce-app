import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  //SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
//import { TextInput, IconButton } from "@react-native-material/core";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
//import { useTheme } from "@react-native-material-ui";
import { Input, Icon } from "@rneui/themed";
//import theme from "../../theme.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AuthStack from "../navigation/AuthStack.js";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../config/firebase";
// auth = getAuth();

const LogInScreen = () => {
  //const [isLoading, setIsLoading] = useState(true)
  //const { theme } = useTheme;
  const navigation: any = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  async function handleLogIn() {
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      //navigation.navigate("Login");
    } catch (error: any) {
      setError(error);
      if (error.code === "auth/invalid-email") {
        Alert.alert("Error!", "This email does not exist");
      } else if (error.code === "auth/user-not-found") {
        Alert.alert("Error!", "This username does not exist");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Error!", "Wrong password entered");
      } else {
        Alert.alert("Error", error.message);
      }
    }
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome back</Text>
        <Text style={tw`text-4`}>Enter your details to sign in</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.input}
      >
        <Input
          placeholder="e.g john@gmail.com"
          leftIcon={{ name: "email" }}
          label="Email"
          onChangeText={(text: string) => {
            setEmail(text.trim());
          }}
        />
        {isLoading && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color="#f77b0f" />
          </View>
        )}

        <Input
          placeholder="enter your correct password"
          leftIcon={{ name: "lock" }}
          label="Password"
          secureTextEntry={true}
          onChangeText={(text: string) => {
            setPassword(text.trim());
          }}
        />
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.button} onPress={handleLogIn}>
        <View>
          <Text style={styles.buttonText}>Sign in</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginBottom: 16, alignItems: "center" }}>
        <View>
          <Text style={{ fontSize: 16, color: "#eb9409" }}>
            Forgot Password
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.registerButton}>
        <Text style={{ fontSize: 16, color: "#eb9409" }}>
          Dont't have an account yet?
        </Text>
        <TouchableOpacity
          style={{ marginLeft: 4 }}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#eb9409",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default LogInScreen;

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
  registerButton: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
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
