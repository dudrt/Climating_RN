import { TextInput, TouchableOpacity, View, Text, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import axios from 'axios';
import { useState } from "react";



export default function TelaPrincipal() {

    const [input, setInput] = useState("")
    const [ViewInfos, setView] = useState()
    const [ViewTop, setViewTop] = useState()
    const [ViewHourInfo, setHourInfo] = useState()


    const FazerRequest = async () => {
        axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&include=hours%2Cdays&lang=pt&key=824BLCVKKZCSN4HLQVJ6HBSPF&conten`)
            .then((response) => {
                setView(response.data)
                ArrumarViewTop(response.data, 0)
                ArrumarViewHour(response.data, 0)
            });
    }

    const ArrumarViewTop = async (data, posicao) => {
        const hoje = new Date()
        let agora = hoje.getHours() - 1
        console.log(data.days[posicao].hours[2].datetime)
        setViewTop(
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", margin: "3%" }}>
                    <View>
                        <Text style={{ color: "#FFF", fontSize: 22 }}>{data.resolvedAddress}</Text>
                        <Text style={{ color: "#FFF", fontSize: 77 }}>{data.days[posicao].hours[agora].temp}°</Text>
                        <Text style={{ color: "#FFF", fontSize: 22 }}>Min. {data.days[posicao].tempmin}° Max. {data.days[posicao].tempmax}°</Text>
                    </View>
                    <Image
                        source={{ uri: `https://github.com/dudrt/Climating_RN/blob/main/content/${data.days[posicao].icon}.png?raw=true` }}
                        style={{ width: "42%", height: "100%", marginStart: "3%" }}
                    />
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.descricao}>{data.days[posicao].description}</Text>
                </View>
            </View>
        )
    }

    const ArrumarViewHour = async (data, posicao) => {
        const hoje = new Date()
        let agora = hoje.getHours()
        let arrayView = []

        for (var i = 0; i <= 23; i++) {
            arrayView.push(
                <View style={styles.hour_view_unico}>
                    <Text style={styles.text_hour}>
                        {data.days[posicao].hours[i].temp}
                    </Text>
                    <Image
                        source={{ uri: `https://github.com/dudrt/Climating_RN/blob/main/content/${data.days[posicao].hours[i].icon}.png?raw=true` }}
                        style={{ width: 25, height: 25, alignSelf:"center"}}
                    />
                    <Text style={styles.text_hour}>{data.days[posicao].hours[i].precipprob}</Text>
                    <Text style={styles.text_hour}>{data.days[posicao].hours[i].datetime.slice(0, -3)}</Text>
                </View>
            )
        }

        setHourInfo(arrayView)

    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TextInput
                    placeholder="Pesquisar cidade"
                    onChangeText={texto => setInput(texto)}
                    value={input}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button_top} onPress={() => FazerRequest()}><Text>Pesq</Text></TouchableOpacity>
            </View>
            <View style={styles.view_top_infos}>
                {ViewTop}
            </View>
            <View>
                <ScrollView horizontal={true} style={styles.scroll_hour_info}>
                        {ViewHourInfo}
                </ScrollView>
            </View>
            <View style={styles.resposta}>
                {ViewInfos != undefined ? (ViewInfos.days.map((componente, index) => (
                    index < 7 ? (
                        <View key={index} style={styles.views} >
                            <Image
                                key={index}
                                source={{ uri: `https://github.com/dudrt/Climating_RN/blob/main/content/${componente.icon}.png?raw=true` }}
                                style={{ width: 35, height: 35, marginEnd: "2%" }}
                            />
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
        height: "100%",
        backgroundColor: "#212121",
        flex: 1
    },
    top: {
        marginTop: "10%",
        width: "100%",
        minHeight: 40,
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "5%"
    },
    input: {
        color: "#FFF",
        width: "65%",
        borderRadius: 50,
        borderStyle: "solid",
        borderWidth: 2,
        paddingStart: 10,
        color: "#FFF",
        fontSize: 18
    },
    button_top: {
        backgroundColor: "#E52828",
        width: "15%",
        marginStart: "4%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    resposta: {
        width: "100%",
    },
    views: {
        flexDirection: "row",
        marginTop: "2%",
        height: "8%",
        alignItems: "center"
    },
    views_text: {
        color: "#FFF",
        fontSize: 18,
    },
    view_top_infos: {
        width: "100%"
    },
    descricao: {
        width: "85%",
        borderRadius: 40,
        color: "#FFF",
        fontSize: 16,
        backgroundColor: "#181818",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    scroll_hour_info: {
        flexDirection: "row",
    },
    hour_view_unico: {
        backgroundColor: "#FFF",
        borderRadius: 30,
        padding:10,
        margin:5,
        justifyContent: "center",
        alignContent: "center",
        // margin:5,
    },
    text_hour: {
        alignSelf:"center"
    }
})