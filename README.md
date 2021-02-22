# Tic-Tac-Toe

NodeJs application for Tic-Tac-Toe game.

## How to run?

- Step 1: Install yarn 
  
    This project is using `yarn`. Install it from https://classic.yarnpkg.com/en/docs/install/#mac-stable


- Step 2: Clone repo

    ```
    git clone https://github.com/whatsaaaa/TicTacToe.git
    ```

- Step 3: Install dependencies
    
    ```
    yarn
    ```
  
- Step 4: Start development server
    ```
    yarn dev
    ```
  
    App listening on: http://localhost:8000/graphql
  
## Features

- **Dependency Injection** done with framework [TypeDi](https://github.com/typestack/typedi).
- **Clear Structure** with different layers such as services, repositories, resolvers...
- **GraphQl** query language for our application.
- **Simplified DB** with the small local JSON database using [LowDb](https://github.com/typicode/lowdb).
- **Logging system** using [Winston](https://github.com/winstonjs/winston).


## Examples

### Mutations

- Create a new game
    ```
    mutation {
        createNewGame(
            username: "Whatsaaaaa",
            gameType: "singleplayer"
        ) {
            id,
            playerX,
            playerO,
            winner
        }
    }
    ```
  
    `gameType` field supports two values: `singleplayer` and `multiplayer`. If anything else is specified, 
    `InvalidGameType` error will be returned.
  

- Join an existing game
    ```
    mutation {
        joinGame(
            username: "Player 2",
            gameId: "1e172221-e180-4336-8e95-e3741c15612b"
        ) {
            id,
            playerX,
            playerO,
            winner
        }
    }
    ```
    
    This mutation returns two potential errors: `GameNotFound` and `GameIsFull`.


- Make a new move
    
    ```
    mutation {
        makeMove(
            gameId: "1e172221-e180-4336-8e95-e3741c15612b",
            playerMove: [0, 2]
        ) {
            index
            player,
            move,
            board
        }
    }
    ```
    
    This mutation can return next errors: `GameNotFound`, `GameNotStarted`, `InvalidMove`, `GameAlreadyCompleted` & `FieldAlreadyPlayed`.

    Valid moves:

       [0, 0]  |  [0, 1]  |  [0, 2] |
       ------------------------------
       [1, 0]  |  [1, 1]  |  [1, 2] |
       ------------------------------
       [2, 0]  |  [2, 1]  |  [2, 2] |

    **NOTE** 
    In singleplayer mode, after user makes a move, AI will immediately play.

### Queries

- Get history for a game by id

    ```
    query {
        getGameById(
            id: "11f9ea78-0974-4ab7-ac69-b198d023be2e"
        ) {
            id,
            playerX,
            playerO,
            type
            winner,
            moves {
                index
                player,
                move,
                board
            }
        }
    }
    ```


### Subscriptions

- Get live results visa subscription

    ```
    subscription {
        liveResults
    }
    ```
    Whenever a game is finished it will send a message that you can listen for.


## AI Moves

AI moves are achieved with very basic implementation of Minimax Algorithm.
