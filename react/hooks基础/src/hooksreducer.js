import React, { useEffect, useReducer } from "react"


function fruitsReducer(state, action) {
    switch (action.type) {
        case "init":
            return action.payload
        default:
            return state
    }
}
export default function HooksReducer() {
    const [fruits, dispatch] = useReducer(fruitsReducer, [])
    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: "init", payload: ["apple", "banana"] })
        }, 1000)
    }, [fruits])
    return (
        <div>
            {
                fruits.map((item,index)=>{
                    return <div key={index}>{item}</div>
                })
            }
        </div>
    )
}