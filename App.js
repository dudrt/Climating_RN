import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TelaPrincipal from './src/TelaPrincipal/TelaPrincipal';
import Toast from 'react-native-toast-message';


export default function App() {
  return (
    <View style={styles.container}>
      <TelaPrincipal/>
      <StatusBar style="auto" />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
