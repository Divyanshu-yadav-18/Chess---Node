"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const message_1 = require("./message");
const game_1 = require("./game");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUsers = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.handleMsg(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
    }
    handleMsg(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type == message_1.INIT_GAME) {
                if (this.pendingUsers) {
                    const game = new game_1.Game(this.pendingUsers, socket);
                    this.games.push(game);
                    this.pendingUsers = null;
                }
                else {
                    this.pendingUsers = socket;
                }
            }
            if (message.type === message_1.MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
