const express=require('express');
const path=require('path');
const { Socket } = require('socket.io');
const app= express()

const PORT=process.env.PORT || 3000
const server=app.listen(PORT,()=>{
    console.log(`our chat server is running on ${PORT}`);
});

const io=require('socket.io')(server)

app.use(express.static(path.join(__dirname,'public')));

let socketConnected=new Set()

io.on('connection',onConnected)

function onConnected(socket){
    console.log(socket.id);
    socketConnected.add(socket.id)

    io.emit('clients-total',socketConnected.size) //to check the clients number

    socket.on('disconnect',()=>{
        console.log("Socket disconnected",socket.id);
        socketConnected.delete(socket.id);
        io.emit('clients-total',socketConnected.size)  // to again check after deletion
    })

    socket.on('message',(data)=>{
        // console.log(data);
        socket.broadcast.emit('chatmessage',data)
    })

    socket.on('feedback',(data)=>{
        socket.broadcast.emit('feedback',data)
    })
}


