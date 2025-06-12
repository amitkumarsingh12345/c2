// import { MaterialIcons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { Picker } from "@react-native-picker/picker";
// import React, { useContext, useEffect, useState } from "react";
// import {
//   Alert,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { AuthContext } from "../../../context/AuthContext";

// export default function CreateProfileScreen() {
//   const [profileData, setProfileData] = useState();
//   const { signup, findUsers, user } = useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     reg_sponser_id: "",
//     reg_mem_id: "",
//     reg_pakge: "",
//     reg_percentage: "",
//     reg_login: "",
//     reg_password: "",
//     reg_mem_name: "",
//     reg_nominee: "",
//     reg_sex: "Male",
//     reg_address: "",
//     reg_city: "",
//     reg_state: "",
//     reg_pin_code: "",
//     reg_sponser_name: "",
//     reg_adhar: "",
//     reg_mobile: "",
//     reg_email: "",
//     reg_dob: new Date(),
//     reg_acc_holder: "",
//     reg_bank: "",
//     reg_otherbank: "",
//     reg_account: "",
//     reg_ifsc: "",
//     reg_branch: "",
//     reg_paymode: "",
//     reg_pan: "",
//     reg_pan_date: new Date(),
//     reg_joindt: new Date(),
//     reg_date: new Date(),
//     reg_block_date: new Date(),
//     reg_block_remark: "",
//     reg_nominee_relation: "",
//     reg_active: 1,
//     reg_add_by: 1,
//     reg_branch_id: 1,
//     reg_payment_mode: 2,
//     reg_detail: "",
//   });

//   const [showDobPicker, setShowDobPicker] = useState(false);
//   const [showPanDatePicker, setShowPanDatePicker] = useState(false);
//   const [showJoinDatePicker, setShowJoinDatePicker] = useState(false);

//   //Get User Profile Data
//   useEffect(() => {
//     const findProfile = async () => {
//       const result = await findUsers(user);
//       console.log("result==");
//       console.log(result);
//     };
//     findProfile();
//   }, []);

//   const handleChange = (key, value) => {
//     setFormData({ ...formData, [key]: value });
//   };

//   const handleDateChange = (event, selectedDate, field) => {
//     const currentDate = selectedDate || formData[field];
//     setFormData({ ...formData, [field]: currentDate });

//     if (field === "reg_dob") setShowDobPicker(false);
//     if (field === "reg_pan_date") setShowPanDatePicker(false);
//     if (field === "reg_joindt") setShowJoinDatePicker(false);
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString("en-GB");
//   };

//   const handleSubmit = async () => {
//     if (!formData.reg_login || !formData.reg_password || !formData.reg_mobile) {
//       Alert.alert("Required", "Login, Password, and Mobile are required.");
//       return;
//     }

//     await signup(formData);
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* <View style={styles.headerContainer}>
//           <Text style={styles.header}>Create Profile</Text>
//           <Text style={styles.subHeader}>Fill in all required details</Text>
//         </View> */}

//         {/* Basic Information Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Basic Information</Text>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Sponsor ID</Text>
//             <TextInput
//               placeholder="Enter Sponsor ID"
//               style={styles.input}
//               value={formData.reg_sponser_id}
//               onChangeText={(text) => handleChange("reg_sponser_id", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Member ID</Text>
//             <TextInput
//               placeholder="Enter Member ID"
//               style={styles.input}
//               value={formData.reg_mem_id}
//               onChangeText={(text) => handleChange("reg_mem_id", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Login ID *</Text>
//             <TextInput
//               placeholder="Enter Login ID"
//               style={styles.input}
//               value={formData.reg_login}
//               onChangeText={(text) => handleChange("reg_login", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Password *</Text>
//             <TextInput
//               placeholder="Enter Password"
//               secureTextEntry
//               style={styles.input}
//               value={formData.reg_password}
//               onChangeText={(text) => handleChange("reg_password", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Full Name *</Text>
//             <TextInput
//               placeholder="Enter Full Name"
//               style={styles.input}
//               value={formData.reg_mem_name}
//               onChangeText={(text) => handleChange("reg_mem_name", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Gender</Text>
//             <View style={styles.pickerContainer}>
//               <Picker
//                 selectedValue={formData.reg_sex}
//                 style={styles.picker}
//                 onValueChange={(itemValue) =>
//                   handleChange("reg_sex", itemValue)
//                 }
//               >
//                 <Picker.Item label="Male" value="Male" />
//                 <Picker.Item label="Female" value="Female" />
//                 <Picker.Item label="Other" value="Other" />
//               </Picker>
//             </View>
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Date of Birth</Text>
//             <TouchableOpacity
//               style={styles.input}
//               onPress={() => setShowDobPicker(true)}
//             >
//               <Text>{formatDate(formData.reg_dob)}</Text>
//               <MaterialIcons
//                 name="calendar-today"
//                 size={20}
//                 color="#666"
//                 style={styles.dateIcon}
//               />
//             </TouchableOpacity>
//             {showDobPicker && (
//               <DateTimePicker
//                 value={formData.reg_dob}
//                 mode="date"
//                 display="default"
//                 onChange={(event, date) =>
//                   handleDateChange(event, date, "reg_dob")
//                 }
//               />
//             )}
//           </View>
//         </View>

//         {/* Contact Information Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Contact Information</Text>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Mobile Number *</Text>
//             <TextInput
//               placeholder="Enter Mobile Number"
//               keyboardType="phone-pad"
//               style={styles.input}
//               value={formData.reg_mobile}
//               onChangeText={(text) => handleChange("reg_mobile", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               placeholder="Enter Email"
//               keyboardType="email-address"
//               style={styles.input}
//               value={formData.reg_email}
//               onChangeText={(text) => handleChange("reg_email", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Address</Text>
//             <TextInput
//               placeholder="Enter Address"
//               style={[styles.input, { height: 80 }]}
//               multiline
//               value={formData.reg_address}
//               onChangeText={(text) => handleChange("reg_address", text)}
//             />
//           </View>

//           <View style={styles.row}>
//             <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
//               <Text style={styles.label}>City</Text>
//               <TextInput
//                 placeholder="Enter City"
//                 style={styles.input}
//                 value={formData.reg_city}
//                 onChangeText={(text) => handleChange("reg_city", text)}
//               />
//             </View>
//             <View style={[styles.inputContainer, { flex: 1 }]}>
//               <Text style={styles.label}>State</Text>
//               <TextInput
//                 placeholder="Enter State"
//                 style={styles.input}
//                 value={formData.reg_state}
//                 onChangeText={(text) => handleChange("reg_state", text)}
//               />
//             </View>
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>PIN Code</Text>
//             <TextInput
//               placeholder="Enter PIN Code"
//               keyboardType="number-pad"
//               style={styles.input}
//               value={formData.reg_pin_code}
//               onChangeText={(text) => handleChange("reg_pin_code", text)}
//             />
//           </View>
//         </View>

//         {/* Identification Details Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Identification Details</Text>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Aadhar Number</Text>
//             <TextInput
//               placeholder="Enter Aadhar Number"
//               keyboardType="number-pad"
//               style={styles.input}
//               value={formData.reg_adhar}
//               onChangeText={(text) => handleChange("reg_adhar", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>PAN Number</Text>
//             <TextInput
//               placeholder="Enter PAN Number"
//               style={styles.input}
//               value={formData.reg_pan}
//               onChangeText={(text) => handleChange("reg_pan", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>PAN Date</Text>
//             <TouchableOpacity
//               style={styles.input}
//               onPress={() => setShowPanDatePicker(true)}
//             >
//               <Text>{formatDate(formData.reg_pan_date)}</Text>
//               <MaterialIcons
//                 name="calendar-today"
//                 size={20}
//                 color="#666"
//                 style={styles.dateIcon}
//               />
//             </TouchableOpacity>
//             {showPanDatePicker && (
//               <DateTimePicker
//                 value={formData.reg_pan_date}
//                 mode="date"
//                 display="default"
//                 onChange={(event, date) =>
//                   handleDateChange(event, date, "reg_pan_date")
//                 }
//               />
//             )}
//           </View>
//         </View>

//         {/* Bank Details Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Bank Details</Text>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Account Holder Name</Text>
//             <TextInput
//               placeholder="Enter Account Holder Name"
//               style={styles.input}
//               value={formData.reg_acc_holder}
//               onChangeText={(text) => handleChange("reg_acc_holder", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Bank Name</Text>
//             <TextInput
//               placeholder="Enter Bank Name"
//               style={styles.input}
//               value={formData.reg_bank}
//               onChangeText={(text) => handleChange("reg_bank", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Branch Name</Text>
//             <TextInput
//               placeholder="Enter Branch Name"
//               style={styles.input}
//               value={formData.reg_branch}
//               onChangeText={(text) => handleChange("reg_branch", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Account Number</Text>
//             <TextInput
//               placeholder="Enter Account Number"
//               keyboardType="number-pad"
//               style={styles.input}
//               value={formData.reg_account}
//               onChangeText={(text) => handleChange("reg_account", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>IFSC Code</Text>
//             <TextInput
//               placeholder="Enter IFSC Code"
//               style={styles.input}
//               value={formData.reg_ifsc}
//               onChangeText={(text) => handleChange("reg_ifsc", text)}
//             />
//           </View>
//         </View>

//         {/* Nominee Details Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Nominee Details</Text>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Nominee Name</Text>
//             <TextInput
//               placeholder="Enter Nominee Name"
//               style={styles.input}
//               value={formData.reg_nominee}
//               onChangeText={(text) => handleChange("reg_nominee", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Nominee Relation</Text>
//             <TextInput
//               placeholder="Enter Relation with Nominee"
//               style={styles.input}
//               value={formData.reg_nominee_relation}
//               onChangeText={(text) =>
//                 handleChange("reg_nominee_relation", text)
//               }
//             />
//           </View>
//         </View>

//         {/* Other Information Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Other Information</Text>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Join Date</Text>
//             <TouchableOpacity
//               style={styles.input}
//               onPress={() => setShowJoinDatePicker(true)}
//             >
//               <Text>{formatDate(formData.reg_joindt)}</Text>
//               <MaterialIcons
//                 name="calendar-today"
//                 size={20}
//                 color="#666"
//                 style={styles.dateIcon}
//               />
//             </TouchableOpacity>
//             {showJoinDatePicker && (
//               <DateTimePicker
//                 value={formData.reg_joindt}
//                 mode="date"
//                 display="default"
//                 onChange={(event, date) =>
//                   handleDateChange(event, date, "reg_joindt")
//                 }
//               />
//             )}
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Package</Text>
//             <TextInput
//               placeholder="Enter Package"
//               style={styles.input}
//               value={formData.reg_pakge}
//               onChangeText={(text) => handleChange("reg_pakge", text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Additional Details</Text>
//             <TextInput
//               placeholder="Enter any additional details"
//               style={[styles.input, { height: 80 }]}
//               multiline
//               value={formData.reg_detail}
//               onChangeText={(text) => handleChange("reg_detail", text)}
//             />
//           </View>
//         </View>

//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//           <Text style={styles.submitButtonText}>Update Profile</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#f5f7fa",
//   },
//   container: {
//     padding: 16,
//     paddingBottom: 40,
//   },
//   headerContainer: {
//     marginBottom: 24,
//     alignItems: "center",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#2c3e50",
//   },
//   subHeader: {
//     fontSize: 14,
//     color: "#7f8c8d",
//     marginTop: 8,
//   },
//   section: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#3498db",
//     marginBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     paddingBottom: 8,
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   label: {
//     marginBottom: 8,
//     fontSize: 14,
//     color: "#34495e",
//     fontWeight: "500",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 14,
//     backgroundColor: "#f9f9f9",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     backgroundColor: "#f9f9f9",
//     overflow: "hidden",
//   },
//   picker: {
//     height: 50,
//     width: "100%",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   dateIcon: {
//     marginLeft: 10,
//   },
//   submitButton: {
//     backgroundColor: "#3498db",
//     padding: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 24,
//     marginBottom: 16,
//   },
//   submitButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

//------------------

import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../../context/AuthContext";

export default function CreateProfileScreen() {
  const { signup, findUsers, user, updateUser, loading } =
    useContext(AuthContext);

  const [formData, setFormData] = useState({
    reg_sponser_id: "",
    reg_mem_id: "",
    reg_pakge: "",
    reg_percentage: "",
    reg_login: "",
    reg_password: "",
    reg_mem_name: "",
    reg_nominee: "",
    reg_sex: "Male",
    reg_address: "",
    reg_city: "",
    reg_state: "",
    reg_pin_code: "",
    reg_sponser_name: "",
    reg_adhar: "",
    reg_mobile: "",
    reg_email: "",
    reg_dob: new Date(),
    reg_acc_holder: "",
    reg_bank: "",
    reg_otherbank: "",
    reg_account: "",
    reg_ifsc: "",
    reg_branch: "",
    reg_paymode: "",
    reg_pan: "",
    reg_pan_date: new Date(),
    reg_joindt: new Date(),
    reg_date: new Date(),
    reg_block_date: new Date(),
    reg_block_remark: "",
    reg_nominee_relation: "",
    reg_active: 1,
    reg_add_by: 1,
    reg_branch_id: 1,
    reg_payment_mode: 2,
    reg_detail: "",
  });

  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showPanDatePicker, setShowPanDatePicker] = useState(false);
  const [showJoinDatePicker, setShowJoinDatePicker] = useState(false);

  // Get User Profile Data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const result = await findUsers(user);
        if (result) {
          const processedData = {
            ...result,
            reg_dob: result.reg_dob ? new Date(result.reg_dob) : new Date(),
            reg_pan_date: result.reg_pan_date
              ? new Date(result.reg_pan_date)
              : new Date(),
            reg_joindt: result.reg_joindt
              ? new Date(result.reg_joindt)
              : new Date(),
          };
          setFormData(processedData);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch profile data");
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleDateChange = (event, selectedDate, field) => {
    const currentDate = selectedDate || formData[field];
    setFormData({ ...formData, [field]: currentDate });

    if (field === "reg_dob") setShowDobPicker(false);
    if (field === "reg_pan_date") setShowPanDatePicker(false);
    if (field === "reg_joindt") setShowJoinDatePicker(false);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB");
  };

  //Update Handler
  const handleSubmit = async () => {
    try {
      const updateData = {
        ...formData,
        reg_dob: formData.reg_dob.toISOString().split("T")[0],
        reg_pan_date: formData.reg_pan_date.toISOString().split("T")[0],
        reg_joindt: formData.reg_joindt.toISOString().split("T")[0],
      };

      // Make sure user.reg_mobile contains the mobile number
      const success = await updateUser(user, updateData);

      if (success) {
        // Optional: refresh user data after successful update
        const result = await findUsers(user);
        if (result) {
          setFormData({
            ...result,
            reg_dob: result.reg_dob ? new Date(result.reg_dob) : new Date(),
            reg_pan_date: result.reg_pan_date
              ? new Date(result.reg_pan_date)
              : new Date(),
            reg_joindt: result.reg_joindt
              ? new Date(result.reg_joindt)
              : new Date(),
          });
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Basic Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Sponsor ID</Text>
            <TextInput
              placeholder="Enter Sponsor ID"
              style={styles.input}
              value={formData.reg_sponser_id}
              onChangeText={(text) => handleChange("reg_sponser_id", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Member ID</Text>
            <TextInput
              placeholder="Enter Member ID"
              style={styles.input}
              value={formData.reg_mem_id}
              onChangeText={(text) => handleChange("reg_mem_id", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Login ID</Text>
            <TextInput
              placeholder="Enter Login ID"
              style={styles.input}
              value={formData.reg_login}
              onChangeText={(text) => handleChange("reg_login", text)}
              editable={false} // Assuming login ID shouldn't be changed
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter Password"
              secureTextEntry
              style={styles.input}
              value={formData.reg_password}
              onChangeText={(text) => handleChange("reg_password", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              placeholder="Enter Full Name"
              style={styles.input}
              value={formData.reg_mem_name}
              onChangeText={(text) => handleChange("reg_mem_name", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.reg_sex}
                style={styles.picker}
                onValueChange={(itemValue) =>
                  handleChange("reg_sex", itemValue)
                }
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDobPicker(true)}
            >
              <Text>{formatDate(formData.reg_dob)}</Text>
              <MaterialIcons
                name="calendar-today"
                size={20}
                color="#666"
                style={styles.dateIcon}
              />
            </TouchableOpacity>
            {showDobPicker && (
              <DateTimePicker
                value={formData.reg_dob}
                mode="date"
                display="default"
                onChange={(event, date) =>
                  handleDateChange(event, date, "reg_dob")
                }
              />
            )}
          </View>
        </View>

        {/* Contact Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number *</Text>
            <TextInput
              placeholder="Enter Mobile Number"
              keyboardType="phone-pad"
              style={styles.input}
              value={formData.reg_mobile}
              onChangeText={(text) => handleChange("reg_mobile", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter Email"
              keyboardType="email-address"
              style={styles.input}
              value={formData.reg_email}
              onChangeText={(text) => handleChange("reg_email", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              placeholder="Enter Address"
              style={[styles.input, { height: 80 }]}
              multiline
              value={formData.reg_address}
              onChangeText={(text) => handleChange("reg_address", text)}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>City</Text>
              <TextInput
                placeholder="Enter City"
                style={styles.input}
                value={formData.reg_city}
                onChangeText={(text) => handleChange("reg_city", text)}
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>State</Text>
              <TextInput
                placeholder="Enter State"
                style={styles.input}
                value={formData.reg_state}
                onChangeText={(text) => handleChange("reg_state", text)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>PIN Code</Text>
            <TextInput
              placeholder="Enter PIN Code"
              keyboardType="number-pad"
              style={styles.input}
              value={formData.reg_pin_code}
              onChangeText={(text) => handleChange("reg_pin_code", text)}
            />
          </View>
        </View>

        {/* Identification Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identification Details</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Aadhar Number</Text>
            <TextInput
              placeholder="Enter Aadhar Number"
              keyboardType="number-pad"
              style={styles.input}
              value={formData.reg_adhar}
              onChangeText={(text) => handleChange("reg_adhar", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>PAN Number</Text>
            <TextInput
              placeholder="Enter PAN Number"
              style={styles.input}
              value={formData.reg_pan}
              onChangeText={(text) => handleChange("reg_pan", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>PAN Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowPanDatePicker(true)}
            >
              <Text>{formatDate(formData.reg_pan_date)}</Text>
              <MaterialIcons
                name="calendar-today"
                size={20}
                color="#666"
                style={styles.dateIcon}
              />
            </TouchableOpacity>
            {showPanDatePicker && (
              <DateTimePicker
                value={formData.reg_pan_date}
                mode="date"
                display="default"
                onChange={(event, date) =>
                  handleDateChange(event, date, "reg_pan_date")
                }
              />
            )}
          </View>
        </View>

        {/* Bank Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bank Details</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Account Holder Name</Text>
            <TextInput
              placeholder="Enter Account Holder Name"
              style={styles.input}
              value={formData.reg_acc_holder}
              onChangeText={(text) => handleChange("reg_acc_holder", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bank Name</Text>
            <TextInput
              placeholder="Enter Bank Name"
              style={styles.input}
              value={formData.reg_bank}
              onChangeText={(text) => handleChange("reg_bank", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Branch Name</Text>
            <TextInput
              placeholder="Enter Branch Name"
              style={styles.input}
              value={formData.reg_branch}
              onChangeText={(text) => handleChange("reg_branch", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Account Number</Text>
            <TextInput
              placeholder="Enter Account Number"
              keyboardType="number-pad"
              style={styles.input}
              value={formData.reg_account}
              onChangeText={(text) => handleChange("reg_account", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>IFSC Code</Text>
            <TextInput
              placeholder="Enter IFSC Code"
              style={styles.input}
              value={formData.reg_ifsc}
              onChangeText={(text) => handleChange("reg_ifsc", text)}
            />
          </View>
        </View>

        {/* Nominee Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nominee Details</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nominee Name</Text>
            <TextInput
              placeholder="Enter Nominee Name"
              style={styles.input}
              value={formData.reg_nominee}
              onChangeText={(text) => handleChange("reg_nominee", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nominee Relation</Text>
            <TextInput
              placeholder="Enter Relation with Nominee"
              style={styles.input}
              value={formData.reg_nominee_relation}
              onChangeText={(text) =>
                handleChange("reg_nominee_relation", text)
              }
            />
          </View>
        </View>

        {/* Other Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Join Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowJoinDatePicker(true)}
            >
              <Text>{formatDate(formData.reg_joindt)}</Text>
              <MaterialIcons
                name="calendar-today"
                size={20}
                color="#666"
                style={styles.dateIcon}
              />
            </TouchableOpacity>
            {showJoinDatePicker && (
              <DateTimePicker
                value={formData.reg_joindt}
                mode="date"
                display="default"
                onChange={(event, date) =>
                  handleDateChange(event, date, "reg_joindt")
                }
              />
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Package</Text>
            <TextInput
              placeholder="Enter Package"
              style={styles.input}
              value={formData.reg_pakge}
              onChangeText={(text) => handleChange("reg_pakge", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Additional Details</Text>
            <TextInput
              placeholder="Enter any additional details"
              style={[styles.input, { height: 80 }]}
              multiline
              value={formData.reg_detail}
              onChangeText={(text) => handleChange("reg_detail", text)}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Updating..." : "Update Profile"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  subHeader: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 8,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: "#34495e",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateIcon: {
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#3498db",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: "#bdc3c7",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
