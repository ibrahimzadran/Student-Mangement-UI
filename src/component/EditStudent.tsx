import { ChangeEvent, useState } from "react";
import { Student, StudentEntry, StudentResponse } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudent } from "../studentapi";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type FormProps = {
    studentdata: StudentResponse;
}

const EditStudent = ({ studentdata }: FormProps) => {

    const [student, setStudent] = useState<Student>({
        id: 0,
        firstName: '',
        lastName: '',
        gender: '',
        course: '',
        email: '',
        started: 0,
        graduation: 0
    });

    const [open, setOpen] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStudent({ ...student, [event.target.name]: event.target.value });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setStudent({
            id: 0,
            firstName: studentdata.firstName,
            lastName: studentdata.lastName,
            gender: studentdata.gender,
            course: studentdata.course,
            email: studentdata.email,
            started: studentdata.started,
            graduation: studentdata.gradution
        });
        setOpen(true);
    };

    const queryClient = useQueryClient();

    const { mutate } = useMutation<StudentResponse, Error, StudentEntry>(updateStudent, {
        onSuccess: () => {
            queryClient.invalidateQueries(['student']);
        },
        onError: (err) => {
            console.error(err);
        }
    });
    
    

    const handleSave = () => {
        const url = studentdata.id;
        const studentEntry: StudentEntry = { student, url };
        mutate(studentEntry);
        setStudent({
            id: 0,
            firstName: '',
            lastName: '',
            gender: '',
            course: '',
            email: '',
            started: 0,
            graduation: 0
        });
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleOpen} color="primary">Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Student</DialogTitle>
        
                <DialogActions>
                    <Button color="error" variant='contained' onClick={handleClose}>Cancel</Button>
                    <Button color="primary" variant='contained' onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditStudent;
