import Box from "@mui/material/Box";
import React, { useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import Actions from "../actions/Actions";
import { Color } from '../models/enums/Color';
import { Spots } from '../models/enums/Spots';
import MushroomInfo from '../mushroom_info/MushroomInfo';
import StyledMain from "./styled/StyledMain";

const usePrevious = <T extends unknown>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

function Main() {
    const filterSpots = useSelector((state: RootState) => state.filter.valueSpots);
    const filterColor = useSelector((state: RootState) => state.filter.valueColor);
    const mushroomsList = useSelector((state: RootState) => state.mushroom.mushroom);
    const newRecordBoolean = useSelector((state: RootState) => state.mushroom.newRecord);

    const [MushroomId, setMushroomId] = React.useState<number>(-1);
    const prevAmount = usePrevious({ filterSpots, filterColor });
    let result = mushroomsList;

    const handleShowMushroomInfo = (mushroomId: number) => {
        setMushroomId(mushroomId);
    };

    useEffect(() => {
        if (prevAmount !== undefined) {
            if (prevAmount.filterSpots !== filterSpots) {
                setMushroomId(-1);
            }
            if (prevAmount.filterColor !== filterColor) {
                setMushroomId(-1);
            }
        }
    }, [filterSpots, filterColor, prevAmount])

    if (filterSpots !== -1 as Spots && !newRecordBoolean) {
        result = mushroomsList.filter(mushroom => mushroom.spots === filterSpots);

    }

    if (filterColor !== -1 as Color && !newRecordBoolean) {
        result = mushroomsList.filter(mushroom => mushroom.color === filterColor);
    }

    if (filterSpots !== -1 as Spots && filterColor !== -1 as Color && !newRecordBoolean) {
        result = mushroomsList.filter(mushroom => (mushroom.spots === filterSpots && mushroom.color === filterColor));
    }


    return (
        <StyledMain justifyContent="center" alignItems="center" spacing={2}>
            <Box className="mapDiv">
                <MapContainer style={{ width: "600px", height: "600px" }} center={[52.081078, 5.235927]} zoom={17} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {result.map((mushroom) => (
                        <Marker key={mushroom.id} eventHandlers={{ click: (e) => handleShowMushroomInfo(mushroom.id) }} position={mushroom.latlng}>
                            <Popup>
                                {mushroom.name}
                            </Popup>
                        </Marker>
                    ))}

                </MapContainer>
            </Box>
            <Actions mushroomId={MushroomId} />
            <MushroomInfo mushroomId={MushroomId} />
        </StyledMain>
    );
}

export default Main;