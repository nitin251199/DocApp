const initialState = {
    doctor:{},
    user:{},
    meds:{},
    cart:{},
}

export default function RootReducer(state=initialState,action){

    switch(action.type){
        case 'ADD_USER':
            state.user[action.payload[0]]=action.payload[1]
            return {user:state.user,doctor:state.doctor,meds:state.meds,cart:state.cart}
        case "ADD_DOCTOR":
            state.doctor[action.payload[0]]=action.payload[1]
            return {user:state.user,doctor:state.doctor,meds:state.meds,cart:state.cart}
        case 'ADD_MEDS':
            state.meds[action.payload[0]]=action.payload[1]
            return {user:state.user,doctor:state.doctor,meds:state.meds,cart:state.cart}
        case 'REMOVE_MEDS':
            delete state.meds[action.payload[0]]
            return {user:state.user,doctor:state.doctor,meds:state.meds,cart:state.cart}
        case 'ADD_CART':
            state.cart[action.payload[0]]=action.payload[1]
            return {user:state.user,doctor:state.doctor,meds:state.meds,cart:state.cart}
        case 'REMOVE_CART':
            delete state.cart[action.payload[0]]
            return {user:state.user,doctor:state.doctor,meds:state.meds,cart:state.cart}
        case 'REMOVE_DOCTOR':
            delete state.doctor[action.payload[0]]
            return {user:state.user,doctor:state.doctor,meds:state.meds,cart:state.cart}
        default:
            return state
    }
}