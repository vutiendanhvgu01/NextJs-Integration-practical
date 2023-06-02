import { useRouter } from "next/router";
import { useState } from "react";

type Props = {};

const HeaderMain = (props: Props) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <header>
      <div>
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
          />
          <button
            className="search-button"
            onClick={() => {
              router.push({
                query: {
                  ...router.query,
                  name: searchInput,
                },
              });
            }}
          >
            Search
          </button>
        </div>
       
      </div>
    </header>
  );
};

export default HeaderMain;
