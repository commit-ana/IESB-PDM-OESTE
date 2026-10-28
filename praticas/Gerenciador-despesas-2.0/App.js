import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import IconButton from './src/components/IconButton';
import { ExpensesContextProvider } from './src/store/expenses-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarLabelStyle: { fontSize: 12 },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate('GerenciarDespesa')}
          />
        ),
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => <Ionicons name="wallet-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();

  return (
    <ExpensesContextProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Despesas" component={BottomTabScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}