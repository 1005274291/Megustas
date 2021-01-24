import {SWITCH_LIST} from "../actions"


var filterreducer =function (state,action) {
    if (!state) {
        return{
            filter:"all"
        }
    }
    switch (action.type) {
        case SWITCH_LIST:
            return{
                filter:action.newfilter
            }
    
        default:
            return state
    }
}

export default filterreducer