import { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';
import DoneIcon from '../../components/DoneIcon';
import { Button, Card, colors } from '../../components/ui';

function ActionRow({ icon, title, subtitle, onPress, last }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !last && styles.rowDivider,
        pressed && { backgroundColor: '#EEF3F1' },
      ]}
    >
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSub}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.muted} />
    </Pressable>
  );
}

export default function Tasks() {
  const [doneCount, setDoneCount] = useState(0);

  const handleCheckin = async () => {
    try {
      const place = await getCurrentPlace();
      if (!place) {
        Alert.alert('Permissão negada', 'Ative a localização para fazer check-in.');
        return;
      }
      Alert.alert('Check-in feito', place.label);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível obter sua localização.');
    }
  };

  const handleReminder = async () => {
    try {
      const id = await scheduleReminder('Hora de estudar!', 10);
      Alert.alert(id ? 'Lembrete agendado' : 'Permissão de notificação negada');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível agendar o lembrete.');
    }
  };

  const handleDone = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {}
    setDoneCount((n) => n + 1);
    Alert.alert('Tarefa concluída');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View>
          <Text style={styles.heroLabel}>Tarefas concluídas</Text>
          <Text style={styles.heroValue}>{doneCount}</Text>
        </View>
        <DoneIcon trigger={doneCount} size={44} color={colors.accent} />
      </View>

      <Card style={styles.group}>
        <ActionRow
          icon="add-circle-outline"
          title="Nova tarefa"
          subtitle="Abrir o formulário em tela cheia"
          onPress={() => router.push('/new-task')}
        />
        <ActionRow
          icon="document-text-outline"
          title="Abrir tarefa 42"
          subtitle="Ver o detalhe da tarefa 42"
          onPress={() => router.push('/task/42')}
          last
        />
      </Card>

      <Card style={styles.group}>
        <ActionRow
          icon="location-outline"
          title="Estudei aqui"
          subtitle="Registrar o local onde você está"
          onPress={handleCheckin}
        />
        <ActionRow
          icon="alarm-outline"
          title="Lembrar em 10 s"
          subtitle="Agendar um lembrete local"
          onPress={handleReminder}
          last
        />
      </Card>

      <Button title="Concluir" icon="checkmark-circle-outline" onPress={handleDone} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 16 },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLabel: { color: '#CFE5DF', fontSize: 14, fontWeight: '600' },
  heroValue: { color: '#FFFFFF', fontSize: 40, fontWeight: '800', marginTop: 2 },
  group: { padding: 0, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: colors.line },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E3EFEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: { fontSize: 15, fontWeight: '700', color: colors.ink },
  rowSub: { fontSize: 13, color: colors.muted, marginTop: 2 },
});