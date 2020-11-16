import { Logger } from '@nestjs/common';
import {OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit{

    @WebSocketServer() wss:Server;

    private logger: Logger = new Logger('AppGateway');

    afterInit(server:any){
        this.logger.log('this log worked!')
    }


    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, text:string):void {
        this.wss.emit('msgToClient', text);

    }
}