import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from "@mui/material/Avatar";
import deepOrange from "@mui/material/colors/deepOrange";
import deepPurple from "@mui/material/colors/deepPurple";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import React from "react";
import FilterDialog from "./FilterDialog";

function Actions() {
    const [ShowFilterDialog, setShowFilterDialog] = React.useState<boolean>(false);

    const handleShowFilterDialog = () => {
        setShowFilterDialog(true);
    };

    const handleShowFilterDialogClose = () => {
        setShowFilterDialog(false);
    };

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <IconButton onClick={event => handleShowFilterDialog()}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>S</Avatar>
            </IconButton>
            <IconButton>
                <Avatar onClick={event => handleShowFilterDialog()} sx={{ bgcolor: deepPurple[500] }}>C</Avatar>
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton>
                <AddIcon />
            </IconButton>
            <IconButton>
                <DeleteIcon />
            </IconButton>
            <IconButton>
                <EditIcon />
            </IconButton>
            <FilterDialog open={ShowFilterDialog} onClose={handleShowFilterDialogClose} />
        </Stack>
    )
}

export default Actions;