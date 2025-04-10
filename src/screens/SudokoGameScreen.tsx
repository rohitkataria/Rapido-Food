import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

// Pre-filled initial board
const initialBoard: (number | null)[][] = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9],
];

const SudokoGameScreen = ({navigation}: any) => {
  const [board, setBoard] = useState<(number | null)[][]>(initialBoard);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );

  const isValidMove = (row: number, col: number, num: number) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }

    return true;
  };

  const isBoardComplete = (b: (number | null)[][]) => {
    return b.every(row => row.every(cell => cell !== null));
  };

  const handleCellPress = (row: number, col: number) => {
    if (initialBoard[row][col] === null) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberPress = (num: number) => {
    if (!selectedCell) return;

    const [row, col] = selectedCell;

    if (!isValidMove(row, col, num)) {
      Alert.alert('Invalid Move', 'This number violates Sudoku rules.');
      return;
    }

    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = num;
    setBoard(newBoard);
    setSelectedCell(null);

    if (isBoardComplete(newBoard)) {
      Alert.alert('🎉 Congratulations!', 'You completed the Sudoku!');
    }
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => {
          const isSelected =
            selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
          const isInitial = initialBoard[rowIndex][colIndex] !== null;

          return (
            <TouchableOpacity
              key={`${rowIndex}-${colIndex}`}
              style={[
                styles.cell,
                isSelected && styles.selectedCell,
                (colIndex + 1) % 3 === 0 && colIndex !== 8
                  ? styles.rightBorder
                  : {},
                (rowIndex + 1) % 3 === 0 && rowIndex !== 8
                  ? styles.bottomBorder
                  : {},
              ]}
              onPress={() => handleCellPress(rowIndex, colIndex)}
            >
              <Text style={[styles.cellText, isInitial && styles.fixedCell]}>
                {cell ?? ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    ));
  };

  const renderNumberPad = () => (
    <View style={styles.numpad}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <TouchableOpacity
          key={num}
          style={styles.numButton}
          onPress={() => handleNumberPress(num)}
        >
          <Text style={styles.numText}>{num}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Sudoku Challenge</Text>
      <View style={styles.board}>{renderBoard()}</View>
      {renderNumberPad()}
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
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    color: '#fcd34d',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    borderWidth: 2,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  selectedCell: {
    backgroundColor: '#3fa9f5',
  },
  fixedCell: {
    color: '#facc15',
    fontWeight: 'bold',
  },
  cellText: {
    color: 'white',
    fontSize: 16,
  },
  bottomBorder: {
    borderBottomWidth: 2,
  },
  rightBorder: {
    borderRightWidth: 2,
  },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'center',
    gap: 10,
  },
  numButton: {
    backgroundColor: '#3fa9f5',
    margin: 5,
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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

export default SudokoGameScreen;
