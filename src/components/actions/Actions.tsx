import Stack from "@mui/material/Stack";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import deepOrange from "@mui/material/colors/deepOrange";
import deepPurple from "@mui/material/colors/deepPurple";

function Actions() {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <IconButton>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>S</Avatar>
            </IconButton>
            <IconButton>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>C</Avatar>
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
        </Stack>
    )
}

export default Actions;