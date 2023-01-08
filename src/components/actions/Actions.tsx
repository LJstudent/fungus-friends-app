import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from "@mui/material/Avatar";
import deepOrange from "@mui/material/colors/deepOrange";
import deepPurple from "@mui/material/colors/deepPurple";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { cancelRecord, newRecord } from '../../state/mushroom/mushroomSlice';
import { RootState } from '../../state/store';
import FilterDialog from "./FilterDialog";
import { clearFilters } from '../../state/filter/filterSlice';

interface IOuterProps {
    mushroomId: number;
}

function Actions(props: IOuterProps) {
    const { mushroomId } = props;
    const dispatch = useDispatch();

    const newRecordBoolean = useSelector((state: RootState) => state.mushroom.newRecord);

    const [ShowFilterDialog, setShowFilterDialog] = React.useState<boolean>(false);
    const [FilterChoice, setFilterChoice] = React.useState<number>(-1);

    const handleShowFilterDialog = (number: number) => {
        setShowFilterDialog(true);
        setFilterChoice(number);
    };

    const handleShowFilterDialogClose = () => {
        setShowFilterDialog(false);
    };

    const handleNewMushroom = () => {
        dispatch(newRecord());
        dispatch(clearFilters());
    };

    const handleCancelMushroom = () => {
        dispatch(cancelRecord());
    };

    const disableWithoutMushroomId = mushroomId === -1 || newRecordBoolean ? true : false;

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <IconButton onClick={event => handleShowFilterDialog(0)} disabled={newRecordBoolean && true}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>S</Avatar>
            </IconButton>
            <IconButton onClick={event => handleShowFilterDialog(1)} disabled={newRecordBoolean && true}>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>C</Avatar>
            </IconButton>
            <Divider orientation="vertical" flexItem />
            {!newRecordBoolean ?
                <IconButton onClick={event => handleNewMushroom()}>
                    <AddIcon />
                </IconButton>
                :
                <IconButton onClick={event => handleCancelMushroom()}>
                    <CloseIcon />
                </IconButton>
            }
            <IconButton disabled={disableWithoutMushroomId}>
                <DeleteIcon />
            </IconButton>
            <IconButton disabled={disableWithoutMushroomId}>
                <EditIcon />
            </IconButton>
            <FilterDialog open={ShowFilterDialog} onClose={handleShowFilterDialogClose} filterChoice={FilterChoice} />
        </Stack>
    )
}

export default Actions;