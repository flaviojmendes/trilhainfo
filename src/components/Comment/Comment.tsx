import { useAuth0 } from "@auth0/auth0-react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Badge,
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "universal-cookie";
import getUuidByString from "uuid-by-string";

import { ChangeEvent, useEffect, useState } from "react";
import { CommentModel } from "../../entity/Comments";
import axios, { AxiosError } from "axios";
import { ThreeDots } from "react-loader-spinner";

const cookies = new Cookies();

type Props = {
  id: string;
  title: string;
};

export default function Comment(props: Props) {
  const { isAuthenticated, user, isLoading, logout } = useAuth0();

  const { isOpen, onOpen, onClose } = useDisclosure();
  let [commentText, setCommentText] = useState("");
  let [comments, setComments] = useState<CommentModel[]>([]);
  let [isSavingComment, setSavingComment] = useState(false);
  let [isDeletingComment, setDeletingComment] = useState(false);

  useEffect(() => {
    if (user) {
      getComments();
    }
  }, []);

  async function getComments() {
    // setLoadingRoadmaps(true);
    try {
      console.log(getUuidByString(props.id));
      let response = await axios.get(
        import.meta.env.VITE_PUBLIC_URL +
          `/comments/${getUuidByString(props.id)}` || "",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setComments(response.data);
    } catch (e) {
      if (e instanceof AxiosError) {
      }
    }
  }

  async function handleDeleteComment(commentId: string) {
    const answer = window.confirm("Tem certeza que quer deletar?");
    if (answer) {
      setDeletingComment(true);
      let response = await axios.delete(
        import.meta.env.VITE_API_URL + `/comments/${commentId}` || "",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.get("api_token"),
          },
        }
      );
      getComments();
      setDeletingComment(false);
    }
  }

  let handleCommentTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setCommentText(inputValue);
  };

  let saveCommentText = async () => {
    setSavingComment(true);
    let comment: CommentModel = {
      text: commentText,
      author: user?.nickname,
      createdAt: new Date(),
      contentId: getUuidByString(props.id),
    };

    await axios.post(import.meta.env.VITE_API_URL + `/comment` || "", comment, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("api_token"),
      },
    });
    setCommentText("");
    getComments();
    setSavingComment(false);
  };

  return (
    <>
      <Badge
        colorScheme={"blackAlpha"}
        p={1}
        rounded={"md"}
        className="h-5"
        fontSize="0.6em"
        mr="1"
        cursor={"pointer"}
        onClick={onOpen}
      >
        {comments?.length} Comentários
      </Badge>

      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="bd-handwritten">
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {comments.map((comment, index) => {
              return (
                <div className=" mb-4">
                  {isAuthenticated && comment.author === user?.nickname && (
                    <div className="flex flex-row-reverse">
                      <IconButton
                        size={"xs"}
                        aria-label="Deletar Comentário"
                        onClick={() => handleDeleteComment(comment.id || "")}
                        disabled={isDeletingComment}
                        icon={<DeleteIcon />}
                      />
                    </div>
                  )}
                  <p className="mb-0">{comment.text}</p>
                  <span className="text-red text-xs">
                    {comment.author +
                      " - " +
                      new Date(comment.createdAt!).toLocaleString()}
                  </span>
                </div>
              );
            })}
            {isAuthenticated && (
              <>
                <h3 className="font-bold">Comente:</h3>
                <div>
                  <Textarea
                    value={commentText}
                    onChange={handleCommentTextChange}
                    placeholder="Here is a sample placeholder"
                    size="sm"
                  />
                  <Button
                    mx={"auto"}
                    mt={2}
                    onClick={saveCommentText}
                    disabled={isSavingComment}
                  >
                    {isSavingComment ? (
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
                      <>Salvar Comentário </>
                    )}
                  </Button>
                </div>
              </>
            )}
            {!isAuthenticated && <span className="text-dark-blue">Você precisa fazer login para postar um comentário.</span>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
