import { useState } from "react"

export default function Login({ submit }) {
    const [username, setUsername] = useState('')

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Welcome</h1>
                <p className="text-center text-gray-600 mb-4">What should people call you?</p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        submit(username.trim())
                    }}
                    className="space-y-4"
                >
                    <input
                        autoFocus="true"
                        autoComplete="true"
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
