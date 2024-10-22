import { Text, View } from '@/components/Themed';
import { tabStyles } from '../../../styles/styles';

export default function Progress() {
  return (
    <View style={tabStyles.container}>
      <Text style={tabStyles.title}>Progress</Text>
      <View style={tabStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

