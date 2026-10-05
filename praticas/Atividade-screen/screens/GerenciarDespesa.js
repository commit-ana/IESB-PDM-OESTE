import { View, Text, StyleSheet } from 'react-native';

export default function GerenciarDespesas() {
  return (
    <View style={styles.container}>
      <Text>Tela: Gerenciar Despesas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});