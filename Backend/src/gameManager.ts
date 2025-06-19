import { WebSocket } from "ws";
import { INIT_GAME } from "./message";
import { Game } from "./game";


export class GameManager{
    private games:Game[];
    private pendingUsers: WebSocket | null;
    private users: WebSocket[];
    constructor(){
        this.games = [];
        this.pendingUsers = null;
        this.users = [];
    }

    addUser(socket:WebSocket){
        this.users.push(socket);
        this.handleMsg(socket)
    }

    removeUser(socket:WebSocket){
        this.users = this.users.filter(user=>user !== socket)
    }

    private handleMsg(socket: WebSocket){
        socket.on("message",(data)=>{
            const message = JSON.parse(data.toString());

            if(message.type== INIT_GAME){
                if(this.pendingUsers){
                    const game = new Game(this.pendingUsers, socket);
                    this.games.push(game);
                    this.pendingUsers = null;
                }else{
                    this.pendingUsers = socket
                }
            }
        })
    }
}