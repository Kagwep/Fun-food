import React,{useEffect,useState,useLayoutEffect,useRef} from 'react'
import { View,Text,StyleSheet, Button ,Alert,TouchableOpacity,ScrollView,Animated} from 'react-native';
import {HeaderBackButton} from "@react-navigation/elements";
import { useFocusEffect } from '@react-navigation/native';
// import ProfileDetails from './ProfileDetails';
import { useNavigation , useRoute} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PanelList from '../Components/Home/panelList';
import OrderssSearch from '../Components/Stand/OrderSearch';

const AnimatedView = Animated.createAnimatedComponent(View);

const HEADER_HEIGHT = 100;

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 40;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


const PanelScreen = () => {
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
      headerTitle:'Ordered Items',
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
        <View style={styles.container}>
          
        <View >
          <OrderssSearch setSearch={setSearch}/>
        </View>
        </View>

      <View style={styles.ord}> 
        <Text style={styles.ordtxt}> All Orders </Text>
      </View>



     </Animated.View>


     <View style={{paddingTop:HEADER_MAX_HEIGHT,flex:1}}>

     {search && (
        <TouchableOpacity
        style={styles.catbac}
        onPress={() => {
          setSearch(null);
        }}
        
        >

          <Ionicons name="arrow-back-circle" size={24} color="black" />
          <Text style={styles.catbactext}>Back</Text>

        </TouchableOpacity>
      )}

    <PanelList
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
            contentContainerStyle={{ paddingTop: 2}}

          />

    </View>


    {/* <Button title='some Details' onPress={() => navigation.navigate('Profile',{profileId:1})}/> */}
   </View>

  )
}

const styles = StyleSheet.create({
  psc:{
    flex:1
  },
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
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
    borderBottomEndRadius:10,
    borderBottomStartRadius:10,
    
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
      zIndex: 1,
      backgroundColor:'transparent',
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
    catbac:{
      flexDirection:'row',
      paddingBottom:10,
      justifyContent:'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: 'white',
      margin:5,
      borderRadius:10,
    },
    catbactext:{
      paddingTop:5
      
    },
});
export default PanelScreen