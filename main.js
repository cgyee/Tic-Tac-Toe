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
    let addPlayer = (player) => {
        if(!currentPlayer && !prevPlayer) {
            currentPlayer = player;
        }
        if(currentPlayer && !prevPlayer) {
            prevPlayer = player;
        }
    };


    //Function to Add token/Player to myGameBoard

        //Check if Player selection in myGameBoard is available at the specified index 
        //if true
            //Add player/token to that index
            //CheckforWinner
            //Alternate Player

    //checkForWinner -  function travers the array horizontally vertically and diagonally to see if 3 of the same tokens appear
        //if true return true else false

    //getCurrentPlayer- function to return the current player

    //alternate player - function set current player to prev and prev player to current
    //return addPlayerToken function
})();

//Displays and Updates the front end UI as the user interacts with ir
const displayController = (() => {
    //
    //Get the container holding the 3x3 grid
    //Iterate through the container to touch each griditem
    //Add an event listerner to each grid item to pass it's index location to GameBoard on click
        //if there is a winner call Player.addwin and clear the board
})();