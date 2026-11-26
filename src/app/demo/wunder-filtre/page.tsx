import { B2BStoreClient } from "@/components/demo/b2b/b2b-store-client";
import { getB2BProducts, getB2BVehiclesIndex } from "@/lib/wunder-demo";

export default function WunderB2BDemoPage() {
  const products = getB2BProducts();
  const { makes } = getB2BVehiclesIndex();

  return <B2BStoreClient initialProducts={products} vehicleMakes={makes} />;
}
