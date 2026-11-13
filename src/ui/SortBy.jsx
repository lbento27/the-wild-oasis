import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  //get the current sortBy value from the search params
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(event) {
    //console.log(event.target.value);
    //add the sortBy parameter to the search params
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
