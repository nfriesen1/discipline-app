import FontAwesome from "@expo/vector-icons/FontAwesome";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import { Colors } from "./styles/styles";
import TabsNavigator from "./screens/Tabs/TabsNavigator";
import { auth } from "@/firebaseConfig";
import { AuthStackParamList, RootStackParamList } from "./routes";
import { onAuthStateChanged, User } from "firebase/auth";

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const { tertiary } = Colors;

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);  // To handle loading state

  useEffect(() => {
    // Firebase auth listener
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setIsSignedIn(!!user);  // If user exists, isSignedIn will be true
      setLoading(false);      // Stop loading once we know auth state
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Optionally, you can show a loading indicator while checking auth state
    return null;  // Or a loading component
  }

  console.log(isSignedIn);
  return isSignedIn ? (
    <RootStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: tertiary,
        headerTitle: "",
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      }}
      initialRouteName="screens/Tabs/TabsNavigator"
      > 
      <RootStack.Screen
        name="screens/Tabs/TabsNavigator"
        component={TabsNavigator}
      />
    </RootStack.Navigator>
  ) : (
    <AuthStack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTintColor: tertiary,
      headerTitle: "",
      headerLeftContainerStyle: {
        paddingLeft: 20,
      },
    }}
    initialRouteName="screens/Login/Login">
      <>
      <AuthStack.Screen name="screens/Login/Login" component={Login} />
      <AuthStack.Screen name="screens/Signup/Signup" component={Signup} />
    </>
    </AuthStack.Navigator>
  );
}
