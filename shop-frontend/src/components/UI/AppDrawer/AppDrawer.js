import React, {useEffect} from "react";
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerContent from "./DrawerContent";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../../store/actions/categoriesActions";
const drawerWidth = 240;
const AppDrawer = () => {
    const dispatch = useDispatch();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const categories = useSelector(state => state.categories.categories);
    useEffect(async () => {
       await dispatch(fetchCategories());
    }, [dispatch]);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <>
            <CssBaseline />
            <IconButton
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                <DrawerContent categories={categories}/>
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block', zIndex: 0, position: 'relative' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                <DrawerContent categories={categories}/>
            </Drawer>
        </>
    );
};
export default AppDrawer;