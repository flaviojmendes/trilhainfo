import { MouseEvent, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function CheatSheets() {
  const navigate = useNavigate();
  const [isLoadingRoadmaps, setLoadingRoadmaps] = useState(true);

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
          <ul
            className="flex flex-col py-8 space-y-10 md:space-y-2 "
            id="cheat"
          >
            <li className="flex flex-col space-y-10 md:space-y-2 ">
              <a className="text-red text-xl m-auto hover:font-bold hover:text-yellow" href="/guide/bigO">
                {"-> Notação Big O <-"}
              </a>
            </li>
            <li className="flex flex-col space-y-10 md:space-y-2 ">
              <a className="text-red text-xl m-auto hover:font-bold hover:text-yellow" href="/guide/basicAuth">
                {"-> Autenticação Básica <-"}
              </a>
            </li>
            <li className="flex flex-col space-y-10 md:space-y-2 ">
              <a className="text-red text-xl m-auto hover:font-bold hover:text-yellow" href="/guide/onboarding">
                {"-> Onboarding <-"}
              </a>
            </li>
            <li className="flex flex-col space-y-10 md:space-y-2 ">
              <a className="text-red text-xl m-auto hover:font-bold hover:text-yellow" href="/guide/sso">
                {"-> SSO (Single Sign On) <-"}
              </a>
            </li>
            <li className="flex flex-col space-y-10 md:space-y-2 ">
              <a className="text-red text-xl m-auto hover:font-bold hover:text-yellow" href="/guide/star">
                {"-> Modelo STAR para Entrevistas <-"}
              </a>
            </li>
            <li className="flex flex-col space-y-10 md:space-y-2 ">
              <a className="text-red text-xl m-auto hover:font-bold hover:text-yellow" href="/guide/slaSloSli">
                {"-> SLA, SLO, SLI? <-"}
              </a>
            </li>
            <li className="flex flex-col space-y-10 md:space-y-2 ">
              <a className="text-red text-xl m-auto hover:font-bold hover:text-yellow" href="/guide/jsAsyncDefer">
                {"-> Javascript Async, Defer <-"}
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
