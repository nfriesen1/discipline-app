import CardComponent from "@/components/CardComponent";
import tabStyles from "../styles/styles";
import { Text, View } from "@/components/Themed";

export default function Home() {
  return (
    <View style={tabStyles.container}>
      <Text style={tabStyles.title}>Home</Text>
      <CardComponent title="Daily Goals" content="Hi"/>
    </View>
  );
}
