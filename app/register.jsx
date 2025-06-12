import React, { useState } from 'react';
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
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight
} from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegistrationScreen = () => {
  const [formData, setFormData] = useState({
    user_type: 'self',
    name: '',
    dob: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    agent_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('');

  const cities = [
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Bangalore', value: 'bangalore' },
    { label: 'Hyderabad', value: 'hyderabad' },
    { label: 'Chennai', value: 'chennai' },
  ];

  const userTypes = [
    { label: 'Self', value: 'self' },
    { label: 'DSA', value: 'dsa' },
    { label: 'Channel Partner', value: 'channel_partner' },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.mobile || formData.mobile.length !== 10) newErrors.mobile = 'Valid 10-digit mobile number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        'https://capin.co.in/api_.php/registration',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data.success) {
        Alert.alert('Success', 'Registration successful!', [
          { text: 'OK', onPress: () => router.push('/login') }
        ]);
      } else {
        Alert.alert('Error', response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;
      handleChange('dob', formattedDate);
    }
  };

  const showPicker = (pickerType) => {
    setCurrentPicker(pickerType);
    setModalVisible(true);
  };

  const renderPickerItems = () => {
    const items = currentPicker === 'user_type' ? userTypes : cities;
    
    return items.map((item) => (
      <TouchableHighlight
        key={item.value}
        style={styles.pickerItem}
        underlayColor="#f0f0f0"
        onPress={() => {
          handleChange(currentPicker, item.value);
          setModalVisible(false);
        }}
      >
        <Text style={styles.pickerItemText}>{item.label}</Text>
      </TouchableHighlight>
    ));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <Text style={styles.title}>Create Your Account</Text>
              <Text style={styles.subtitle}>Join our community today</Text>
            </View>

            <Image
              source={require('../assets/images/login-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={styles.formContainer}>
              {/* User Type Dropdown */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>User Type</Text>
                <TouchableOpacity 
                  style={[styles.selectInput, errors.user_type && styles.inputError]}
                  onPress={() => showPicker('user_type')}
                >
                  <Text style={styles.selectInputText}>
                    {userTypes.find(item => item.value === formData.user_type)?.label || 'Select user type'}
                  </Text>
                  <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                  <FontAwesome name="user" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChangeText={(text) => handleChange('name', text)}
                  />
                </View>
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </View>

              {/* Date of Birth */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity 
                  style={[styles.inputWrapper, errors.dob && styles.inputError]}
                  onPress={() => setShowDatePicker(true)}
                >
                  <FontAwesome name="calendar" size={20} color="#666" style={styles.inputIcon} />
                  <Text style={[styles.input, {color: formData.dob ? '#000' : '#888'}]}>
                    {formData.dob || 'DD/MM/YYYY'}
                  </Text>
                </TouchableOpacity>
                {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                    maximumDate={new Date()}
                  />
                )}
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                  <MaterialIcons name="email" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {/* Mobile */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile Number</Text>
                <View style={[styles.inputWrapper, errors.mobile && styles.inputError]}>
                  <FontAwesome name="phone" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter 10-digit mobile number"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={formData.mobile}
                    onChangeText={(text) => handleChange('mobile', text)}
                  />
                </View>
                {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
              </View>

              {/* Address */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <View style={[styles.inputWrapper, styles.multilineWrapper, errors.address && styles.inputError]}>
                  <Ionicons name="location" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.multilineInput]}
                    placeholder="Enter your full address"
                    multiline
                    numberOfLines={3}
                    value={formData.address}
                    onChangeText={(text) => handleChange('address', text)}
                  />
                </View>
                {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
              </View>

              {/* City Dropdown */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>City</Text>
                <TouchableOpacity 
                  style={[styles.selectInput, errors.city && styles.inputError]}
                  onPress={() => showPicker('city')}
                >
                  <Text style={styles.selectInputText}>
                    {cities.find(item => item.value === formData.city)?.label || 'Select your city'}
                  </Text>
                  <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
                </TouchableOpacity>
                {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
              </View>

              {/* Agent ID */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Agent ID (Optional)</Text>
                <View style={styles.inputWrapper}>
                  <FontAwesome name="id-card" size={18} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter agent ID if applicable"
                    value={formData.agent_id}
                    onChangeText={(text) => handleChange('agent_id', text)}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={styles.registerButtonText}>Register Now</Text>
                    <MaterialIcons name="arrow-forward" size={20} color="#fff" />
                  </>
                )}
              </TouchableOpacity>

              <View style={styles.loginTextContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Custom Picker Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {currentPicker === 'user_type' ? 'Select User Type' : 'Select City'}
              </Text>
              <ScrollView style={styles.pickerScroll}>
                {renderPickerItems()}
              </ScrollView>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontFamily: 'PoppinsBold',
    color: '#045fa5',
    marginBottom: 5,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    color: '#666',
  },
  logo: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: 10,
  },
  formContainer: {
    paddingHorizontal: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'PoppinsMedium',
    marginBottom: 8,
    color: '#333',
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#000',
    paddingLeft: 10,
    height: '100%',
  },
  inputIcon: {
    marginRight: 10,
  },
  multilineWrapper: {
    height: 100,
    alignItems: 'flex-start',
    paddingTop: 15,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  selectInputText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#000',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'PoppinsRegular',
  },
  registerButton: {
    backgroundColor: '#045fa5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  registerButtonText: {
    color: '#fff',
    fontFamily: 'PoppinsBold',
    fontSize: 16,
    marginRight: 10,
  },
  loginTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontFamily: 'PoppinsRegular',
    color: '#666',
  },
  loginLink: {
    fontFamily: 'PoppinsBold',
    color: '#045fa5',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'PoppinsBold',
    color: '#045fa5',
    marginBottom: 15,
    textAlign: 'center',
  },
  pickerScroll: {
    maxHeight: '80%',
  },
  pickerItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pickerItemText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    backgroundColor: '#045fa5',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontFamily: 'PoppinsBold',
    fontSize: 16,
  },
});

export default RegistrationScreen;