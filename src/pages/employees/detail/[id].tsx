import { Box, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { Employee } from "..";
import { getEmployeeDetail } from "../../../api";

type EmployeeDetailProps = {
  employeeDetail: Employee;
};

const EmployeeDetail: FC<EmployeeDetailProps> = ({ employeeDetail }) => {
  return (
    <Box  sx={{padding: '100px 0', display:'flex', justifyContent:'center'}}>
      <Card sx={{ width: 900 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={`https://picsum.photos/1980/1600?random=${employeeDetail.id}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {employeeDetail.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {employeeDetail.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>

  );
};

// eslint-disable-next-line @next/next/no-typos
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await getEmployeeDetail(id as string);

  return {
    props: {
      employeeDetail: res.data || null,
    },
  };
};

export default EmployeeDetail;
