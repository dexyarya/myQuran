import { apiDoa } from "../API"

export const doaList = async () => {
    try {
        const response = await apiDoa.get("doa")
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const doaDetailList = async (id) => {
    try {
        const response = await apiDoa.get(`doa/${id}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
