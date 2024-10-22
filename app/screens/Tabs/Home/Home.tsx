import React from 'react';
import { Text, View } from '@/components/Themed';
import { tabStyles } from '../../../styles/styles';
import { auth } from '@/firebaseConfig';

const Home = () => {
  const currentUser = auth.currentUser

  return (
    <View style={tabStyles.container}>
      <Text style={tabStyles.title}>Welcome {currentUser ? currentUser.displayName : "Guest"}</Text>
      <View style={tabStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
};

export default Home;                            