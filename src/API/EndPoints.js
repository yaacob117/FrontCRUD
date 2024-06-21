import axios from "axios"
import config from "./Config,"

const local = config.SERVER_LOCAL
const Prod = config.SERVER_PROD

//Authors
export const GetAllAuthors = async () => {
    try {
        const response = await axios.get(`${local}/api/Authors`)
            return response.data
    } catch (error) {
        throw error
    }
}

export const DeleteAuthor = async () => {
    try {
        const response = await axios.post(`${local}/api/Authors`)
    } catch (error) {
        
    }
}
