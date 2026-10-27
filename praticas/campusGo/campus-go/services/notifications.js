import { Platform, Alert } from 'react-native';
import { requireOptionalNativeModule } from 'expo-modules-core';

let Notifications = null;
let handlerSet = false;

// No Android, o expo-notifications precisa deste módulo nativo.
// Se o Expo Go não tiver, não carregamos o pacote (evita o erro vermelho).
const supported =
  Platform.OS !== 'android' || !!requireOptionalNativeModule('ExpoTopicSubscriptionModule');

function load() {
  if (!supported) return null;
  if (Notifications) return Notifications;
  try {
    Notifications = require('expo-notifications');
    if (!handlerSet) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldShowBanner: true,
          shouldShowList: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
      handlerSet = true;
    }
  } catch (e) {
    Notifications = null;
  }
  return Notifications;
}

export async function setupNotifications() {
  const N = load();
  if (!N) return false;

  if (Platform.OS === 'android') {
    await N.setNotificationChannelAsync('default', {
      name: 'default',
      importance: N.AndroidImportance.DEFAULT,
    });
  }
  const { status } = await N.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleReminder(title, seconds) {
  const N = load();

  // Plano B: sem o módulo nativo, avisa com um Alert depois do tempo
  // (só funciona com o app aberto, NÃO é uma notificação de verdade).
  if (!N) {
    setTimeout(() => Alert.alert('CampusGo', title), seconds * 1000);
    return 'fallback';
  }

  const ok = await setupNotifications();
  if (!ok) return null;

  const trigger = N.SchedulableTriggerInputTypes
    ? {
        type: N.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds,
        channelId: 'default',
      }
    : { seconds, channelId: 'default' };

  return N.scheduleNotificationAsync({
    content: { title: 'CampusGo', body: title },
    trigger,
  });
}