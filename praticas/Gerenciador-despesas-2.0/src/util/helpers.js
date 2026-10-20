export const CATEGORIES = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

// Aceita Date ou string ISO (as datas voltam como string do AsyncStorage)
export function getDataFormatada(data) {
  const d = new Date(data);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${d.getFullYear()}`;
}