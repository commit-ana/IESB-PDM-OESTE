import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { pickImage, takePhoto } from '../../services/media';
import { Button, colors } from '../../components/ui';

const KEY = '@profile-photo';

export default function Profile() {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((uri) => uri && setPhoto(uri));
  }, []);

  const save = async (uri) => {
    if (!uri) return;
    setPhoto(uri);
    await AsyncStorage.setItem(KEY, uri);
  };

  return (
    <View style={styles.screen}>
      <Pressable onPress={async () => save(await pickImage())} style={styles.avatarWrap}>
        <View style={styles.ring}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.placeholder]}>
              <Ionicons name="person" size={64} color="#8A9A95" />
            </View>
          )}
        </View>
        <View style={styles.badge}>
          <Ionicons name="images" size={16} color="#FFFFFF" />
        </View>
      </Pressable>

      <Text style={styles.title}>Foto de perfil</Text>
      <Text style={styles.sub}>Toque na foto para escolher uma imagem da galeria.</Text>

      <View style={styles.actions}>
        <Button
          title="Escolher da galeria"
          icon="images-outline"
          variant="secondary"
          onPress={async () => save(await pickImage())}
        />
        <Button
          title="Tirar foto com a câmera"
          icon="camera-outline"
          onPress={async () => save(await takePhoto())}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    padding: 24,
    paddingTop: 32,
  },
  avatarWrap: { marginBottom: 20 },
  ring: {
    padding: 4,
    borderRadius: 84,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  avatar: { width: 148, height: 148, borderRadius: 74 },
  placeholder: {
    backgroundColor: '#E3EAE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 20, fontWeight: '700', color: colors.ink },
  sub: { fontSize: 14, color: colors.muted, textAlign: 'center', marginTop: 6, maxWidth: 280 },
  actions: { alignSelf: 'stretch', gap: 12, marginTop: 28 },
});