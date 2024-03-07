import { useState } from "react";
import { Button, Grid, TextField, Box, Typography } from "@mui/material";
import { User } from "../../types/user";
import { signInUser } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../store/hook";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <Box>
        <Grid width={350} container sx={{ p: 4, textAlign: "center" }}>
          <Typography sx={{ mb: 4, mx: "auto" }}>Sign In Form</Typography>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sx={{ my: 2 }}>
            <TextField
              label="Password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() =>
                dispatch(
                  signInUser({ ...userData, onSuccess: () => navigate("/") })
                )
              }>
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SignIn;
