let board = [null, null, null, null, null, null, null, null, null];
let gameState = {
    preGame: true,
    playerTurn: 'x',
    winner: null,
    spacesPicked: 0,
    player1: {
        name: '',
        spacesPicked: 0,
        human: true,
        ready: false
    },
    player2: {
        name: '',
        spacesPicked: 0,
        human: true,
        ready: false
    }
    
};

/**
 * Setting gameState playerTurn to player
**/
function setPlayer(player){
    gameState.playerTurn = player;
}
 // Switches form player O and playerX/

function playerSwitch(){
    if (gameState.playerTurn === 'x'){
        return 'o';
    }else{
        return 'x';
    }
}

/**
 * check to see if there are 3 in a row
**/
function isThereWinner(){
    //console.log(board);

    gameState.spacesPicked++;

    if(board[0] && 
      ((board[0] == board[1] && board[1] == board[2])
        || (board[0] == board[3] && board[3] == board[6])
        || (board[0] == board[4] && board[4] == board[8])
        )
      ){
        gameState.winner = board[0];
      }
    if(board[6] &&
      ((board[6] == board[4] && board[4] == board[2])
      || (board[6] == board[7] && board[7] == board[8])
      )
      ){
        gameState.winner = board[6];
      }
  
    if(board[2] &&
      ((board[2] == board[5] && board[5] == board[8]))
      ){
        gameState.winner = board[2];
      }
    if(board[3] &&
      ((board[3] == board[4] && board[4] == board[5]))
      ){
        gameState.winner = board[3];
      }
    if(board[1] &&
      ((board[1] == board[4] && board[4] == board[7]))
      ){
        gameState.winner = board[1];
      }

    return gameState.winner;
}

/**
 * game over options desplays the reset-game and rematch button
**/
function gameOver(){
    $('.reset-games').removeClass('d-none');
    $('.rematch').removeClass('d-none');
}

$( document ).ready(function() {
    $( 'body' ).on( 'click', '.board-piece', function() {
        if(gameState.winner || gameState.preGame){
            return false;
        }

        let playerToken = $(this).data('player');

        if(playerToken == 'x' || playerToken == 'o' ){
            //let emsg = 'this place has a master';
        }else{
            let placeID = Number.parseInt($(this).data('id'));
            $(this).data('player', gameState.playerTurn);
            board[placeID] = gameState.playerTurn;
            
            //where tokens are placed
            if(gameState.playerTurn === 'o'){
                $(this).css('background-color', 'blue');
                $('#player2 p.player-count span').html(++gameState.player2.spacesPicked);

            }else if(gameState.playerTurn === 'x'){
                $(this).css('background-color', 'red');
                $('#player1 p.player-count span').html(++gameState.player1.spacesPicked);
            }

            if(isThereWinner()){
                alert('a winner we have');
                gameOver();
            }else{
                setPlayer(playerSwitch());
                if(gameState.spacesPicked > 8 && !gameState.winner) {
                    alert('draw');
                    gameOver();
                }
            }            
        }    
    });

    /**
    * this is were the game state is change from pre-game to game hides the divs where you 
    * set your name and allow the game to be played
    **/
    $( 'body' ).on( 'click', '.player-button', function() {
        let fName = $(this).parent('form').find('.f-name').val();
        $(this).parents('.player').find('.player-name').html(fName);
        let level = $(this).parent('form').find('.game-setting').val();
        $(this).parents('.player').find('.in-game .game-setting').html(level);

        //change the ready state
        let playerData = $(this).parents('.player').data('player');
        //console.log(playerData);
        
        switch (playerData) {
        case 'player1':
            gameState.player1.ready = true;
            break;
        case 'player2':
            gameState.player2.ready = true;
            break;
        }
        if(gameState.player1.ready && gameState.player2.ready){
            gameState.preGame = false;
        }
        //hides divs
        $(this).parents('.pre-game').addClass('d-none');
        $(this).parents('.player').find('.in-game').removeClass('d-none');
    });

    
   $( 'body' ).on( 'click', 'button.rematch', function() {
      //reset 
     // $('div .board-piece').removeClass('background-color', 'red');
      console.log("you want to play agian")
      gameState.winner = false;
      gameState.spacesPicked = 0;
      $('.reset-games').addClass('d-none');
      $('.rematch').addClass('d-none');
  
      board = [null, null, null, null, null, null, null, null, null];
});
/**
    * resets the page 
    **/
    $( 'body' ).on( 'click', 'button.reset-games', function() {
        location.reload();
    });
});