import { GetServerSideProps } from "next";
import { FC } from "react";

import TableEmployee from "../../common/table-data";
import { deleteEmployee, getEmployeeList } from "../../api";

export interface Employee {
  id: string;
  createdAt: string;
  avatar: string;
  name: string;
  specialty: string;
  description: string;
}

const EmployeeList: FC<any> = ({ data }) => {
  return (
    <div>
      <TableEmployee data={data} />
    </div>
    
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { id, action, name, page, orderBy, order } = ctx.query;
    const searchName = name as string;
    const res = await getEmployeeList({ name: searchName, limit:10, page: page || 1, orderBy, order });
    if (action === "delete-employee") {
      if (typeof id === "string") {
        await deleteEmployee(id);
        return   {
          redirect:{
            permanent:false,
            destination: '/employees'
          }
        }
      }
    }
    return { props: { data: res || null } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default EmployeeList;
