import { useMemo } from 'react';
import { useExpenses } from '../store/expenses-context';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();

  const recentes = useMemo(() => {
    const limite = new Date();
    limite.setHours(0, 0, 0, 0);
    limite.setDate(limite.getDate() - 7);
    return expenses.filter((expense) => new Date(expense.date) >= limite);
  }, [expenses]);

  return <DespesaSaida expenses={recentes} periodo="Últimos 7 dias" />;
}