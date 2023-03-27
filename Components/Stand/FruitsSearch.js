import {View,TextInput,StyleSheet} from "react-native";
import {FontAwesome}  from "@expo/vector-icons"
import { useState } from "react";

export default function FruitsSearch({setSearch}){

        const [input,setInput] = useState("")
        const handleEndEditing = () => {
            if(!input) return; setSearch(input);
            setInput("");
        }
     
    return (
        <View style={[styles.container, styles.elevation]}>
            <FontAwesome  name="search" size={25}/>
            <TextInput 
            style = {styles.input}
            placeholder="search"
            value={input}
            onChangeText={(text) => {setInput(text);}}
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