import { ADD_TODO,TOGGLE_TODO} from "../actions";
var todoreducer =function(state,action){
    if (!state) {
        return []
    }
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state, 
                {
                    todo:action.newtodo,
                    id:action.id  ,
                    isdone:false
                }     
            ]
        case TOGGLE_TODO:
            return state.map((todo)=>{
                if(todo.id ===action.id){
                    return{
                        ...todo,
                        isdone:!todo.isdone
                    }
                }
                return todo
            })   
        default:
            return state
    }
}
export default todoreducer