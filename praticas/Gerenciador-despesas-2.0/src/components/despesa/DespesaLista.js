import { FlatList, View, Text, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';
import { getColors } from '../../constants/theme';

export default function DespesaLista({ expenses }) {
  const colors = getColors(useColorScheme());
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 2 : 1;

  return (
    <FlatList
      key={numColumns}
      data={expenses}
      numColumns={numColumns}
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <View style={numColumns > 1 ? styles.celula : null}>
          <DespesaItem {...item} />
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.vazio}>
          <Ionicons name="wallet-outline" size={56} color={colors.textSecondary} />
          <Text style={[styles.vazioTitulo, { color: colors.text }]}>Nenhuma despesa.</Text>
          <Text style={{ color: colors.textSecondary }}>Toque em + para adicionar.</Text>
        </View>
      }
      contentContainerStyle={styles.conteudo}
    />
  );
}

const styles = StyleSheet.create({
  conteudo: { paddingBottom: 24 },
  celula: { flex: 1 },
  vazio: { alignItems: 'center', padding: 32 },
  vazioTitulo: { fontSize: 18, fontWeight: 'bold', marginTop: 8, marginBottom: 4 },
});