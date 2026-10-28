import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; // importe também o Provider
import { useState } from 'react';
import { APP_TITLE, LIST_TITLE } from './labels';
import DisciplinaInput from './components/disciplinaInput';
import DisciplinaList from './components/disciplinaList';

export default function App() {
  const [disciplinas, setDisciplinas] = useState([]);

  function adicionarDisciplinaHandler(nome) {
    setDisciplinas([...disciplinas, nome]);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>{APP_TITLE}</Text>

        <DisciplinaInput onAddDisciplina={adicionarDisciplinaHandler} />

        <Text style={styles.listTitle}>{LIST_TITLE}</Text>
        <View style={styles.listContainer}>
          <DisciplinaList array={disciplinas} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  listContainer: {
    flex: 1,
  },
});