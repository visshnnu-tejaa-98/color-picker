import React, { useEffect, useState } from "react";
import { threeTone, threeToneGradientType } from "../utils/variables";
import GradientColorBlock from "./GradientColorBlock";
import { useLocation } from "react-router-dom";
import DEV_API from "../config/config.development";
import Pagination from "./Pagination";

const GradientThreeTone = () => {
  const [paginationData, setPaginationData] = useState({
    previous: 1,
    next: 2,
    pagestoshow: [1, 2, 3, 4],
    totalpages: 1,
  });
  const [threeToneColorsResponse, setThreeToneColorsResponse] = useState({
    data: null,
    error: null,
    apiStatus: 0,
  });

  const location = useLocation();
  const page = Number(location.search.split("=")[1]);
  useEffect(() => {
    // 2 for 2 tone gradients (only 2 options available)
    // 3 for 3 tone gradients
    getAllThreeToneGradients(page, threeToneGradientType);
  }, [page]);

  async function getAllThreeToneGradients(page, type) {
    const url = DEV_API.getAllGradients.url + `?page=${page}&type=${type}`;
    setThreeToneColorsResponse({ apiStatus: 0, error: null, data: null });
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
      setThreeToneColorsResponse({ apiStatus: 1, error: null, data: res });
    } catch (error) {
      console.log(error);
      setThreeToneColorsResponse({
        apiStatus: -1,
        error: error?.message,
        data: null,
      });
    }
  }
  return (
    <div>
      <h2 className="text-center text-3xl mt-12 mb-10">Feeling Three Tone</h2>
      <div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {threeToneColorsResponse.apiStatus === 1 &&
              threeToneColorsResponse?.data?.gradients?.map((color) => (
                <GradientColorBlock
                  color={color.colors || color}
                  varient={threeTone}
                  key={color._id}
                  info={color}
                />
              ))}
          </div>
        </div>
      </div>
      {threeToneColorsResponse.apiStatus === 1 && (
        <div>
          <Pagination
            paginationData={paginationData}
            setPaginationData={setPaginationData}
          />
        </div>
      )}
    </div>
  );
};

export default GradientThreeTone;
