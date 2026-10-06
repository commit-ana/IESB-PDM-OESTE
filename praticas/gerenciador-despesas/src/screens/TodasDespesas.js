import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DespesasContext } from '../store/despesas-context';
import { CATEGORIAS } from '../util/helpers';
import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import DespesaSaida from '../components/despesa/DespesaSaida';

function filtrarPorCategoria(despesas, categoria) {
  if (categoria === 'Todas') return despesas;
  return despesas.filter((despesa) => despesa.categoria === categoria);
}

export default function TodasDespesas() {
  const { despesas } = useContext(DespesasContext);
  const [filtro, setFiltro] = useState('Todas');

  const filtradas = filtrarPorCategoria(despesas, filtro);

  return (
    <View style={styles.container}>
      <View style={styles.filtro}>
        <CategoriaSeletor
          categorias={['Todas', ...CATEGORIAS]}
          selecionada={filtro}
          onSelecionar={setFiltro}
        />
      </View>
      <DespesaSaida despesas={filtradas} periodo={filtro === 'Todas' ? 'Total' : filtro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filtro: { padding: 12, backgroundColor: '#fff' },
});