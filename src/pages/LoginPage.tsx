import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress, Container } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { Grid } from "react-loader-spinner";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function LoginPage() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const token = await getAccessTokenSilently({
          audience: "TrilhaInfoApi",
        });
        cookies.set("api_token", `Bearer ${token}`);

        try {
          await axios.get(import.meta.env.VITE_API_URL + "/user/" + user?.nickname, {
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies.get("api_token"),
            },
          });
        } catch (e) {
          await axios.post(
            import.meta.env.VITE_API_URL + "/user" || "",
            {
              user_login: user?.nickname
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: cookies.get("api_token"),
              },
            },
          );
        }
        document.location.href = "/";
      })();
    }
  }, [getAccessTokenSilently, isAuthenticated, user?.email, user?.nickname]);

  return (
    <>
      <Container centerContent>
      <Grid
              height="80"
              width="80"
              color="#d56a47"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="opacity-100 mt-60"
              visible={true}
            />
      </Container>
    </>
  );
}