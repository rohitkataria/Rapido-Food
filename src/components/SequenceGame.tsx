import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Svg, { Line } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const bubbles = [
  { id: 1, label: '1', color: '#ff6b6b' },
  { id: 2, label: 'A', color: '#6bffb2' },
  { id: 3, label: '2', color: '#ffd93d' },
  { id: 4, label: 'B', color: '#9b5de5' },
  { id: 5, label: '3', color: '#00f5d4' },
  { id: 6, label: 'C', color: '#f15bb5' },
  { id: 7, label: '4', color: '#3caaed' },
  { id: 8, label: 'D', color: '#faae2b' },
];

const correctSequence = [1, 2, 3, 4, 5, 6, 7, 8];
const BUBBLE_SIZE = 50;
const TOP_OFFSET = 180;

const generateNonOverlappingPosition = (existingPositions: { top: number; left: number }[]) => {
  let maxAttempts = 100;
  while (maxAttempts--) {
    const top =
      TOP_OFFSET + Math.random() * (height - TOP_OFFSET - BUBBLE_SIZE - 40);
    const left = Math.random() * (width - BUBBLE_SIZE - 20);

    const overlaps = existingPositions.some(
      pos =>
        Math.abs(pos.top - top) < BUBBLE_SIZE + 10 &&
        Math.abs(pos.left - left) < BUBBLE_SIZE + 10,
    );

    if (!overlaps) return { top, left };
  }
  return { top: TOP_OFFSET, left: 0 };
};

const SequenceGame = () => {
  const [bubblePositions, setBubblePositions] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [clickedBubbles, setClickedBubbles] = useState<number[]>([]);
  const [positions, setPositions] = useState<{ [key: number]: { top: number; left: number } }>({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const resetGame = () => {
    const pos: { [key: number]: { top: number; left: number } } = {};
    const existingPositions: { top: number; left: number }[] = [];

    bubbles.forEach(bubble => {
      const p = generateNonOverlappingPosition(existingPositions);
      pos[bubble.id] = p;
      existingPositions.push(p);
    });
    setPositions(pos);

    const centers: { [key: number]: { x: number; y: number } } = {};
    Object.entries(pos).forEach(([id, p]) => {
      centers[parseInt(id)] = {
        x: p.left + BUBBLE_SIZE / 2,
        y: p.top + BUBBLE_SIZE / 2,
      };
    });
    setBubblePositions(centers);

    setClickedBubbles([]);
    setGameOver(false);
    setGameWon(false);
    setTimeLeft(30);
  };

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && !gameWon) {
      const interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0 && !gameWon) {
      setGameOver(true);
      Alert.alert('Game Over', 'Time is up!', [
        { text: 'Restart', onPress: () => resetGame() },
      ]);
    }
  }, [timeLeft, gameWon]);

  const handleBubblePress = (id: number) => {
    if (gameOver || gameWon) return;

    if (!clickedBubbles.includes(id)) {
      const newClicks = [...clickedBubbles, id];
      const currentIndex = newClicks.length - 1;
      const isCorrect = correctSequence[currentIndex] === id;

      if (!isCorrect) {
        setClickedBubbles(newClicks);
        setTimeout(() => {
          setClickedBubbles([...clickedBubbles]);
        }, 500);
      } else {
        setClickedBubbles(newClicks);
        if (
          newClicks.length === correctSequence.length &&
          newClicks.every((val, i) => val === correctSequence[i])
        ) {
          setGameWon(true);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Please follow this sequence</Text>
      <Text style={styles.headerText}>1 &gt;&gt; A &gt; 2 &gt; B &gt; 3 &gt; C &gt; 4 &gt; D</Text>
      <Text style={styles.timerText}>
        {gameWon ? '🎉 Well Done!' : `Time Left: ${timeLeft}s`}
      </Text>

      <Svg style={StyleSheet.absoluteFill}>
        {clickedBubbles.map((id, index) => {
          if (index === 0) return null;

          const fromId = clickedBubbles[index - 1];
          const toId = id;
          const from = bubblePositions[fromId];
          const to = bubblePositions[toId];

          if (from && to) {
            const isCorrect =
              correctSequence[index - 1] === fromId &&
              correctSequence[index] === toId;

            return (
              <Line
                key={`${from.x}-${to.x}-${index}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isCorrect ? 'white' : 'red'}
                strokeWidth="2"
              />
            );
          }
          return null;
        })}
      </Svg>

      {bubbles.map(bubble => {
        const position = positions[bubble.id];
        if (!position) return null;

        return (
          <TouchableOpacity
            key={bubble.id}
            onPress={() => handleBubblePress(bubble.id)}
            activeOpacity={0.7}
            style={[
              styles.bubble,
              {
                top: position.top,
                left: position.left,
                backgroundColor: bubble.color,
                shadowColor: bubble.color,
              },
            ]}>
            <Text style={styles.bubbleText}>{bubble.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  headerText: {
    color: '#f2f2f2',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  timerText: {
    color: '#fcd34d',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  bubble: {
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 100,
    minWidth: 45,
    minHeight: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  bubbleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SequenceGame;
