import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

const ReactionTestScreen = ({navigation}: any) => {
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'clicked' | 'tooSoon'>('waiting');
  const [message, setMessage] = useState('Wait for green...');
  const [bgColor, setBgColor] = useState('#1f2937'); // dark background
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const startTime = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setMessage('Wait for green...');
    setBgColor('#1f2937');
    setGameState('waiting');
    setReactionTime(null);

    const delay = Math.random() * 3000 + 2000; // 2-5 seconds
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      setMessage('Tap now!');
      setBgColor('#16a34a'); // green
      startTime.current = Date.now();
    }, delay);
  };

  useEffect(() => {
    startTest();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handlePress = () => {
    if (gameState === 'waiting') {
      // Pressed too early
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState('tooSoon');
      setMessage('Too Soon! Tap to try again.');
      setBgColor('#b91c1c'); // red
    } else if (gameState === 'ready') {
      const endTime = Date.now();
      const time = endTime - startTime.current;
      setReactionTime(time);
      setGameState('clicked');
      setMessage(`Your reaction time: ${time} ms\nTap to try again.`);
      setBgColor('#0e7490'); // blue
    } else {
      startTest(); // restart
    }
  };

  return (
    <>
   
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={styles.text}>{message}</Text>
        {reactionTime !== null && <Text style={styles.subtext}>🎉 Great job!</Text>}
      </View>
      
    </TouchableWithoutFeedback>
       {/* Back Button */}
       <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtext: {
    marginTop: 15,
    fontSize: 20,
    color: '#facc15',
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#334155',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginHorizontal: 30
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign:'center'
  },
});

export default ReactionTestScreen;
