import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { setOpenDialog } from "../../store/slices/appDialogSlice";

interface Props {
  children: React.ReactNode;
  formTitle: string;
}
const CommonDialog = ({ children, formTitle }: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { isOpenDialog } = useAppSelector((state) => state.dialog);
  const dispatch = useAppDispatch();

  const handleCloseDialog = () => {
    dispatch(setOpenDialog(true));
  };

  return (
    <Dialog
      open={isOpenDialog}
      fullScreen={fullScreen}
      onClose={handleCloseDialog}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle sx={{ mx: "auto" }}>{formTitle}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CommonDialog;
