import { View, Text, StyleSheet } from 'react-native';
import { getDataFormatada } from '../../util/helpers';

export default function DespesaItem({ descricao, valor, data, categoria }) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.descricao}>{descricao}</Text>
        <Text style={styles.data}>{getDataFormatada(data)}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagTexto}>{categoria}</Text>
        </View>
      </View>
      <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  descricao: { fontSize: 16, fontWeight: 'bold' },
  data: { color: '#666', marginVertical: 2 },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tagTexto: { fontSize: 12, color: '#333' },
  valor: { fontSize: 16, fontWeight: 'bold' },
});