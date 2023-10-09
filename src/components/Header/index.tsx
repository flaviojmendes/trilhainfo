import MobileMenu from '../MobileMenu';

export default function Header() {
  return (
    <header className="fixed flex h-20 w-full flex-wrap justify-center bg-[rgb(41,41,43)] bg-opacity-50 p-2 px-10 shadow-sm backdrop-blur-md xl:px-64">
      <MobileMenu />

      <a href="/" className="relative my-auto ">
        <img src="/logo.png" className="w-48" alt="Logo" />
      </a>
      <div className="grow"></div>

      {/* <nav className="hidden md:flex" aria-label="navegação principal">
        <ul className="flex">
          <li className="flex">
            <a
              target={'_blank'}
              className="my-2 mr-4 flex pr-4 text-yellow hover:text-red"
              href="https://discord.gg/TmneeHgTBp"
              rel="noreferrer"
              aria-label="Discord"
            >
              <FaDiscord className="m-auto h-10 w-10 " />
            </a>
          </li>
          <li className="flex">
            <a
              target={'_blank'}
              className="my-2 mr-4 flex pr-4 text-yellow hover:text-red"
              href="https://github.com/flaviojmendes/trilhadev"
              rel="noreferrer"
              aria-label="Github"
            >
              <FaGithubSquare className="m-auto h-10 w-10 " />
            </a>
          </li>

          <li className="flex">
            {isAuthenticated && (
              <>
                <div className="w-200 flex align-middle text-yellow">
                  <img
                    className="m-auto h-10 w-10 rounded-full"
                    src={user?.picture}
                    alt={user?.name}
                  />
                  <span className="m-auto ml-2 mr-4 font-title text-base">{user?.name}</span>
                </div>
                <div className="group relative m-auto flex h-fit w-fit">
                  <button
                    className="z-20 m-auto rounded-md bg-brown p-2 hover:bg-light-orange"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </button>
                  <div className="absolute top-1 left-1 -right-1 -bottom-1 z-10 rounded-md bg-red group-hover:bg-red"></div>
                </div>
              </>
            )}
          </li>
          <li className="flex">
            {!isAuthenticated && !isLoading && (
              <div className="group relative m-auto flex h-fit w-fit">
                <button
                  className="z-20 m-auto rounded-md bg-light-brown p-2 font-title hover:bg-brown"
                  onClick={() => handleAuth()}
                >
                  Log In
                </button>
                <div className="absolute top-1 left-1 -right-1 -bottom-1 z-10 rounded-md bg-red group-hover:bg-red"></div>
              </div>
            )}
            {isLoading && (
              <ThreeDots
                height="30"
                width="30"
                radius="9"
                color="#d56a47"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            )}
          </li>
        </ul>
      </nav> */}
    </header>
  );

  //   async function handleAuth() {
  //     (async () => {
  //       await loginWithPopup();

  //       const token = await getAccessTokenSilently({
  //         audience: 'TrilhaInfoApi',
  //       });
  //       cookies.set('api_token', `Bearer ${token}`);

  //       try {
  //         await axios.get(import.meta.env.VITE_API_URL + '/user/' + user?.nickname, {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: cookies.get('api_token'),
  //           },
  //         });
  //       } catch (e) {
  //         await axios.post(
  //           import.meta.env.VITE_API_URL + '/user' || '',
  //           {
  //             user_login: user?.nickname,
  //           },
  //           {
  //             headers: {
  //               'Content-Type': 'application/json',
  //               Authorization: cookies.get('api_token'),
  //             },
  //           },
  //         );
  //       }
  //       document.location.href = '/';
  //     })();
  //   }
}
