import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BingoCell from './BingoCell';

const BingoBoard = () => {
  const [board, setBoard] = useState(generateBoard());

  function generateBoard() {
    // Lógica para generar el tablero de bingo
    return Array(5).fill().map(() => Array(5).fill(false));
  }

  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <BingoCell key={cellIndex} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    // Estilos para el tablero
  },
  row: {
    flexDirection: 'row',
  },
});

export default BingoBoard;
