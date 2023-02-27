import React,{useEffect,useState,useLayoutEffect} from 'react'
import { View,Text,StyleSheet, Button ,Alert,TouchableOpacity} from 'react-native';
import {HeaderBackButton} from "@react-navigation/elements";
import { useFocusEffect } from '@react-navigation/native';
// import ProfileDetails from './ProfileDetails';
import { useNavigation , useRoute} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const route =  useRoute();
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [userDetails, setUserDetails] = useState([]);

  const user_details = "";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:'Profile',
      headerLeft: () => (
        <HeaderBackButton 
          tintColor='white'
          onPress={() => navigation.goBack()}
        
        />
      )
    })
   },[])

  //  useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     const token = await AsyncStorage.getItem('token');

  //     if (!token) {
  //       setLoggedIn(false);
  //     }
  //     else{
  //       setLoggedIn(true);
  //     }
  //   };

  //   checkLoggedIn();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
  
      const checkLoggedIn = async () => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const myUser = JSON.parse(user);
  
        if (!token) {
          setLoggedIn(false);
        }
        else{
          setLoggedIn(true);
          setUserDetails(myUser)
        }
      };
  
      checkLoggedIn();
  
      return () => {
        isActive = false;
      };
    }, [])
  );
  

  const handleLogout = async () => {
    // Perform logout logic here
    await AsyncStorage.removeItem('token');
    setLoggedIn(false);
  };

  console.log(user_details)

  return (
    <View>
    
     {loggedIn && (
        <View style={styles.container}>
          
          <Text style={styles.field}><Ionicons name="person-circle" size={26} color="black" />: {userDetails.full_names}</Text>
          <Text style={styles.field}><Ionicons name="call" size={26} color="black" />: {userDetails.phone_number}</Text>
          <TouchableOpacity
          style={styles.btnreg}
          onPress={handleLogout}
          >
            <Ionicons name="ios-log-in" size={24} color="white" />
            <Text style={{color:'#fff',fontWeight:'bold',paddingTop:2}}> Log out </Text>
          </TouchableOpacity>
        
        
        </View>



     )

    
    


    }
    {!loggedIn && (
      <View style={styles.loginContainer}>
        <Text style={styles.loginMessage}>You need to log in to view your user details.</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
  )}
    
    {/* <Button title='some Details' onPress={() => navigation.navigate('Profile',{profileId:1})}/> */}
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  field: {
    fontSize: 16,
    marginBottom: 8,
  },
  loginContainer: {
    marginBottom: 16,
    backgroundColor: '#FED7D7',
    padding: 16,
    borderRadius: 8,
  },
  loginMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loginButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
    btnreg:{
      flexDirection:'row',
      backgroundColor:"#09ff",
      marginHorizontal:2,
      marginBottom:4,

    },
});
export default ProfileScreen