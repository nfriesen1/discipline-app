import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './screens/Home';
import Nutrition from './screens/Nutrition';
import Progress from './screens/Progress';
import Workouts from './screens/Workouts';
import { Colors } from './styles/styles';  // Adjust according to your project structure
import { useColorScheme } from '@/components/useColorScheme';

// Create the Tab Navigator instance
const Tab = createBottomTabNavigator();

const { brand, darkLight } = Colors;

function TabsNavigator() {
  const colorScheme = useColorScheme();  // Optional: Handle light/dark mode

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Nutrition':
              iconName = 'nutrition';
              break;
            case 'Progress':
              iconName = 'bar-chart';
              break;
            case 'Workouts':
              iconName = 'barbell';
              break;
            default:
              iconName = 'home';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: brand, 
        tabBarInactiveTintColor: darkLight,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Nutrition"
        component={Nutrition}
        options={{
          title: 'Nutrition',
        }}
      />
      <Tab.Screen
        name="Progress"
        component={Progress}
        options={{
          title: 'Progress',
        }}
      />
      <Tab.Screen
        name="Workouts"
        component={Workouts}
        options={{
          title: 'Workouts',
        }}
      />
    </Tab.Navigator>
  );
}

export default TabsNavigator;
