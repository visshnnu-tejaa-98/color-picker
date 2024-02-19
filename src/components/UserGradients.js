import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiColorsContext from "../contexts/apiColorsContext";
import GradientColorBlock from "./GradientColorBlock";
import { twoTone, twoToneGradientType } from "../utils/variables";
import DEV_API from "../config/config.development";
import Pagination from "./Pagination";
import Loader from "./Loader";

const UserGradients = () => {
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
  const ApiColorsCtx = useContext(ApiColorsContext);
  const navigate = useNavigate();
  const authToken = ApiColorsCtx.getAuthToken();
  useEffect(() => {
    getAllTwoToneGradientsByUserId(page, twoToneGradientType);
  }, [page]);

  async function getAllTwoToneGradientsByUserId(page, type) {
    const url =
      DEV_API.getAllGradientsByUser?.url + `?page=${page}&type=${type}`;
    let headers = {
      ...DEV_API.getAllGradientsByUser.headers,
      Authorization: `Bearer ${authToken}`,
    };

    setTwoToneColorsResponse({ apiStatus: 0, error: null, data: null });
    try {
      const req = await fetch(url, { headers });
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
    <div className="px-[7%] text-[#cccccc]">
      <div className="flex justify-between items-center">
        <span
          className="material-symbols-outlined cursor-pointer hover:text-[#FCD34D]"
          title="Back"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h2 className="text-center text-3xl mt-10 mb-10">Your Gradients</h2>
        <span className="material-symbols-outlined invisible">arrow_back</span>
      </div>
      <div>
        <div>
          {twoToneColorsResponse.apiStatus === 0 && <Loader height={"300px"} />}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
            {/* <AddGradientTemplate /> */}
            {twoToneColorsResponse.apiStatus === 1 &&
              twoToneColorsResponse?.data?.gradients?.map((color, idx) => (
                <GradientColorBlock
                  color={color.colors}
                  varient={twoTone}
                  key={color._id}
                  info={color}
                />
              ))}
          </div>
        </div>
      </div>
      {twoToneColorsResponse.apiStatus === 1 && (
        <div className="my-5">
          <Pagination
            paginationData={paginationData}
            setPaginationData={setPaginationData}
          />
        </div>
      )}
    </div>
  );
};

export default UserGradients;
