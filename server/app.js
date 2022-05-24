const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
//const url = 'mongodb+srv://dayaniravi1152:Dayani123@chatapp-bjuun.mongodb.net/Chat?retryWrites=true&w=majority';
const url = 'mongodb://localhost/myDB';

const Message = require('./model/message');
const Contact = require('./model/contact');
const User = require('./model/user');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.post('/api/user/loggedIn',(req,res) => {
	mongoose.connect(url, { useMongoClient:true }, function(err){
		if(err) throw err;
		var username = req.body.username;
		var password = req.body.password;
		User.find({username:req.body.username,password:req.body.password},[],{},(err, doc) => {
			if(err) throw err;

			if(doc.length>0)
			{
				return res.status(200).json({
					status:"success",
					data: doc
				})
			}
			return res.status(200).json({
				status: 'error',
				data: doc
			})
		})
	});	
})

app.post('/api/user/createUser',(req,res) => {
	mongoose.connect(url, { useMongoClient:true }, function(err){
		if(err) throw err;
		const user = new User({
			username :req.body.username,
			password : req.body.password,
			email : req.body.email	
		})

		const contact = new Contact({
			author:req.body.username
		})

		user.save((err,doc) => {
			if(err) throw err;
			
			contact.save((err,doc) => {
				if(err) throw err;
				return res.status(200).json({
					status: 'success',
					data: doc
				})	
			})
			
		})

	});	
})



app.post('/api/user/send-msg', (req, res) => {
	mongoose.connect(url, { useMongoClient:true }, function(err){
		if(err) throw err;
		var today = new Date();
		var dateTemp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var timeTemp = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		Message.updateOne({sender:req.body.sender,receiver:req.body.receiver},
			{$push:
				{msgs:
					{
						textM:req.body.sendMsg,
						typeM:'s',
						timeM:dateTemp+' '+timeTemp	
					}
				}
			},(err,doc)=>{
			if(err) throw err;
			Message.updateOne({sender:req.body.receiver,receiver:req.body.sender},
				{$push:
					{msgs:
						{
							textM:req.body.sendMsg,
							typeM:'r',
							timeM:dateTemp+' '+timeTemp
						}
					}
				},(err,doc)=>{
					if(err) throw err;
					return res.status(200).json({
						status:'success',
						data:doc
					})			
			})
			
		})	


	});
})

app.post('/api/user/create',(req,res) => {
	mongoose.connect(url, { useMongoClient:true }, function(err){
		if(err) throw err;
		const message = new Message({
			receiver:req.body.receiverName,
			sender:req.body.senderName
			
		})
		message.save((err,doc)=>{
			if(err) throw err;
			Contact.updateOne({author:req.body.senderName},
				{$push:
					{receiver:
						{
							nameR:req.body.receiverName
						}
					}
				},(err,doc)=>{
					if(err) throw err;
					
					const messageR = new Message({
						sender:req.body.receiverName,
						receiver:req.body.senderName
					})
					
					messageR.save((err,doc)=>{
						if(err) throw err;
						return res.status(200).json({
							status:'Success',
							data:doc
						})		
					})			
			})
			
		})
	});
})

app.post('/api/user/get-msg', (req, res) => {
	mongoose.connect(url, { useMongoClient:true }, function(err){
		if(err) throw err;
		var recvName = req.body.receiverName;
		Message.find({sender:req.body.senderName,receiver:recvName},[],{},(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/user/get-contact',(req,res) =>{
	mongoose.connect(url, { useMongoClient:true }, function(err){
		if(err) throw err;
		var name=req.body.author;
		Contact.find({author:name},[],{},(err,doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'Success',
				data: doc
			})
		})
	});
})

app.listen(3000, () => console.log('Blog server running on port 3000!'))