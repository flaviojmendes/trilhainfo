import { RoadmapModel } from "../../../entity/RoadmapModel";
import Roadmap from "../../Roadmap/Roadmap";

type Props = {
  roadmap: RoadmapModel;
};

export default function NewRoadmapPreview(props: Props) {
  return (
    <>
      <h2 className="font-title text-light-orange text-center text-2xl ml-2 mb-4">
        Preview
      </h2>
      <div className="w-full bg-dark-brown h-full rounded-md pt-8">
        {props.roadmap.levels?.length > 0 && (
          <Roadmap
            isPreview={true}
            data={props.roadmap.levels}
            name={props.roadmap.title || ""}
            title={props.roadmap.title || ""}
          />
        )}
        {props.roadmap.levels?.length === 0 && <p className="text-center w-full text-yellow">Comece a criar seu Roadmap e veja aqui como ele está ficando.</p>}
      </div>
    </>
  );
}
