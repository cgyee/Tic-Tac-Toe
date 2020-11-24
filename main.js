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
    winConditons = [
        [0, 1, 2],
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3, 5],
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8],
        [6, 4, 2]
    ];
    //initalize myGameBoard
    const init = (() => {
        for(i= 0; i < 9; i++) {
            myGameBoard[i] = 0;
        }
    })();

    //Function to Add token/Player to myGameBoard
    const addPlayerToken = (index, token) => {
        //Check if Player selection in myGameBoard is available at the specified index 
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
            row.every(index => myGameBoard[index] == token);
        });
        //return the corresponding value

    };
    //return addPlayerToken function
    return {addPlayerToken, checkForWinner };
})();

const GameController = (() => {
    let player1, player2;
    let isPlayer1 = true;

    const alternatePlayer = () => {
        isPlayer1 = !isPlayer1;
    };

    const addPlayer = (player) => {
        if(isPlayer1) { player1 = player; alternatePlayer();}
        else { player2 = player; alternatePlayer();};
    };

    let currentPlayer = () => {
        return isPlayer1 ? player1 : player2;
    };

    return {addPlayer, alternatePlayer, currentPlayer}

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
    gridItems = Array.from(gridItems);
    gridItems.forEach(element => {
        element.addEventListener('click', e => {
            const span = document.createElement('span');
            span.className = "token";
            span.innerText = GameController.currentPlayer().getToken();
            if(GameBoard.addPlayerToken(parseInt(e.target.id), GameController.currentPlayer().getToken())) {
                element.append(span);
                //GameBoard.checkForWinner
                e.disabled = true;
                GameController.alternatePlayer();
            }
        });
    });
        //if there is a winner call Player.addwin and clear the board
})();