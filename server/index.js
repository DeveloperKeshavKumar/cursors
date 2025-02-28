const http = require('http')
const url = require('url');
const { WebSocketServer } = require('ws')
const { v4: uuidv4 } = require('uuid');

// Use the Render-provided PORT or default to 3000 for local development
const PORT = process.env.PORT || 3000
const server = http.createServer()
const wsServer = new WebSocketServer({ server })

const connections = {}
const users = {}

const broadcastUsers = () => {
    Object
        .keys(connections)
        .forEach(uuid => {
            const connection = connections[uuid]
            const message = JSON.stringify(users)
            connection.send(message)
        })
}

const handleMessage = (bytes, uuid) => {
    // {"x":10, "y":30}

    const message = JSON.parse(bytes.toString())
    const user = users[uuid]
    user.state = message

    broadcastUsers()

    console.log(`${user.username} updated their state: ${JSON.stringify(user.state)}`)
}

const handleClose = (uuid) => {
    console.log(`${users[uuid].username} disconnected`)

    delete connections[uuid]
    delete users[uuid]

    broadcastUsers()
}

wsServer.on('connection', (connection, request) => {
    // ws://localhost:3000?username=Keshav

    const { username } = url.parse(request.url, true).query
    const uuid = uuidv4()
    console.log(username, "has joined the current session with uuid", uuid)


    connections[uuid] = connection
    users[uuid] = {
        username,
        state: {}
    }

    connection.on('message', message => handleMessage(message, uuid))
    connection.on('close', () => handleClose(uuid))
})

// Start the server on the provided PORT (from Render or default to 3000)
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})