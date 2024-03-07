import { useState } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { User } from "../../types/user";
import { useAppDispatch } from "../../store/hook";
import { signUpUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Box>
      <Grid width={350} container sx={{ p: 4, textAlign: "center" }}>
        <Typography sx={{ mb: 4, mx: "auto" }}>Sign Up Form</Typography>
        <Grid item xs={12}>
          <TextField
            label="Email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sx={{ my: 3 }}>
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
            onClick={() => {
              dispatch(
                signUpUser({
                  ...userData,
                  onSuccess: () => navigate("/signin"),
                })
              );
            }}>
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
