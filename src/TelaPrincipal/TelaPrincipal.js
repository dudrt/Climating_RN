import { TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import axios from 'axios';
import { useContext, useState } from "react";



export default function TelaPrincipal() {

    const [input, setInput] = useState("")
    const [View, setView] = useState()


    const FazerRequest = async () => {
        axios.get(`"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&include=hours%2Cdays&lang=pt&key=824BLCVKKZCSN4HLQVJ6HBSPF&conten`)
        .then((response) => {
            ArrumarResposta(response)
        });
    }

    const ArrumarResposta = async (data) =>{
        setView(
            <View>
                {data.resolvedAddress}
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TextInput
                    onChangeText={texto => setInput(texto)}
                    value={input}
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => FazerRequest()}><Text>Pesq</Text></TouchableOpacity>
            </View>
            <View style={styles.resposta}>
                {View}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    top: {
        marginTop: "15%",
        width: "100%",
        backgroundColor: "#A0FF98"
    },
    input: {
        backgroundColor: "#000",
        color: "#FFF",
        width: "80%"
    },
    resposta: {

    }
})