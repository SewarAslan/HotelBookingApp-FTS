import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { requestJson } from "../../../api/adminApi";

interface HotelApiResponse {
  id: number;
  hotelName?: string;
  name?: string;
}

interface SimpleHotel {
  id: number;
  name: string;
}

interface HotelSelectorProps {
  value: number | null;
  onChange: (id: number | null) => void;
}

export default function HotelSelector({ value, onChange }: HotelSelectorProps) {
  const [hotels, setHotels] = useState<SimpleHotel[]>([]);

  useEffect(() => {
    async function fetchAllHotels() {
      const PAGE_SIZE = 5;
      const all: SimpleHotel[] = [];
      let page = 1;

      while (true) {
        const res = await requestJson<HotelApiResponse[]>(
          `/hotels?pageNumber=${page}&pageSize=${PAGE_SIZE}`
        );

        if (res.length === 0) break;

        all.push(
          ...res.map((h) => ({
            id: h.id,
            name: h.hotelName || h.name || "Unknown Hotel",
          }))
        );

        page++;
      }

      setHotels(all);
    }

    fetchAllHotels();
  }, []);

  return (
    <Autocomplete
      options={hotels}
      value={hotels.find((h) => h.id === value) || null}
      onChange={(e, newValue) => onChange(newValue?.id ?? null)}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label="Select Hotel" fullWidth />
      )}
    />
  );
}
