import { useAuth0 } from "@auth0/auth0-react";
import { Button, Textarea } from "@chakra-ui/react";
import Cookies from "universal-cookie";

import { ChangeEvent, useEffect, useState } from "react";

import axios, { AxiosError } from "axios";
import { Bars, ThreeDots } from "react-loader-spinner";
import { RiCloseCircleFill } from "react-icons/ri";
import { NoteModel } from "../../entity/NoteModel";

const cookies = new Cookies();

type Props = {
  id: string;
  title: string
};

export default function Note(props: Props) {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  let [noteText, setNoteText] = useState("");
  let [notes, setNotes] = useState<NoteModel[]>([]);
  let [isSavingNote, setSavingNote] = useState(false);
  let [isLoadingNotes, setLoadingNotes] = useState(false);
  let [isDeletingNote, setDeletingNote] = useState(false);

  useEffect(() => {
    if (user) {
      getNotes();
    }
  }, [user, props.id]);

  async function getNotes() {
    setLoadingNotes(true);
    try {
      let response = await axios.post(
        import.meta.env.VITE_API_URL + `/notes/find` || "",
        { contentId: props.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.get("api_token"),
          },
        }
      );

      setNotes(response.data);
    } catch (e) {
      if (e instanceof AxiosError) {
      }
    }
    setLoadingNotes(false);
  }

  async function handleDeleteComment(commentId: string) {
    const answer = window.confirm("Tem certeza que quer deletar?");
    if (answer) {
      setDeletingNote(true);
      await axios.delete(
        import.meta.env.VITE_API_URL + `/notes/${commentId}` || "",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.get("api_token"),
          },
        }
      );
      getNotes();
      setDeletingNote(false);
    }
  }

  let handleCommentTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setNoteText(inputValue);
  };

  let saveCommentText = async () => {
    setSavingNote(true);
    let comment: NoteModel = {
      text: noteText,
      author: user?.nickname,
      createdAt: new Date(),
      contentId: props.id,
    };

    await axios.post(import.meta.env.VITE_API_URL + `/note` || "", comment, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("api_token"),
      },
    });
    setNoteText("");
    getNotes();
    setSavingNote(false);
  };

  return  (
    <div className="bg-light-yellow rounded-lg p-4 my-8">
      {isAuthenticated && (
        <>
          <h2 className="font-title text-dark-brown text-center font-semibold text-xl">
            Minhas Anotações
          </h2>
          {notes.length > 0 && (
            <hr className="w-2/3 m-auto my-4 border-yellow" />
          )}

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
          {notes.map((note ) => {
            return (
              <>
                <div className="mb-4 ">
                  <div className="flex hover:bg-dark-brown hover:bg-opacity-5 rounded-sm">
                    <div className="flex-col grow align-middle">
                      <p className="mx-2 mt-2 text-dark-brown font-title">
                        {note.text}
                      </p>
                      <span className="ml-2 mb-2 text-red text-xs inline-block align-middle h-fit font-title my-auto">
                        {new Date(note.createdAt!).toLocaleString()}
                      </span>
                    </div>
                    <button
                      aria-label="Deletar Comentário"
                      onClick={() => handleDeleteComment(note.id || "")}
                      disabled={isDeletingNote}
                      className="p-1 rounded-sm bg-red"
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
          )})}

          <div>
            <Textarea
              value={noteText}
              onChange={handleCommentTextChange}
              placeholder="Salve aqui suas anotações para não esquecer!"
              size="sm"
              borderColor={"#eabc54"}
              borderWidth={"2px"}
              rounded={"md"}
              _focus={{ borderColor: "#ee8561" }}
              className="text-dark-brown"
            />
            <Button
              mx={"auto"}
              mt={2}
              fontWeight={"normal"}
              onClick={saveCommentText}
              disabled={isSavingNote}
              className="font-title"
              backgroundColor={"#e9dad5"}
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
            </Button>
          </div>
        </>
      )}
      {!isAuthenticated && (
        <p className="text-center font-title">
          Adicione anotações de seus estudos 📝. Para isso basta{" "}
          <span
            className="cursor-pointer font-semibold text-red hover:underline"
            onClick={() => loginWithRedirect()}
          >
            fazer login
          </span>
          .
        </p>
      )}
    </div>
  ) ;
}
