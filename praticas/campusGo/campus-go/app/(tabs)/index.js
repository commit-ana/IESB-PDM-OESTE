import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useNotices from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';
import { Button, Card, colors } from '../../components/ui';
import { api } from '../../services/api';

const cap = (s = '') => s.charAt(0).toUpperCase() + s.slice(1);

export default function Home() {
  const { notices, isLoading, error, reload, addNotice } = useNotices();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert('Atenção', 'Preencha o título e o texto do aviso.');
      return;
    }
    setSending(true);
    try {
      const created = await api.create('posts', {
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      });
      // a API não grava de verdade, então adicionamos na lista local
      addNotice({ ...created, localKey: `new-${Date.now()}`, isNew: true });
      Alert.alert('Aviso criado', `id: ${created.id}`);
      setTitle('');
      setBody('');
      setShowForm(false);
    } catch (e) {
      Alert.alert('Erro', e.message);
    } finally {
      setSending(false);
    }
  };

  if (isLoading && notices.length === 0 && !error) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.muted}>Carregando avisos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <View style={styles.errorIcon}>
          <Ionicons name="cloud-offline-outline" size={32} color={colors.danger} />
        </View>
        <Text style={styles.errorTitle}>Não foi possível carregar os avisos</Text>
        <Text style={styles.muted}>{error}</Text>
        <Button title="Tentar novamente" icon="refresh" onPress={reload} />
      </View>
    );
  }

  const header = (
    <View style={styles.headerWrap}>
      <View style={styles.headerRow}>
        <Text style={styles.count}>
          {notices.length} {notices.length === 1 ? 'aviso' : 'avisos'}
        </Text>
        <Button
          title={showForm ? 'Fechar' : 'Criar aviso'}
          icon={showForm ? 'close' : 'add'}
          variant={showForm ? 'secondary' : 'primary'}
          onPress={() => setShowForm((v) => !v)}
          style={styles.small}
        />
      </View>

      {showForm && (
        <Card style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Título do aviso"
            placeholderTextColor="#8A9A95"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Texto do aviso"
            placeholderTextColor="#8A9A95"
            value={body}
            onChangeText={setBody}
            multiline
          />
          <Button
            title={sending ? 'Publicando...' : 'Publicar aviso'}
            icon="send"
            onPress={handleCreate}
            disabled={sending}
          />
        </Card>
      )}
    </View>
  );

  return (
    <FlatList
      style={styles.screen}
      data={notices}
      keyExtractor={(item) => item.localKey ?? String(item.id)}
      refreshing={isLoading}
      onRefresh={reload}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.list}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="megaphone-outline" size={36} color={colors.muted} />
          <Text style={styles.emptyTitle}>Nenhum aviso por enquanto.</Text>
          <Text style={styles.muted}>Toque em Criar aviso para publicar o primeiro.</Text>
        </View>
      }
      renderItem={({ item, index }) => (
        <FadeIn delay={index * 60}>
          <Card>
            <Text style={styles.title}>{cap(item.title)}</Text>
            <Text style={styles.body}>{cap(item.body)}</Text>
            <View style={styles.footer}>
              <Ionicons name="megaphone-outline" size={14} color={colors.muted} />
              <Text style={styles.footerText}>
                {item.isNew ? 'Publicado agora' : `Aviso ${item.id}`}
              </Text>
            </View>
          </Card>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 16, paddingBottom: 32, gap: 12 },
  headerWrap: { gap: 12, marginBottom: 4 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  count: { fontSize: 15, fontWeight: '600', color: colors.muted },
  small: { minHeight: 40, paddingHorizontal: 14 },
  form: { gap: 10 },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.bg,
    color: colors.ink,
    fontSize: 15,
  },
  inputMultiline: { minHeight: 80, textAlignVertical: 'top' },
  title: { fontSize: 16, fontWeight: '700', color: colors.ink, marginBottom: 6 },
  body: { fontSize: 14, lineHeight: 21, color: colors.muted },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  footerText: { fontSize: 12, color: colors.muted },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 28,
    backgroundColor: colors.bg,
  },
  muted: { color: colors.muted, textAlign: 'center', fontSize: 14 },
  errorIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTitle: { fontSize: 18, fontWeight: '700', color: colors.ink, textAlign: 'center' },
  empty: { alignItems: 'center', gap: 8, paddingTop: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.ink },
});