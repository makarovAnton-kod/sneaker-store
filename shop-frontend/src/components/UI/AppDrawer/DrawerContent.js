import React from 'react';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {styled} from "@mui/material/styles";
import {Link} from "react-router-dom";
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));
const DrawerContent = ({categories}) => {
    return (
        <>
            <DrawerHeader>
                <Typography variant="h5">
                    Categories
                </Typography>
            </DrawerHeader>
            <Divider />
            <List>
                {categories.map(category => (
                    <div key={category._id}>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/?category=${category._id}`}>
                                <ListItemText primary={category.title} />
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                    </div>
                ))}
            </List>
        </>
    );
};
export default DrawerContent;