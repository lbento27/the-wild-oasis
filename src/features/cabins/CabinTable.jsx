import { useCabins } from "./useCabins";
import { useSearchParams } from "react-router-dom";

import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

import Menus from "../../ui/Menus";

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  //get the discount filter from the url
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  const cabinList = cabins || [];
  //console.log(filterValue);

  let filteredCabins = cabinList;
  if (filterValue === "all") {
    filteredCabins = cabinList;
  }
  if (filterValue === "no-discount") {
    filteredCabins = cabinList.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabinList.filter((cabin) => cabin.discount > 0);
  }

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          //data={cabins}
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
