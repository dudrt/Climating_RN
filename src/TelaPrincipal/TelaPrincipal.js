import { TextInput, TouchableOpacity, View, Text, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import axios from 'axios';
import { useState } from "react";
import Toast from 'react-native-toast-message';

export default function TelaPrincipal() {

    const [input, setInput] = useState("")
    const [ViewInfos, setView] = useState()
    const [ViewTop, setViewTop] = useState()
    const [ViewHourInfo, setHourInfo] = useState()
    const [DiaAtual, setDiaAtual] = useState(0)

    const FazerRequest = async () => {
        axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&include=hours%2Cdays&lang=pt&key=824BLCVKKZCSN4HLQVJ6HBSPF&conten`)
            .then((response) => {
                setView(response.data)
                setDiaAtual(0)
                ArrumarViewTop(0)
                ArrumarViewHour(0)
            })
            .catch(function (error) {
                showToast()
              });
    }
    const showToast = async () => {
        Toast.show({
          type: 'error',
          text1: 'Cidade não encontrada!',
          position:"bottom"
        });
    }

    const ArrumarViewTop = async (posicao) => {
        const date = new Date(ViewInfos.days[posicao].datetime);
        const options = { weekday: 'long' };
        const currentDayOfWeek = date.toLocaleString('pt-BR', options);
        const hoje = new Date()
        let agora = hoje.getHours()
        setViewTop(
            <View key={"topkey"} >
                <View key={'view1'} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", margin: "1%" }}>
                    <View style={{ width: "52%" }}>
                        <Text style={{ color: "#FFF", fontSize: 20 }}>{ViewInfos.resolvedAddress}</Text>
                        <Text style={{ color: "#FFF", fontSize: 75 }}>{ViewInfos.days[posicao].hours[agora].temp}°</Text>
                        <Text style={{ color: "#FFF", fontSize: 20 }}>Min. {ViewInfos.days[posicao].tempmin}° Max. {ViewInfos.days[posicao].tempmax}°</Text>
                        <Text style={{ color: "#FFF", fontSize: 26 }}>{currentDayOfWeek.split(',')[0].charAt(0).toUpperCase()+currentDayOfWeek.split(',')[0].substring(1)}</Text>
                    </View>
                    <Image
                        key={"imagekey"}
                        source={{ uri: `https://github.com/dudrt/Climating_RN/blob/main/content/${ViewInfos.days[posicao].icon}.png?raw=true` }}
                        style={{ width: "40%", height: "70%" }}
                    />
                </View>
                <View key={'view2'} style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.descricao}>{ViewInfos.days[posicao].description}</Text>
                </View>
            </View>
        )
    }

    const ArrumarViewHour = async (posicao) => {
        const hoje = new Date()
        let agora = hoje.getHours()
        let arrayView = []
        posicao != 0 ? agora=0 : null;
        for (var i = agora; i <= 23; i++) {
            arrayView.push(
                <View key={i} style={styles.hour_view_unico}>
                    <Text key={`temp${i}`} style={styles.text_hour}>
                        {ViewInfos.days[posicao].hours[i].temp}°
                    </Text>
                    <Image
                        key={`imgdias${i}`}
                        source={{ uri: `https://github.com/dudrt/Climating_RN/blob/main/content/${ViewInfos.days[posicao].hours[i].icon}.png?raw=true` }}
                        style={{ width: 25, height: 25, alignSelf: "center" }}
                    />
                    <Text key={`textprecib${i}`} style={styles.text_hour}>{ViewInfos.days[posicao].hours[i].precipprob}%</Text>
                    <Text key={`texthour${i}`} style={styles.text_hour}>{ViewInfos.days[posicao].hours[i].datetime.slice(0, -3)}</Text>
                </View>
            )
        }

        setHourInfo(arrayView)

    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TextInput
                    placeholderTextColor={"#FFF"}
                    placeholder="Pesquisar cidade"
                    onChangeText={texto => setInput(texto)}
                    value={input}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button_top} onPress={() => FazerRequest()}>
                <Image
                style={{width:30,height:30}}
                resizeMode="contain"
                source={require("../../content/pesquisa-de-lupa.png")}/>
                
                </TouchableOpacity>
            </View>

            <ScrollView>
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
                            <TouchableOpacity key={index} style={[styles.views,index === DiaAtual? styles.view_escolhida : styles.views]}
                             onPress={async () => {
                                setDiaAtual(index)
                                ArrumarViewTop(index);
                                ArrumarViewHour(index)}}>
                                <Image
                                    key={index + 20}
                                    source={{ uri: `https://github.com/dudrt/Climating_RN/blob/main/content/${componente.icon}.png?raw=true` }}
                                    style={{ width: 35, height: 35, marginEnd: "2%" }}
                                />
                                <Text style={styles.views_text} key={index + 30}>{
                                    new Date(componente.datetime).toLocaleString('pt-BR', {weekday : 'long' }).split(',')[0].charAt(0).toUpperCase()+new Date(componente.datetime).toLocaleString('pt-BR', {weekday : 'long' }).split(',')[0].substring(1)
                                    }</Text>
                                <View style={styles.view_text_view}>
                                    <Text key={index + 40} style={styles.views_text}>Temp:{componente.tempmin}° - </Text>
                                    <Text key={index + 50} style={styles.views_text}>{componente.tempmax}°</Text>
                                </View>
                            </TouchableOpacity>
                        ) : (<></>)
                    ))) : (<View style={styles.view_pesquisar}><Text style={styles.text_pesquisar}>Pesquise a Cidade Desejada!</Text></View>)}
                </View>
            </ScrollView>
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
        marginTop: "15%",
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
        marginStart: "4%",
    },
    resposta: {
        width: "100%",
    },
    views: {
        backgroundColor: "#181818",
        margin: "2%",
        marginBottom: "1%",
        padding: 10,
        borderRadius: 40,
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
        backgroundColor: "#181818",
        borderRadius: 30,
        padding: 10,
        margin: 5,
        justifyContent: "center",
        alignContent: "center",
    },
    text_hour: {
        alignSelf: "center",
        color: "#FFF"
    },
    view_text_view:{
        marginStart:"3%",
        width:"60%",
        flexDirection:"row"
    },
    view_pesquisar:{
        width:'100%',
        justifyContent:"center",
        alignItems:"center",
    },
    text_pesquisar:{
        fontSize:25,
        color:"#FFF"
    },
    view_escolhida:{
        backgroundColor: "#353535",
        margin: "2%",
        marginBottom: "1%",
        padding: 10,
        borderRadius: 40,
        flexDirection: "row",
        marginTop: "2%",
        height: "8%",
        alignItems: "center"
    }
})