import { RoadmapModel } from '../../../entity/RoadmapModel';
import Roadmap from '../../Roadmap';

type Props = {
  roadmap: RoadmapModel;
};

export default function NewRoadmapPreview(props: Props) {
  return (
    <>
      <h2 className="ml-2 mb-4 text-center font-title text-2xl text-light-orange">Preview</h2>
      <div className="h-full w-full rounded-md bg-dark-brown pt-8">
        {props.roadmap.levels?.length > 0 && (
          <Roadmap
            isPreview={true}
            data={props.roadmap.levels}
            name={props.roadmap.title || ''}
            title={props.roadmap.title || ''}
            roadmapPath={props.roadmap.slug || ''}
          />
        )}
        {props.roadmap.levels?.length === 0 && (
          <p className="w-full text-center text-yellow">
            Comece a criar seu Roadmap e veja aqui como ele está ficando.
          </p>
        )}
      </div>
    </>
  );
}
