import { Logger } from '@nestjs/common';
import {OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

    @WebSocketServer() wss:Server;

    private logger: Logger = new Logger('AppGateway');

    afterInit(server:any){
        this.logger.log('this log worked!')
    }

    handleConnection(client:Socket, ...args: any[]){
        this.logger.log(`client has connected: ${client.id}`)
    }

    handleDisconnect(client:Socket, ...args: any[]){
        this.logger.log(`client has disconnected: ${client.id}`)
    }


    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, text:string):void {
        this.wss.emit('msgToClient', text);

    }
}