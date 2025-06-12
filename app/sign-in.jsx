import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Dimensions,
  Keyboard,
} from "react-native";
import axios from "axios";
import BackButton from "@/components/BackButton";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [mobileNo, setMobileNo] = useState("");
  const [userType, setUserType] = useState("user");
  const [loading, setLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleLogin = async () => {
    if (!mobileNo) {
      Alert.alert("Error", "Please enter mobile number");
      return;
    }

    if (mobileNo.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://capin.co.in/api_.php/login_verify",
        {
          user_type: userType,
          mobile_no: mobileNo,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data) {
        navigation.navigate("Home", { userData: response.data });
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to continue</Text>

          <Image
            source={require("../assets/images/login-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <View
            style={[
              styles.inputContainer,
              isInputFocused && styles.inputFocused,
            ]}
          >
            
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              placeholderTextColor="#999"
              keyboardType={Platform.OS === "ios" ? "number-pad" : "phone-pad"}
              value={mobileNo}
              onChangeText={setMobileNo}
              maxLength={10}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              returnKeyType="done"
              blurOnSubmit={true}
              onSubmitEditing={Keyboard.dismiss}
              autoCorrect={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
            />
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.buttonDisabled]}
            //onPress={handleLogin}
            onPress={() => router.push('/(drawer)/(tabs)/home')}
            disabled={loading}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text style={styles.linkText}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: "PoppinsBold",
    color: "#045fa5",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputFocused: {
    borderColor: "#045fa5",
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#045fa5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    shadowColor: "#045fa5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  footerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
    fontFamily: "PoppinsRegular",
  },
  linkText: {
    color: "#045fa5",
    fontFamily: "PoppinsBold",
  },
});

export default LoginScreen;
