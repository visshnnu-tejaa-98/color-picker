import React, { useEffect, useContext, useState } from "react";
import { gradientColorMapping } from "../utils/gradientColors";
import { twoTone } from "../utils/variables";
import GradientColorBlock from "./GradientColorBlock";
import ApiColorsContext from "../contexts/apiColorsContext";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import DEV_API from "../config/config.development";
import PaginationButton from "flowbite-react/lib/esm/components/Pagination/PaginationButton";

const GradientTwoTone = ({ msg }) => {
  const [paginationData, setPaginationData] = useState({
    previous: 1,
    next: 2,
    pagestoshow: [1, 2, 3, 4],
    totalpages: 1,
  });
  const [twoToneColorsResponse, setTwoToneColorsResponse] = useState({
    data: null,
    error: null,
    apiStatus: 0,
  });

  const location = useLocation();
  const page = Number(location.search.split("=")[1]);

  useEffect(() => {
    getAllTwoToneGradients(page);
  }, [page]);

  async function getAllTwoToneGradients() {
    const url = DEV_API.getAllTwoToneGradients.url + `?page=${page}`;
    setTwoToneColorsResponse({ apiStatus: 0, error: null, data: null });
    try {
      const req = await fetch(url);
      const res = await req.json();
      const { page: currentPage, pageCount } = res;
      let pagestoshow = [];
      for (let i = 1; i <= pageCount; i++) {
        if (i > currentPage - 3 && i < currentPage + 3) {
          pagestoshow.push(i);
        }
      }

      setPaginationData({
        previous: currentPage > 1 ? currentPage - 1 : currentPage,
        next: page < pageCount ? page + 1 : page,
        pagestoshow,
        currentPage,
        pageCount,
      });
      setTwoToneColorsResponse({ apiStatus: 1, error: null, data: res });
    } catch (error) {
      console.log(error);
      setTwoToneColorsResponse({
        apiStatus: -1,
        error: error?.message,
        data: null,
      });
    }
  }

  return (
    <div>
      <h2 className="text-center text-3xl mt-12 mb-10">Feeling Two Tone</h2>
      <div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {twoToneColorsResponse.apiStatus === 1 &&
              twoToneColorsResponse?.data?.gradients?.map((color) => (
                <GradientColorBlock
                  color={color.colors || color}
                  varient={twoTone}
                  key={color._id}
                  info={color}
                />
              ))}
          </div>
        </div>
      </div>
      <div>
        <PaginationButton
          paginationData={paginationData}
          setPaginationData={setPaginationData}
        />
      </div>
    </div>
  );
};

export default GradientTwoTone;
