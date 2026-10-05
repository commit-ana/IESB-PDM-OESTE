import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { INPUT_PLACEHOLDER, BUTTON_TEXT } from "../labels"; 

function DisciplinaInput(props) {
  const [inputText, setInputText] = useState('');

  function addDisciplinaHandler() {
    props.onAddDisciplina(inputText); 
    setInputText('');
  }

  return (
    <View style={styles.row}>
      <View style={styles.inputWrapper}>
        <TextInput
          onChangeText={setInputText}
          value={inputText}
          style={styles.inputText}
          placeholder={INPUT_PLACEHOLDER}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button onPress={addDisciplinaHandler} title={BUTTON_TEXT} />
      </View>
    </View>
  );
}

export default DisciplinaInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',      
    justifyContent: 'space-between', 
    alignItems: 'center',      
  },
  inputWrapper: {
    width: '70%', 
  },
  buttonWrapper: {
    width: '28%',
  },
  inputText: {
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
});