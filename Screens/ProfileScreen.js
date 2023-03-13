import React,{useEffect,useState,useLayoutEffect,useRef} from 'react'
import { View,Text,StyleSheet, Button ,Alert,TouchableOpacity,ScrollView,Animated} from 'react-native';
import {HeaderBackButton} from "@react-navigation/elements";
import { useFocusEffect } from '@react-navigation/native';
// import ProfileDetails from './ProfileDetails';
import { useNavigation , useRoute} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderCheckoutsList from '../Components/Home/OrderCheckoutsList';

const AnimatedView = Animated.createAnimatedComponent(View);

const HEADER_HEIGHT = 80;

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


const ProfileScreen = () => {
  const route =  useRoute();
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [userDetails, setUserDetails] = useState([]);

  const [scrollAnim] = useState(new Animated.Value(0));
  const [offsetAnim] = useState(new Animated.Value(0));
  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('');
  const [filter, setFilter] = useState({ price: '', product_name: '' });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [catDrinkId,setDrinkCatId] = useState('');
  const [isVisible, setIsVisible] = useState(true);

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

  const [clampedScroll, setClampedScroll] = useState(Animated.diffClamp(scrollAnim, 0, HEADER_HEIGHT));


  const scrollY = useRef(new Animated.Value(0)).current; // our animated value

  // our header y-axis animated from 0 to HEADER_SCROLL_DISTANCE,
  // we move our element for -HEADER_SCROLL_DISTANCE at the same time.
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });
  


  const headerStyles = [
    styles.header,
    { transform: [{ translateY: headerTranslateY }] },
  ];

  const footerStyles = [
    styles.footer,
    {
      transform: [
        {
          translateY: scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 100],
            extrapolateRight: 'clamp',
          }),
        },
      ],
    },
  ];
  return (
    <View style={styles.psc}>
     <Animated.View style={headerStyles}>
     {loggedIn && (
        <View style={styles.container}>
          
          <Text style={styles.field}><Ionicons name="person-circle" size={18} color="black" />: {userDetails.full_names}</Text>
          <Text style={styles.field}><Ionicons name="call" size={18} color="black" />: {userDetails.phone_number}</Text>
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

  <View style={styles.ord}> 
    <Text style={styles.ordtxt}> My Orders </Text>
  </View>

  </Animated.View>
    
    <OrderCheckoutsList
            loading={loading}
            category={category}
            order={order}
            search ={search}
            filter={filter}
            setSearch={setSearch}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }], // event.nativeEvent.contentOffset.x to scrollX
              { useNativeDriver: true }, // use native driver for animation
            )}
            contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT}}

          />
    {/* <Button title='some Details' onPress={() => navigation.navigate('Profile',{profileId:1})}/> */}
   </View>
  )
}

const styles = StyleSheet.create({
  psc:{
    flex:1
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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
      borderRadius:5,

    },
    ord:{
      padding:10
    },
    ordtxt:{
      textAlign:'center',
      fontSize:20,
      color:'green'
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: HEADER_MAX_HEIGHT,
      backgroundColor: '#f0f0f0',

    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 100,
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
    },
});
export default ProfileScreen