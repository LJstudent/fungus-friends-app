import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Color } from "../models/enums/Color";
import { Spots } from "../models/enums/Spots";
import StyledMushroomInfo from "./styled/StyledMushroomInfo";
import CircleIcon from '@mui/icons-material/Circle';

interface IOuterProps {
    mushroomId: number;
}

function MushroomInfo(props: IOuterProps) {
    const { mushroomId } = props;
    const mushroomsList = useSelector((state: RootState) => state.mushroom.mushroom);

    return (
        <StyledMushroomInfo className="mapDiv">
            {mushroomsList.filter(mushroom => mushroom.id === mushroomId)
                .map(mushroom => {
                    return (
                        <div key={mushroom.id}>
                            <p className="info">Name:  {mushroom.name}</p>
                            <p className="info">Spots: {Spots[mushroom.spots]}</p>
                            <CircleIcon sx={{ color: Color[mushroom.color], paddingLeft: '10px' }} />
                        </div>
                    )
                })}
        </StyledMushroomInfo>
    )
}

export default MushroomInfo;