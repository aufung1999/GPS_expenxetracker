import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GetPos() {
    useEffect(() => {
        setTimeout(() => {
          AsyncStorage.getItem("position").then((position) => {
            if (position) {
              console.log(position);
            }
          });
        }, 5000);
        return () => {
          clearInterval(interval);
        };
      }, []);
      
  return (
    <View>
      <Text>GetPos</Text>
    </View>
  )
}