import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Employee } from "../pages/employees";
import AddEmployeeModal from "./add-employee-modal";
import DeleteEmployeeModal from "./delete-employee-modal";
import AddIcon from "@mui/icons-material/Add";
type TableEmployeeProps = {
  data: Employee[];
};

const TableEmployee: FC<TableEmployeeProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [employeeID, setEmployeeID] = useState<string | undefined>();

  const handleClickClose = () => {
    setOpenDelete(false);
  };

  
  const [currentPage, setCurrentPage] = useState<number>();
  const pageNumber = 10;
  const pages = Array.from({ length: pageNumber }, (_, index) => index + 1);
  return (
    <>
      <TableContainer 
        component={Paper}
        sx={{ margin: "25px 0", background: "#E0E0E0",border: "1px solid black"  }}
       
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "20px 20px 20px 0",
          }}
        >
          <Button
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{ background: "#3399FF", color: "black" }}
          >
            Add Employee
          </Button>
        </div>

        <Table sx={{ minWidth: 650, minHeight: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Employee ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Avatar</TableCell>
              <TableCell align="right">Date of creation</TableCell>
              <TableCell align="right">Specialty</TableCell>
              <TableCell align="right">Delete Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 &&
              data.map((employee: Employee) => (
                <TableRow
                  key={employee.id}
                  sx={{ "&:last-child td, &:last-child th": { border: "0" } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {employee.id}
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`/employees/detail/${employee.id}`}>
                      {employee.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Image
                      alt=""
                      loader={() => employee.avatar}
                      src={employee.avatar}
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {dayjs(employee.createdAt).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell align="right">{employee.specialty}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      sx={{ color: "red" }}
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setOpenDelete(true);
                        setEmployeeID(employee.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div style={{ padding: 100, paddingLeft: "300px" }}>
          {pages.map((page) => (
            <>
              <Button
                className={currentPage === page ? "button-active" : ""}
                variant="contained"
                sx={{ marginLeft: "20px" }}
                onClick={() => {
                  setCurrentPage(page);
                  router.push({ query: { ...router.query, page: page } });
                }}
              >
                {page}
              </Button>
            </>
          ))}
        </div>
      </TableContainer>
      <AddEmployeeModal
        open={open}
        handleClosed={handleClose}
        handleOpen={handleOpen}
      />
      <DeleteEmployeeModal
        openDelete={openDelete}
        employee={employeeID}
        handleClickClosed={handleClickClose}
      />
      
    </>
  );
};

export default TableEmployee;
