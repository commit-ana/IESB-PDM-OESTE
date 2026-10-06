import { StyleSheet, ScrollView, Text } from "react-native"; 

function DisciplinaList(props) {
  return (
    <ScrollView>
      {props.array.map((disciplina, index) => (
        <Text style={styles.item} key={index}>{disciplina}</Text>
      ))}
    </ScrollView>
  );
}

export default DisciplinaList;

const styles = StyleSheet.create({
  item: {
    margin: 8,
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#eef2f7',
  },
});