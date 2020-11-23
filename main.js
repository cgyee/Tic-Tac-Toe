//Player - contains values for player related object i.e name, tile

const Player = (name, token) => {
    const myName = name;
    const myToken = token;
    let myWins = 0;
    
    const getName = () => {return myName;};
    const getToken = () => {return myToken;};
    const getWins = () => {return myWins; };
    let addWin = () => {myWins++;};
     return { getName, getToken, getWins, addWin};
};

//GameBoard - stores board information related to board state, and the ability to add/remove player tokens from the board
const GameBoard = (() => {
    //Track token pieces
    myGameBoard = [[]];
    let currentPlayer, prevPlayer;

    //initalize myGameBoard
    const init = (() => {
        for(i = 0; i < 3; i++) { 
            myGameBoard[i][0] = 0;
            myGameBoard[i][1] = 0;
            myGameBoard[i][2] = 0;
        }
    });

    //Add Players to GameBoard
    const addPlayer = (player) => {
        if(!currentPlayer && !prevPlayer) {
            currentPlayer = player;
        }
        if(currentPlayer && !prevPlayer) {
            prevPlayer = player;
        }
    };

    //Function to Add token/Player to myGameBoard
    const addPlayerToken = (i, j) => {
        //Check if Player selection in myGameBoard is available at the specified index 
        if(!(myGameBoard[i][j])) {
            //if true
            //Add player/token to that index
            myGameBoard[i][j] = currentPlayer.getToken;
            return checkForWinner();
        }
    }


    //checkForWinner -  function travers the array horizontally vertically and diagonally to see if 3 of the same tokens appear
    const checkForWinner = () => {
        //check horizontal and vertical
        for(i = 0; i < 3; i++) {
            if(myGameBoard[i][0] && myGameBoard[i][1] && myGameBoard[i][2]) { return true;}
            else if(myGameBoard[0][i] && myGameBoard[1][i] && myGameBoard[2][i]) { return true;}
        }

        //check the diagonal
        if((myGameBoard[0][0] && myGameBoard[1][1] && myGameBoard[2][2]) ||
            (myGameBoard[2][0] && myGameBoard[1][1] && myGameBoard[0][2])) {
                return true;
        }
        alternatePlayer();
        return false;

    };

    //getCurrentPlayer- function to return the current player
    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    //alternate player - function set current player to prev and prev player to current
    const alternatePlayer = () => {
        let temp = currentPlayer;
        currentPlayer = prevPlayer;
        prevPlayer = temp;
    }
    //return addPlayerToken function
    return { addPlayer,addPlayerToken, getCurrentPlayer };
})();

//Displays and Updates the front end UI as the user interacts with ir
const displayController = (() => {
    //Get the container holding the 3x3 grid
    //Iterate through the container to touch each griditem
    //Add an event listerner to each grid item to pass it's index location to GameBoard on click
        //if there is a winner call Player.addwin and clear the board
})();