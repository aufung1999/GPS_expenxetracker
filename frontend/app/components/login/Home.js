import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <Text>Home</Text>
       <Button
        title="Learn More"
       onPress={()=>{dispatch({type:'EditLangBtnClicked'})}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
