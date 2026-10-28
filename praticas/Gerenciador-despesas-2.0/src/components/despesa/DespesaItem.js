import { View, Text, Pressable, StyleSheet, Platform, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../util/helpers';
import { getColors } from '../../constants/theme';

const sombra = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  android: { elevation: 3 },
});

export default function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  const colors = getColors(useColorScheme());

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: id })}
      style={({ pressed }) => [
        styles.item,
        { backgroundColor: colors.card },
        sombra,
        pressed && styles.pressionado,
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.descricao, { color: colors.text }]}>{description}</Text>
        <Text style={[styles.data, { color: colors.textSecondary }]}>{getDataFormatada(date)}</Text>
        <View style={[styles.tag, { backgroundColor: colors.chip }]}>
          <Text style={[styles.tagTexto, { color: colors.chipText }]}>{category}</Text>
        </View>
      </View>
      <Text style={[styles.valor, { color: colors.text }]}>R$ {amount.toFixed(2)}</Text>
    </Pressable>
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
    borderRadius: 8,
  },
  pressionado: { opacity: 0.7 },
  info: { flexShrink: 1, marginRight: 8 },
  descricao: { fontSize: 16, fontWeight: 'bold' },
  data: { marginVertical: 2 },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tagTexto: { fontSize: 12 },
  valor: { fontSize: 16, fontWeight: 'bold' },
});