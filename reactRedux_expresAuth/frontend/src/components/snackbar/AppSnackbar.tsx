import { Snackbar, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { setHideSnackbar } from "../../store/slices/appSnackbar";

const AppSnackbar = () => {
  const dispatch = useAppDispatch();
  const { type, isOpen, message } = useAppSelector((state) => state.snackbar);

  const handleCloseSnackbar = () => {
    dispatch(setHideSnackbar());
  };
  return (
    <div>
      <Snackbar
        open={isOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={type}
          variant="filled"
          sx={{
            width: "100%",
            bgColor: type === "error" ? "red" : "green",
          }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AppSnackbar;
