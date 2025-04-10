import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const TOTAL_NUMBERS = 25;
const TIMER_LIMIT = 40;

const shuffleArray = (arr: number[]) => {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const NumberOrderScreen= ({navigation}: any) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [expected, setExpected] = useState(1);
  const [tapped, setTapped] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_LIMIT);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleGameOver();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleGameOver = () => {
    if (expected > TOTAL_NUMBERS) {
      Alert.alert('🎉 Well Done!', 'You completed the sequence in time!');
    } else {
      Alert.alert('⏱️ Time\'s Up!', 'You didn\'t finish in time. Try again!');
    }
    resetGame();
  };

  const handlePress = (num: number) => {
    if (num === expected) {
      const newTapped = [...tapped, num];
      setTapped(newTapped);

      if (num === TOTAL_NUMBERS) {
        Alert.alert('🎉 Well Done!', 'You tapped all numbers in order!');
        resetGame();
      } else {
        setExpected(prev => prev + 1);
      }
    } else {
      Alert.alert('❌ Wrong!', 'Tap the numbers in order!');
      resetGame();
    }
  };

  const resetGame = () => {
    setExpected(1);
    setTapped([]);
    setTimeLeft(TIMER_LIMIT);
    setNumbers(shuffleArray(Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Tap 1 to 25 in Order</Text>
      <Text style={styles.timer}>⏱️ Time Left: {timeLeft}s</Text>

      <View style={styles.grid}>
        {numbers.map((num, index) => {
          const isTapped = tapped.includes(num);
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(num)}
              style={[
                styles.cell,
                isTapped && styles.correctCell,
              ]}
            >
              <Text style={styles.cellText}>{num}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
       {/* Back Button */}
       <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    color: '#fcd34d',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timer: {
    color: '#f87171',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
  },
  grid: {
    width: 320,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  cell: {
    width: 56,
    height: 56,
    backgroundColor: '#3fa9f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  correctCell: {
    backgroundColor: '#16a34a', // green
  },
  cellText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#334155',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NumberOrderScreen;
