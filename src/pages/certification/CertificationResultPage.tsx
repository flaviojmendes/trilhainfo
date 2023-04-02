import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/layouts/MainLayout';
import Cookies from 'universal-cookie';
import { RotatingSquare } from 'react-loader-spinner';
import { CertificationResult } from '../../entity/CertificationModel';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
const cookies = new Cookies();

export default function CertificationResultPage() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const { certificationResultId } = useParams<string>();
  const [loading, setLoading] = useState(true);
  const [certificationResult, setCertificationResult] = useState<CertificationResult>();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        setLoading(true);
        const response = await axios.get<CertificationResult>(
          import.meta.env.VITE_API_URL + `/certification-result/${certificationResultId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: cookies.get('api_token'),
            },
          },
        );
        console.log(response.data);
        setCertificationResult(response.data);
        setLoading(false);
      })();
    }
  }, [isAuthenticated, certificationResultId]);

  function calculateScore() {
    if (certificationResult) {
      const score = certificationResult?.correctQuestions / certificationResult?.questions.length;
      return Math.round(score * 100);
    }
    return 0;
  }

  return (
    <MainLayout>
      <div className="flex flex-col">
        {loading ? (
          <RotatingSquare
            height="100"
            width="100"
            color="#D2A94B"
            ariaLabel="rotating-square-loading"
            strokeWidth="4"
            wrapperStyle={{}}
            wrapperClass="mx-auto mt-4"
            visible={true}
          />
        ) : (
          <div className="flex flex-col">
            <h1 className="mx-auto mt-4 font-title text-3xl font-bold text-yellow">
              {certificationResult?.title}
            </h1>

            <h2 className="mx-auto mt-4 font-title text-3xl font-bold text-red">
              {`Você acertou: ${calculateScore()}%`}
            </h2>

            <div className="mt-4 flex flex-col gap-4">
              {certificationResult?.questions.map((question, index) => (
                <div
                  key={index}
                  className={`relative mx-auto flex w-1/3 flex-col rounded-md p-4 shadow-brutalist-light ${
                    question.selectedAnswer?.correct ? ' bg-light-blue ' : 'bg-light-orange '
                  }`}
                >
                  {question.selectedAnswer?.correct ? (
                    <AiOutlineCheckCircle className="absolute right-4" />
                  ) : (
                    <AiOutlineCloseCircle className="absolute right-4" />
                  )}

                  <h3 className="mx-auto font-title text-xl font-bold text-dark-brown">
                    {question.description}
                  </h3>
                  <h4 className="mx-auto font-title text-lg font-bold text-dark-brown">
                    {`Sua resposta: ${question.selectedAnswer?.label}`}
                  </h4>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/certification-results')}
              className="mx-auto mt-6 w-fit rounded-md bg-yellow p-2 shadow-brutalist-light transition-all duration-300 hover:shadow-brutalist-light-hover"
            >
              Ver minhas certificações
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
