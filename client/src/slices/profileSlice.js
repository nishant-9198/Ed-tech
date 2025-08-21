import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // user: null,
  // yaha user ko directly null mark kr diyer jise profile pe refresh ksrne se data ht ja raha
  // so we have to fetych data from local storage
  // so we fetch it from local storage  first and also set 
  // value of user in local storage white login 
  // we do this in authAPI i.e in opreation- service
  user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
}

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload
    },
    setLoading(state, value) {
      state.loading = value.payload
    },
  },
})

export const { setUser, setLoading } = profileSlice.actions

export default profileSlice.reducer
