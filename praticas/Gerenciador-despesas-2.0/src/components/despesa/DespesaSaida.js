import { View, StyleSheet, useColorScheme } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';
import { getColors } from '../../constants/theme';

export default function DespesaSaida({ expenses, periodo }) {
  const colors = getColors(useColorScheme());

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaSumario expenses={expenses} periodo={periodo} />
      <DespesaLista expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});