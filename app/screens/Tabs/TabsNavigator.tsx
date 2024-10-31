import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home/Home';
import Nutrition from './Nutrition/Nutrition';
import Progress from './Progress/Progress';
import Workouts from './Workouts/Workouts';
import { Colors } from '../../styles/styles';  // Adjust according to your project structure
import { useColorScheme } from '@/components/useColorScheme';
import Profile from '../Profile/Profile';
// Create the Tab Navigator instance

const Tab = createBottomTabNavigator();

const { brand, darkLight } = Colors;

const TabsNavigator = () => {
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
            case 'Profile':
              iconName='person';
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
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

export default TabsNavigator;
