import Box from "@mui/material/Box";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Actions from "../actions/Actions";
import MushroomInfo from "../mushroom_info/MushroomInfo";
import StyledMain from "./styled/StyledMain";

function Main() {
    return (
        <StyledMain justifyContent="center" alignItems="center" spacing={2}>
            <Box className="mapDiv">
                <MapContainer style={{ width: "600px", height: "600px" }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </Box>
            <Actions />
            <MushroomInfo />
        </StyledMain>
    );
}

export default Main;