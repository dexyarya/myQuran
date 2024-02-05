import {surahList,surahDetailList} from '../../services/surahList.js'

const surahModule = {
    namespaced: true,
    state: {
        surahList: [],
        surahDetail: [],
        loading: false,
        error: null,
    },
    mutations: {
        setSurahList(state, payload) {
            state.surahList = payload;
        },
        setSurahDetail(state, payload) {
            state.surahDetail = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
    },
    actions: {
        async fetchSurahList({commit}) {
            commit("setLoading", true);
            try {
                const response = await surahList();
                commit("setSurahList", response);
            } catch (error) {
                commit("setError", error);
            } finally {
                commit("setLoading", false);
            }
        },

        async fetchSurahDetail({commit}, payload) {
            commit("setLoading", true);
            try {
                const response = await surahDetailList(payload);
                commit("setSurahDetail", response);
            } catch (error) {
                commit("setError", error);
            } finally {
                commit("setLoading", false);
            }
        }
    },
    getters: {
        getSurahList(state) {
            return state.surahList;
        },
        getSurahDetail(state) {
            return state.surahDetail;
        },
        getLoading(state) {
            return state.loading;
        },
        getError(state) {
            return state.error;
        },
    },
};

export default surahModule;