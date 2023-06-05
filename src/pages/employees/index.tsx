import { GetServerSideProps } from "next";
import { FC, useEffect, useState } from "react";

import TableEmployee from "../../common/table-data";
import { deleteEmployee, getEmployeeList } from "../../api";
import { useRouter } from "next/router";


export interface Employee {
  id: string;
  createdAt: string;
  avatar: string;
  name: string;
  specialty: string;
  description: string;
}
type EmployeeList = {
  data: Employee[],
  open: boolean,
}
const EmployeeList: FC<any> = ({ data, open }) => {
  const [openLoader, setOpenLoader] = useState(open);
  const route =  useRouter()


  useEffect(()=>{
    setOpenLoader(open)
  },[open, route])


  
  const handleLoaderClose = () => {
    setOpenLoader(false);
  };
  const handleLoaderOpen = () => {
    setOpenLoader(true);
  };
  return (
    <>
      <TableEmployee data={data} open={openLoader} handleLoaderOpen={handleLoaderOpen}  handleLoaderClose={handleLoaderClose}/>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { id, action, name, page } = ctx.query;
    const searchName = name as string;
    const res = await getEmployeeList({ name: searchName, limit: 10, page: page || 1 });

    if (action === "delete-employee") {
      if (typeof id === "string") {
        await deleteEmployee(id);
          return {
          redirect: {
            permanent: false,
            destination: '/employees'
          }
        }
      }
    }
    return { props: { data: res.data || null, open:false },  };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default EmployeeList;
