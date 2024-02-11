import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PalleteColorCopy from "./PalleteColorCopy";
import ApiColorsContext from "../contexts/apiColorsContext";
import DEV_API from "../config/config.development";
import Pagination from "./Pagination";

const UserPalette = () => {
  const [paginationData, setPaginationData] = useState({
    previous: 1,
    next: 2,
    pagestoshow: [1, 2, 3, 4],
    totalpages: 1,
  });
  const [palletResponse, setPalletResponse] = useState({
    data: null,
    error: null,
    apiStatus: 0,
  });

  const location = useLocation();
  const page = Number(location.search.split("=")[1]);
  const ApiColorsCtx = useContext(ApiColorsContext);
  const authToken = ApiColorsCtx.getAuthToken();
  const navigate = useNavigate();
  useEffect(() => {
    getAllPaletteByUser(page);
  }, [page]);

  async function getAllPaletteByUser(page) {
    const url = DEV_API.getPaletteByUser.url + `?page=${page}`;
    let headers = {
      ...DEV_API.getAllGradientsByUser.headers,
      Authorization: `Bearer ${authToken}`,
    };
    setPalletResponse({ apiStatus: 0, error: null, data: null });
    try {
      const req = await fetch(url, { headers });
      const res = await req.json();
      console.log(res);
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
      setPalletResponse({ apiStatus: 1, error: null, data: res });
    } catch (error) {
      console.log(error);
      setPalletResponse({
        apiStatus: -1,
        error: error?.message,
        data: null,
      });
    }
  }

  const handleOnClick = (e, color) => {
    console.log(color);
    if (color._id && e.target.tagName === "DIV") {
      navigate(`/palette/paletteDetails/${color._id}`);
    }
  };
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
        <h2 className="text-center text-3xl mt-10 mb-10">Your Palette</h2>
        <span className="material-symbols-outlined invisible">arrow_back</span>
      </div>
      <div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {palletResponse.apiStatus === 1 &&
              palletResponse?.data?.palette?.map((color, idx) => (
                <div
                  key={idx}
                  className="w-[100%] h-[200px] bg-teal-100 rounded-lg overflow-hidden pallete-tile shadow cursor-pointer"
                  onClick={(e) => handleOnClick(e, color)}
                >
                  <div
                    className="w-[100%] h-[75px] bg-teal-500 relative pallete-color"
                    style={{
                      backgroundColor: color?.palette[0] || color[0],
                    }}
                  >
                    <PalleteColorCopy color={color?.palette[0] || color[0]} />
                  </div>
                  <div
                    className="w-[100%] h-[55px] bg-teal-300 relative pallete-color"
                    style={{
                      backgroundColor: color?.palette[1]
                        ? color?.palette[1]
                        : color[1],
                    }}
                  >
                    <PalleteColorCopy
                      color={color?.palette[1] ? color?.palette[1] : color[1]}
                    />
                  </div>
                  <div
                    className="w-[100%] h-[40px] bg-teal-200 relative pallete-color"
                    style={{
                      backgroundColor: color?.palette[2]
                        ? color?.palette[2]
                        : color[2],
                    }}
                  >
                    <PalleteColorCopy
                      color={color?.palette[2] ? color?.palette[2] : color[2]}
                    />
                  </div>
                  <div
                    className="w-[100%] h-[30px] bg-teal-100 relative pallete-color"
                    style={{
                      backgroundColor: color?.palette[3]
                        ? color?.palette[3]
                        : color[3],
                    }}
                  >
                    <PalleteColorCopy
                      color={color?.palette[3] ? color?.palette[3] : color[3]}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {palletResponse.apiStatus === 1 && (
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

export default UserPalette;
