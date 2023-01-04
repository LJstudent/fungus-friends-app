import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Color } from "../models/enums/Color";
import { Spots } from "../models/enums/Spots";
import StyledMushroomInfo from "./styled/StyledMushroomInfo";
import CircleIcon from '@mui/icons-material/Circle';
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";

interface IOuterProps {
    mushroomId: number;
}

function MushroomInfo(props: IOuterProps) {
    const { mushroomId } = props;
    const mushroomsList = useSelector((state: RootState) => state.mushroom.mushroom);
    const newRecordBoolean = useSelector((state: RootState) => state.mushroom.newRecord);


    function mushroomInfoList() {
        return (
            mushroomsList.filter(mushroom => mushroom.id === mushroomId)
                .map(mushroom => {
                    return (
                        <div key={mushroom.id}>
                            <p className="info">Name:  {mushroom.name}</p>
                            <p className="info">Spots: {Spots[mushroom.spots]}</p>
                            <CircleIcon sx={{ color: Color[mushroom.color], paddingLeft: '10px' }} />
                        </div>
                    )
                })
        )
    }

    function newMushroom() {
        return (
            <Stack spacing={1}>
                <TextField id="name-mushroom" label="Name" variant="outlined" />
                <Stack direction="row" spacing={1}>
                    <TextField id="lat-mushroom" label="lat" variant="outlined" />
                    <TextField id="lng-mushroom" label="lng" variant="outlined" />
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined">Spots</Button>
                    <Button variant="outlined">Color</Button>
                </Stack>
                <Button variant="contained">Submit</Button>
            </Stack>
        )
    }

    return (
        <StyledMushroomInfo className="mapDiv">
            <div>
                {newRecordBoolean ? newMushroom() : mushroomInfoList()}

            </div>
        </StyledMushroomInfo>
    )
}

export default MushroomInfo;