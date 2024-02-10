import { ChangeEvent } from "react";


export type StudentResponse= {
    firstName : string;
    lastName : string;
    gender : string;
    course: string;
    email : string;
    started : number;
    gradution : number;
}

export type DialogFromProps = {
    car : StudentResponse;
    handleChange: (event:ChangeEvent<HTMLInputElement>)=> void
}

export type Student= {
    id : number;
    firstName : string;
    lastName : string;
    gender : string;
    course: string;
    email : string;
    started : number;
    graduation : number;
}

export type StudentEntry ={
    student : Student;
    url : string;
}