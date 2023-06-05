import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import Loader from "./loader";

type Props = {
  openDelete: boolean;
  handleLoaderOpen?:()=>void;
  handleClickClosed: () => void;
  employee: string | undefined;
};

const DeleteEmployeeModal: FC<Props> = ({
  openDelete,
  handleClickClosed,
  employee,
  handleLoaderOpen
}) => {
  const router = useRouter();
  
  return (
    <div>
      <Dialog open={openDelete} onClose={handleClickClosed}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this employee ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClosed}>Disagree</Button>
          <Button
            onClick={ () => {
              if(handleLoaderOpen) {
                handleLoaderOpen()
              }
              router.push({
                query: {
                  ...router.query,
                  action: "delete-employee",
                  id: employee,
                },
              });
              
              handleClickClosed();
            }}
          >
            Agree
          </Button>
        
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteEmployeeModal;
