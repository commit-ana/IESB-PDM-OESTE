import { View, Text, Share, StyleSheet } from 'react-native';
import { useExpenses } from '../../store/expenses-context';
import { Button, colors } from '../../components/ui';

export default function Wallet() {
  const ctx = useExpenses();
  const expenses = Array.isArray(ctx) ? ctx : ctx?.expenses ?? [];
  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const handleShare = async () => {
    try {
      await Share.share({ message: `Gastei R$ ${total.toFixed(2)} neste semestre.` });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.label}>Total gasto</Text>
        <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
        <Text style={styles.sub}>
          {expenses.length === 0
            ? 'Nenhuma despesa registrada ainda.'
            : `${expenses.length} ${expenses.length === 1 ? 'despesa registrada' : 'despesas registradas'}`}
        </Text>
      </View>

      <Button title="Compartilhar resumo" icon="share-outline" onPress={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 16 },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 24,
    gap: 4,
  },
  label: { color: '#CFE5DF', fontSize: 14, fontWeight: '600' },
  total: { color: '#FFFFFF', fontSize: 44, fontWeight: '800' },
  sub: { color: colors.accent, fontSize: 14, fontWeight: '600', marginTop: 4 },
});