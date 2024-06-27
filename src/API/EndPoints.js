import axios from "axios"
import config from "./Config,"

const local = config.SERVER_LOCAL
const Prod = config.SERVER_PROD

//Authors
export const GetAllAuthors = async () => {
    try {
        const response = await axios.get(`${local}/api/Authors/GetAuthors`)
            return response.data
    } catch (error) {
        throw error
    }
}

export const DeleteAuthor = async (authorID) => {
    try {
       
        const response = await axios.delete(`${local}/api/Authors/DeleteAuthor`, {
            data: { authorID: authorID }
        });

        return response;
    } catch (error) {
        throw error;
    }
}

export const AddAuthor = async (authorData) => {
    try {
       
        const response = await axios.post(`${local}/api/Authors/AddAuthor`, authorData)
        return response;
    } catch (error) {
        throw error;
    }
}
export const UpdateAuthor = async (authorData) => {
    try {
        console.log(authorData);
        const response = await axios.put(`${local}/api/Authors/UpdateAuthor`, authorData,{
           headers: {
                'Content-Type': 'application/json'
           } 
        })
        return response;

    } catch (error) {
        throw error
    }
}
