import type { Vial } from "../types/types";
import { groupBy } from "@utils/helpers";
import { useVials } from "@hooks/useVials";
import VialCard from "@components/VialCard";
import VialCardSkeleton from "@components/skeletons/VialCardSkeleton";

function Vials() {
  const { vials, isLoading, refetchVials } = useVials();
  refetchVials();
  const groupedVials = vials ? groupBy(vials, "style") : [];

  const hasFreestyle = groupedVials["freestyle"]?.length > 0;

  return (
    <>
      {isLoading ? (
        <VialCardSkeleton cards={10} />
      ) : (
        Object.keys(groupedVials).map((key, index) => {
          const vials: Vial[] = groupedVials[key];
          const canBuy = key === "freestyle" ? !hasFreestyle : true;
          return (
            vials?.length > 0 && (
              <VialCard
                key={index}
                name={vials[0]?.name as string}
                vial={vials[0] as Vial}
                multiple={vials.length}
                buy={canBuy}
              />
            )
          );
        })
      )}
      {!isLoading && vials?.length === 0 && <p>No vials found</p>}
    </>
  );
}

export default Vials;
