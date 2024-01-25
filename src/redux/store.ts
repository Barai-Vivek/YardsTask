import { configureStore } from "@reduxjs/toolkit"
import teamReducer from "./teamSlice";

const store = configureStore({
    reducer :{
        team : teamReducer
    }
});

export default store