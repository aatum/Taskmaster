import React from 'react';
import { View } from 'react-native';
import { Button, Title, Text } from 'react-native-paper';
import styles from './StyleSheet';

export default function OpeningScreen({ navigation  }: { navigation: any } ) {

  const getCurrentDate = () => {
    const dateObj = new Date();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const day = dateObj.getDate();
    let dayStr;
    switch (day) {
      case 1:
      case 21:
      case 31:
        dayStr = day + 'st';
        break;
      case 2:
      case 22:
        dayStr = day + 'nd';
        break;
      case 3:
      case 23:
        dayStr = day + 'rd';
        break;
      default:
        dayStr = day + 'th';
        break;
    }
    const year = dateObj.getFullYear();
    return `${month} ${dayStr}, ${year}`;
  };


  const currentDate = getCurrentDate();

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{currentDate}</Text>
      <Title>Welcome to Taskmaster!</Title>
      <View style={styles.buttonContainer}>
      </View>
    </View>
  );
};
