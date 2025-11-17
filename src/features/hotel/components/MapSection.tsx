import { Box, CircularProgress, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useHotelDetails } from "../hooks/useHotelDetails";
import { STATUS } from "../../../constants/status";
import "leaflet/dist/leaflet.css";

interface Props {
  hotelId: number;
}

export default function MapSection({ hotelId }: Props) {
  const { data: hotel, status } = useHotelDetails(hotelId);

  const lat = hotel?.latitude;
  const lng = hotel?.longitude;
  const position: LatLngExpression | null = lat && lng ? [lat, lng] : null;

  if (status === STATUS.LOADING) {
    return (
      <Box
        sx={{
          height: 250,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!position) {
    return (
      <Box sx={{ height: 250, bgcolor: "grey.100", borderRadius: 2, p: 2 }}>
        <Typography>No location available</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{ height: 250, borderRadius: 2, overflow: "hidden", boxShadow: 3 }}
    >
      <MapContainer
        center={position!}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{hotel?.hotelName || "Hotel Location"}</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}
