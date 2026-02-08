import { createSlice } from "@reduxjs/toolkit";

const loanStore = createSlice({
    name:'loan',
    initialState:{
        loanData :[],
    },
    reducers:{
        loanDataFun(state,action){
            state.loanData = action.payload
        }
    }
})
export const {loanDataFun} = loanStore.actions

export default loanStore.reducer;