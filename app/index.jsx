import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { scale, verticalScale } from "react-native-size-matters";

const { width } = Dimensions.get("window");

const carouselItems = [
  { image: require("../assets/images/slider/maincreditcard.png") },
  { image: require("../assets/images/slider/maindemat.png") },
  { image: require("../assets/images/slider/maininvestment.png") },
  { image: require("../assets/images/slider/mainloans.png") },
  { image: require("../assets/images/slider/maininsurance.png") },
  { image: require("../assets/images/slider/maintaxation.png") },
];

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image
        source={item.image}
        style={styles.carouselImage}
        resizeMode="contain"
      />
    </View>
  );

  const loginHandler = () => {
    router.push('/sign-in');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          resizeMode="contain"
          style={{
            width: scale(220),
            height: verticalScale(70), 
           
          }}
        />
        <Carousel
          loop
          autoPlay
          width={width * 1}
          height={width * 0.8}
          data={carouselItems}
          scrollAnimationDuration={1000}
          renderItem={renderItem}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          style={styles.carousel}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={loginHandler}>
            <Text style={styles.buttonText}>User Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.loginButton,{ backgroundColor:'#045fa5',}]} onPress={loginHandler}>
            <Text style={styles.buttonText}>Channel Partner Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={loginHandler}>
            <Text style={styles.buttonText}>DSA Login</Text>
          </TouchableOpacity>
        </View>               
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 20,
  },
  carousel: {
    borderRadius: 12,
    overflow: "hidden",
  },
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: scale(250),
    marginTop:verticalScale(20),
  },
  loginButton: {
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: "center",
    marginVertical: 8,
   // borderWidth: 1,
    // borderColor:'045fa5',
    borderColor:'#5ebe2f',
    backgroundColor:'#5ebe2f',
    opacity:0.9,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: 'PoppinsLight',
       color:'#fff',
  },
});
