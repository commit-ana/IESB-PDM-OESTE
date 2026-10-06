import { useContext } from 'react';
import { DespesasContext } from '../store/despesas-context';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes() {
  const { despesas } = useContext(DespesasContext);

  const seteDiasAtras = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentes = despesas.filter((despesa) => despesa.data >= seteDiasAtras);

  return <DespesaSaida despesas={recentes} periodo="Últimos 7 dias" />;
}