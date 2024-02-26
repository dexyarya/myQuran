import {api} from '../API/index.js'

export const surahList = async () => {
    try {
        const response = await api.get("surahs");
        console.log(response.data);
        return response.data;       
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const surahDetailList = async (id) => {
    try {
        const response = await api.get(`/surahs/${id}/ayahs`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}