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

    handleConnection(client:any, ...args: any[]){
        throw new Error("handleconnect messssaggge")
    }

    handleDisconnect(client:any, ...args: any[]){
        throw new Error("handleconnect messssaggge")
    }


    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, text:string):void {
        this.wss.emit('msgToClient', text);

    }
}