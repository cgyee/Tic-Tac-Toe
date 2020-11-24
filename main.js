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
    myGameBoard = [];
    let isplayer1 = false;

    //initalize myGameBoard
    const init = (() => {
        for(i= 0; i < 9; i++) {
            myGameBoard[i] = 0;
        }
    })();

    //Add Players to GameBoard
    const addPlayer = (player) => {
    };

    //Function to Add token/Player to myGameBoard
    const addPlayerToken = (i, j) => {
        //Check if Player selection in myGameBoard is available at the specified index 
            //if true
            //Add player/token to that index
    }


    //checkForWinner -  function travers the array horizontally vertically and diagonally to see if 3 of the same tokens appear
    const checkForWinner = () => {
        //check horizontal and vertical
    
        //check the diagonal

    };

    //getCurrentPlayer- function to return the current player
    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    //alternate player - function set current player to prev and prev player to current
    const alternatePlayer = () => {

    }
    //return addPlayerToken function
    return { addPlayer,addPlayerToken, getCurrentPlayer };
})();

//Displays and Updates the front end UI as the user interacts with ir
const displayController = (() => {
    //Get the container holding the 3x3 grid
    let gridItems = document.querySelectorAll('.grid-item');

    const player1 =Player("Player 1", "X");
    const player2 =Player("Player 2", "O");
    GameBoard.addPlayer(player1);
    GameBoard.addPlayer(player2);

    //Iterate through the container to touch each griditem
    //Add an event listerner to each grid item to pass it's index location to GameBoard on click
    gridItems = Array.from(gridItems);
    gridItems.forEach(element => {
        element.addEventListener('click', e => {
            const span = document.createElement('span');
            span.className = "token";
            span.innerText = GameBoard.getCurrentPlayer().getToken();
            if(!GameBoard.addPlayerToken(parseInt(e.target.id[0]), parseInt(e.target.id[1]))) {
                element.append(span);
            }
        });
    });
        //if there is a winner call Player.addwin and clear the board
})();