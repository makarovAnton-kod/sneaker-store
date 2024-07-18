import {useState} from "react";
import * as React from 'react';
import {useDispatch} from "react-redux";
import {Avatar} from "@mui/material";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {logoutUser} from "../../../../store/actions/usersActions";
import history from '../../../../history';
import {historyReplace} from '../../../../store/actions/historyActions';

const UserMenu = ({user}) => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Button
                id="basic-button"
                color="inherit"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {
                    user.avatar &&
                    <Avatar
                        alt={user.displayName}
                        src={user.avatar}
                        sx={{ width: 24, height: 24, marginRight: "5px" }}
                    />
                }
                Hello, {user.displayName}!
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => dispatch(historyReplace('/profile'))}>Profile</MenuItem>
                <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
            </Menu>
        </div>
    );
};
export default UserMenu;