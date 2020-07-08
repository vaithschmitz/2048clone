import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground ,Dimensions, Vibration, Alert, Modal } from 'react-native';
import {Directions, FlingGestureHandler, State} from 'react-native-gesture-handler';
import {chooseMonster, tileImages} from './utils'
import Constants from 'expo-constants';
import _ from 'lodash'

// TODO: New orientation, movement allowed?, movement, level algo, async storage, themeColor switcher, change headers to views instead of touchops

export default function App() {
  const startingBoard = [['','','',''],['',2,'',2],['','','',''],['','','','']]
  const [board, setBoard] = useState(startingBoard)
  const [score, setScore] = useState(0)
  const [theme, setTheme] = useState('numbers')
  const [themeColor, setThemeColor] = useState('#89cff0')
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(()=> {playTurn(), playTurn()}, [])

  const playTurn = () => {
    let flatBoard = board.flat()
    if(flatBoard.filter(el => el == '').length == 0){
      return false
    }
    else{
      let addIndex = Math.floor(Math.random() * 16)
      let addedNum = Math.floor(Math.random()*10) > 0 ? 2 : 4
      while(flatBoard[addIndex] != ''){
        addIndex = Math.floor(Math.random() * 16)
      }
      flatBoard[addIndex] = addedNum
      setBoard(_.chunk(flatBoard, 4))
    }

  }

  const calcScore = i => {
    setScore(score => score += i)
  }

  const checkBorders = () => {
    if(board[0][0]!= '' && board[0][1]!= '' && board[0][1]!= '' && board[0][1] != ''){
      console.log('topFull')
      return 'topFull'
    }
    if(board[0][0]!= '' && board[1][0]!= '' && board[2][0]!= '' && board[3][0] != ''){
      console.log('leftFull')
      return 'leftFull'
    }
    if(board[3][0]!= '' && board[3][0] != '' && board[3][0] != '' && board[3][0] != ''){
      console.log('rightFull')
      return 'rightFull'
    }
    if(board[3][0]!= '' && board[3][1]!= '' && board[3][2]!= '' && board[3][3] != ''){
      console.log('bottomFull')
      return 'bottomFull'
    }
    else{
      console.log('nah')
      
      return
    }
  }


  moveRight = () => {
    let canMove = true
    // while(canMove){
    for(let i = 0; i<= 3; i++){
      for(let j = 3; j >= 0; j--){
        // if previous space has same number, add
        if(board[i][j] == board[i][j-1]){
          board[i][j] *= 2
          board[i][j-1] = ''
        }
        // if adjacent right is empty, move value there
        if((board[i][j] == '') && (board[i][j-1] != '' )){
          board[i][j] = board[i][j-1]
          board[i][j-1] = '' 
        }
        // console.log(board)
      }
    }
    // }
    // setBoard(() => [...board, board])
    setBoard([...board])
    console.log('right')
  }


  const resetBoard = () => {
    setModalVisible(false)
    Vibration.vibrate([100,100,100])
    setScore(0)
    setBoard(startingBoard)
  }

 
  return (
    <View style={[styles.bg, {backgroundColor: themeColor}]}>
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

          // moveLeft()
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
          <View style={styles.header}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalButtons} onPress={() => {
              Alert.alert(
                'Restart Game?',
                'This will reset your progress',
                [{
                  text: 'Yep!',
                  onPress: () => resetBoard()
                },
                {
                  text: 'Cancel',
                  style: 'cancel'
                }],
              { cancelable: false }
              )}}>
              <Text>RESET!</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>Change Tiles</Text>
            <View style={styles.modalThemes}>
              <TouchableOpacity style={styles.modalButtons} 
                onPress={() => {
                  setModalVisible(false)
                  setTheme('numbers')
                }}>
                <Text>Numbers</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtons} 
                onPress={() => {
                  setModalVisible(false)
                  setTheme('monsters')
                }}>
                <Text>Monsters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
            <TouchableOpacity style={styles.menu} onPress={() => {
              setModalVisible(true)
              }}>
              <Image source={require('./assets/menu.png')} style={{ width: "50%", height: "50%", alignSelf: 'center' }} resizeMode={'contain'}></Image>
              <Image source={require('./assets/home.png')} style={{ width: "35%", height: "35%", alignSelf: 'center' }} resizeMode={'contain'}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.score}>
              <Image source={require('./assets/score.png')} style={{ width: "50%", height: "50%", alignSelf: 'center' }} resizeMode={'contain'}></Image>
              <Text style={{ alignSelf: 'center', fontSize: 30, color: 'white'}}>{score}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lvl}>
              <Image source={require('./assets/crown.png')} style={{ width: "50%", height: "50%", alignSelf: 'center' }} resizeMode={'contain'}></Image>
              <Text style={{ alignSelf: 'center', fontSize: 30, color: 'white'}}>1241</Text>
            </TouchableOpacity>
            </View>
          <View style={styles.gridContainer}>
            <View>      
              <View style={[styles.cell, styles.cell1]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(0,0, board, theme)}></Image></View>
              <View style={[styles.cell, styles.cell2]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(1,0, board, theme)}></Image></View>
              <View style={[styles.cell, styles.cell3]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(2,0, board, theme)}></Image></View>
              <View style={[styles.cell, styles.cell4]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(3,0, board, theme)}></Image></View>
            </View>
            <View>
              <View style={[styles.cell, styles.cell5]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(0,1, board, theme)}></Image></View>
              <View style={[styles.cell, styles.cell6]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(1,1, board, theme)}></Image></View>
              <View style={[styles.cell, styles.cell7]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(2,1, board, theme)}></Image></View>
              <View style={[styles.cell, styles.cell8]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(3,1, board, theme)}></Image></View>
            </View>
            <View>
              <View style={[styles.cell, styles.cell9]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(0,2, board, theme)}></Image></View>
              <View style={[styles.cell, styles.cell10]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(1,2, board, theme)}></Image></View>
              <View style={[styles.cell, styles.cell11]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(2,2, board, theme)}></Image></View>
              <View style={[styles.cell, styles.cell12]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(3,2, board, theme)}></Image></View>
            </View>
            <View>
              <View style={[styles.cell, styles.cell13]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(0,3, board, theme)}></Image></View>
              <View style={[styles.cell, styles.cell14]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(1,3, board, theme)}></Image></View>
              <View style={[styles.cell, styles.cell15]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(2,3, board, theme)}></Image></View>
              <View style={[styles.cell, styles.cell16]}><Image resizeMode={'contain'}  style={{ width: "100%", height: "100%" }} source={chooseMonster(3,3, board, theme)}></Image></View>
            </View>
          </View>
        </View>
      </FlingGestureHandler>
      </FlingGestureHandler>
      </FlingGestureHandler>
      </FlingGestureHandler>
    {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  bg:{
    width: Dimensions.get('window').width, 
    height: Dimensions.get('screen').height, 
    resizeMode: 'contain',
    flexDirection: 'column', 
  },
  screen: {
    flex:1,
    // width: Dimensions.get('window').width, 
    // height: Dimensions.get('screen').height, 
    
  },
  header:{
    flexDirection: 'row',
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height / 10,
    borderColor: 'lightgrey',
    paddingTop: Constants.statusBarHeight
  },
  menu:{
    width: Dimensions.get('window').width /3,
    height: Dimensions.get('screen').height / 10,
    // backgroundColor: '#ec4d7f'

  },
  score:{
    width: Dimensions.get('window').width /3,
    height: Dimensions.get('screen').height / 10,
    // backgroundColor: '#7fec4d'

  }, 
  lvl:{
    width: Dimensions.get('window').width /3,
    height: Dimensions.get('screen').height / 10,
    // backgroundColor:'#4d7fec'
  },
  gridContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtons:{
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
  modalThemes:{
    flexDirection: 'row'
  },
  cell: {
    height: 75,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5, 
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 5,
  }
});



