import { WebSocket } from "ws";


export class GameManager{
    private games:Game[];
    private pendingUsers: WebSocket;
    private users: WebSocket[];
    constructor(){
        this.games = [];
    }

    addUser(socket:WebSocket){
        this.users.push(socket);
        this.handleMsg(socket)
    }

    removeUser(socket:WebSocket){
        this.users = this.users.filter(user=>user !== socket)
    }

    private handleMsg(socket: WebSocket){}
}