import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../components/ui';

const icon = (name) => ({ color, size, focused }) => (
  <Ionicons name={focused ? name : `${name}-outline`} color={color} size={size} />
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '700', fontSize: 20, color: colors.ink },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#8A9A95',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.line,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Início', headerTitle: 'Mural de avisos', tabBarIcon: icon('home') }}
      />
      <Tabs.Screen
        name="tasks"
        options={{ title: 'Tarefas', tabBarIcon: icon('checkmark-done') }}
      />
      <Tabs.Screen
        name="wallet"
        options={{ title: 'Bolso', tabBarIcon: icon('wallet') }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Perfil', tabBarIcon: icon('person') }}
      />
    </Tabs>
  );
}