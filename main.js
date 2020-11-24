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
<<<<<<< HEAD
    let isplayer1 = false;

=======
    winConditons = [
        [0, 1, 2],
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8],
        [6, 4, 2]
    ];
>>>>>>> 71172183896c91e1bf47b6265df02745452db2b9
    //initalize myGameBoard
    const init = (() => {
        for(i= 0; i < 9; i++) {
            myGameBoard[i] = 0;
        }
    })();

<<<<<<< HEAD
    //Add Players to GameBoard
    const addPlayer = (player) => {
=======
    const resetBoard = () => {
        init();
>>>>>>> 71172183896c91e1bf47b6265df02745452db2b9
    };

    //Function to Add token/Player to myGameBoard
    const addPlayerToken = (index, token) => {
        //Check if Player selection in myGameBoard is available at the specified index 
<<<<<<< HEAD
            //if true
            //Add player/token to that index
    }


    //checkForWinner -  function travers the array horizontally vertically and diagonally to see if 3 of the same tokens appear
    const checkForWinner = () => {
        //check horizontal and vertical
    
        //check the diagonal
=======
        if(!myGameBoard[index] && !isNaN(index)) {
            myGameBoard[index] = token;
            return true;
        }
        return false;
    };

    //checkForWinner -  function travers the array horizontally vertically and diagonally to see if 3 of the same tokens appear
    const checkForWinner = (token) => {
        //iterate over win conditions
        return winConditons.some(row => {
            //check in each row if there is some tokens on the board that match that win condition
            return row.every(index => myGameBoard[index] == token);
        });
        //return the corresponding value
>>>>>>> 71172183896c91e1bf47b6265df02745452db2b9

    };

    const checkForTie = () => {
        return myGameBoard.every(token => token == 'X' || token == 'O');
    }
    //return addPlayerToken function
    return {addPlayerToken, checkForWinner, resetBoard, checkForTie };
})();

//Controls the player flow of the game
const GameController = (() => {
    let player1, player2;
    let isPlayer1 = true;

    const alternatePlayer = () => {
<<<<<<< HEAD

    }
    //return addPlayerToken function
    return { addPlayer,addPlayerToken, getCurrentPlayer };
=======
        isPlayer1 = !isPlayer1;
    };

    const addPlayer = (player) => {
        if(isPlayer1) { player1 = player; alternatePlayer();}
        else { player2 = player; alternatePlayer();}
    };

    let currentPlayer = () => {
        return isPlayer1 ? player1 : player2;
    };

    return {addPlayer, alternatePlayer, currentPlayer}

>>>>>>> 71172183896c91e1bf47b6265df02745452db2b9
})();

//Displays and Updates the front end UI as the user interacts with ir
const displayController = (() => {
    //Get the container holding the 3x3 grid
    let gridItems = document.querySelectorAll('.grid-item');

    const player1 =Player("Player 1", "X");
    const player2 =Player("Player 2", "O");
    GameController.addPlayer(player1);
    GameController.addPlayer(player2);

    //Iterate through the container to touch each griditem
    //Add an event listerner to each grid item to pass it's index location to GameBoard on click
    const startNewGame = () => {
        gridItems = Array.from(gridItems);
        gridItems.forEach(element => {
            element.addEventListener('click', addTokenToScreen)
        });
    };
    
    const clearGame = () => {
        Array.from(gridItems).forEach(element => {
            element.removeChild(element.firstChild);
        });
    };

    const addTokenToScreen = (e) => {
        const span = document.createElement('span');
        span.className = "token";
        span.innerText = GameController.currentPlayer().getToken();
        if(GameBoard.addPlayerToken(parseInt(e.target.id), GameController.currentPlayer().getToken())) {
            element.append(span);
            if(GameBoard.checkForWinner(GameController.currentPlayer().getToken())) {
                alert(`${GameController.currentPlayer().getName()} is the Winner`);
                GameController.currentPlayer().addWin();
                GameBoard.resetBoard();
            }
            console.log(GameBoard.checkForTie());
            GameController.alternatePlayer();
        }
    }
})();