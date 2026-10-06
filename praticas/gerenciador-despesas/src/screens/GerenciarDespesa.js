import { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DespesasContext } from '../store/despesas-context';
import { CATEGORIAS, getDataFormatada } from '../util/helpers';
import CategoriaSeletor from '../components/despesa/CategoriaSeletor';

export default function GerenciarDespesa({ navigation }) {
  const { adicionarDespesa } = useContext(DespesasContext);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [categoria, setCategoria] = useState('');

  function tratarValor(texto) {
    const normalizado = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizado)) {
      setValor(normalizado);
    }
  }

  function aoMudarData(evento, dataSelecionada) {
    setMostrarPicker(Platform.OS === 'ios');
    if (dataSelecionada) setData(dataSelecionada);
  }

  function salvar() {
    if (!descricao.trim() || !valor || Number(valor) <= 0 || !categoria) {
      Alert.alert('Atenção', 'Preencha descrição, valor e categoria.');
      return;
    }
    adicionarDespesa({ descricao: descricao.trim(), valor: Number(valor), data, categoria });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        value={valor}
        onChangeText={tratarValor}
        placeholder="0.00"
      />

      <Text style={styles.label}>Data</Text>
      <Pressable style={styles.input} onPress={() => setMostrarPicker(true)}>
        <Text>{getDataFormatada(data)}</Text>
      </Pressable>
      {mostrarPicker && (
        <DateTimePicker value={data} mode="date" onChange={aoMudarData} />
      )}

      <Text style={styles.label}>Categoria</Text>
      <CategoriaSeletor
        categorias={CATEGORIAS}
        selecionada={categoria}
        onSelecionar={setCategoria}
      />

      <Pressable style={styles.botaoSalvar} onPress={salvar}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, backgroundColor: '#fff' },
  botaoSalvar: { marginTop: 24, backgroundColor: '#3b5bdb', padding: 14, borderRadius: 8, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});