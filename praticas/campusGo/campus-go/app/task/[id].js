import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Button, Card, colors } from '../../components/ui';

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{id}</Text>
        </View>
        <Text style={styles.title}>Tarefa número {id}</Text>
        <Text style={styles.sub}>Este número foi lido direto da URL da rota.</Text>
      </Card>
      <Button title="Voltar" icon="arrow-back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 16 },
  card: { alignItems: 'center', gap: 8, paddingVertical: 32 },
  badge: {
    minWidth: 72,
    height: 72,
    paddingHorizontal: 16,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeText: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  title: { fontSize: 22, fontWeight: '700', color: colors.ink },
  sub: { fontSize: 14, color: colors.muted, textAlign: 'center' },
});