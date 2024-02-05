import { createStore } from "vuex";
import surahModule from "./modules/surahModule";

export default createStore({

    modules: {
        surahModule,
    }
    
});