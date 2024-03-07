import { useState } from "react";
import Layout from "../Layout";
import MenuForm from "./MenuForm";
import { Menu } from "../../types/menu";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../store/hook";
import { setOpenDialog } from "../../store/slices/appDialogSlice";
import CommonDialog from "../dialog/CommonDialog";

const MenuPage = () => {
  const [menuData, setMenuData] = useState<Menu>({
    name: "",
    price: 0,
  });

  const dispatch = useAppDispatch();
  const handleOpenDialog = () => {
    dispatch(setOpenDialog(true));
  };
  return (
    <Layout>
      This is the Menu Page
      <Button onClick={handleOpenDialog}>Create New Menu</Button>
      <CommonDialog formTitle="Create Menu Form">
        <MenuForm menuData={menuData} setMenuData={setMenuData} />
      </CommonDialog>
    </Layout>
  );
};

export default MenuPage;
