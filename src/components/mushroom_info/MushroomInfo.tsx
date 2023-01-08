import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Color } from "../models/enums/Color";
import { Spots } from "../models/enums/Spots";
import StyledMushroomInfo from "./styled/StyledMushroomInfo";
import CircleIcon from '@mui/icons-material/Circle';
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import React from "react";
import FilterDialog from "../actions/FilterDialog";
import { clearFilters } from "../../state/filter/filterSlice";
import { IMushroom } from "../models/interfaces/IMushroom";
import { addMushroom } from "../../state/mushroom/mushroomSlice";

interface IOuterProps {
    mushroomId: number;
}

function MushroomInfo(props: IOuterProps) {
    const { mushroomId } = props;
    const dispatch = useDispatch();

    const mushroomsList = useSelector((state: RootState) => state.mushroom.mushroom);
    const newRecordBoolean = useSelector((state: RootState) => state.mushroom.newRecord);
    const filterSpots = useSelector((state: RootState) => state.filter.valueSpots);
    const filterColor = useSelector((state: RootState) => state.filter.valueColor);

    const [ShowFilterDialog, setShowFilterDialog] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>('');
    const [lat, setLat] = React.useState<string>('');
    const [lng, setLng] = React.useState<string>('');
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [FilterChoice, setFilterChoice] = React.useState<number>(-1);

    const handleShowFilterDialog = (number: number) => {
        setShowFilterDialog(true);
        setFilterChoice(number);
    };

    const handleShowFilterDialogClose = () => {
        setShowFilterDialog(false);
    };

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    };

    const handleChangeLat = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLat(event.target.value)
    };

    const handleChangeLng = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLng(event.target.value)
    };

    function isInt(n: number) {
        return n % 1 === 0;
    }

    const handleSubmit = () => {
        if (name.length < 1) {
            setErrorMessage('No name');
        } else if (lat.length < 1 || lng.length < 1) {
            setErrorMessage('No latitude or longitude filled in');
        } else if (!isInt(parseInt(lat)) || !isInt(parseInt(lng))) {
            setErrorMessage('No numbers filled in for latitude or longitude');
        } else if (!(parseFloat(lat) > 50.77083 && parseFloat(lat) < 53.35917) || !(parseFloat(lng) > 3.57361 && parseFloat(lng) < 7.10833)) {
            setErrorMessage('Latitude or longitude not in range of The Netherlands');
        } else if (filterSpots === -1 as Spots) {
            setErrorMessage('No spots chosen');
        } else if (filterColor === -1 as Color) {
            setErrorMessage('No color chosen');
        } else {
            // empty form
            setErrorMessage('');
            setName('');
            setLat('');
            setLng('');

            // emoty filterDialog
            dispatch(clearFilters());

            // get highest id number
            const highestId = Math.max(...mushroomsList.map(mushroom => mushroom.id)) + 1;

            // add record
            const newRecord: IMushroom = {
                id: highestId,
                name: name,
                spots: filterSpots,
                color: filterColor,
                latlng: [parseFloat(lat), parseFloat(lng)],
            };
            dispatch(addMushroom(newRecord));

            alert('New mushroom added');
        }
    };

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
    };

    function newMushroom() {
        return (
            <Stack spacing={1}>
                <TextField id="name-mushroom" label="Name" variant="outlined" onChange={handleChangeName} value={name} />
                <Stack direction="row" spacing={1}>
                    <TextField id="lat-mushroom" label="lat" variant="outlined" onChange={handleChangeLat} value={lat} />
                    <TextField id="lng-mushroom" label="lng" variant="outlined" onChange={handleChangeLng} value={lng} />
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Button variant={filterSpots !== -1 as Spots ? "contained" : "outlined"} onClick={event => handleShowFilterDialog(0)}>Spots</Button>
                    <Button variant={filterColor !== -1 as Color ? "contained" : "outlined"} onClick={event => handleShowFilterDialog(1)}>Color</Button>
                </Stack>
                <Button variant="contained" onClick={event => handleSubmit()}>Submit</Button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <FilterDialog open={ShowFilterDialog} onClose={handleShowFilterDialogClose} filterChoice={FilterChoice} />
            </Stack >
        )
    };

    return (
        <StyledMushroomInfo className="mapDiv">
            <div>
                {newRecordBoolean ? newMushroom() : mushroomInfoList()}

            </div>
        </StyledMushroomInfo>
    )
}

export default MushroomInfo;