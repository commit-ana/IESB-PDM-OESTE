import { View, Pressable, Text, StyleSheet } from 'react-native';

export default function CategoriaSeletor({ categorias, selecionada, onSelecionar }) {
  return (
    <View style={styles.linha}>
      {categorias.map((cat) => (
        <Pressable
          key={cat}
          onPress={() => onSelecionar(cat)}
          style={[styles.botao, selecionada === cat && styles.botaoAtivo]}
        >
          <Text style={[styles.texto, selecionada === cat && styles.textoAtivo]}>{cat}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  botao: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#e5e5e5' },
  botaoAtivo: { backgroundColor: '#3b5bdb' },
  texto: { color: '#333' },
  textoAtivo: { color: '#fff' },
});