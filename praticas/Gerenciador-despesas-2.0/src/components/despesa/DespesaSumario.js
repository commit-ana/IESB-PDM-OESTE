import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { getColors } from '../../constants/theme';

export default function DespesaSumario({ expenses, periodo }) {
  const colors = getColors(useColorScheme());
  const soma = expenses.reduce((acumulador, item) => acumulador + item.amount, 0);
  const quantidade = expenses.length;

  return (
    <View style={[styles.container, { backgroundColor: colors.summary }]}>
      <View>
        <Text style={[styles.periodo, { color: colors.text }]}>{periodo}</Text>
        <Text style={{ color: colors.textSecondary }}>
          {quantidade} {quantidade === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={[styles.soma, { color: soma > 200 ? colors.error : colors.text }]}>
        R$ {soma.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    margin: 12,
    borderRadius: 8,
  },
  periodo: { fontSize: 14, fontWeight: 'bold' },
  soma: { fontSize: 18, fontWeight: 'bold' },
});