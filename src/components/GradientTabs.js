import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const GradientTabs = () => {
  const location = useLocation();
  return (
    <div class="text-sm my-2 mb-4 font-medium text-center text-[#cccccc] border-b border-gray-200">
      <ul class="flex flex-wrap -mb-px">
        <li class="me-2">
          <NavLink
            to="/generateGradient/twotone"
            className={
              location?.pathname === "/generateGradient/twotone"
                ? "inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:text-[#aaaaaa] hover:border-[#aaaaaa] border-[#FCD34D] bg-[#FCD34D] text-[#222222]"
                : "inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:text-[#aaaaaa] hover:border-[#aaaaaa]"
            }
          >
            Two Tone Gradients
          </NavLink>
        </li>
        <li class="me-2">
          <Link
            to="/generateGradient/threetone"
            aria-current="page"
            className={
              location?.pathname === "/generateGradient/threetone"
                ? "inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:text-[#aaaaaa] hover:border-[#aaaaaa] border-[#FCD34D] bg-[#FCD34D] text-[#222222]"
                : "inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:text-[#aaaaaa] hover:border-[#aaaaaa]"
            }
          >
            Three Tone Gradients
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default GradientTabs;
