import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState:Array<any>,
  reducers: {
    addOne:(state:any,action)=>{
        state.push(action.payload)
    },
    removeAll:(state:any)=>{
        return state=[]
    },
    removeOne:((state,action)=>{
          const  index=state.indexOf(action.payload)
          if(index>-1){
            state.splice(index,1)
          }
          return state
    })
  },
});
export const { removeOne,removeAll, addOne } = cartSlice.actions;
export default cartSlice.reducer;
