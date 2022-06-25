import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navegador = (props) => {
const [isBurger, setIsBurger] = useState('w-12 h-16 -mr-2 border-r lg:hidden');
  function burger(){
    setIsBurger("burgerHide")
    navigate("/side");
  }
  const navigate = useNavigate();

  return (
    <>
      <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
            {props.titulo}
          </h5>
          <button className={isBurger}
          onClick={()=>burger()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 my-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex space-x-4">
            <button
              aria-label="notification"
              className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 m-auto text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
