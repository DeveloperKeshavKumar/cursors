const http = require('http')
const url = require('url');
const { WebSocketServer } = require('ws')
const { v4: uuidv4 } = require('uuid');

const PORT = 3000
const server = http.createServer()
const wsServer = new WebSocketServer({ server })

const connections = {}
const users = {}

const broadcast = (message)=>{

}

const handleMessage = (bytes, uuid)=>{
    // {"x":10, "y":30}

    const message = JSON.parse(bytes.toString())
    const user = users[uuid]
    user.state = message
    
    broadcast(JSON.stringify({uuid, state: user.state}))
}

const handleClose = (uuid)=>{

}

wsServer.on('connection', (connection, request) => {
    // ws://localhost:3000?username=Keshav

    const { username } = url.parse(request.url, true).query
    const uuid = uuidv4()
    console.log(username, uuid)

    connections[uuid] = connection
    users[uuid] = {
        username,
        state: {}
    }

    connection.on('message', message=> handleMessage(message, uuid))
    connection.on('close', ()=>handleClose(uuid))
})

server.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`))