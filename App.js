import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground ,Dimensions, Alert } from 'react-native';
import {Directions, FlingGestureHandler, State} from 'react-native-gesture-handler';
import sky from './assets/sky.jpg'
import { reset } from 'expo/build/AR';

export default function App() {
  const startingBoard = [['','', '',''],['','',2,''],['',2,2,''],['','','','']]
  const [board, setBoard] = useState(startingBoard)

  const playTurn = () => {
    let column =  Math.floor(Math.random()*4)
    let row =  Math.floor(Math.random()*4)
    while(board[row][column] !== ''){
      column = Math.floor(Math.random()*4)
      row = Math.floor(Math.random()*4)
    }
    board[row][column] = 2
    setBoard([...board, board])

  }

  const moveRight = () => {
    for(let i = 0; i< 3; i++){
      for(let j = 0; j < 3; j++){
        // if not empty move to farthest free space
        if((board[i][j] !== "") && (i !== 3)){
          // if nearest space is not empty or same number, stop
          if(board[i+1][j]  !== "" && board[i+1][j] !== board[i][j]){
            ''
          }
          // if same number, double
          else if(board[i+1][j] == board[i][j]){
            board[i+1][j] = board[i][j] * 2
            board[i][j] = ""
          }
          else{
            board[i+1][j] = board[i][j]
            board[i][j] = ""
          }

        }

      }
    }
    setBoard([...board, board])

  }

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
          moveRight()
          playTurn()
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
              <View style={[styles.cell, styles.cell1]}><Text>{board[0][0]}</Text></View>
              <View style={[styles.cell, styles.cell2]}><Text>{board[0][1]}</Text></View>
              <View style={[styles.cell, styles.cell3]}><Text>{board[0][2]}</Text></View>
              <View style={[styles.cell, styles.cell4]}><Text>{board[0][3]}</Text></View>
            </View>
            <View>
              <View style={[styles.cell, styles.cell5]}><Text>{board[1][0]}</Text></View>
              <View style={[styles.cell, styles.cell6]}><Text>{board[1][1]}</Text></View>
              <View style={[styles.cell, styles.cell7]}><Text>{board[1][2]}</Text></View>
              <View style={[styles.cell, styles.cell8]}><Text>{board[1][3]}</Text></View>
            </View>
            <View>
              <View style={[styles.cell, styles.cell9]}><Text>{board[2][0]}</Text></View>
              <View style={[styles.cell, styles.cell10]}><Text>{board[2][1]}</Text></View>
              <View style={[styles.cell, styles.cell11]}><Text>{board[2][2]}</Text></View>
              <View style={[styles.cell, styles.cell12]}><Text>{board[2][3]}</Text></View>
            </View>
            <View>
              <View style={[styles.cell, styles.cell13]}><Text>{board[3][0]}</Text></View>
              <View style={[styles.cell, styles.cell14]}><Text>{board[3][1]}</Text></View>
              <View style={[styles.cell, styles.cell15]}><Text>{board[3][2]}</Text></View>
              <View style={[styles.cell, styles.cell16]}><Text>{board[3][3]}</Text></View>
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
    // borderWidth: 3,
    borderColor: 'lightgrey',
    borderRadius: 5,
  },
  cell1:{
    backgroundColor: 'red'
  },
  cell2:{
    backgroundColor: 'orangered'
  },
  cell3:{
    backgroundColor: 'salmon'
  },
  cell4:{
    backgroundColor: 'lightsalmon'
  },
  cell5:{
    backgroundColor: 'lightblue'
  },
  cell6:{
    backgroundColor: 'lightskyblue'
  },
  cell7:{
    backgroundColor: 'cornflowerblue'
  },
  cell8:{
    backgroundColor: 'royalblue'
  },
  cell9:{
    backgroundColor: 'forestgreen'
  },
  cell10:{
    backgroundColor: 'limegreen'
  },
  cell11:{
    backgroundColor: 'lime'
  },
  cell12:{
    backgroundColor: 'springgreen'
  },
  cell13:{
    backgroundColor: 'pink'
  },
  cell14:{
    backgroundColor: 'hotpink'
  },
  cell15:{
    backgroundColor: 'deeppink'
  },
  cell16:{
    backgroundColor: 'mediumvioletred'
  },
});
