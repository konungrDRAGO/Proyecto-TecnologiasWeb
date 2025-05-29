import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapComponentProps {
  lat: number;
  lng: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  const apiKey = import.meta.env.VITE_MAPTILER_KEY;

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      const styleUrl = `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`;

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: styleUrl,
        center: [lng, lat],
        zoom: 15,
      });

      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        // Marcador tipo tienda
        const marcador = document.createElement('div');
        marcador.className =
          'w-10 h-10 bg-no-repeat bg-contain bg-center';
        marcador.style.backgroundImage = 'url(/tienda.svg)';

        new maplibregl.Marker({ element: marcador })
          .setLngLat([lng, lat])
          .addTo(map.current!);
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lat, lng]);

  return (
    <div className="w-full h-[600px] relative">
      <div
        ref={mapContainer}
        className="absolute top-0 bottom-0 w-full h-full border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default MapComponent;
