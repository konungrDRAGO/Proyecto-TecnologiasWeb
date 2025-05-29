// src/hooks/useLocation.ts
import { useEffect, useState } from "react";
import axios from "axios";

interface LocationData {
  city: string;
  region: string;
  error?: string;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get("https://nominatim.openstreetmap.org/reverse", {
            params: {
              lat: latitude,
              lon: longitude,
              format: "json",
            },
          });

          const address = res.data.address;
          setLocation({
            city: address.city || address.town || address.village || "Desconocido",
            region: address.state || "Desconocida",
          });
        } catch (error) {
          setLocation({ city: "Desconocido", region: "Desconocida", error: "Error en geocodificación" });
        }
      },
      () => {
        setLocation({ city: "Desconocido", region: "Desconocida", error: "Permiso denegado" });
      }
    );
  }, []);

  return location;
};
