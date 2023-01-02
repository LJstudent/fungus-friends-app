import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Color } from "../models/enums/Color";
import StyledDialog from "./styled/StyledDialog";
import { Spots } from "../models/enums/Spots";
import { searchFilterColor, searchFilterSpots } from "../../state/filter/filterSlice";

interface IOuterProps {
    open: boolean;
    onClose: () => void;
    filterChoice: number;
}

function FilterDialog(props: IOuterProps) {
    const { open, onClose, filterChoice } = props;
    const dispatch = useDispatch();
    const mushroomsList = useSelector((state: RootState) => state.mushroom.mushroom);
    const filterSpotsValue = useSelector((state: RootState) => state.filter.valueSpots);
    const filterColorValue = useSelector((state: RootState) => state.filter.valueColor);
    const [RadioValue, setRadioValue] = React.useState<number>(-1);


    const handleChangeRadioGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(parseInt(event.target.value));
    };

    const handleSubmit = () => {
        if(filterChoice === 0) {
            dispatch(searchFilterSpots(RadioValue as Spots));
        }
        if(filterChoice === 1) {
            dispatch(searchFilterColor(RadioValue as Color));
        }
        onClose();
    }

    function filterColor() {
        const uniqueColorList = mushroomsList.map(mushroom => mushroom.color).filter((v, i, a) => a.indexOf(v) === i);

        return (
            <FormControl className="FilterFormColor">
                <FormLabel id="demo-radio-buttons-group-label">Color</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={event => handleChangeRadioGroup(event)}
                >
                    {uniqueColorList.map((mushroom) => (
                        <FormControlLabel
                            value={mushroom}
                            checked={(filterColorValue !== -1 as Color && filterColorValue === mushroom) && true }
                            control={<Radio sx={{ color: Color[mushroom], '&.Mui-checked': { color: Color[mushroom] } }} />}
                            label={Color[mushroom]} />
                    ))}
                </RadioGroup>
            </FormControl>
        )
    }

    function filterSpots() {
        const uniqueSpotsList = mushroomsList.map(mushroom => mushroom.spots).filter((v, i, a) => a.indexOf(v) === i);

        return (
            <FormControl className="FilterFormColor">
                <FormLabel id="demo-radio-buttons-group-label">Spots</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={event => handleChangeRadioGroup(event)}
                >
                    {uniqueSpotsList.map((mushroom) => (
                        <FormControlLabel
                            value={mushroom}
                            checked={(filterSpotsValue !== -1 as Spots && filterSpotsValue === mushroom) && true }
                            control={<Radio />}
                            label={Spots[mushroom]} />
                    ))}
                </RadioGroup>
            </FormControl>
        )
    }

    return (
        <StyledDialog
            open={open}
            onClose={event => onClose()}
            keepMounted>
            {filterChoice === 0 && filterSpots()}
            {filterChoice === 1 && filterColor()}
            <Button onClick={event => handleSubmit()} disabled={RadioValue === -1 && true}>Bevestigen</Button>
        </StyledDialog>
    )

}

export default FilterDialog;