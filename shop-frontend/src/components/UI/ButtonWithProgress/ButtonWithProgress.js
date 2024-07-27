import React from 'react';
import {Button, CircularProgress} from "@mui/material";

const ButtonWithProgress = ({ children, loading, ...props }) => {
    return (
        <div style={{ position: 'relative'}}>
            <Button {...props}>
                {children}
            </Button>
            {loading && <CircularProgress size={20} style={{ position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px'}} color="inherit" />}
        </div>
    );
};

export default ButtonWithProgress;
