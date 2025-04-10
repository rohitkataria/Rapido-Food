import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      {/* App logo */}
      <Text style={styles.appLogo}>🧠</Text>
      <Text style={styles.title}>Cognitive Training</Text>

      {/* Game Grid */}
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.squareBox}
          onPress={() => navigation.navigate('SequenceGameScreen')}>
          <Text style={styles.icon}>🔢</Text>
          <Text style={styles.label}>Sequence Game</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.squareBox}  onPress={() => navigation.navigate('SudokoGameScreen')}>
          <Text style={styles.icon}>🔲</Text>
          <Text style={styles.label}>Sudoko Match</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.squareBox} onPress={() => navigation.navigate('ReactionTestScreen')}>
          <Text style={styles.icon}>⏱️</Text>
          <Text style={styles.label}>Reaction Test</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.squareBox} onPress={() => navigation.navigate('NumberOrderScreen')}>
          <Text style={styles.icon}>🧮</Text>
          <Text style={styles.label}>Number Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  appLogo: {
    fontSize: 70,
    alignSelf: 'center',
    marginBottom: 10,
    color: '#38bdf8',
  },
  title: {
    color: '#fcd34d',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
  },
  squareBox: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#3fa9f5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    fontSize: 42,
    marginBottom: 10,
  },
  label: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default HomeScreen;
