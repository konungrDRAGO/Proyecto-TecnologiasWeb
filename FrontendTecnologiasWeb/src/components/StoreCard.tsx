import { MapPin } from "lucide-react";
import clsx from "clsx";
import MapComponent from "./MapComponent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type StoreCardProps = {
  store: string;
  price?: number;
  oldPrice?: number;
  isBest?: boolean;
  lat: number;
  lng: number;
};

export function StoreCard({ store, price, oldPrice, isBest, lat, lng }: StoreCardProps) {
  return (
    <Dialog>
      <div
        className={clsx(
          "w-48 rounded-xl shadow-md overflow-hidden border",
          isBest ? "border-green-500 border-2" : "border-transparent"
        )}
      >
        {/* Encabezado oscuro */}
        <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
          <span className="font-bold">{store}</span>
          <DialogTrigger asChild>
            <button>
              <MapPin className="h-5 w-5 text-white" />
            </button>
          </DialogTrigger>
        </div>

        {/* Contenido blanco */}
        <div className="text-center px-4 py-3 dark:bg-gray-700">
          <p
            className={clsx(
              "text-xl font-semibold",
              oldPrice ? "text-green-600 dark:text-green-600" : "text-black dark:text-white"
            )}
          >
            ${price?.toLocaleString()}
          </p>
          {oldPrice && (
            <p className="text-gray-400 line-through text-sm">
              ${oldPrice.toLocaleString()}
            </p>
          )}
        </div>
      </div>

        {/* Modal del mapa */}
        <DialogContent
        className="w-full max-w-[90vw] md:max-w-[50vw] h-[600px] p-0 overflow-hidden"
        >
            <DialogHeader>
                <DialogTitle className="p-4">{store}</DialogTitle>
            </DialogHeader>
            <MapComponent lat={lat} lng={lng} />
        </DialogContent>
    </Dialog>
  );
}
