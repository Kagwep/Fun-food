import {View,TextInput,StyleSheet} from "react-native";
import {FontAwesome}  from "@expo/vector-icons"
import { useState } from "react";

export default function DrinksSearch({setSearch}){

        const [input,setInput] = useState("")
        const handleEndEditing = () => {
            if(!input) return; setTerm(input);
            setInput("");
        }
     
    return (
        <View style={[styles.container, styles.elevation]}>
            <FontAwesome  name="search" size={25}/>
            <TextInput 
            style = {styles.input}
            placeholder="search"
            value={input}
            onChangeText={(text) => {setSearch(text);}}
            onEndEditing={handleEndEditing}

            />
        </View>

    );
}

const styles = StyleSheet.create({
    container:{

        flexDirection:"row",
        backgroundColor:"#fff",
        padding:10,
        borderRadius:10,
        marginTop:0,
    },
    input:{
        fontSize:16,
        marginLeft:10,
    }
})