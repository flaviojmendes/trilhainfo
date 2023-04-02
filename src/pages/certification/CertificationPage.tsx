import { useEffect, useState } from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import useDocumentTitle from '../../components/useDocumentTitle';
import { Answer, Certification, Question } from '../../entity/CertificationModel';

import { BsCheck } from 'react-icons/bs';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { RotatingSquare } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
const cookies = new Cookies();

export function CertificationPage() {
  useDocumentTitle('Trilha Info - Certificação');
  const navigate = useNavigate();

  const [certification, setCertification] = useState<Certification>();
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { certificationId } = useParams<string>();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_API_URL + `/certification/${certificationId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: cookies.get('api_token'),
          },
        },
      );
      setCertification(response.data);
      setLoading(false);
    })();
  }, [certificationId]);

  useEffect(() => {
    const selectedQuestions: Question[] = [];
    if (certification) {
      certification.categories.forEach((category) => {
        const shuffledQuestions = category.questions
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);

        shuffledQuestions.slice(0, category.quantity).forEach((question) => {
          selectedQuestions.push(question);
        });
      });
      setSelectedQuestions(selectedQuestions);
    }
  }, [certification]);

  function handleNextQuestion() {
    if (selectedQuestions && currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handlePreviousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function handleSelectedAnswer(answer: Answer, questionIndex: number) {
    if (selectedQuestions) {
      const copy = [...selectedQuestions];
      copy[questionIndex].selectedAnswer = answer;
      setSelectedQuestions(copy);
    }
  }

  function allQuestionsAnswered() {
    if (selectedQuestions) {
      return selectedQuestions.every((question) => question.selectedAnswer);
    }
    return false;
  }

  async function handleSubmitAnswers() {
    setSubmitting(true);
    const response = await axios.post(
      import.meta.env.VITE_API_URL + `/certification/${certificationId}`,
      selectedQuestions,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: cookies.get('api_token'),
        },
      },
    );
    setSubmitting(false);
    navigate(`/certification-result/` + response.data);
  }

  return (
    <MainLayout>
      <div className="flex flex-col">
        <h1 className="mx-auto mt-4 font-title text-3xl font-bold text-yellow">
          {certification?.title}
        </h1>

        <div className="flex flex-col">
          <h2 className="mx-auto text-yellow">{certification?.description}</h2>

          {loading ||
            (submitting && (
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
            ))}

          {!submitting && !loading && selectedQuestions && (
            <>
              {/* Progress Bar */}
              <div className="relative mx-auto mt-4 flex h-12 w-1/2 rounded-md bg-light-brown p-2 shadow-brutalist-light">
                {selectedQuestions.map((question, index) => (
                  <>
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`z-10 my-auto h-6 w-6 cursor-pointer rounded-full transition-all duration-300 hover:h-8 hover:w-8 ${
                        index === currentQuestion ? 'bg-yellow ' : 'bg-red '
                      }}`}
                    >
                      {selectedQuestions[index].selectedAnswer && (
                        <BsCheck className="mx-auto my-auto" />
                      )}
                    </button>
                    {index < selectedQuestions.length - 1 && <div className="h-2 grow"></div>}
                  </>
                ))}
                <div className="absolute left-3 right-3 z-0 my-3 h-2 bg-red"></div>
              </div>

              <div className="mx-auto mt-4 flex w-1/2 flex-col rounded-md bg-brown p-4 shadow-brutalist-light">
                <p className="text-xl">{selectedQuestions[currentQuestion].description}</p>
                {selectedQuestions[currentQuestion].answers.map((answer) => (
                  <button
                    key={answer.label}
                    onClick={() => handleSelectedAnswer(answer, currentQuestion)}
                    className={`m-2 rounded-md p-2 transition-shadow duration-300 hover:shadow-brutalist-neg ${
                      selectedQuestions[currentQuestion].selectedAnswer?.label === answer.label
                        ? 'bg-red '
                        : 'bg-light-orange '
                    }}`}
                  >
                    {answer.label}
                  </button>
                ))}
              </div>

              {/* Previous & Next Buttons */}
              <div className="mx-auto mt-6 flex w-1/2">
                {currentQuestion > 0 && (
                  <button
                    onClick={handlePreviousQuestion}
                    className="rounded-md bg-yellow p-2 shadow-brutalist-light"
                  >
                    Anterior
                  </button>
                )}
                <div className="grow"></div>
                {allQuestionsAnswered() && (
                  <button
                    onClick={handleSubmitAnswers}
                    className="rounded-md bg-yellow p-2 shadow-brutalist-light"
                  >
                    Enviar Respostas
                  </button>
                )}
                <div className="grow"></div>
                {currentQuestion < selectedQuestions.length - 1 && (
                  <button
                    onClick={handleNextQuestion}
                    className="rounded-md bg-yellow p-2 shadow-brutalist-light"
                  >
                    Próxima
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
