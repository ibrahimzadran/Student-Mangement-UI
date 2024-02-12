import {DataGrid, GridCellParams, GridColDef, GridDeleteForeverIcon, GridEditCellProps   } from "@mui/x-data-grid"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { deleteStudent, getStudents } from "../studentapi"
import EditStudent from "./EditStudent"
import AddStudent from "./AddStudent"
import { Button, Select, Snackbar } from "@mui/material"
import Confirmation from "./Confirmation"

const StudentList = () => {
    const queryClient = useQueryClient();
    const[open, setOpen] = useState(false)
    const [openConfirmation, setOpenConfirmation] = useState(null)
    const [showSnackBar, setSnackBar] = useState(false)


    

    
const {data,error,isSuccess}= useQuery({
    queryKey:["students"],
    queryFn: getStudents

})

const genderOptions: string[] = ['Male', 'Female'];

const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    {
        field: 'gender',
        headerName: 'Gender',
        width: 200,
        editable: true,
        // Custom editor for the gender field
        renderEditCell: (params: GridEditCellProps) => (
            <Select
                value={params.value}
                onChange={(event) => {
                    params.api.commitCellChange({ id: params.id, field: params.field, value: event.target.value });
                }}
                autoFocus
                fullWidth
                native  // Use native select element
            >
                {genderOptions.map((option:string) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </Select>
        ),
    },
    {field: 'course', headerName: 'Course', width: 200},
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'started', headerName:'start Date', width: 200},
    {field: 'graduation', headerName:'Graduate', width: 200},
   {field: 'edit', headerName:'', width:90,sortable:false,

   renderCell:(params:GridCellParams)=>
   <EditStudent studentdata={params.row}/>
},
    {field:'delete', headerName:"",width:90,sortable:false,
    filterable:false,
    renderCell:(params:GridCellParams)=>(
    <>
    <Button color='error'
    onClick={()=>setOpenConfirmation({
        id:params.row.id,
        firstName:params.row.firstName,
        lastName:params.row.lastName
    })}
    ><GridDeleteForeverIcon/></Button>
    <Confirmation open={!!openConfirmation}
    firstName={openConfirmation?.firstName}
    lastName={openConfirmation?.lastName}
    onClose={()=> setOpenConfirmation(null)}
    onConfirm={()=>{
        mutate(params.row.id);
        setOpenConfirmation(null)
    }}
    >
    </Confirmation>
    </>
    )
}
    ]
    const {mutate} = useMutation(deleteStudent, {
        onSuccess : () => {
          
            queryClient.invalidateQueries({queryKey:["students"]});
            setSnackBar(true);
        },
        onError : (err) =>{
            console.error(err);
        }
      })





  if(!isSuccess){
    return <h2> Loading....</h2>
}else if (error){
    return <h2>Error when fetching cars</h2>
}else{
    

 return (

    <>
    <DataGrid
    rows={data}
    columns={columns}
    />
        <Snackbar open={showSnackBar} 
        autoHideDuration={2000}
        onClose={()=> setSnackBar(false)}
        message="Student deleted"
        
        />



    <AddStudent/>
    </>
  )
}
}
export default StudentList