import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const GameScreen = () => {
  const [balls, setBalls] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [intervalTime, setIntervalTime] = useState(3);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const [sound, setSound] = useState(null);
  const ballsQuantity = 90;

  const initSound = require("../assets/sounds/inicio_sarah.mp3");
  const finalSound = require("../assets/sounds/final_sarah.mp3");
  const soundMap = {
    1: require("../assets/sounds/1.mp3"),
    2: require("../assets/sounds/2.mp3"),
    3: require("../assets/sounds/3.mp3"),
    4: require("../assets/sounds/4.mp3"),
    5: require("../assets/sounds/5.mp3"),
    6: require("../assets/sounds/6.mp3"),
    7: require("../assets/sounds/7.mp3"),
    8: require("../assets/sounds/8.mp3"),
    9: require("../assets/sounds/9.mp3"),
    10: require("../assets/sounds/10.mp3"),
    11: require("../assets/sounds/11.mp3"),
    12: require("../assets/sounds/12.mp3"),
    13: require("../assets/sounds/13.mp3"),
    14: require("../assets/sounds/14.mp3"),
    15: require("../assets/sounds/15.mp3"),
    16: require("../assets/sounds/16.mp3"),
    17: require("../assets/sounds/17.mp3"),
    18: require("../assets/sounds/18.mp3"),
    19: require("../assets/sounds/19.mp3"),
    20: require("../assets/sounds/20.mp3"),
    21: require("../assets/sounds/21.mp3"),
    22: require("../assets/sounds/22.mp3"),
    23: require("../assets/sounds/23.mp3"),
    24: require("../assets/sounds/24.mp3"),
    25: require("../assets/sounds/25.mp3"),
    26: require("../assets/sounds/26.mp3"),
    27: require("../assets/sounds/27.mp3"),
    28: require("../assets/sounds/28.mp3"),
    29: require("../assets/sounds/29.mp3"),
    30: require("../assets/sounds/30.mp3"),
    31: require("../assets/sounds/31.mp3"),
    32: require("../assets/sounds/32.mp3"),
    33: require("../assets/sounds/33.mp3"),
    34: require("../assets/sounds/34.mp3"),
    35: require("../assets/sounds/35.mp3"),
    36: require("../assets/sounds/36.mp3"),
    37: require("../assets/sounds/37.mp3"),
    38: require("../assets/sounds/38.mp3"),
    39: require("../assets/sounds/39.mp3"),
    40: require("../assets/sounds/40.mp3"),
    41: require("../assets/sounds/41.mp3"),
    42: require("../assets/sounds/42.mp3"),
    43: require("../assets/sounds/43.mp3"),
    44: require("../assets/sounds/44.mp3"),
    45: require("../assets/sounds/45.mp3"),
    46: require("../assets/sounds/46.mp3"),
    47: require("../assets/sounds/47.mp3"),
    48: require("../assets/sounds/48.mp3"),
    49: require("../assets/sounds/49.mp3"),
    50: require("../assets/sounds/50.mp3"),
    51: require("../assets/sounds/51.mp3"),
    52: require("../assets/sounds/52.mp3"),
    53: require("../assets/sounds/53.mp3"),
    54: require("../assets/sounds/54.mp3"),
    55: require("../assets/sounds/55.mp3"),
    56: require("../assets/sounds/56.mp3"),
    57: require("../assets/sounds/57.mp3"),
    58: require("../assets/sounds/58.mp3"),
    59: require("../assets/sounds/59.mp3"),
    60: require("../assets/sounds/60.mp3"),
    61: require("../assets/sounds/61.mp3"),
    62: require("../assets/sounds/62.mp3"),
    63: require("../assets/sounds/63.mp3"),
    64: require("../assets/sounds/64.mp3"),
    65: require("../assets/sounds/65.mp3"),
    66: require("../assets/sounds/66.mp3"),
    67: require("../assets/sounds/67.mp3"),
    68: require("../assets/sounds/68.mp3"),
    69: require("../assets/sounds/69.mp3"),
    70: require("../assets/sounds/70.mp3"),
    71: require("../assets/sounds/71.mp3"),
    72: require("../assets/sounds/72.mp3"),
    73: require("../assets/sounds/73.mp3"),
    74: require("../assets/sounds/74.mp3"),
    75: require("../assets/sounds/75.mp3"),
    76: require("../assets/sounds/76.mp3"),
    77: require("../assets/sounds/77.mp3"),
    78: require("../assets/sounds/78.mp3"),
    79: require("../assets/sounds/79.mp3"),
    80: require("../assets/sounds/80.mp3"),
    81: require("../assets/sounds/81.mp3"),
    82: require("../assets/sounds/82.mp3"),
    83: require("../assets/sounds/83.mp3"),
    84: require("../assets/sounds/84.mp3"),
    85: require("../assets/sounds/85.mp3"),
    86: require("../assets/sounds/86.mp3"),
    87: require("../assets/sounds/87.mp3"),
    88: require("../assets/sounds/88.mp3"),
    89: require("../assets/sounds/89.mp3"),
    90: require("../assets/sounds/90.mp3"),
  };


  useEffect(() => {
    if (isGameActive) {
      intervalRef.current = setInterval(() => {
        generateBall();
      }, intervalTime * 1000); // Generar una bola cada intervalo de tiempo seleccionado

      timerRef.current = setInterval(() => {
        setTimer(prevTimer => (parseFloat(prevTimer) + 0.1).toFixed(1));
      }, 100);
    } else {
      clearInterval(intervalRef.current);
      clearInterval(timerRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(timerRef.current);
    };
  }, [isGameActive, intervalTime]);

  const generateBall = () => {
    // Lógica para generar una nueva bola que no esté en el array de bolas ya generadas
    let newBall;
    do {
      newBall = Math.floor(Math.random() * ballsQuantity) + 1;
    } while (balls.includes(newBall));
    //setBalls((prevBalls) => [...prevBalls, newBall]);
    setBalls(balls => [...balls, newBall]);
    setTimer(0);
    playSoundBall(newBall);
    //console.log(balls.length + "_" + ballsQuantity + "_" + balls);
    if (balls.length === ballsQuantity-1) {
        setTimeout(() => {
            handleEndGame();
        }, 3000);
    }
  };

  const playSoundBall = async (ballNumber) => {
    try {
        // Detener y liberar cualquier sonido anterior
        if (sound) {
          await sound.unloadAsync();
        }
  
        // Cargar el archivo de sonido correspondiente desde el mapeo
        const { sound: newSound } = await Audio.Sound.createAsync(soundMap[ballNumber]);
        setSound(newSound);
  
        // Reproducir el sonido
        await newSound.playAsync();
      } catch (error) {
        console.error("Error al reproducir el sonido de bola:", error);
      }
};

const playSound = async (soundVar) => {
    try {
        // Detener y liberar cualquier sonido anterior
        if (sound) {
          await sound.unloadAsync();
        }
  
        // Cargar el archivo de sonido correspondiente desde el mapeo
        const { sound: newSound } = await Audio.Sound.createAsync(soundVar);
        setSound(newSound);
  
        // Reproducir el sonido
        await newSound.playAsync();
      } catch (error) {
        console.error("Error al reproducir el sonido inicio/final:", error);
      }
};

  const handleStartPauseResume = () => {
    if (!isGameStarted) {
      setIsGameStarted(true);
      setIsGameActive(true);
      playSound(initSound);
    } else {
      setIsGameActive(!isGameActive);
      setTimer(0);
    }
  };

  const handleEndGame = () => {
    setIsGameActive(false);
    setIsGameStarted(false);
    setBalls([]);
    setTimer(0);
    playSound(finalSound);
  };

  const increaseInterval = () => {
    if (intervalTime < 10) {
      setIntervalTime(intervalTime + 1);
    }
  };

  const decreaseInterval = () => {
    if (intervalTime > 3) {
      setIntervalTime(intervalTime - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bingo Game</Text>
      <View style={styles.intervalContainer}>
        <TouchableOpacity
          onPress={decreaseInterval}
          style={[styles.intervalButton, intervalTime === 3 && styles.disabledButton]}
          disabled={intervalTime === 3}
        >
          <Text style={styles.intervalButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.intervalText}>{intervalTime} seconds</Text>
        <TouchableOpacity
          onPress={increaseInterval}
          style={[styles.intervalButton, intervalTime === 10 && styles.disabledButton]}
          disabled={intervalTime === 10}
        >
          <Text style={styles.intervalButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.timerText}>{timer} seconds</Text>
      <View style={styles.ballsContainer}>
        {balls.length > 0 && (
          <Text style={styles.latestBall}>Latest Ball: {balls[balls.length - 1]}</Text>
        )}
        <Text style={styles.ball}>
          {balls.slice(-5).reverse().join(' - ')}
        </Text>
      </View>
      <Button
        title="Generate Ball"
        onPress={generateBall}
        disabled={!isGameStarted || isGameActive}
      />
      <Button
        title={
          isGameStarted ? 
          (isGameActive ? "Pause Game" : "Resume Game") : "Start Game"
        }
        onPress={handleStartPauseResume}
      />
      <Button
        title="End Game"
        onPress={handleEndGame}
      />
      <View style={styles.numberGrid}>
        {[...Array(9).keys()].map(row => (
          <View key={row} style={styles.numberRow}>
            {[...Array(10).keys()].map(col => {
              const number = row * 10 + col + 1;
              return (
                <Text
                  key={number}
                  style={[
                    styles.number,
                    balls.includes(number) && styles.markedNumber
                  ]}
                >
                  {number}
                </Text>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ballsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    width: 200,
    height: 60,
    marginBottom: 20,
  },
  latestBall: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ball: {
    fontSize: 18,
    margin: 5,
  },
  intervalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  intervalButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  intervalButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  intervalText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  timerText: {
    fontSize: 18,
    marginBottom: 20,
  },
  numberGrid: {
    marginTop: 20,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  number: {
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    margin: 2,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    backgroundColor: 'lightblue',
  },
  markedNumber: {
    backgroundColor: 'lightgreen',
  },
});

export default GameScreen;
