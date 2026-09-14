import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholderCompromisso}
        value={value}
        onChangeText={onChangeText}
      />
      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.botaoPressed,
        ]}
        android_ripple={{ color: '#ccc' }}
        onPress={onAdd}
      >
        <Text style={styles.botaoTexto}>{labels.botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  botao: {
    flex: 1,
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPressed: {
    opacity: 0.7,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});