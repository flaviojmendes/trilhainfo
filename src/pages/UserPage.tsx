import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { User, mapResponseToUser, UserApiResponse } from '../entity/UserModel';
import MainLayout from '../components/layouts/MainLayout';
import { decode } from 'base-64';

const cookies = new Cookies();

export default function UserPage() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const token = await getAccessTokenSilently({
          audience: 'TrilhaInfoApi',
        });
        cookies.set('api_token', `Bearer ${token}`);

        const base64Payload = token.split('.')[1];
        const payload = decode(base64Payload);
        const email = JSON.parse(payload.toString())['https://trilha.info/email'];

        try {
          const response = await axios.get<UserApiResponse>(
            import.meta.env.VITE_API_URL + '/users/' + email,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: cookies.get('api_token'),
              },
            },
          );
          setUserData(mapResponseToUser(response.data));
        } catch (e) {}
      })();
    }
  }, [getAccessTokenSilently, isAuthenticated, user?.email, user?.nickname]);

  return (
    <MainLayout>
      <div className="flex px-2 md:px-64">
        <div className="my-10 flex">
          <div className="flex w-4 bg-gradient-to-r from-text-secondary via-text-secondary to-black "></div>
          <h2 className={`font-title text-3xl font-bold text-text-primary`}>Dashboard</h2>
        </div>
      </div>
      <div className="flex w-full px-2 md:px-64">
        <div className="flex w-full flex-col gap-4 md:w-1/4">
          <div className="flex flex-col items-center rounded-sm bg-box-primary py-4">
            <img src={user?.picture} alt="avatar" className="mx-auto mb-4 h-32 w-32 rounded-full" />
            <h1 className="text-2xl text-text-primary">{user?.name}</h1>
          </div>
          <div className="flex flex-col items-center rounded-sm bg-box-primary py-4">
            <h2 className="text-xl text-text-primary">
              Último Login: {userData?.lastAccessAt.toLocaleDateString()}
            </h2>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
