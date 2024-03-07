import { ReactNode, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  Collapse,
  ListItemText,
  ListItem,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface Menu {
  name: string;
  href: string;
  icon: ReactNode;
}

interface Props {
  menus: Menu[];
  isOpenDrawer: boolean;
}

const MenuItemDropDown = ({ menus, isOpenDrawer }: Props) => {
  const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);

  const handleOpenSubMenu = () => {
    setSubMenuOpen(() => !subMenuOpen);
  };

  return (
    <>
      <ListItemButton
        onClick={handleOpenSubMenu}
        sx={{
          minHeight: 48,
          justifyContent: isOpenDrawer ? "initial" : "center",
          px: 2.5,
        }}>
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpenDrawer ? 3 : "auto",
            justifyContent: "center",
          }}>
          <Icon icon="lets-icons:arhive-duotone" fontSize={25} />
        </ListItemIcon>
        <ListItemText primary="Inbox" sx={{ opacity: isOpenDrawer ? 1 : 0 }} />
        {subMenuOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
        {menus.map((link, index) => (
          <Link to={link.href} key={index}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isOpenDrawer ? "initial" : "center",
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpenDrawer ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.name}
                  sx={{ opacity: isOpenDrawer ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </Collapse>
    </>
  );
};

export default MenuItemDropDown;
