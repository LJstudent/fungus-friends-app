import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Color } from "../models/enums/Color";
import StyledDialog from "./styled/StyledDialog";

interface IOuterProps {
    open: boolean;
    onClose: () => void;
}

function FilterDialog(props: IOuterProps) {
    const { open, onClose } = props;
    const mushroomsList = useSelector((state: RootState) => state.mushroom.mushroom);
    const [RadioValue, setRadioValue] = React.useState<number>(-1);


    const uniqueColorList = mushroomsList.map(mushroom => mushroom.color).filter((v, i, a) => a.indexOf(v) === i);

    const handleChangeRadioGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(parseInt(event.target.value));
    };

    const handleSubmit = () => {
        alert(RadioValue);
        onClose();
    }

    return (
        <StyledDialog
            open={open}
            onClose={event => onClose()}
            keepMounted>
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
                            control={<Radio sx={{ color: Color[mushroom], '&.Mui-checked': { color: Color[mushroom] } }} />}
                            label={Color[mushroom]} />
                    ))}
                </RadioGroup>
            </FormControl>
            <Button onClick={event => handleSubmit()} disabled={RadioValue === -1 && true}>Bevestigen</Button>
        </StyledDialog>
    )

}

export default FilterDialog;