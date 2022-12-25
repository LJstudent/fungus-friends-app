import Box from "@mui/material/Box";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import Actions from "../actions/Actions";
import MushroomInfo from "../mushroom_info/MushroomInfo";
import StyledMain from "./styled/StyledMain";

function Main() {
    const mushroomsList = useSelector((state: RootState) => state.mushroom.mushroom);

    return (
        <StyledMain justifyContent="center" alignItems="center" spacing={2}>
            <Box className="mapDiv">
                <MapContainer style={{ width: "600px", height: "600px" }} center={[52.081078, 5.235927]} zoom={17} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {mushroomsList.map((mushroom) => (
                        <Marker position={mushroom.latlng}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    ))}

                </MapContainer>
            </Box>
            <Actions />
            <MushroomInfo />
        </StyledMain>
    );
}

export default Main;