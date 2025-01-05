import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const BingoCell = () => {
  return (
    <TouchableOpacity style={styles.cell}>
      <Text style={styles.cellText}>X</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  cellText: {
    fontSize: 18,
  },
});

export default BingoCell;
