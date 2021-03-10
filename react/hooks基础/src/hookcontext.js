import React, { useContext } from "react"
const Context = React.createContext()
const Provider = Context.Provider

export default function HooksContext() {
    const store = {
        user: {
            name: "jun"
        }
    }
    return (
        <div>
            <Provider value={store}>
                <ContextChild></ContextChild>
            </Provider>
        </div>
    )
}
function ContextChild(props) {
    const {user}=useContext(Context)
    return <div>{user.name}</div>
}