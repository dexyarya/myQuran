import { doaList,doaDetailList } from "../../services/doaList";

const doaModule = {
    namespaced: true,
    state: {
        doaList: [],
        doaDetail: [],
        loading: false,
        error: null,
    },
    mutations: {
        setDoaList(state, payload) {
            state.doaList = payload;
        },
        setDoaDetail(state, payload) {
            state.doaDetail = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
    },
    actions: {
        async fetchDoaList({commit}) {
            commit("setLoading", true);
            try {
                const response = await doaList();
                commit("setDoaList", response);
            } catch (error) {
                commit("setError", error);
            } finally {
                commit("setLoading", false);
            }
        },

        async fetchDoaDetail({commit}, payload) {
            commit("setLoading", true);
            try {
                const response = await doaDetailList(payload);
                commit("setDoaDetail", response);
            } catch (error) {
                commit("setError", error);
            } finally {
                commit("setLoading", false);
            }
        }
    },
    getters: {
        getDoaList(state) {
            return state.doaList;
        },
        getDoaDetail(state) {
            return state.doaDetail;
        },
        getLoading(state) {
            return state.loading;
        },
        getError(state) {
            return state.error;
        },
    },
};

export default doaModule;