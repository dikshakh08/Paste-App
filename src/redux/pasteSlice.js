import { createSlice } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState: {
    pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
  },
  reducers: {
    addToPastes: (state,action) =>{
        
      const paste = action.payload;

      const alreadyExists = state.pastes.some(
       (item) =>
        item.title.trim().toLowerCase() ===
        paste.title.trim().toLowerCase()
    );

    if (alreadyExists) {
      toast.error("A paste with this title already exists!");
      return;
    }

    state.pastes.push(paste);

    localStorage.setItem(
      "pastes",
      JSON.stringify(state.pastes)
    );

    toast.success("Paste Created Successfully");
  },
    
    updateToPastes : (state,action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => 
      item._id === paste._id)

      if (index >= 0 ){
        state.pastes[index] = paste
        
        localStorage.setItem("pastes" , JSON.stringify
        (state.pastes)
        )
        toast.success("Paste updated")
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = []

      localStorage.removeItem("pastes")
    },
    removeFromPastes:(state, action) => {
      const pasteId = action.payload

      console.log(pasteId)
      const index = state.pastes.findIndex((item) => 
      item._id === pasteId)


      if (index >= 0){
        state.pastes.splice(index,1)

        localStorage.setItem("pastes", JSON.stringify (state.pastes));
        toast.success("Paste deleted")
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const {addToPastes, updateToPastes, resetAllPastes, removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer