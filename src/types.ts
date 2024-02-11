import { ChangeEvent } from "react";


export type StudentResponse= {
    firstName : string;
    lastName : string;
    gender : Gender;
    course: string;
    email : string;
    started : number;
    graduation : number;
}

export type DialogFromProps = {
    student : StudentResponse;
    handleChange: (event:ChangeEvent<HTMLInputElement>)=> void
}

export type Student= {
    id : number;
    firstName : string;
    lastName : string;
    gender : Gender;
    course: string;
    email : string;
    started : number;
    graduation : number;
}

export type StudentEntry ={
    student : Student;
    url : string;
}