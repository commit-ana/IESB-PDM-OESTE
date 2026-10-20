import { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, Platform, StyleSheet, useColorScheme } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import useDebounce from '../hooks/useDebounce';
import { CATEGORIES } from '../util/helpers';
import { getColors } from '../constants/theme';
import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function TodasDespesas() {
  const { expenses, clearExpenses } = useExpenses();
  const colors = getColors(useColorScheme());

  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todas');
  const buscaDebounced = useDebounce(busca, 300);

  const filtradas = useMemo(() => {
    const termo = buscaDebounced.trim().toLowerCase();
    return expenses.filter(
      (expense) =>
        (filtro === 'Todas' || expense.category === filtro) &&
        expense.description.toLowerCase().includes(termo)
    );
  }, [expenses, buscaDebounced, filtro]);

    function limparTudo() {
    if (Platform.OS === 'web') {
      if (window.confirm('Isso vai apagar todas as despesas. Deseja continuar?')) {
        clearExpenses();
      }
      return;
    }

    Alert.alert('Limpar tudo', 'Isso vai apagar todas as despesas. Deseja continuar?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Limpar tudo', style: 'destructive', onPress: clearExpenses },
    ]);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.filtro, { backgroundColor: colors.card }]}>
        <TextInput
          style={[
            styles.busca,
            { borderColor: colors.border, color: colors.text, backgroundColor: colors.background },
          ]}
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar por descrição"
          placeholderTextColor={colors.textSecondary}
          autoCorrect={false}
        />
        <CategoriaSeletor
          categorias={['Todas', ...CATEGORIES]}
          selecionada={filtro}
          onSelecionar={setFiltro}
        />
        {expenses.length > 0 && (
          <Pressable style={styles.limpar} onPress={limparTudo}>
            <Text style={[styles.limparTexto, { color: colors.error }]}>Limpar tudo</Text>
          </Pressable>
        )}
      </View>
      <DespesaSaida expenses={filtradas} periodo={filtro === 'Todas' ? 'Total' : filtro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filtro: { padding: 12, gap: 10 },
  busca: { borderWidth: 1, borderRadius: 6, padding: 10 },
  limpar: { alignSelf: 'flex-end', paddingVertical: 4 },
  limparTexto: { fontWeight: 'bold' },
});