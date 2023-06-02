import { Box, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useRouter } from "next/router";
import React, { FC } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
type AddEmployeeModalProps = {
  handleOpen: ()=>void,
  handleClosed: ()=>void,
  open: boolean,
}
const AddEmployeeModal:FC<AddEmployeeModalProps> = ({open,handleClosed}) => {
  const router = useRouter()
  
  const [name, setName] = React.useState("");
  const [specialty, setSpecialty] = React.useState("");
  
  return (
    <>
      
      <Modal
        open={open}
        onClose={handleClosed}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container columnSpacing={3} rowSpacing={5}>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Specialty"
                variant="outlined"
                value={specialty}
                onChange={(event) => {
                  setSpecialty(event.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ height: "56px" }}
                onClick={async () => {
                  const values = {
                    name: name,
                    specialty: specialty,
                  };
                  const res  = await axios
                    .post(`${process.env.BASE_URL}/users`, values)
                  if(res.status === 201){
                    router.push({query:{
                    ...router.query,
                    orderBy:'id',
                    order: 'desc'
                    }})
                  }
                  handleClosed()
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default AddEmployeeModal;
