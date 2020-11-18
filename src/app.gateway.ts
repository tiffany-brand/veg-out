import { Logger } from '@nestjs/common';
import {OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

    @WebSocketServer() server;

    users: number=0;


    private logger: Logger = new Logger('AppGateway');

    afterInit(server:any){
        this.logger.log('this log worked!');
        
    }

    async handleConnection(){
        this.users++;
        this.server.emit('users', this.users);
    }

    async handleDisconnect(){
        this.users--;
        this.server.emit('users', this.users);
    }


    @SubscribeMessage('chat')
    async onChat(client, message){
        client.broadcast.emit('chat', message);
    }

    }