import { createStore } from "vuex";
import surahModule from "./modules/surahModule";
import doaModule from "./modules/doaModule";

export default createStore({

    modules: {
        surahModule,
        doaModule
    }
    
});