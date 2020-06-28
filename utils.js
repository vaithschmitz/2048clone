export const chooseMonster = (x,y, board, theme) => {
    console.log(board[x][y])
    if(board[x][y] == ""){
      return tileImages[theme]['Transparent'].file
    }
    if(board[x][y] == 2){
      return tileImages[theme]['One'].file
    }
    if(board[x][y] == 4){
      return tileImages[theme]['Two'].file
    }    
    if(board[x][y] == 8){
      return tileImages[theme]['Three'].file
    }
    if(board[x][y] == 16){
      return tileImages[theme]['Four'].file
    }
    if(board[x][y] == 32){
      return tileImages[theme]['Five'].file
    }
    if(board[x][y] == 64){
      return tileImages[theme]['Six'].file
    }
    if(board[x][y] == 128){
      return tileImages[theme]['Seven'].file
    }
    if(board[x][y] == 256){
      return tileImages[theme]['Eight'].file
    }
    if(board[x][y] == 512){
      return tileImages[theme]['Nine'].file
    }
    if(board[x][y] == 1024){
      return tileImages[theme]['Ten'].file
    }
    if(board[x][y] == 2048){
      return tileImages[theme]['Eleven'].file
    }
    if(board[x][y] == 4096){
      return tileImages[theme]['Twelve'].file
    }
    if(board[x][y] == 8192){
      return tileImages[theme]['Thirteen'].file
    }
    if(board[x][y] == 16384){
      return tileImages[theme]['Fourteen'].file
    }
    if(board[x][y] == 32768){
      return tileImages[theme]['Fifteen'].file
    }
    if(board[x][y] == 65536){
      return tileImages[theme]['Sixteen'].file
    }
    if(board[x][y] == 131072){
      return tileImages[theme]['Seventeen'].file
    }
  }



export const tileImages = {
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
