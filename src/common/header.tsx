import { Box, Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
type Props = {};

const HeaderMain = (props: Props) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <Box>
      <Grid container>
        <Grid item xs={2}>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{ height: "56px" }}
            onClick={async () => {
              await router.push({
                query: {
                  name: searchInput,
                },
              });
              setSearchInput("");
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeaderMain;
