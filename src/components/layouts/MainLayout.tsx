import { FaGithubSquare } from "react-icons/fa";
import Logo from "../Logo/Logo";
import { chakra, Link as ChakraLink, useDisclosure } from "@chakra-ui/react";

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (<>
    <div className="container p-2 flex mx-auto mt-2">
        <ChakraLink
          isExternal
          className="mr-0 ml-auto flex"
          textDecoration={"none"}
          href="https://github.com/flaviojmendes/trilhadev"
        >
          <FaGithubSquare className="w-8 h-8 c-red" />
          <span className="my-auto text-lg ml-1 c-red">Github</span>
        </ChakraLink>
      </div>
      <div className="container py-1 px-2 mx-auto mt-0 mb-10">
        <Logo />

        {children}
      </div>
    </>
  );
}
