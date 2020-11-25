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
        [0, 3, 6],
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8],
        [6, 4, 2]
    ];
    //initalize myGameBoard
    const init = () => {
        
        for(i= 0; i < 9; i++) {
            myGameBoard[i] = 0;
        }
    };

    const resetGameBoard = () => {
        init();
    };

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
            return row.every(index => myGameBoard[index] == token);
        });
        //return the corresponding value

    };

    const checkForTie = () => {
        return myGameBoard.every(token => token == 'X' || token == 'O');
    }
    //return addPlayerToken function
    return {addPlayerToken, checkForWinner, resetGameBoard, checkForTie };
})();

//Controls the player flow of the game
const GameController = (() => {
    
    let player1, player2;
    let isPlayer1 = true;

    const alternatePlayer = () => {
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

})();

//Displays and Updates the front end UI as the user interacts with ir
const displayController = (() => {
    //Get the container holding the 3x3 grid
    //let gridItems = document.querySelectorAll('.grid-item');

    const player1 =Player("Player 1", "X");
    const player2 =Player("Player 2", "O");
    GameController.addPlayer(player1);
    GameController.addPlayer(player2);

    //Iterate through the container to touch each griditem
    //Add an event listerner to each grid item to pass it's index location to GameBoard on click
    const startNewGame = () => {
        gameDisplay();
        GameBoard.resetGameBoard();
        let gridItems = document.querySelectorAll('.grid-item');
        gridItems = Array.from(gridItems);
        gridItems.forEach(element => {
            element.addEventListener('click', addTokenToScreen);
        });
    };
    
    const clearGameDisplay = () => {
        const gridTokens = document.getElementsByClassName("token");
        while(gridTokens[0]) {
            gridTokens[0].remove();
        }
        
    };

    resetBoardButton = () => {
        const gameContainer = document.querySelector('.game-container');
        const resetButton = document.createElement('button');
        resetButton.className = 'reset-button';
        resetButton.innerText = "RESET!!!";
        resetButton.addEventListener('click', e => {
            clearGameDisplay()
            GameBoard.resetGameBoard();
            const removeButton = document.getElementsByClassName('reset-button')[0].remove();
        });
        gameContainer.append(resetButton);

    };

    const addTokenToScreen = (e) => {
        
        const span = document.createElement('span');
        span.className = "token";
        span.innerText = GameController.currentPlayer().getToken();

        if(GameBoard.addPlayerToken(parseInt(e.target.id), GameController.currentPlayer().getToken())) {
            e.target.append(span);

            if(GameBoard.checkForWinner(GameController.currentPlayer().getToken())) {
                
                GameController.currentPlayer().addWin();
                updateScoreDisplay(GameController.currentPlayer());
                //GameBoard.resetGameBoard();
                resetBoardButton();
            }
            else if(GameBoard.checkForTie()) {
                
                //GameBoard.resetGameBoard();
                alert("You tied");
                //clearGameDisplay();
                resetBoardButton();
            }

            alternatePlayerDisplay(GameController.currentPlayer());
            GameController.alternatePlayer();
        }
    };

    const isPlayerOne = (player) => {
        return player1 === player ? true : false;
    };

    const alternatePlayerDisplay = (player) => {

        const currentPlayer = isPlayerOne(player) ?
            document.querySelector('#Player-1') : 
            document.querySelector('#Player-2');
        
        const prevPlayer = !isPlayerOne(player) ?
            document.querySelector('#Player-1') : 
            document.querySelector('#Player-2');

        currentPlayer.className = "player-text player-current";
        prevPlayer.className = "player-text";
    };

    const updateScoreDisplay = (player) => {
        
        const scoreBoard = isPlayerOne(player) ? 
            document.querySelector('#Player-1-score') : 
            document.querySelector('#Player-2-score');
        
            scoreBoard.innerText ="Score: " + player.getWins();
    };

    const gameDisplay = () => {

        const container = document.querySelector('.container');
        const gameContainer = document.createElement('div');
        const gridContainer = document.createElement('div');
        
        const playerContainerMaker = (player, id, isCurrent) => {
            const playerContainer = document.createElement('div');
            const playerName = document.createElement('p');
            const playerScore = document.createElement('p');
            playerContainer.className = "player-container";
            playerName.className = `player-text ${isCurrent}`;
            playerName.id = `Player-${id}`;
            playerScore.className = "player-score";
            playerScore.id = `Player-${id}-score`;
            playerName.innerText = player;
            playerScore.innerText = "Score: 0";
            playerContainer.append(playerName, playerScore);
            return playerContainer

        }
        
        const playerOneContainer = playerContainerMaker("Player 1", 1, "player-current");
        const playerTwoContainer = playerContainerMaker("Player 2", 2, "");

        gameContainer.className = "game-container";
        gridContainer.className = "grid-container";
        for(i = 0; i < 9; i++) { 
            const gridItem = document.createElement('div');
            gridItem.className = "grid-item";
            gridItem.id = i;
            gridContainer.append(gridItem);
        }
        gameContainer.append(gridContainer);
        container.append(playerOneContainer, gameContainer, playerTwoContainer);

    }

    startNewGame();
})();