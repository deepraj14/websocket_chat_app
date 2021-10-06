const http=require('http')//http library is imported
const express=require('express')//express library is imported
const socketio=require('socket.io')
const app=express()
const alert=require('alert')

const  server=http.createServer(app)//an http server is created over our express app
//as our socket can not directly run over express

const io=socketio(server)
//what happens here is a fucntion from socket.io libraray is stored in socketio
//variable and when we call this function using the argument server,that is our
//http server ,the library socket.io serves us with a js file ,that is very imp
//for our use and hence everything get stored in "io"


let user={
    deep:'deepraj14',
}

let socketobj={

}

let socketcode={

}

io.on('connection',(socket)=>{
    console.log('connected startet at socket id',socket.id)

   socket.on('msgdeliver',(data)=>{
       console.log('the message recied is ',data.msg)

       io.emit('mr',(data))
       //here we are using io.emit to broadcasr our msg from one socket to everyother socket
       //if we use socket.emit,,only pipeline of current sockent,i.e only one socket will 
       //recieve the resposne
       //if we use socket.broadcast.emit //all the pipilnes excet the current socket pipeline 
       //will get the reponses .//hence there are total three possible ways of sending 
       //response back
   })

   
   socket.on('start',(data)=>{
       console.log('we joined the romm',data.username)

      if(user[data.username])
      {
          if(user[data.username]==data.password)
          {
              socket.join(data.username)
              socketobj[socket.id]=data.username
              socket.emit('logged_in')
          }
          else{
              console.log('login failed')
              socket.emit('f')
          }
      }

      else
      {
          user[data.username]=data.password
          socket.join(data.username)
          socketobj[socket.id]=data.username
          let x= Math.floor(Math.random()*100000);
          socketcode[socket.id]=x;
          alert('The Security Key is '+x)
          console.log(socketcode)
          socket.emit('logged_in')
      }
      

       
   })
  
 






   socket.on('msgsend',(data)=>{

      socket.emit('msent',{
          m:data.message,
          code:socketcode[socket.id]
      })

       if(data.to)
       {
        data.senderid=socketcode[socket.id]
        data.from=socketobj[socket.id]
        console.log('the room is' ,data.to)
         io.to(data.to).emit('msgrevert',data)
       }
       else
       {
        data.senderid=socketcode[socket.id]
        data.from=socketobj[socket.id]
           socket.broadcast.emit('msgrevert',data)
       }

       //emit just come form front end to sevrer 
       //from to variable we emit back the things and the info kisko kisko
       //emit karni h bs yahi hota h

   })
    
})
//what happens here is whenever a new tab is open that means connection is on a new pipeline is create d
//betweem the client (new browser tab) and the server(back end) and socket.io.js file is 
//accessible to both front and  backend and a socket id is generated ,hence we can console
//lof socket id in both front anf backend that will be  same //and hence for every new tab 
//open a new pipline is formed between clinet and server.


///to make front end acces io fille,link socket.io.js first the define socket =io() in script.js




app.use('/',express.static(__dirname+'/public'))

app.get('/',function(){
    
})


server.listen(3344,()=>{
    console.log('server started on http://localhost:3344')
})


