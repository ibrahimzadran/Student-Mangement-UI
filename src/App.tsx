import { AppBar, Container, Toolbar, Typography } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import StudentList from "./component/StudentList";


export const queryClient = new QueryClient();

function App() {


  return (
  
    <Container maxWidth='xl'>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h3" style={{ textAlign: 'center',
         width: '100%' }}>
          Student Management
        </Typography>
      </Toolbar>
    </AppBar>
    <QueryClientProvider client={queryClient}>
    <StudentList/>
  </QueryClientProvider>
   
    
   </Container>
  )
}

export default App
