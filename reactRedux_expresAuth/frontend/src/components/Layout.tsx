import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  List,
  Button,
} from "@mui/material";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import { Icon } from "@iconify/react";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { setOpenDrawer } from "../store/slices/appBarSlice";
import AppSnackbar from "./snackbar/AppSnackbar";
import MenuItemDropDown from "./MenuItemDropDown";

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  marginTop: "auto",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "none",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: `calc(100% - (${theme.spacing(8)} + 1px))`,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.drawer);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    dispatch(setOpenDrawer(true));
  };

  const handleDrawerClose = () => {
    dispatch(setOpenDrawer(false));
  };

  const Links = [
    {
      name: "Menu",
      href: "/menu",
      icon: <Icon icon="lets-icons:arhive-duotone" fontSize={25} />,
    },
    {
      name: "Menu Category",
      href: "/menu-category",
      icon: <Icon icon="lets-icons:pipe-duotone" fontSize={25} />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={isOpen}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/signin");
            }}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isOpen}>
        <DrawerHeader sx={{ justifyContent: "flex-start", pl: 2 }}>
          <img src="/logo.svg" width={30} />
        </DrawerHeader>
        <Divider />

        <List>
          <MenuItemDropDown menus={Links} isOpenDrawer={isOpen} />
        </List>

        <DrawerFooter>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{
              ...(isOpen && { display: "none" }),
              color: `${theme.palette.primary.light}`,
            }}
            edge="start">
            <LuChevronsRight />
          </IconButton>
          <IconButton
            aria-label="close drawer"
            onClick={handleDrawerClose}
            sx={{
              ...(!isOpen && { display: "none" }),
              color: `${theme.palette.primary.light}`,
            }}>
            {theme.direction === "rtl" ? (
              <LuChevronsRight />
            ) : (
              <LuChevronsLeft />
            )}
          </IconButton>
        </DrawerFooter>
      </Drawer>
      <Box component="main" sx={{ pt: "64px", width: "100%" }}>
        <AppSnackbar />
        <Box sx={{ minHeight: "100vh", p: 4 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
