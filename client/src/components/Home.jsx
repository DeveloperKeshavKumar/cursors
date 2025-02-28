import { useEffect, useRef } from "react"
import useWebSocket from "react-use-websocket"
import throttle from "lodash.throttle"
import Cursor from '../components/Cursor'

const generateColor = (userId) => {
    const colors = [
        "red", "blue", "green", "purple", "orange", "pink", "yellow", "cyan", "lime", "teal",
    ];
    return colors[userId.length % colors.length];
};

const renderCursors = users => {
    return Object.keys(users).map((uuid) => {
        const user = users[uuid]
        const cursorColor = generateColor(user.username);

        return (
            <Cursor key={uuid} point={[user.state.x, user.state.y]} color={cursorColor} />
        )
    })
}

const renderUsersList = users => {
    return Object.keys(users).map(uuid => {
        const user = users[uuid]
        return (
            <li key={uuid} className="bg-white p-4 mb-2 rounded-lg shadow-md">
                <div className="font-semibold text-lg text-gray-800">{user.username}</div>
                <pre className="mt-2 text-sm text-gray-600 whitespace-pre-wrap break-words">{JSON.stringify(user.state, null, 1)}</pre>
            </li>
        )
    })
}

export default function Home({ username }) {

    const WS_URL = 'wss://cursors-backend-z9v5.onrender.com'
    const THROTTLE = 100

    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        queryParams: { username }
    })

    const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))

    useEffect(() => {

        sendJsonMessage({ x: 0, y: 0 })

        window.addEventListener('mousemove', e => {
            sendJsonMessageThrottled.current({ x: e.clientX, y: e.clientY })
        })
    }, [])

    if (lastJsonMessage) {
        return (
            <div className="relative min-h-screen">
                {renderCursors(lastJsonMessage)}
                <ul className="absolute bottom-10 left-10 text-white bg-gray-800 p-4 rounded-lg shadow-lg">
                    {renderUsersList(lastJsonMessage)}
                </ul>
            </div>
        )
    }

    return (
        <h1 className="text-4xl font-bold text-center mt-20">Home, {username}</h1>
    )
}
