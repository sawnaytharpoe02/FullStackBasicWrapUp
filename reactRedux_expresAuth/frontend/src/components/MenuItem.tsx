import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  link: {
    name: string;
    href: string;
    icon: string;
  };
  isOpenDrawer: boolean;
}
const MenuItem = ({ link, isOpenDrawer }: Props) => {
  const { pathname } = useLocation();
  const isActive = pathname === link.href;
  return (
    <Link to={link.href}>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            height: isOpenDrawer ? 48 : 35,
            justifyContent: isOpenDrawer ? "space-around" : "center",
            px: 2.5,
            borderRadius: ".4rem",
            display: "flex",
          }}>
          {isOpenDrawer && (
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isActive ? "20px" : 3,
                ml: isActive ? "6px" : 1,
                justifyContent: "center",
              }}>
              <Icon
                icon={link.icon}
                fontSize={isActive ? 15 : 10}
                color={isActive ? "#00A76F" : "#637381"}
              />
            </ListItemIcon>
          )}
          <ListItemText
            primary={link.name}
            sx={{
              ml: isOpenDrawer ? 1 : 0,
              color: isActive ? "#00A76F" : "#637381",
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default MenuItem;
