import { useLayoutEffect, useState } from 'react';
import {
  Text,
  TextInput,
  Pressable,
  Alert,
  Modal,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useExpenses } from '../store/expenses-context';
import { CATEGORIES, getDataFormatada } from '../util/helpers';
import { getColors } from '../constants/theme';

function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }

  if (!(parseFloat(values.amount) > 0)) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  const fimDeHoje = new Date();
  fimDeHoje.setHours(23, 59, 59, 999);
  if (values.date > fimDeHoje) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Escolha uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const expense = expenses.find((item) => item.id === expenseId);

  const [form, setForm] = useState({
    description: expense?.description ?? '',
    amount: expense ? String(expense.amount) : '',
    date: expense ? new Date(expense.date) : new Date(),
    category: expense?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar despesa' : 'Nova despesa' });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    const proximo = { ...form, [field]: value };
    setForm(proximo);

    // Se o campo tinha erro, revalida: a mensagem some quando for corrigido
    if (errors[field]) {
      const novos = validate(proximo);
      setErrors((atuais) => {
        const copia = { ...atuais };
        if (novos[field]) copia[field] = novos[field];
        else delete copia[field];
        return copia;
      });
    }
  }

  function tratarValor(texto) {
    const normalizado = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizado)) {
      handleChange('amount', normalizado);
    }
  }

  function aoMudarData(evento, dataSelecionada) {
    setMostrarPicker(Platform.OS === 'ios');
    if (dataSelecionada) handleChange('date', dataSelecionada);
  }

  function escolherCategoria(categoria) {
    handleChange('category', categoria);
    setMostrarModal(false);
  }

  function salvar() {
    const encontrados = validate(form);
    setErrors(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const dados = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category,
    };

    if (isEditing) updateExpense(expenseId, dados);
    else addExpense(dados);

    navigation.goBack();
  }

    function excluir() {
    function confirmarExclusao() {
      deleteExpense(expenseId);
      navigation.goBack();
    }

    if (Platform.OS === 'web') {
      if (window.confirm('Tem certeza que deseja excluir esta despesa?')) {
        confirmarExclusao();
      }
      return;
    }

    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: confirmarExclusao },
    ]);
  }

  function estiloCampo(campo) {
    return [
      styles.input,
      {
        backgroundColor: colors.card,
        borderColor: errors[campo] ? colors.error : colors.border,
      },
    ];
  }

  function mensagemErro(campo) {
    return errors[campo] ? (
      <Text style={[styles.erro, { color: colors.error }]}>{errors[campo]}</Text>
    ) : null;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
        <TextInput
          style={[...estiloCampo('description'), { color: colors.text }]}
          value={form.description}
          onChangeText={(texto) => handleChange('description', texto)}
        />
        {mensagemErro('description')}

        <Text style={[styles.label, { color: colors.text }]}>Valor</Text>
        <TextInput
          style={[...estiloCampo('amount'), { color: colors.text }]}
          keyboardType="decimal-pad"
          value={form.amount}
          onChangeText={tratarValor}
          placeholder="0.00"
          placeholderTextColor={colors.textSecondary}
        />
        {mensagemErro('amount')}

        <Text style={[styles.label, { color: colors.text }]}>Data</Text>
        <Pressable style={estiloCampo('date')} onPress={() => setMostrarPicker(true)}>
          <Text style={{ color: colors.text }}>{getDataFormatada(form.date)}</Text>
        </Pressable>
        {mostrarPicker && (
          <DateTimePicker
            value={form.date}
            mode="date"
            onChange={aoMudarData}
            themeVariant={scheme === 'dark' ? 'dark' : 'light'}
          />
        )}
        {mensagemErro('date')}

        <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
        <Pressable style={estiloCampo('category')} onPress={() => setMostrarModal(true)}>
          <Text style={{ color: form.category ? colors.text : colors.textSecondary }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
        </Pressable>
        {mensagemErro('category')}

        <Pressable
          style={[styles.botaoSalvar, { backgroundColor: colors.primary }]}
          onPress={salvar}
        >
          <Text style={[styles.botaoTexto, { color: colors.primaryText }]}>Salvar</Text>
        </Pressable>

        {isEditing && (
          <Pressable
            style={[styles.botaoExcluir, { borderColor: colors.error }]}
            onPress={excluir}
          >
            <Text style={[styles.botaoTexto, { color: colors.error }]}>Excluir</Text>
          </Pressable>
        )}
      </ScrollView>

      <Modal
        visible={mostrarModal}
        transparent
        animationType="slide"
        onRequestClose={() => setMostrarModal(false)}
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: colors.overlay }]}
          onPress={() => setMostrarModal(false)}
        >
          <Pressable style={[styles.folha, { backgroundColor: colors.card }]}>
            <Text style={[styles.folhaTitulo, { color: colors.text }]}>Escolha a categoria</Text>
            {CATEGORIES.map((categoria) => (
              <Pressable
                key={categoria}
                style={styles.opcao}
                onPress={() => escolherCategoria(categoria)}
              >
                <Text
                  style={{
                    color: form.category === categoria ? colors.primary : colors.text,
                    fontWeight: form.category === categoria ? 'bold' : 'normal',
                    fontSize: 16,
                  }}
                >
                  {categoria}
                </Text>
              </Pressable>
            ))}
            <Pressable style={styles.opcao} onPress={() => setMostrarModal(false)}>
              <Text style={{ color: colors.textSecondary, fontSize: 16 }}>Cancelar</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 16, paddingBottom: 48 },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10 },
  erro: { marginTop: 4, fontSize: 13 },
  botaoSalvar: { marginTop: 24, padding: 14, borderRadius: 8, alignItems: 'center' },
  botaoExcluir: {
    marginTop: 12,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  botaoTexto: { fontWeight: 'bold' },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  folha: { padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  folhaTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  opcao: { paddingVertical: 14 },
});