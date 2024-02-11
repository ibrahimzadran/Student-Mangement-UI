import axios from "axios"
import { Student, StudentEntry, StudentResponse } from "./types";


export const getStudents = async(): Promise<StudentResponse[]> =>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/students`)
    return response.data;
}
export const deleteStudent =async (id:number)
:Promise<StudentResponse> => {

 const response =  await  axios.delete(`${import.meta.env.VITE_API_URL}/delete/${id}`)
 return response.data;
    
}
export const addStudent = async (student:Student):Promise<StudentResponse> =>
{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/add `,student,{
        headers : {
            'Content-Type' : 'application/json'
        }
    });

   return response.data
}
export const updateStudent = async (studentEntry: StudentEntry): Promise<StudentResponse> => {
    console.log(`${import.meta.env.VITE_API_URL}/
    ${studentEntry.url}}`);
    
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/${studentEntry.url}`, studentEntry.student, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return response.data;
}

