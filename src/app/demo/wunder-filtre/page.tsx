import { WunderCatalogClient } from "@/components/demo/wunder-catalog-client";
import {
  getVehicleMakes,
  getWunderProductBySlug,
  getWunderStats,
  getWunderSummaries,
} from "@/lib/wunder-demo";

export default function WunderFiltreDemoPage() {
  const summaries = getWunderSummaries();
  const initialProduct = getWunderProductBySlug("wy-500") ?? getWunderProductBySlug(summaries[0].slug)!;
  const vehicleMakes = getVehicleMakes();
  const stats = getWunderStats();

  return (
    <WunderCatalogClient
      initialSummaries={summaries}
      initialProduct={initialProduct}
      vehicleMakes={vehicleMakes}
      stats={stats}
    />
  );
}
