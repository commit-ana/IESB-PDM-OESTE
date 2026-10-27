import { Stack } from 'expo-router';
import { ExpensesContextProvider } from '../store/expenses-context';
import { colors } from '../components/ui';

export default function RootLayout() {
  return (
    <ExpensesContextProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerShadowVisible: false,
          headerTintColor: colors.primary,
          headerTitleStyle: { fontWeight: '700', color: colors.ink },
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="task/[id]" options={{ title: 'Tarefa' }} />
        <Stack.Screen
          name="new-task"
          options={{ presentation: 'modal', title: 'Nova tarefa' }}
        />
      </Stack>
    </ExpensesContextProvider>
  );
}