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
import { Box, Pagination } from "@mui/material";
import Loader from "@/common/loader";

type TableEmployeeProps = {
  [key: string]: any;
  data: Employee[];
};

const TableEmployee: FC<TableEmployeeProps> = ({ data, open: openLoader, handleLoaderOpen }) => {
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



  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ margin: "25px 0", boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}

      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            padding: "20px 20px 20px 0",
          }}
        >
          <Button
            startIcon={<AddIcon />}
            onClick={handleOpen}
            variant="contained"
          >
            Add Employee
          </Button>
        </Box>

        <Table sx={{ minWidth: 650, minHeight: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell align="center" sx={{ fontWeight: 'Bold' }}>Employee ID</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'Bold' }}>Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'Bold' }}>Avatar</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'Bold' }}>Date of creation</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'Bold' }}>Specialty</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'Bold' }}>Delete Action</TableCell>
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
                      loader={() => `https://picsum.photos/1980/1600?random=${employee.id}`}
                      src={`https://picsum.photos/200/300?random=${employee.id}`}
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
                      color="error"
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
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
          <Pagination count={10} variant="outlined" color="secondary" onChange={(e, number) => {
            setCurrentPage(number);
            router.push({ query: { ...router.query, page: number } });
          }} page={parseInt((router.query.page as string), 10) || 1} />
        </Box>
      </TableContainer>
      <AddEmployeeModal
        open={open}
        handleClosed={handleClose}
        handleOpen={handleOpen}
      />
      <DeleteEmployeeModal
        openDelete={openDelete}
        employee={employeeID}
        handleLoaderOpen={handleLoaderOpen}
        handleClickClosed={handleClickClose}
      />
      <Loader openLoader={openLoader} />

    </>
  );
};

export default TableEmployee;
