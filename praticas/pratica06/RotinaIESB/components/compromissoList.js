import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.vazio}>{listaVazia}</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTexto}>{item.texto}</Text>
            <Pressable
              style={({ pressed }) => [
                styles.botaoRemover,
                pressed && styles.botaoRemoverPressed,
              ]}
              android_ripple={{ color: '#f5c2c2' }}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.botaoRemoverTexto}>Remover</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  vazio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 24,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  itemTexto: {
    flex: 1,
    marginRight: 8,
  },
  botaoRemover: {
    backgroundColor: '#C62828',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  botaoRemoverPressed: {
    opacity: 0.7,
  },
  botaoRemoverTexto: {
    color: '#fff',
    fontSize: 12,
  },
});