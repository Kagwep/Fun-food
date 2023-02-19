import React, { useRef,useState,useEffect }  from 'react'
import { View,Text,StyleSheet, Button,FlatList,ScrollView,Animated,LayoutAnimation,Image,TouchableOpacity,Dimensions } from 'react-native';
import CatgoryList from '../Components/Categories/CategoryList';
import Search from '../Components/Stand/Search';
import BannersList from '../Components/Stand/BannerList';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FoodList from '../Components/Home/FoodList';


const HEADER_HEIGHT = 250;

const HEADER_MAX_HEIGHT = 350;
const HEADER_MIN_HEIGHT = 184;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const HomeScreen = () => {

  const navigation = useNavigation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    })();
  }, []);

  const handleLogout = async () => {
    // Perform logout logic here
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
  };


  const [scrollAnim] = useState(new Animated.Value(0));
  const [offsetAnim] = useState(new Animated.Value(0));
  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('');
  const [filter, setFilter] = useState({ price: '', product_name: '' });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  // const {height} = Dimensions.get("window");

  // const [clampedScroll, setClampedScroll] = useState(Animated.diffClamp(
  //   Animated.add(
  //     scrollAnim.interpolate({
  //       inputRange: [-height, 1],
  //       outputRange: [0, 1],
  //       extrapolateLeft: 'clamp'
  //     }),
  //     offsetAnim
  //   ), 0, 1
  // ));

  console.log(category)

  // const navbarTranslate = clampedScroll.interpolate({
  //   inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT, HEADER_HEIGHT + HEADER_HEIGHT / 2, HEADER_HEIGHT * 2],
  //   outputRange: [HEADER_HEIGHT, 0, -HEADER_HEIGHT / 2, 0, -HEADER_HEIGHT],
  //   extrapolate: 'clamp'
  // });

  // const scrollY = useRef(new Animated.Value(0)).current;
  const [clampedScroll, setClampedScroll] = useState(Animated.diffClamp(scrollAnim, 0, HEADER_HEIGHT));

  const navbarTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT*1.8],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const navbarOpacity = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const scrollY = useRef(new Animated.Value(0)).current; // our animated value

  // our header y-axis animated from 0 to HEADER_SCROLL_DISTANCE,
  // we move our element for -HEADER_SCROLL_DISTANCE at the same time.
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });
  
  // our opacity animated from 0 to 1 and our opacity will be 0
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });
  
  // change header title size from 1 to 0.9
  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.9],
    extrapolate: 'clamp',
  });
  // change header title y-axis
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });


  return (
    
    <View style={style.screen}>
          
      <Animated.View
        bounces={false}
        style={[style.header,{ transform: [{ translateY: headerTranslateY }] }]}
        onLayout={(event) => {
          let {height} = event.nativeEvent.layout;
          setClampedScroll(Animated.diffClamp(
            Animated.add(
              scrollAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp'
              }),
              offsetAnim
            ), 0, height)
          );
        }}
      >
        {/* <View style={style.info}>
        <View style={style.name}>
        <Ionicons name="cart-outline" size={24} color="#fff" />
        <Text style={style.heder}>  BSM </Text>
        </View>
      {!isLoggedIn && (
        <View style={style.logreg}>
          <TouchableOpacity
          style={style.btnlog}
          onPress={() => navigation.navigate('LogIn')}
          >
            <Ionicons name="log-in" size={24} color="white" />
            <Text style={{color:'#fff',fontWeight:'bold',paddingTop:2}}> Log in </Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={style.btnreg}
          // onPress={() => navigation.navigate('Register')}
          >
            <Ionicons name="ios-log-in" size={24} color="white" />
            <Text style={{color:'#fff',fontWeight:'bold',paddingTop:2}}> Register </Text>
          </TouchableOpacity>
        </View>
        )}
        {isLoggedIn && (
            <TouchableOpacity
            style={style.btnreg}
            onPress={handleLogout}
            >
              <Ionicons name="ios-log-in" size={24} color="white" />
              <Text style={{color:'#fff',fontWeight:'bold',paddingTop:2}}> Log out </Text>
            </TouchableOpacity>
          )}
        </View> */}
        

        <Search setSearch={setSearch}/>
        <BannersList />

        <CatgoryList setCategory={setCategory}/>
        {/* Add a "reset filter" button */}
                {category && (
        <TouchableOpacity
        style={style.catbac}
        onPress={() => setCategory(null)}
        >
          <Text style={style.catbactext}>Back to All Categories</Text>
        </TouchableOpacity>
      )}
       
        <View style={{flexDirection:'row'}}>
        {/* <Ionicons name="swap-vertical" size={32} onPress={() => setOrder('price')} />
        <Ionicons name="md-arrow-dropup" size={32} onPress={() => setOrder('-price')} />
        <Ionicons name="md-arrow-dropdown" size={32} onPress={() => setOrder('product_name')} />
        <Ionicons name="md-arrow-dropup" size={32} onPress={() => setOrder('-product_name')} /> */}

      </View>

      </Animated.View>



      <View style={{  zIndex: 0}}>

        <FoodList

      loading={loading}
      category={category}
      order={order}
      search ={search}
      filter={filter}
      contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT}}
      // contentInset={{ top: HEADER_HEIGHT }}
      // contentOffset={{ y: -HEADER_HEIGHT }}
      
      // navbarTranslate = {navbarTranslate}
      scrollEventThrottle={16}
        // onScroll={Animated.event(
        //   [
        //     {
        //       nativeEvent: {
        //         contentOffset: { y: scrollAnim }
        //       }
        //     }
        //   ],
        //   { useNativeDriver: true }
        // )}
        
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        //   { useNativeDriver: true },
        // )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }], // event.nativeEvent.contentOffset.x to scrollX
          { useNativeDriver: true }, // use native driver for animation
        )}
        />
        {/* <Button title='Details' onPress={() => navigation.navigate('Event')}/> */}
        </View>
    </View>
  )
}

const style = StyleSheet.create({

    screen:{
        flex: 1,
        marginTop:0,
        marginHorizontal:0,
        
   

    },
    heder:{
        textAlign:"center",
        fontSize:24,
        color:"green",
        fontWeight:'bold',
        color:'#fff',
    
    },
    header: {
      position: 'absolute',
      zIndex: 1,
      left: 0,
      right: 0,
      top: 0,
      backgroundColor: '#FFC000',
      height: HEADER_MAX_HEIGHT,
      padding:3,
      borderBottomEndRadius:20,
      borderBottomLeftRadius:20,
      },
    tinyLogo: {
      width: 70,
      height: 70,
    },
    info:{
      flexDirection:"row",
      justifyContent:'space-between'
    },
    name:{
      flexDirection:'row',
      backgroundColor:'rgb(255,141,8)'

    },
    logreg:{
      flexDirection:'row'
    },
    btnlog:{
      flexDirection:'row',
      backgroundColor:"#09ff",
      marginHorizontal:2,
      marginBottom:4,
    },
    btnreg:{
      flexDirection:'row',
      backgroundColor:"#09ff",
      marginHorizontal:2,
      marginBottom:4,

    },
    catbac:{

      backgroundColor:"#ffff",
      marginHorizontal:5,
      padding:5,
    },
    catbactext:{
      textAlign:'center',
      fontSize:18,
      color:"#000",
      fontWeight:'bold'
    },
    logo:{
        flexDirection:"row",
        paddingLeft:10,
        paddingTop:10,
        alignItems:'center',
        
    },
    imag:{
          paddingHorizontal:10
    },
    logotext:{
        
        textAlign:"center"
    },
    ltext:{
        textAlign:'center',
        fontWeight:"bold",
    },
    motto:{
        marginTop:0,
        paddingTop:0,
        marginBottom:10,
        marginLeft:50,
        
    },
    mottotext:{
        fontFamily:'sans-serif',
        fontStyle:'italic',
        fontWeight:'bold',
        fontSize:11
    }

})

export default HomeScreen