import { useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import Roadmap from '../components/Roadmap';
import useDocumentTitle from '../components/useDocumentTitle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { RoadmapModel } from '../entity/RoadmapModel';
import { Grid } from 'react-loader-spinner';

const cookies = new Cookies();

export default function CustomRoadmapPage() {
  const { roadmapId } = useParams();
  const [isLoadingRoadmap, setLoadingRoadmap] = useState(true);
  const [roadmap, setRoadmap] = useState<RoadmapModel>();

  useEffect(() => {
    async function getRoadmap() {
      const response = await axios.get<RoadmapModel>(
        import.meta.env.VITE_PUBLIC_URL + `/roadmap/${roadmapId}` || '',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: cookies.get('api_token'),
          },
        },
      );
      setLoadingRoadmap(false);
      setRoadmap(Object.assign(new RoadmapModel(), response.data));
    }

    getRoadmap();
  }, [roadmapId]);

  useDocumentTitle(roadmap ? 'Trilha Info - ' + roadmap?.title : 'Trilha Info');

  return (
    <MainLayout>
      <p className="c-brown mb-4 mt-8 text-center font-semibold md:px-28">{roadmap?.description}</p>
      {isLoadingRoadmap && (
        <div className="mt-32 flex w-full justify-center">
          <Grid
            height="80"
            width="80"
            color="#d56a47"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="opacity-100 "
            visible={isLoadingRoadmap}
          />
        </div>
      )}
      {roadmap && (
        <Roadmap
          isPreview={false}
          data={roadmap.getLevels()}
          title={roadmap.title ?? ''}
          name={roadmap.id ?? ''}
          roadmapPath={roadmap.slug ?? ''}
        />
      )}
      {/* {roadmap && <E404Page />} */}
    </MainLayout>
  );
}
