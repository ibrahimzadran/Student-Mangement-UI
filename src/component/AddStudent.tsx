import { Button, Dialog, DialogActions, DialogContent, Box, DialogTitle } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, useState } from "react";
import { Student } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStudent } from "../studentapi";
import StudentDialogContent from "./StudentDialogContent";




const AddStudent = () => {
    const[student,setStudent] = useState<Student>({
        id: '',
        firstName: '',
        lastName: '',
        gender: '',
        course: '',
        email: '',
        started: 0,
        graduation: 0
    })
    const[open,setOpen]= useState(false);
    const queryClient = useQueryClient();

    const {mutate} = useMutation(addStudent,{
        onSuccess : ()=> {
            queryClient.invalidateQueries(['student']);
        },
        onError: (err)=>{
            console.error(err)
        }
    })

    const handleOpen = ()=> {
        setOpen(true)
    }
    
    const handleClose = ()=> {
        setOpen(false)
    }

    const handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
        setStudent({... student, [event.target.name]:event.target.value})
    }

    const handleSave = () => {
       
             mutate(student);
            setStudent({
                id: '',
                firstName: '',
                lastName: '',
                gender: '',
                course: '',
                email: '',
                started: 0,
                graduation: 0
                    
    })
    setOpen(false);
}
    



  return (
    <>
    <Dialog open={open} onClose={handleClose}> 
    <DialogTitle>New Student</DialogTitle>
    <StudentDialogContent student={student} handleChange ={handleChange} />
    <DialogActions>
        <Button color='error' variant = 'contained' onClick={handleClose}>Cancel</Button>
        <Button color='primary' variant = 'contained' onClick={handleSave}>Save</Button>
    </DialogActions>

    </Dialog>
    <Box
    display= 'flex'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    padding='20px'
    position='relative'
    >
    <Button  variant="contained" onClick={handleOpen}>ADD STUDENT <AddIcon/> </Button>

    </Box>
    </>
  )
}

export default AddStudent