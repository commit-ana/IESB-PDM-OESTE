import { createContext, useState } from 'react';

const diasAtras = (dias) => new Date(Date.now() - dias * 24 * 60 * 60 * 1000);

const DESPESAS_INICIAIS = [
  { id: 'd1', descricao: 'Almoço', valor: 32.5, data: diasAtras(1), categoria: 'Alimentação' },
  { id: 'd2', descricao: 'Uber', valor: 24.9, data: diasAtras(2), categoria: 'Transporte' },
  { id: 'd3', descricao: 'Cinema', valor: 45, data: diasAtras(4), categoria: 'Lazer' },
  { id: 'd4', descricao: 'Conta de luz', valor: 150, data: diasAtras(10), categoria: 'Contas' },
  { id: 'd5', descricao: 'Mercado', valor: 89.9, data: diasAtras(15), categoria: 'Alimentação' },
];

export const DespesasContext = createContext({
  despesas: [],
  adicionarDespesa: () => {},
});

export default function DespesasContextProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesa(nova) {
    setDespesas((atuais) => [{ ...nova, id: Date.now().toString() }, ...atuais]);
  }

  return (
    <DespesasContext.Provider value={{ despesas, adicionarDespesa }}>
      {children}
    </DespesasContext.Provider>
  );
}