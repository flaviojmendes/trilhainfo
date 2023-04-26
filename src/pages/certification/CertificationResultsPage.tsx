import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/layouts/MainLayout';
import Cookies from 'universal-cookie';
import { RotatingSquare } from 'react-loader-spinner';
import { CertificationResult } from '../../entity/CertificationModel';
import dayjs from 'dayjs';
const cookies = new Cookies();

export default function CertificationResultsPage() {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth0();
  const { certificationResultId } = useParams<string>();
  const [loading, setLoading] = useState(true);
  const [certificationResults, setCertificationResults] = useState<CertificationResult[]>();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        setLoading(true);
        const response = await axios.get<CertificationResult[]>(
          import.meta.env.VITE_API_URL + `/certification-results`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: cookies.get('api_token'),
            },
          },
        );
        console.log(response.data);
        setCertificationResults(response.data);
        setLoading(false);
      })();
    }
  }, [isAuthenticated, certificationResultId]);

  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        {loading ? (
          <RotatingSquare
            height="100"
            width="100"
            color="#D2A94B"
            ariaLabel="rotating-square-loading"
            strokeWidth="4"
            wrapperStyle={{}}
            visible={true}
          />
        ) : (
          <>
            <h1 className="mx-auto mt-4 mb-10 font-title text-3xl font-bold text-yellow">
              Minhas Certificações
            </h1>

            {certificationResults?.map((certificationResult) => (
              <button
                key={certificationResult.id}
                onClick={() => navigate(`/certification-result/${certificationResult.id}`)}
                className="mx-auto flex w-1/3 cursor-pointer rounded-md bg-light-yellow p-4 text-center shadow-brutalist-light transition-all duration-300 hover:bg-light-orange hover:shadow-brutalist-light-hover"
              >
                <div className="flex flex-col">
                  <span className="mx-auto">{certificationResult.title}</span>{' '}
                  <span className="mx-auto text-xs">
                    {dayjs(certificationResult.date * 1000).format('DD/MM/YYYY - HH:mm:ss')}
                  </span>
                </div>
                <div className="grow"></div>
                <div className="my-auto text-2xl">{`${
                  (certificationResult.correctQuestions / certificationResult.questions.length) *
                  100
                }%`}</div>
              </button>
            ))}
          </>
        )}
      </div>
    </MainLayout>
  );
}
