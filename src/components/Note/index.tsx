import { useAuth0 } from '@auth0/auth0-react';
import Cookies from 'universal-cookie';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import { Bars, ThreeDots } from 'react-loader-spinner';
import { RiCloseCircleFill } from 'react-icons/ri';
import { NoteModel } from '../../entity/NoteModel';

const cookies = new Cookies();

type Props = {
  id: string;
  title: string;
};

export default function Note(props: Props) {
  const { getAccessTokenSilently, user, isAuthenticated, loginWithPopup } = useAuth0();
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [isSavingNote, setSavingNote] = useState(false);
  const [isLoadingNotes, setLoadingNotes] = useState(false);
  const [isDeletingNote, setDeletingNote] = useState(false);

  const getNotes = useCallback(async () => {
    setLoadingNotes(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + `/notes/find` || '',
        { contentId: props.id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: cookies.get('api_token'),
          },
        },
      );

      setNotes(response.data);
    } catch (e) {}
    setLoadingNotes(false);
  }, [props.id]);

  useEffect(() => {
    if (user) {
      getNotes();
    }
  }, [user, props.id, getNotes]);

  async function handleDeleteComment(commentId: string) {
    const answer = window.confirm('Tem certeza que quer deletar?');
    if (answer) {
      setDeletingNote(true);
      await axios.delete(import.meta.env.VITE_API_URL + `/notes/${commentId}` || '', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: cookies.get('api_token'),
        },
      });
      getNotes();
      setDeletingNote(false);
    }
  }

  const handleCommentTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setNoteText(inputValue);
  };

  const saveCommentText = async () => {
    setSavingNote(true);
    const comment: NoteModel = {
      text: noteText,
      author: user?.nickname,
      createdAt: new Date(),
      contentId: props.id,
    };

    await axios.post(import.meta.env.VITE_API_URL + `/note` || '', comment, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookies.get('api_token'),
      },
    });
    setNoteText('');
    getNotes();
    setSavingNote(false);
  };

  return (
    <div className="my-8 rounded-lg bg-light-yellow p-4">
      {isAuthenticated && (
        <>
          <h2 className="text-center font-title text-xl font-semibold text-dark-brown">
            Minhas Anotações
          </h2>
          {notes.length > 0 && <hr className="m-auto my-4 w-2/3 border-yellow" />}

          {isLoadingNotes && (
            <div className="flex py-4">
              <Bars
                height="40"
                width="40"
                color="#ee8561"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass="m-auto"
                visible={true}
              />
            </div>
          )}
          {notes.map((note) => {
            return (
              <>
                <div className="mb-4 ">
                  <div className="flex rounded-sm hover:bg-dark-brown hover:bg-opacity-5">
                    <div className="grow flex-col align-middle">
                      <p className="mx-2 mt-2 font-title text-dark-brown">{note.text}</p>
                      <span className="my-auto ml-2 mb-2 inline-block h-fit align-middle font-title text-xs text-red">
                        {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                        {new Date(note.createdAt!).toLocaleString()}
                      </span>
                    </div>
                    <button
                      aria-label="Deletar Comentário"
                      onClick={() => handleDeleteComment(note.id || '')}
                      disabled={isDeletingNote}
                      className="rounded-sm bg-red p-1"
                    >
                      <RiCloseCircleFill className="w-3 text-dark-brown " />
                    </button>
                  </div>
                </div>
                {/* <button
                  aria-label="Deletar Comentário"
                  onClick={() => handleDeleteComment(note.id || "")}
                  disabled={isDeletingNote}
                  className="p-1 rounded-sm bg-red"
                >
                  <RiCloseCircleFill className="w-3 text-dark-brown " />
                </button> */}
              </>
            );
          })}

          <div>
            <textarea
              value={noteText}
              onChange={handleCommentTextChange}
              placeholder="Salve aqui suas anotações para não esquecer!"
              className="min-h-[80px] w-full rounded-sm border-2 border-yellow bg-[transparent] p-2 text-sm leading-snug text-dark-brown outline-none transition-colors focus:border-red"
            />
            <div className="group relative m-auto flex h-fit w-fit">
              <button
                onClick={saveCommentText}
                disabled={isSavingNote}
                className="z-20 mx-auto inline-flex h-10 items-center justify-center rounded-sm bg-brown px-4 font-title leading-tight transition-colors hover:bg-[#E2E8F0] disabled:cursor-not-allowed disabled:bg-opacity-40 disabled:hover:bg-brown disabled:hover:bg-opacity-40"
              >
                {isSavingNote ? (
                  <ThreeDots
                    height="30"
                    width="30"
                    radius="9"
                    color="#d56a47"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  <>Salvar Anotação </>
                )}
              </button>
              <div className="absolute top-1 left-1 -right-1 -bottom-1 z-10 rounded-sm bg-red group-hover:bg-yellow"></div>
            </div>
          </div>
        </>
      )}
      {!isAuthenticated && (
        <p className="text-center font-title">
          Adicione anotações de seus estudos 📝. Para isso basta{' '}
          <button
            className="cursor-pointer font-semibold text-red hover:underline"
            onClick={() => handleAuth()}
          >
            fazer login
          </button>
          .
        </p>
      )}
    </div>
  );

  async function handleAuth() {
    (async () => {
      await loginWithPopup();

      const token = await getAccessTokenSilently({
        audience: 'TrilhaInfoApi',
      });
      cookies.set('api_token', `Bearer ${token}`);

      try {
        await axios.get(import.meta.env.VITE_API_URL + '/user/' + user?.nickname, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: cookies.get('api_token'),
          },
        });
      } catch (e) {
        await axios.post(
          import.meta.env.VITE_API_URL + '/user' || '',
          {
            user_login: user?.nickname,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: cookies.get('api_token'),
            },
          },
        );
      }
      document.location.href = '/';
    })();
  }
}
