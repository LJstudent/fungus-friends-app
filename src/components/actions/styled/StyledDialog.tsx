import { Dialog } from '@mui/material';
import { styled } from '@mui/system';


const StyledDialog = styled(Dialog)(({ theme }) => ({
    '.FilterFormColor': {
        margin: theme.spacing(4)
    }
}));

export default StyledDialog;
