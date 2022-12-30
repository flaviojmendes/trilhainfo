import { NavLink } from "react-router-dom";
import { chakra, Link as ChakraLink, useDisclosure } from "@chakra-ui/react";
import MainLayout from "../components/layouts/MainLayout";
import UserArea from "../components/UserArea/UserArea";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import CheatSheets from "../components/CheatSheets/CheatSheets";
import OpenSource from "../components/OpenSource/OpenSource";
import MainRoadmaps from "../components/MainRoadmaps/MainRoadmaps";
import CallToAction from "../components/CallToAction/CallToAction";
import Sponsors from "../components/Sponsors/Sponsors";

export default function HomePage() {
  const Link = chakra(NavLink);

  return (
    <>
      <MainLayout>
        <CallToAction />
        {/* <Sponsors /> */}
        <MainRoadmaps />
        <UserArea />
        <CheatSheets />
        
        <OpenSource />
        
      </MainLayout>
    </>
  );
}
