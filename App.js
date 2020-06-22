import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground ,Dimensions, Vibration, Alert, Modal } from 'react-native';
import {Directions, FlingGestureHandler, State} from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import sky from './assets/sky.jpg'

const images = {
  monsters:{
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
  },
  numbers:{
    Transparent:{
      file: require('./assets/monsters/transparent.png')
    },
    One: {
      file: require('./assets/numbers/2.png')
    },
    Two:{
      file: require('./assets/numbers/4.png')
    },
    Three:{
      file: require('./assets/numbers/8.png')
    },
    Four:{
      file: require('./assets/numbers/16.png')
    },
    Five:{
      file: require('./assets/numbers/32.png')
    },
    Six:{
      file: require('./assets/numbers/64.png')
    },
    Seven:{
      file: require('./assets/numbers/128.png')
    },
    Eight:{
      file: require('./assets/numbers/256.png')
    },
    Nine:{
      file: require('./assets/numbers/512.png')
    },
    Ten:{
      file: require('./assets/numbers/1024.png')
    },
    Eleven:{
      file: require('./assets/numbers/4096.png')
    },
    Twelve:{
      file: require('./assets/numbers/2048.png')
    },
    Thirteen:{
      file: require('./assets/numbers/8192.png')
    },
    Fourteen:{
      file: require('./assets/numbers/16384.png')
    },
    Fifteen:{
      file: require('./assets/numbers/32768.png')
    },
    Sixteen:{
      file: require('./assets/numbers/65536.png')
    },
    Seventeen:{
      file: require('./assets/numbers/131072.png')
    }
  }
}

export default function App() {
  const startingBoard = [['','', '',''],['','',2,''],['','',2,''],['','','','']]
  const [board, setBoard] = useState(startingBoard)
  const [score, setScore] = useState(0)
  const [theme, setTheme] = useState('numbers')
  const [themeColor, setThemeColor] = useState('#89cff0')
  const [modalVisible, setModalVisible] = useState(false)

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

  const calcScore = i => {
    setScore(score => score += i)
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
              calcScore((board[i][j] * 2))
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
              calcScore((board[i][j] * 2))
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
              calcScore((board[i][j] * 2))
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
              calcScore((board[i][j] * 2))
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
    setModalVisible(false)
    Vibration.vibrate([100,100,100])
    setScore(0)
    setBoard(startingBoard)
  }

  const chooseMonster = (x,y) => {
    console.log(board[x][y])
    if(board[x][y] == ""){
      return images[theme]['Transparent'].file
    }
    if(board[x][y] == 2){
      return images[theme]['One'].file
    }
    if(board[x][y] == 4){
      return images[theme]['Two'].file
    }    
    if(board[x][y] == 8){
      return images[theme]['Three'].file
    }
    if(board[x][y] == 16){
      return images[theme]['Four'].file
    }
    if(board[x][y] == 32){
      return images[theme]['Five'].file
    }
    if(board[x][y] == 64){
      return images[theme]['Six'].file
    }
    if(board[x][y] == 128){
      return images[theme]['Seven'].file
    }
    if(board[x][y] == 256){
      return images[theme]['Eight'].file
    }
    if(board[x][y] == 512){
      return images[theme]['Nine'].file
    }
    if(board[x][y] == 1024){
      return images[theme]['Ten'].file
    }
    if(board[x][y] == 2048){
      return images[theme]['Eleven'].file
    }
    if(board[x][y] == 4096){
      return images[theme]['Twelve'].file
    }
    if(board[x][y] == 8192){
      return images[theme]['Thirteen'].file
    }
    if(board[x][y] == 16384){
      return images[theme]['Fourteen'].file
    }
    if(board[x][y] == 32768){
      return images[theme]['Fifteen'].file
    }
    if(board[x][y] == 65536){
      return images[theme]['Sixteen'].file
    }
    if(board[x][y] == 131072){
      return images[theme]['Seventeen'].file
    }
  }

  return (
    <View style={styles.screen}>
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
              <Image source={require('./assets/menu.png')} style={{ width: "100%", height: "100%", alignSelf: 'center' }} resizeMode={'contain'}></Image>
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
            {/* <TouchableOpacity><Text>Switch Theme</Text></TouchableOpacity> */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  bg:{
    width: Dimensions.get('window').width, 
    height: Dimensions.get('screen').height, 
    resizeMode: 'contain',
    flexDirection: 'column'
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



