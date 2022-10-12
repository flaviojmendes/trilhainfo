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
      <div className="flex flex-col items-stretch justify-center bg-[#403C3B] my-10 py-10 mx-0 w-full shadow-inner">
        <h2 className="text-center my-6 txt-handwritten text-3xl c-yellow">
          Guias (Cheat Sheets)
        </h2>
        <div className="flex flex-col py-8  space-y-10 md:space-y-2 ">
          <a className="text-red text-xl m-auto" href="/guide/bigO">
            {"-> Notação Big O <-"}
          </a>
          <a className="text-red text-xl m-auto" href="/guide/basicAuth">
            {"-> Autenticação Básica <-"}
          </a>
          <a className="text-red text-xl m-auto" href="/guide/onboarding">
            {"-> Onboarding <-"}
          </a>
          <a className="text-red text-xl m-auto" href="/guide/sso">
            {"-> SSO (Single Sign On) <-"}
          </a>
          <a className="text-red text-xl m-auto" href="/guide/star">
            {"-> Modelo STAR para Entrevistas <-"}
          </a>
          <a className="text-red text-xl m-auto" href="/guide/slaSloSli">
            {"-> SLA, SLO, SLI? <-"}
          </a>
          <a className="text-red text-xl m-auto" href="/guide/jsAsyncDefer">
            {"-> Javascript Async, Defer <-"}
          </a>
        </div>
      </div>
    </>
  );
}
