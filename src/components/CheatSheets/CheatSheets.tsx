import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { cheatSheets } from "../../guides/cheatSheets";

export default function CheatSheets() {
  useEffect(() => {}, []);

  return (
    <>
      <section className="flex flex-col items-stretch justify-center bg-dark-brown mb-10 py-10 mx-0 w-full shadow-inner">
        <h2
          className="text-center my-6 txt-title text-3xl c-yellow"
          aria-labelledby="cheat"
        >
          Guias (Cheat Sheets)
        </h2>
        <div>
          <div className="flex flex-wrap items-stretch py-8 px-4 space-y-4 md:space-y-0 justify-center gap-5">
            {cheatSheets.map((cheatSheet) => {
              return (
                <div
                  key={cheatSheet.id}
                  className="flex flex-col md:w-1/3 lg:w-1/4 w-full min-h-fit space-y-2 bg-brown  hover:bg-white py-3 rounded-md"
                >
                  <a
                    className=" text-2xl txt-title m-auto "
                    href={`/guide/${cheatSheet.id}`}
                  >
                    {`-> ${cheatSheet.title} <-`}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
