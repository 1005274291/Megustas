import { ADD_ONE } from "../action";
var reducer =function(state,action){
    if (!state) {
        return{
            count:0
        }
    }
    switch (action.type) {
        case ADD_ONE:
            return {
                ...state,
                count:state.count+1
            }
        default:
            return state
    }
}

export default reducer