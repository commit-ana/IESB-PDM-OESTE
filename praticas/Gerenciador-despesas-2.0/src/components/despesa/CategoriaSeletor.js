import { View, Pressable, Text, StyleSheet, useColorScheme } from 'react-native';
import { getColors } from '../../constants/theme';

export default function CategoriaSeletor({ categorias, selecionada, onSelecionar }) {
  const colors = getColors(useColorScheme());

  return (
    <View style={styles.linha}>
      {categorias.map((cat) => {
        const ativa = selecionada === cat;
        return (
          <Pressable
            key={cat}
            onPress={() => onSelecionar(cat)}
            style={[styles.botao, { backgroundColor: ativa ? colors.primary : colors.chip }]}
          >
            <Text style={{ color: ativa ? colors.primaryText : colors.chipText }}>{cat}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  botao: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
});