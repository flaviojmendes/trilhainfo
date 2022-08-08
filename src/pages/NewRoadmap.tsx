import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Divider,
  Icon,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";

import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { FaSpinner, FaTrash } from "react-icons/fa";
import MainLayout from "../components/layouts/MainLayout";
import {
  Level,
  Link,
  LinkContentType,
  RoadmapItem,
  RoadmapModel,
} from "../entity/RoadmapItem";
import Cookies from "universal-cookie";
import { ItemField } from "../entity/ViewEnums";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import { DeleteIcon } from "@chakra-ui/icons";

const cookies = new Cookies();

export default function NewRoadmapPage() {
  const [roadmap, setRoadmap] = useState<RoadmapModel>(new RoadmapModel());
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { roadmapId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (roadmapId) {
      (async () => {
        await getRoadmap();
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, []);

  async function getRoadmap() {
    let response = await axios.get<RoadmapModel>(
      import.meta.env.VITE_PUBLIC_URL + `/roadmap/${roadmapId}` || "",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.get("api_token"),
        },
      }
    );

    setRoadmap(Object.assign(new RoadmapModel(), response.data));
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);
    roadmapTemp.title = event.target.value || "";
    setRoadmap(roadmapTemp);
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);
    roadmapTemp.description = event.target.value || "";
    setRoadmap(roadmapTemp);
  }

  function handleNewLevel() {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);
    roadmapTemp.addLevel({ items: [] });
    setRoadmap(roadmapTemp);
  }

  function handleRemoveLevel(level: Level) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);
    roadmapTemp?.removeLevel(level);
    setRoadmap(roadmapTemp);
  }

  function handleLevelTitleChange(
    event: ChangeEvent<HTMLInputElement>,
    level: Level,
    index: number
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);

    level.label = event.target.value;
    roadmapTemp.getLevels()[index] = level;
    setRoadmap(roadmapTemp);
  }

  function handleLevelDescriptionChange(
    event: ChangeEvent<HTMLTextAreaElement>,
    level: Level,
    index: number
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);

    level.description = event.target.value;
    roadmapTemp.getLevels()[index] = level;
    setRoadmap(roadmapTemp);
  }

  // Item Functions
  function handleItemChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: RoadmapItem,
    levelIndex: number,
    itemIndex: number,
    itemField: ItemField
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);

    if (itemField === ItemField.LABEL) {
      item.label = event.target.value;
    } else if (itemField === ItemField.DESCRIPTION) {
      item.description = event.target.value;
    }

    roadmapTemp.getLevels()[levelIndex].items[itemIndex] = item;
    setRoadmap(roadmapTemp);
  }

  function handleNewItem(level: Level, index: number) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);

    level.items.push({ label: "" });
    roadmapTemp.getLevels()[index] = level;
    setRoadmap(roadmapTemp);
  }

  function handleRemoveItem(levelIndex: number, item: RoadmapItem) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);
    let items = roadmapTemp.levels[levelIndex].items.filter((obj) => {
      return obj !== item;
    });
    roadmapTemp.levels[levelIndex].items = items;
    setRoadmap(roadmapTemp);
  }

  // End Item Functions

  // Section Functions
  function handleSectionChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: RoadmapItem,
    levelIndex: number,
    itemIndex: number,
    sectionIndex: number,
    itemField: ItemField
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);

    if (itemField === ItemField.LABEL) {
      item.label = event.target.value;
    } else if (itemField === ItemField.DESCRIPTION) {
      item.description = event.target.value;
    }

    roadmapTemp.getLevels()[levelIndex].items[itemIndex].children![
      sectionIndex
    ] = item;
    setRoadmap(roadmapTemp);
  }

  function handleNewSection(
    level: Level,
    levelIndex: number,
    itemIndex: number
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);

    if (!level.items[itemIndex].children) {
      level.items[itemIndex].children = [];
    }

    level.items[itemIndex].children!.push({ label: "" });

    roadmapTemp.getLevels()[levelIndex] = level;
    setRoadmap(roadmapTemp);
  }

  function handleRemoveSection(
    levelIndex: number,
    itemIndex: number,
    section: RoadmapItem
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);
    let items = roadmapTemp.levels[levelIndex].items[
      itemIndex
    ].children!.filter((obj) => {
      return obj !== section;
    });
    roadmapTemp.levels[levelIndex].items[itemIndex].children = items;
    setRoadmap(roadmapTemp);
  }
  // End Section Functions

  // Link Functions
  function handleLinkChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    link: Link,
    levelIndex: number,
    itemIndex: number,
    sectionIndex: number,
    linkIndex: number,
    itemField: ItemField
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);

    if (itemField === ItemField.LABEL) {
      link.label = event.target.value;
    } else if (itemField === ItemField.URL) {
      link.url = event.target.value;
    } else if (itemField === ItemField.TYPE) {
      link.contentType = event.target.value;
    }

    roadmapTemp.getLevels()[levelIndex].items[itemIndex].children![
      sectionIndex
    ].links![linkIndex] = link;
    setRoadmap(roadmapTemp);
  }

  function handleNewLink(
    level: Level,
    levelIndex: number,
    itemIndex: number,
    sectionIndex: number
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);

    if (!level.items[itemIndex].children![sectionIndex].links) {
      level.items[itemIndex].children![sectionIndex].links = [];
    }

    level.items[itemIndex].children![sectionIndex].links!.push({
      label: "",
      url: "",
      contentType: LinkContentType.WATCH,
    });

    roadmapTemp.getLevels()[levelIndex] = level;
    setRoadmap(roadmapTemp);
  }

  function handleRemoveLink(
    levelIndex: number,
    itemIndex: number,
    sectionIndex: number,
    link: Link
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);
    let items = roadmapTemp.levels[levelIndex].items[itemIndex].children![
      sectionIndex
    ].links!.filter((obj) => {
      return obj !== link;
    });
    roadmapTemp.levels[levelIndex].items[itemIndex].children![
      sectionIndex
    ].links = items;
    setRoadmap(roadmapTemp);
  }
  // End Link Functions

  async function handleSaveRoadmap() {
    roadmap.owner = user?.nickname;
    await axios.post(import.meta.env.VITE_API_URL + `/roadmap` || "", roadmap, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("api_token"),
      },
    });
    navigate("/");
  }

  return (
    <>
      <MainLayout>
        <div className="flex flex-col space-y-4">
          <div className="w-full md:w-1/2 m-auto">
            <span className="c-yellow">Título:</span>
            <Input
              className="c-red"
              value={roadmap.title}
              onChange={handleTitleChange}
              placeholder="Dê um título para o seu Roadmap"
              size="sm"
            />
          </div>
          <div className="w-full md:w-1/2 m-auto">
            <span className="c-yellow">Descrição:</span>
            <Textarea
              className="c-red"
              value={roadmap.description}
              onChange={handleDescriptionChange}
              placeholder="Escreva uma breve descrição para o seu Roadmap"
              size="sm"
            />
          </div>
        </div>
        {/* Levels */}
        <div className="flex flex-col space-y-2 justify-center mt-12">
          {roadmap?.getLevels().map((level, levelIndex) => {
            return (
              <div
                key={levelIndex}
                className={
                  "pb-5 lg:w-2/3 self-center p-4 " +
                  (level.label || level.description
                    ? "border-2 bd-red border-dotted bg-yellow"
                    : "bg-white bg-opacity-50")
                }
              >
                <div className="w-full flex flex-wrap justify-end">
                  <span className="grow text-sm">
                    (Título e Descrição são Opcionais)
                  </span>
                  <div
                    className="m-auto my-2 cursor-pointer w-fit"
                    onClick={() => handleRemoveLevel(level)}
                  >
                    <DeleteIcon cursor={"pointer"} /> <span className="text-sm">Remover Level</span>
                  </div>
                </div>
                <div className="w-44 h-50 mx-auto text-center">
                  <Input
                    borderColor={"#000"}
                    className="font-black placeholder:text-dark-blue"
                    value={level.label}
                    onChange={(e) =>
                      handleLevelTitleChange(e, level, levelIndex)
                    }
                    placeholder="Título"
                    size="sm"
                  />
                </div>
                <div className="w-full h-50 mx-auto mt-4 text-center">
                  <Textarea
                    borderColor={"#000"}
                    className="font-black placeholder:text-dark-blue"
                    value={level.description}
                    onChange={(e) =>
                      handleLevelDescriptionChange(e, level, levelIndex)
                    }
                    placeholder="Descrição"
                    size="sm"
                  />
                </div>
                {/* Items */}
                <div className="w-full flex flex-col space-y-3 space-x-1 mt-8">
                  {level.items.map((item, itemIndex) => {
                    return (
                      <div
                        key={`item-${itemIndex}`}
                        className="flex flex-col space-y-2 mx-0 my-0 p-2 pt-3 md:p-3 w-full text-center bd-handwritten bd-red  hover:shadow-md bg-brown"
                      >
                        <div
                          className="m-auto my-2 cursor-pointer w-fit"
                          onClick={() => handleRemoveItem(levelIndex, item)}
                        >
                          <DeleteIcon cursor={"pointer"} /> Remover Item
                        </div>
                        <Input
                          className="font-black placeholder:text-dark-blue"
                          border="2px"
                          borderColor={"#ee8561"}
                          value={item.label}
                          onChange={(e) =>
                            handleItemChange(
                              e,
                              item,
                              levelIndex,
                              itemIndex,
                              ItemField.LABEL
                            )
                          }
                          placeholder="Título"
                          size="sm"
                        />
                        <Textarea
                          className="font-black placeholder:text-dark-blue"
                          border="2px"
                          borderColor={"#ee8561"}
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(
                              e,
                              item,
                              levelIndex,
                              itemIndex,
                              ItemField.DESCRIPTION
                            )
                          }
                          placeholder="Descrição"
                          size="sm"
                        />
                        <span className="font-semibold">Seções</span>
                        {/* Sections */}

                        {item.children?.map((section, sectionIndex) => {
                          return (
                            <div>
                              <div
                                className="m-auto my-2 cursor-pointer w-fit"
                                onClick={() =>
                                  handleRemoveSection(
                                    levelIndex,
                                    itemIndex,
                                    section
                                  )
                                }
                              >
                                <DeleteIcon cursor={"pointer"} /> Remover Seção
                              </div>

                              <Input
                                className="font-black placeholder:text-dark-blue"
                                border="2px"
                                borderColor={"#59c0e4"}
                                value={section.label}
                                onChange={(e) =>
                                  handleSectionChange(
                                    e,
                                    section,
                                    levelIndex,
                                    itemIndex,
                                    sectionIndex,
                                    ItemField.LABEL
                                  )
                                }
                                placeholder="Título"
                                size="sm"
                              />
                              {/* Links */}
                              {section.links?.map((link, linkIndex) => {
                                return (
                                  <>
                                    <Divider
                                      borderColor={"yellow.500"}
                                      mt="2"
                                    />
                                    <div
                                      className="m-auto my-2 cursor-pointer w-fit"
                                      onClick={() =>
                                        handleRemoveLink(
                                          levelIndex,
                                          itemIndex,
                                          sectionIndex,
                                          link
                                        )
                                      }
                                    >
                                      <DeleteIcon cursor={"pointer"} /> Remover
                                      Link
                                    </div>

                                    <div className="flex flex-wrap md:space-x-2 mt-2">
                                      <div className="w-full md:w-4/12">
                                        <Input
                                          className="font-black placeholder:text-dark-blue"
                                          border="2px"
                                          borderColor={"#eabc54"}
                                          value={link.label}
                                          onChange={(e) =>
                                            handleLinkChange(
                                              e,
                                              link,
                                              levelIndex,
                                              itemIndex,
                                              sectionIndex,
                                              linkIndex,
                                              ItemField.LABEL
                                            )
                                          }
                                          placeholder="Título do Link"
                                          size="sm"
                                        />
                                      </div>
                                      <div className="w-full md:w-5/12">
                                        <Input
                                          className="font-black placeholder:text-dark-blue"
                                          border="2px"
                                          borderColor={"#eabc54"}
                                          value={link.url}
                                          onChange={(e) =>
                                            handleLinkChange(
                                              e,
                                              link,
                                              levelIndex,
                                              itemIndex,
                                              sectionIndex,
                                              linkIndex,
                                              ItemField.URL
                                            )
                                          }
                                          placeholder="URL do Link"
                                          size="sm"
                                        />
                                      </div>
                                      <div className="w-full md:w-2/12">
                                      <Select placeholder="Select option"
                                        border="2px"
                                        value={link.contentType}
                                        borderColor={"#eabc54"}
                                        onChange={(e) => handleLinkChange( e,
                                          link,
                                          levelIndex,
                                          itemIndex,
                                          sectionIndex,
                                          linkIndex,
                                          ItemField.TYPE)}
                                        size="sm">
                                          {Object.values(LinkContentType).map((type) => {return <option value={type}>
                                            {type}
                                          </option>})}
                                          
                                          
                                        </Select>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                              <div className="w-full flex mt-8">
                                <Button
                                  my="4"
                                  mx={"auto"}
                                  backgroundColor={"#eabc54"}
                                  variant="solid"
                                  onClick={() =>
                                    handleNewLink(
                                      level,
                                      levelIndex,
                                      itemIndex,
                                      sectionIndex
                                    )
                                  }
                                >
                                  + Novo Link
                                </Button>
                              </div>
                              {/* Links End */}
                            </div>
                          );
                        })}
                        {/* Sections End */}
                        <div className="w-full flex mt-8">
                          <Button
                            my="4"
                            mx={"auto"}
                            backgroundColor={"#59c0e4"}
                            variant="solid"
                            onClick={() =>
                              handleNewSection(level, levelIndex, itemIndex)
                            }
                          >
                            + Nova Seção
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Items End */}
                <div className="w-full flex mt-8">
                  <Button
                    my="4"
                    mx={"auto"}
                    backgroundColor={"#ee8561"}
                    variant="solid"
                    onClick={() => handleNewItem(level, levelIndex)}
                  >
                    + Novo Item
                  </Button>
                </div>
              </div>
            );
          })}

          <Button
            my="4"
            mx={"auto"}
            colorScheme="yellow"
            variant="solid"
            onClick={handleNewLevel}
          >
            + Novo Nível
          </Button>
        </div>
        {/* Levels End */}
        <div className="flex flex-col space-y-4 justify-end">
          <div className="w-fit self-end">
            <Button
              my="4"
              mx={"auto"}
              colorScheme="yellow"
              variant="solid"
              onClick={handleSaveRoadmap}
            >
              Salvar
            </Button>
          </div>
        </div>
      </MainLayout>
      {loading && (
        <div
          className="m-0 w-full h-full fixed inset-x-0 top-0 bg-dark-brown bg-opacity-70 "
          id="signin-success-message"
        >
          <div className="px-6 py-4 my-4 rounded-md text-lg flex items-center justify-center w-full mt-60">
            <Grid
              height="80"
              width="80"
              color="#d56a47"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="opacity-100"
              visible={loading}
            />
          </div>
        </div>
      )}
    </>
  );
}
