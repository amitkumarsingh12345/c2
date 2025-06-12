import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  TextInput,
  Dimensions,
  Animated,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { constant } from "@/constants/constant";

const { width } = Dimensions.get("window");
const CAROUSEL_INTERVAL = 3000;
const PRIMARY_COLOR = "#045fa5";
const SECONDARY_COLOR = "#5ebe2f";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselData, setCarouselData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollX = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef(null);
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Get data
  useEffect(() => {
    const getDataHandler = async () => {
      try {
        const [carousel, cate, sub_cate] = await Promise.all([
          axios.post("https://capin.co.in/api_.php/slider"),
          axios.post("https://capin.co.in/api_.php/category"),
          axios.post("https://capin.co.in/api_.php/get_subcategory"),
        ]);
        
        setCarouselData(carousel?.data?.filter(item => item.slider_img) || []);
        setCategories(cate?.data?.filter(item => item.service_icon) || []);
        setServices(sub_cate?.data?.filter(item => item.sub_service_icon) || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getDataHandler();
  }, []);

  // Auto carousel effect
  useEffect(() => {
    if (carouselData.length > 1) {
      const timer = setInterval(() => {
        const newIndex = (activeSlide + 1) % carouselData.length;
        setActiveSlide(newIndex);
        carouselRef.current?.scrollToIndex({
          index: newIndex,
          animated: true,
        });
      }, CAROUSEL_INTERVAL);

      return () => clearInterval(timer);
    }
  }, [activeSlide, carouselData.length]);

  // Glow animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const glowInterpolate = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  // Render carousel item
  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.carouselItem}>
      <Image
        source={{uri: `https://capin.co.in/capinapp_/assests/member/uploads/slider/${item.slider_img}`}}
        style={styles.carouselImage}
        resizeMode="stretch"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.carouselGradient}
      >
        <Text style={styles.carouselText}>{item.slider_title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  // Render category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Animated.View style={[styles.categoryIconContainer, { transform: [{ scale: glowInterpolate }] }]}>
        {item.service_icon ? (
          <Image 
            source={{uri: `https://capin.co.in/capinapp_/assests/member/uploads/service/${item.service_icon}`}} 
            style={styles.categoryIcon}
          />
        ) : (
          <Ionicons name="ios-grid" size={24} color={PRIMARY_COLOR} />
        )}
      </Animated.View>
      <Text style={styles.categoryText}>{item.service_menu_name}</Text>
    </TouchableOpacity>
  );

  // Render service item
  const renderServiceItem = ({ item }) => (
    <Animated.View style={[styles.serviceItem, { transform: [{ scale: glowInterpolate }] }]}>
      <View style={styles.serviceIconContainer}>
        {item.sub_service_icon ? (
          <Image 
            source={{uri: `https://capin.co.in/capinapp_/assests/member/uploads/service/${item.sub_service_icon}`}} 
            height={100}
            width={100}
            resizeMode="contain"
          />
        ) : (
          <Ionicons name="ios-construct" size={20} color="#fff" />
        )}
      </View>
      <View style={styles.serviceTextContainer}>
        <Text style={styles.serviceTitle}>{item.service_sub_menu_name}</Text>
      </View>
    </Animated.View>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={20} color={PRIMARY_COLOR} />
            <Text style={styles.locationText}>George Town, Prayagraj</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color={PRIMARY_COLOR} />
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={[styles.notificationBadge, { backgroundColor: SECONDARY_COLOR }]} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            placeholder="Search for products..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: PRIMARY_COLOR }]}>
            <Ionicons name="filter" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Carousel Slider */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={carouselRef}
            data={carouselData}
            renderItem={renderCarouselItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item?.slider_id?.toString() || index.toString()}
          />
          <View style={styles.pagination}>
            {carouselData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  activeSlide === index && [styles.paginationDotActive, { backgroundColor: SECONDARY_COLOR }]
                ]}
              />
            ))}
          </View>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          numColumns={3}
          columnWrapperStyle={styles.categoryRow}
          scrollEnabled={false}
          keyExtractor={(item, index) => item?.service_menu_id?.toString() || index.toString()}
        />

        {/* Services */}
        <Text style={styles.sectionTitle}>Our Services</Text>
        <FlatList
          data={services}
          renderItem={renderServiceItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item?.service_sub_menu_id?.toString() || index.toString()}
        />

        {/* Popular Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Products</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAllText, { color: PRIMARY_COLOR }]}>See All</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: constant.platform === 'ios' && 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 5,
    marginRight: 2,
    fontSize: 16,
    color: "#333",
    fontFamily: "PoppinsMedium",
  },
  notificationIcon: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
    fontFamily: "PoppinsRegular",
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    marginBottom: 25,
    height: width * 0.5,
  },
  carouselItem: {
    width: width - 40,
    height: width * 0.5,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  carouselGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    justifyContent: "flex-end",
    padding: 15,
  },
  carouselText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 3,
  },
  paginationDotActive: {
    width: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: PRIMARY_COLOR,
    marginBottom: 15,
    fontFamily: "PoppinsSemiBold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
  },
  categoryContainer: {
    paddingBottom: 10,
  },
  categoryRow: {
    justifyContent: "space-between",
    marginVertical: 10,
  },
  categoryItem: {
    width: (width - 60) / 3,
    alignItems: "center",
    marginBottom: 15,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f4ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  categoryIcon: {
    height: 32,
    width: 32,
  },
  categoryText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    fontFamily: "PoppinsMedium",
  },
  serviceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceItem: {
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  serviceIconContainer: {
    backgroundColor: SECONDARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceIcon: {
    height: 24,
    width: 24,
    tintColor: "#fff",
  },
  serviceTextContainer: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    fontFamily: "PoppinsSemiBold",
  },
});

export default HomeScreen;