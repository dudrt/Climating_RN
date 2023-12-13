import { TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import axios from 'axios';
import { useContext, useState } from "react";



export default function TelaPrincipal() {

    const [input, setInput] = useState("")
    const [ViewInfos, setView] = useState()

    const FazerRequest = async () => {
        axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&include=hours%2Cdays&lang=pt&key=824BLCVKKZCSN4HLQVJ6HBSPF&conten`)
            .then((response) => {
                ArrumarResposta(response.data)
            });
    }

    const ArrumarResposta = async (data) => {

        setView(data)
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
                {ViewInfos != undefined ? (ViewInfos.days.map((componente, index) => (
                    index < 7 ? (
                        <View key={index} style={styles.views} >
                            <Text style={styles.views_text}>Temp:{componente.tempmin}° - </Text>
                            <Text style={styles.views_text}>{componente.tempmax}°</Text>
                        </View>
                    ) : (<></>)
                ))) : (<><Text>Não existe</Text></>)}
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

        color: "#FFF",
        width: "80%"
    },
    resposta: {
        width: "100%",
    },
    views: {
        flexDirection: "row",
        backgroundColor: "#5F5F5F",
        marginTop: "2%",
        height: "8%",
        alignItems: "center"
    },
    views_text: {
        color: "#FFF",
        fontSize: 18,
    }
})