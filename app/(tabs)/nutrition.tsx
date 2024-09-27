import { StyleSheet } from 'react-native';
import tabStyles from '../styles/styles';
import { Text, View } from '@/components/Themed';

export default function Nutrition() {
  return (
    <View style={tabStyles.container}>
      <Text style={tabStyles.title}>Nutrition</Text>
      <View style={tabStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

