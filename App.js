import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground ,Dimensions, Alert } from 'react-native';
import {Directions, FlingGestureHandler, State} from 'react-native-gesture-handler';
import sky from './assets/sky.jpg'
import { reset } from 'expo/build/AR';

export default function App() {
  const startingBoard = [[1,2, 3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
  const [board, setBoard] = useState(startingBoard)

  const addNumbers = () => {
    let newBoard = board.map(el => {
      for(let i = 0; i < 4; i++){
        el[i]++
      }
    })
    setBoard([...board, newBoard])
  }
  const subtractNumbers = () => {
    let newBoard = board.map(el => {
      for(let i = 0; i < 4; i++){
        el[i]--
      }
    })
    setBoard([...board, newBoard])
  }
  const multiplyNumbers = () => {
    let newBoard = board.map(el => {
      for(let i = 0; i < 4; i++){
        el[i] = el[i]*2
      }
    })
    setBoard([...board, newBoard])
  }
  const divideNumbers = () => {
    let newBoard = board.map(el => {
      for(let i = 0; i < 4; i++){
        el[i] = el[i]/2
      }
    })
    setBoard([...board, newBoard])
  }
  const resetBoard = () => setBoard(startingBoard)

  return (
    <ImageBackground source={sky} style={styles.bg}>
      <FlingGestureHandler       
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          addNumbers(board)
        }
      }}>
      <FlingGestureHandler       
        direction={Directions.LEFT}
        onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          subtractNumbers(board)
        }
      }}>
      <FlingGestureHandler       
        direction={Directions.UP}
        onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          multiplyNumbers(board)
        }
      }}>
      <FlingGestureHandler       
        direction={Directions.DOWN}
        onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          divideNumbers(board)
        }
      }}>
        <View style={styles.screen}>
          <View style={styles.header}><TouchableOpacity onPress={resetBoard}><Text>RESET!</Text></TouchableOpacity></View>
          <View style={styles.gridContainer}>
            <View>      
              <View style={styles.cell}><Text>{board[0][0]}</Text></View>
              <View style={styles.cell}><Text>{board[0][1]}</Text></View>
              <View style={styles.cell}><Text>{board[0][2]}</Text></View>
              <View style={styles.cell}><Text>{board[0][3]}</Text></View>
            </View>
            <View>
              <View style={styles.cell}><Text>{board[1][0]}</Text></View>
              <View style={styles.cell}><Text>{board[1][1]}</Text></View>
              <View style={styles.cell}><Text>{board[1][2]}</Text></View>
              <View style={styles.cell}><Text>{board[1][3]}</Text></View>
            </View>
            <View>
              <View style={styles.cell}><Text>{board[2][0]}</Text></View>
              <View style={styles.cell}><Text>{board[2][1]}</Text></View>
              <View style={styles.cell}><Text>{board[2][2]}</Text></View>
              <View style={styles.cell}><Text>{board[2][3]}</Text></View>
            </View>
            <View>
              <View style={styles.cell}><Text>{board[3][0]}</Text></View>
              <View style={styles.cell}><Text>{board[3][1]}</Text></View>
              <View style={styles.cell}><Text>{board[3][2]}</Text></View>
              <View style={styles.cell}><Text>{board[3][3]}</Text></View>
            </View>
          </View>
        </View>
      </FlingGestureHandler>
      </FlingGestureHandler>
      </FlingGestureHandler>
      </FlingGestureHandler>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg:{
    width: Dimensions.get('window').width, 
    height: Dimensions.get('screen').height, 
    resizeMode: 'contain'
  },
  screen: {
    flex:1,
    flexDirection: 'column',
  },
  header:{
    flex: 1,
    alignSelf: 'center',
    top : 100
  },
  gridContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    height: 75,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5, 
    borderWidth: 3,
    borderColor: 'lightgrey',
    borderRadius: 5,
  }
});
