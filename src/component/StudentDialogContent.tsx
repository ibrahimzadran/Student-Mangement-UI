import { DialogContent, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DialogFromProps } from "../types";

const StudentDialogContent = ({ student, handleChange }: DialogFromProps) => {
  return (
    <DialogContent>
      <TextField value={student.firstName} name="firstName" variant="filled" placeholder="First Name" onChange={handleChange} /><br/>
      <TextField value={student.lastName} name="lastName" variant="filled" placeholder="Last Name" onChange={handleChange} /><br/>
      <FormControl variant="filled" fullWidth>
        <InputLabel htmlFor="gender">Gender</InputLabel>
        <Select value={student.gender} name="gender" variant="filled" onChange={handleChange} >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </FormControl><br/>
      <TextField value={student.course} name="course" variant="filled" placeholder="Course" onChange={handleChange} /><br/>
      <TextField value={student.email} name="email" variant="filled" placeholder="Email" onChange={handleChange} /><br/>
      <TextField value={student.started.toString()} name="started" variant="filled" placeholder="Started (yyyy-mm-dd)" onChange={handleChange} /><br/>
      <TextField value={student.graduation.toString()} name="graduation" variant="filled" placeholder="Graduation (yyyy-mm-dd)" onChange={handleChange} /><br/>
    </DialogContent>
  );
}

export default StudentDialogContent;
