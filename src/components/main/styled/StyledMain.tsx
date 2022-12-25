import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';


const StyledMain = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(5),

    '.mapDiv': {
        borderRadius: '10px',
        boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
        padding: theme.spacing(2),
    }

}));

export default StyledMain;
