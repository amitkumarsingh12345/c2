// /context/AuthContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseURL = "http://192.168.29.237:3000/api/user";

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  // 🔄 Load user data from AsyncStorage on app start
  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from storage:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Login
  const login = async (reg_mobile, reg_password) => {
    try {
      const res = await axios.post(`${baseURL}/sign-in`, {
        reg_mobile,
        reg_password,
      });
      const userData = res.data.user.reg_mobile;
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || error.message
      );
    }
  };

  // 📝 Signup
  const signup = async (formData) => {
    try {
      const res = await axios.post(`${baseURL}/sign-up`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Alert.alert(res?.data?.message);
      return res?.data?.message;
    } catch (error) {
      Alert.alert(
        "Signup Failed",
        error.response?.data?.message || error.message
      );
    }
  };

  // 🚪 Logout
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  // 📥 Find Users
  const findUsers = async (reg_mobile) => {
    try {
      const res = await axios.get(`${baseURL}/find-user/${reg_mobile}`);
      return res.data;
    } catch (error) {
      Alert.alert("Fetch Users Failed", error.message);
      return [];
    }
  };

  // Update User Profile
  const updateUser = async (reg_mobile, data) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${baseURL}/update/${reg_mobile}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully");
        return true;
      } else {
        Alert.alert(
          "Error",
          response.data.message || "Failed to update profile"
        );
        return false;
      }
    } catch (error) {
      console.error("Update error:", error);
      if (error.response) {
        Alert.alert(
          "Error",
          error.response.data.message ||
            "An error occurred while updating the profile"
        );
      } else {
        Alert.alert("Error", "Network error - Could not connect to server");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, findUsers, loading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
