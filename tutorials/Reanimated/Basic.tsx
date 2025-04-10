import {View, Text, StyleSheet, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';

const Basic = () => {
  const postion = new Animated.Value(0);
//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     interval = setInterval(() => {
//       setPosition(prev => (prev < 100 ? prev + 5 : 0));
//     }, 50);

//     return () => clearInterval(interval);
//   }, []);
  return <View style={[styles.box,{marginLeft: postion} ]} />;
};

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'yellow',
  },
});
export default Basic;
