import ButtonElement from "./ButtonElement";
import domtoimage from "dom-to-image";
import { MutableRefObject } from "react";
import { Button, ButtonArgs } from "./types";

type RoadmapButtonsProps = {
  buttons: Button[];
  roadmapRef: MutableRefObject<null>;
  title: string;
};

const RoadmapButtons = ({
  buttons,
  roadmapRef,
  title,
}: RoadmapButtonsProps) => {
  const handleDownloadImage = async () => {
    const element = roadmapRef.current || document.body;
    const data = await domtoimage.toPng(element);

    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = `trilha${title}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const BUTTON_ACTIONS: Map<Button, ButtonArgs> = new Map([
    [
      "verticalView",
      {
        text: "Visualizar Verticalmente",
        type: "link",
        category: "download_roadmap",
        analyticsActionTag: "open_vertical_roadmap",
        href: `/roadmap/${title.toLowerCase()}`,
      },
    ],
    [
      "horizontalView",
      {
        text: "Visualizar Horizontalmente",
        type: "link",
        category: "action",
        analyticsActionTag: "open_horizontal_roadmap",
        href: `/hroadmap/${title.toLowerCase()}`,
      },
    ],
    [
      "download",
      {
        text: "Baixar meu Roadmap",
        type: "button",
        category: "action",
        analyticsActionTag: "download_" + title,
        action: handleDownloadImage,
      },
    ],
  ]);

  return (
    <>
      {buttons.map((button: Button) => {
        const buttonArgs = BUTTON_ACTIONS.get(button);

        return buttonArgs && <ButtonElement {...buttonArgs} />;
      })}
    </>
  );
};

export default RoadmapButtons;
