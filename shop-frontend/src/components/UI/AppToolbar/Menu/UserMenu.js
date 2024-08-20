import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logoutUser } from "../../../../store/actions/usersActions";
import { historyReplace } from '../../../../store/actions/historyActions';

const UserMenu = ({ user }) => {
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
                sx={{
                    color: '#FFD700',
                    textShadow: '0px 0px 8px #FF4500',
                    fontWeight: 'bold',
                    '&:hover': {
                        color: '#FF4500',
                        textShadow: '0px 0px 10px #FF4500',
                    },
                }}
            >
                {
                    user.avatar &&
                    <Avatar
                        alt={user.displayName}
                        src={user.avatar}
                        sx={{ width: 24, height: 24, marginRight: "5px", border: '2px solid #FFD700' }}
                    />
                }
                Привет, {user.displayName}!
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
                <MenuItem
                    onClick={() => {
                        handleClose();
                        dispatch(historyReplace('/profile'));
                    }}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#FF8C00',
                            color: '#FFFFFF',
                        },
                    }}
                >
                    Профиль
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        dispatch(logoutUser());
                    }}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#FF8C00',
                            color: '#FFFFFF',
                        },
                    }}
                >
                    Выйти
                </MenuItem>
            </Menu>

        </div>
    );
};

export default UserMenu;
