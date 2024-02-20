import React, { useEffect, useState } from "react";
import { twoTone, twoToneGradientType } from "../utils/variables";
import GradientColorBlock from "./GradientColorBlock";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import DEV_API from "../config/config.development";
import Loader from "./Loader";

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
    // 2 for 2 tone gradients (only 2 options available)
    // 3 for 3 tone gradients
    getAllTwoToneGradients(page, twoToneGradientType);
  }, [page]);

  async function getAllTwoToneGradients(page, type) {
    const url = DEV_API.getAllGradients.url + `?page=${page}&type=${type}`;
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
      <h1 className="text-center text-4xl my-7">Two Tone Gradient Colors</h1>
      <div>
        <div>
          {twoToneColorsResponse.apiStatus === 0 && <Loader height={"300px"} />}
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

      {twoToneColorsResponse.apiStatus === 1 && (
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

export default GradientTwoTone;
