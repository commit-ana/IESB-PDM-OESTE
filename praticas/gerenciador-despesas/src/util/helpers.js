export const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

export function getDataFormatada(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${data.getFullYear()}`;
}