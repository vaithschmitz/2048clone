import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground ,Dimensions, Vibration, Alert } from 'react-native';
import {Directions, FlingGestureHandler, State} from 'react-native-gesture-handler';
import sky from './assets/sky.jpg'

const images = {
  Transparent:{
    file: require('./assets/monsters/transparent.png')
  },
  One: {
    file: require('./assets/monsters/lvl1.png')
  },
  Two:{
    file: require('./assets/monsters/lvl2.png')
  },
  Three:{
    file: require('./assets/monsters/lvl3.png')
  },
  Four:{
    file: require('./assets/monsters/lvl4.png')
  },
  Five:{
    file: require('./assets/monsters/lvl5.png')
  },
  Six:{
    file: require('./assets/monsters/lvl6.png')
  },
  Seven:{
    file: require('./assets/monsters/lvl7.png')
  },
  Eight:{
    file: require('./assets/monsters/lvl8.png')
  },
  Nine:{
    file: require('./assets/monsters/lvl9.png')
  },
  Ten:{
    file: require('./assets/monsters/lvl10.png')
  },
  Eleven:{
    file: require('./assets/monsters/lvl11.png')
  },
  Twelve:{
    file: require('./assets/monsters/lvl12.png')
  },
  Thirteen:{
    file: require('./assets/monsters/lvl13.png')
  },
  Fourteen:{
    file: require('./assets/monsters/lvl14.png')
  },
  Fifteen:{
    file: require('./assets/monsters/lvl15.png')
  },
  Sixteen:{
    file: require('./assets/monsters/lvl16.png')
  },
  Seventeen:{
    file: require('./assets/monsters/lvl17.png')
  }
}

export default function App() {
  const startingBoard = [['','', '',''],['','',2,''],['','',2,''],['','','','']]
  const [board, setBoard] = useState(startingBoard)
  const [score, setScore] = useState(0)
  
  const playTurn = () => {
    let column =  Math.floor(Math.random()*4)
    let row =  Math.floor(Math.random()*4)
    while(board[row][column] !== ''){
      column = Math.floor(Math.random()*4)
      row = Math.floor(Math.random()*4)
    }
    board[row][column] = 2
    setBoard([...board, board])
    // calcScore()
  }

  const calcScore = () => {
    let score = 0 
    for(let i = 0; i <=3; i++){
      for(let j = 0; j <= 3; j++){
        if(board[i][j] !== ""){
          score += board[i][j]
        }
      }
    }
    setScore(score)
  }

  const moveRight = () => {
    const scanMoves = () => {
      for(let i = 0; i<= 3; i++){
        for(let j = 0; j <= 3; j++){
          // if not empty move if possible
          if((board[i][j] !== "") && (i !== 3)){
            // if nearest space is not empty or same number, stop
            if(board[i+1][j]  !== "" && board[i+1][j] !== board[i][j]){
              ''
            }
            // if same number, double
            else if(board[i+1][j] == board[i][j]){
              board[i+1][j] = board[i][j] * 2
              setScore(score => score += board[i][j] *2)
              board[i][j] = ""
            }
            else{
              board[i+1][j] = board[i][j]
              board[i][j] = ""
            }
          }
        }
      }
    }

    for(let i = 0; i<= 3; i++){
      for(let j = 0; j <= 3; j++){
        // if not empty move if possible
        if((board[i][j] !== "") && (i !== 3)){
          ''
        }
        // if any other available moves, recurse
        else{
          scanMoves()
        }
      }
    }
    setBoard([...board, board])

  }

  const moveLeft = () => {
    const scanMoves = () => {
      for(let i = 3; i>= 0; i--){
        for(let j = 0; j <= 3; j++){
          // if not empty move if possible
          if((board[i][j] !== "") && (i !== 0)){
            // if nearest space is not empty or same number, stop
            if((board[i-1][j]  !== "") && (board[i-1][j] !== board[i][j])){
              ''
            }
            // if same number, double
            else if(board[i-1][j] == board[i][j]){
              board[i-1][j] = board[i][j] * 2
              setScore(score => score += board[i][j] *2)
              board[i][j] = ""
            }
            else{
              board[i-1][j] = board[i][j]
              board[i][j] = ""
            }
          }
        }
      }
    }
    // if any other available moves, recurse
    for(let i = 3; i>= 0; i--){
      for(let j = 0; j <= 3; j++){
        if((board[i][j] !== "") && (i !== 0)){
        }
          else{
            scanMoves()
          }
        }
      }

    setBoard([...board, board])

  }
  const moveUp = () => {
    const scanMoves = () => {
      for(let i = 0; i<= 3; i++){
        for(let j = 3; j >= 0; j--){
          // if not empty move if possible
          if((board[i][j] !== "") && (j !== 0)){
            // if nearest space is not empty or same number, stop
            if((board[i][j-1]  !== "") && (board[i][j-1] !== board[i][j])){
              ''
            }
            // if same number, double
            else if(board[i][j-1] == board[i][j]){
              board[i][j-1] = board[i][j] * 2
              // setScore(score => score += board[i][j] *2)
              board[i][j] = ""
            }
            else{
              board[i][j-1] = board[i][j]
              board[i][j] = ""
            }
          }
        }
      }
    }
    // if any other available moves, recurse
    for(let i = 0; i<= 3; i++){
      for(let j = 3; j >= 0; j--){
        if((board[i][j] !== "") && (j !== 0)){
        }
          else{
            scanMoves()
          }
        }
      }

    setBoard([...board, board])

  }
  const moveDown = () => {
    const scanMoves = () => {
      for(let i = 0; i<= 3; i++){
        for(let j = 0; j <= 3; j++){
          // if not empty move if possible
          if((board[i][j] !== "") && (j !== 3)){
            // if nearest space is not empty or same number, stop
            if((board[i][j+1]  !== "") && (board[i][j+1] !== board[i][j])){
              ''
            }
            // if same number, double
            else if(board[i][j+1] == board[i][j]){
              board[i][j+1] = board[i][j] * 2
              // setScore(score => score += board[i][j] *2)
              board[i][j] = ""
            }
            else{
              board[i][j+1] = board[i][j]
              board[i][j] = ""
            }
          }
        }
      }
    }
    // if any other available moves, recurse
    for(let i = 0; i<= 3; i++){
      for(let j = 0; j <= 3; j++){
        if((board[i][j] !== "") && (j !== 3)){
        }
          else{
            scanMoves()
          }
        }
      }

    setBoard([...board, board])

  }


  const resetBoard = () => {
    Vibration.vibrate([100,100,100])
    setBoard(startingBoard)
  }

  const chooseMonster = (x,y) => {
    console.log(board[x][y])
    if(board[x][y] == ""){
      return images['Transparent'].file
    }
    if(board[x][y] == 2){
      return images['One'].file
    }
    if(board[x][y] == 4){
      return images['Two'].file
    }    
    if(board[x][y] == 8){
      return images['Three'].file
    }
    if(board[x][y] == 16){
      return images['Four'].file
    }
    if(board[x][y] == 32){
      return images['Five'].file
    }
    if(board[x][y] == 64){
      return images['Six'].file
    }
    if(board[x][y] == 128){
      return images['Seven'].file
    }
    if(board[x][y] == 256){
      return images['Eight'].file
    }
    if(board[x][y] == 512){
      return images['Nine'].file
    }
    if(board[x][y] == 1024){
      return images['Ten'].file
    }
    if(board[x][y] == 2048){
      return images['Eleven'].file
    }
    if(board[x][y] == 4096){
      return images['Twelve'].file
    }
    if(board[x][y] == 8192){
      return images['Thirteen'].file
    }
    if(board[x][y] == 16384){
      return images['Fourteen'].file
    }
    if(board[x][y] == 32768){
      return images['Fifteen'].file
    }
    if(board[x][y] == 65536){
      return images['Sixteen'].file
    }
    if(board[x][y] == 131072){
      return images['Seventeen'].file
    }
  }

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
          moveLeft()
          playTurn()
        }
      }}>
      <FlingGestureHandler       
        direction={Directions.UP}
        onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          moveUp()
          playTurn()
        }
      }}>
      <FlingGestureHandler       
        direction={Directions.DOWN}
        onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          moveDown()
          playTurn()
        }
      }}>
        <View style={styles.screen}>
          <View style={styles.header}><TouchableOpacity style={styles.Reset} onPress={() => {
            Alert.alert(
              'Restart Game?',
              'This will reset your progress',
              [{
                text: 'Yep!',
                onPress: () => resetBoard()
              },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
            { cancelable: false }]
          )}}>
<Text>RESET!</Text>
</TouchableOpacity></View>
          {/* <View style={styles.header}><Text>{score}</Text></View> */}
          <View style={styles.gridContainer}>
            <View>      
              <View style={[styles.cell, styles.cell1]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(0,0)}></Image></View>
              <View style={[styles.cell, styles.cell2]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(0,1)}></Image></View>
              <View style={[styles.cell, styles.cell3]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(0,2)}></Image></View>
              <View style={[styles.cell, styles.cell4]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(0,3)}></Image></View>
            </View>
            <View>
            <View style={[styles.cell, styles.cell5]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(1,0)}></Image></View>
              <View style={[styles.cell, styles.cell6]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(1,1)}></Image></View>
              <View style={[styles.cell, styles.cell7]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(1,2)}></Image></View>
              <View style={[styles.cell, styles.cell8]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(1,3)}></Image></View>
            </View>
            <View>
            <View style={[styles.cell, styles.cell9]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(2,0)}></Image></View>
              <View style={[styles.cell, styles.cell10]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(2,1)}></Image></View>
              <View style={[styles.cell, styles.cell11]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(2,2)}></Image></View>
              <View style={[styles.cell, styles.cell12]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(2,3)}></Image></View>
            </View>
            <View>
            <View style={[styles.cell, styles.cell13]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(3,0)}></Image></View>
              <View style={[styles.cell, styles.cell14]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(3,1)}></Image></View>
              <View style={[styles.cell, styles.cell15]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(3,2)}></Image></View>
              <View style={[styles.cell, styles.cell16]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(3,3)}></Image></View>
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
  Reset:{
    height: 50, 
    width: 100, 
    borderRadius:10,
    backgroundColor: "#DDDDDD",
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Iowan Old Style', 
    fontWeight: 'bold', 
    elevation: 5

  },
  cell: {
    height: 75,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5, 
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
