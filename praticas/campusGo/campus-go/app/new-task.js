import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, colors } from '../components/ui';

export default function NewTask() {
  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <View style={styles.icon}>
          <Ionicons name="add" size={32} color={colors.primary} />
        </View>
        <Text style={styles.title}>Nova tarefa</Text>
        <Text style={styles.sub}>Aqui ficará o formulário para cadastrar uma tarefa.</Text>
      </Card>
      <Button title="Fechar" icon="close" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 16 },
  card: { alignItems: 'center', gap: 8, paddingVertical: 32 },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E3EFEC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: { fontSize: 22, fontWeight: '700', color: colors.ink },
  sub: { fontSize: 14, color: colors.muted, textAlign: 'center' },
});