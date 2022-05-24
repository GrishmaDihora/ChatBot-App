import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../model/message.model';

@Injectable()
export class HomeService {

	constructor(private http: HttpClient){

	}
    
    createNew(sender:String,receiverName:String){
        return this.http.post('/api/user/create',{
            receiverName:receiverName,
            senderName:sender
        })
    }

    getContacts(authorName:String){
        return this.http.post('/api/user/get-contact',{ 
            author:authorName
        })
    }

	getMessages(sender:String,receiver:String){
		return this.http.post('/api/user/get-msg',{
            receiverName:receiver,
            senderName:sender    
        })
    }
    sendMsg(message:Message,fixSender:String,fixReceiver:String){
        return this.http.post('/api/user/send-msg',{
            //receiver : message.receiver,
            receiver : fixReceiver,
            sendMsg : message.sendMsg,
            recvMsg : '',//message.recvMsg,
            //sender : message.sender,
            sender : fixSender,
            sendTime : '',//message.sendTime,
            recvTime : ''//message.recvTime
        })
    }

}