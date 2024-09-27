import * as React from 'react';
import { ViewProps, View, StyleProp, ViewStyle } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

interface CardProps {
    title: string;
    content: string;
}

const CardComponent = ({ title, content }: CardProps ) => (
  <Card>
    <Card.Title title= {title}/>
    <Card.Content>
      <Text variant="titleLarge">{title}</Text>
      <Text variant="bodyMedium">{content}</Text>
    </Card.Content>
  </Card>
);

export default CardComponent;