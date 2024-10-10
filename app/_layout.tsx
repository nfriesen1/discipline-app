import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { Colors } from './styles/styles';
import TabsNavigator from './TabsNavigator';

const Stack = createStackNavigator();
const {tertiary} = Colors;

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTintColor: tertiary,
          headerTitle: "",
          headerLeftContainerStyle: {
            paddingLeft: 20
          }
        }}
        initialRouteName='screens/Login'
      >
        <Stack.Screen name='screens/Login' component={Login}/>
        <Stack.Screen name='screens/Signup' component={Signup}/>
        <Stack.Screen name='TabsNavigator' component={TabsNavigator}/>
      </Stack.Navigator>
  );
}
