import { createEmployee } from "@/api";
import { Box, BoxProps, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import Loader from "./loader";

const style: BoxProps['sx'] = {
  position: "absolute",
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
  handleOpen: () => void,
  handleClosed: () => void,
  open: boolean,
}
export interface CreateEmployee {
  name: string,
  specialty: string,
}
const AddEmployeeModal: FC<AddEmployeeModalProps> = ({ open, handleClosed }) => {
  const router = useRouter()

  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [openLoader, setOpenLoader] = useState(false);
  const handleLoaderClose = () => {
    setOpenLoader(false);
  };
  const handleLoaderOpen = () => {
    setOpenLoader(true);
  };
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
                  handleLoaderOpen()
                  const values: CreateEmployee = {
                    name: name,
                    specialty: specialty,
                  };
                  try {
                  const res = await createEmployee(values)
                  if (res.status === 201) {
                    router.push('/employees')
                  }
                  handleLoaderClose()
                  setName('')
                  setSpecialty('')
                  } catch (error) {
                    console.log(error,'error')
                  }
                  handleClosed()
                  
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <Loader openLoader={openLoader} />
        </Box>
      </Modal>

    </>
  );
};

export default AddEmployeeModal;
