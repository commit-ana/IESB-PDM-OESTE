import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as labels from './labels';
import CompromissoInput from './components/compromissoInput';
import CompromissoList from './components/compromissoList';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);

  
  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados) setCompromissos(JSON.parse(dados));
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível carregar os compromissos.');
      }
    };
    carregar();
  }, []);

  // Salva no AsyncStorage sempre que a lista de compromissos mudar
  useEffect(() => {
    const salvar = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível salvar os compromissos.');
      }
    };
    salvar();
  }, [compromissos]);

  const adicionarCompromisso = () => {
    if (!texto.trim()) {
      Alert.alert('Atenção', 'Digite um compromisso antes de adicionar.');
      return;
    }
    const novo = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadoEm: new Date().toISOString(),
    };
    setCompromissos([...compromissos, novo]);
    setTexto('');
  };

  const removerCompromisso = (id) => {
    setCompromissos(compromissos.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <Text style={styles.titulo}>{labels.tituloApp}</Text>
        </View>

        <CompromissoInput
          value={texto}
          onChangeText={setTexto}
          onAdd={adicionarCompromisso}
          labels={labels}
        />

        <CompromissoList
          itens={compromissos}
          onDelete={removerCompromisso}
          tituloLista={labels.tituloLista}
          listaVazia={labels.listaVazia}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});