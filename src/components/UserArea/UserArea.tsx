import { useAuth0 } from "@auth0/auth0-react";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Button, Icon, IconButton, useToast } from "@chakra-ui/react";
import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { FaShare } from "react-icons/fa";
import { FiShare, FiShare2 } from "react-icons/fi";
import { Grid } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { RoadmapModel } from "../../entity/RoadmapItem";

const cookies = new Cookies();

export default function UserArea() {
  const { isAuthenticated, user, isLoading, logout } = useAuth0();
  const navigate = useNavigate();
  const [isLoadingRoadmaps, setLoadingRoadmaps] = useState(true);
  const [roadmaps, setRoadmaps] = useState<RoadmapModel[]>();
  const toast = useToast();

  function handleCreateNew() {
    navigate("/new-roadmap");
  }

  useEffect(() => {}, []);

  useEffect(() => {
    if (user) {
      getRoadmaps();
    }
  }, [isLoading]);

  async function getRoadmaps() {
    setLoadingRoadmaps(true);
    if (cookies.get("api_token")) {
      let response = await axios.get(
        import.meta.env.VITE_API_URL + `/roadmap/${user?.nickname}` || "",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.get("api_token"),
          },
        }
      );

      setRoadmaps(response.data);
    } else {
      logout();
    }
    setLoadingRoadmaps(false);
  }

  async function handleDeleteRoadmap(roadmapId: string) {
    const answer = window.confirm("Tem certeza que quer deletar?");
    if (answer) {
      setLoadingRoadmaps(true);
      setRoadmaps([]);
      let response = await axios.delete(
        import.meta.env.VITE_API_URL + `/roadmap/${roadmapId}` || "",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.get("api_token"),
          },
        }
      );
      getRoadmaps();
    }
  }

  function handleCopyToClipboard(roadmapId: string) {
    navigator.clipboard.writeText(
      `https://trilha.info/roadmap/view/${roadmapId}`
    );
    toast({
      title: "Feito!",
      description: "O link para o seu Roadmap foi copiado!",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <>
      {isAuthenticated && (
        <div className="flex flex-col items-stretch justify-center">
          <h2 className="text-center my-6 txt-handwritten text-3xl c-yellow">
            Meus Roadmaps
          </h2>
          <div className="flex flex-wrap items-stretch py-8 md:space-x-10 space-y-10 md:space-y-0 justify-center">
            {roadmaps?.map((roadmap, roadmapIndex) => {
              return (
                <div
                  key={roadmap.id}
                  className="flex flex-col md:w-1/3 lg:w-1/4 w-full min-h-fit space-y-2"
                >
                  <Link
                    className="bd-handwritten bd-red bg-brown  hover:bg-white py-3"
                    to={`/roadmap/view/${roadmap.id}`}
                  >
                    <h3 className="text-center text-3xl txt-handwritten mb-2 c-dark-brown">
                      {roadmap.title}
                    </h3>
                    <p className="text-justify mx-5">{roadmap.description}</p>
                  </Link>
                  <div className="flex space-x-2">
                    <IconButton
                      aria-label="Editar Roadmap"
                      icon={<EditIcon />}
                      onClick={() => navigate(`/edit-roadmap/${roadmap.id}`)}
                    />
                    <IconButton
                      aria-label="Deletar Roadmap"
                      onClick={() => handleDeleteRoadmap(roadmap.id || '')}
                      icon={<DeleteIcon />}
                    />
                    <IconButton
                      aria-label="Compartilhar Roadmap"
                      onClick={() => handleCopyToClipboard(roadmap.id!)}
                      icon={<Icon as={FiShare2} />}
                    />
                  </div>
                </div>
              );
            })}
            <Grid
              height="80"
              width="80"
              color="#d56a47"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="opacity-100 "
              visible={isLoadingRoadmaps}
            />
          </div>

          <div className="flex">
            <Button
              m={"auto"}
              colorScheme="yellow"
              variant="solid"
              onClick={handleCreateNew}
            >
              + Novo Roadmap
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
