import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./message";

export class Game{
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess
    private startTime: Date;
    private movecnt = 0;

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
        }))

    }

    makeMove(socket:WebSocket, move:{
        from: string;
        to: string
    }){
        if(this.movecnt % 2 === 0 && socket !== this.player1){
            return;
        }
        if(this.movecnt % 2 === 0 && socket !== this.player2){
            return;
        }

        try{
            this.board.move(move);
        }catch(e){
            return;
        }

        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn() === "w" ? "black":"white"
                }
            }))
            return;
        }

        if(this.movecnt % 2 === 0){
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
        }))
    }else{
        this.player1.emit(JSON.stringify({
                type:MOVE,
                payload:move
        }))
    }
                this.movecnt++;

    }

}