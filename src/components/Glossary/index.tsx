import { useEffect, useState } from 'react';
import { InstagramMedia } from '../../entity/InstagramModel';
import { useToast } from '../../hooks/useToast';
import { RotatingSquare } from 'react-loader-spinner';

export default function Glossary() {
  const [reels, setReels] = useState<InstagramMedia[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReels, setFilteredReels] = useState<InstagramMedia[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = import.meta.env.VITE_INSTAGRAM_TOKEN;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const media = await fetchUserMedia(token);
        if (Array.isArray(media) && media.length > 0) {
          setReels(media);
        } else {
          setError('Não foi possível carregar os vídeos do Instagram. Tente novamente mais tarde.');
        }
      } catch (error) {
        setError('Erro ao conectar com a API do Instagram.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      setError(null);

      const filtered = reels.filter((reel: InstagramMedia) =>
        reel.caption?.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      if (filtered.length === 0) {
        setError('Não encontramos vídeos com esse termo.');
      }

      setFilteredReels(filtered);
      setLoading(false);
    } else {
      setFilteredReels(reels);
    }
  }, [searchTerm, reels]);

  const fetchUserMedia = async (token: string): Promise<InstagramMedia[]> => {
    let media: InstagramMedia[] = [];
    const userId = '25452501691064340';
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}`;

    const fetchPage = async (url: string): Promise<any> => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Erro na resposta da rede');
        }

        const data = await response.json();
        media = media.concat(data.data);

        if (data.paging && data.paging.next) {
          return fetchPage(data.paging.next);
        } else {
          return media;
        }
      } catch (error) {
        setError('Erro ao conectar com a API do Instagram.');
        return [];
      }
    };

    return fetchPage(url);
  };

  return (
    <section id="blog" className="px-10 pt-4 xl:px-72">
      <h2 className="my-6 font-title text-4xl text-title-primary md:w-1/3">Glossário</h2>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Procure um termo"
          className="h-10 w-full rounded-sm p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {error && searchTerm && (
          <div className="text-red-600 mt-4 rounded-md p-4 text-white">⚠ {error}</div>
        )}

        {!isLoading && !error && (
          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            {filteredReels.slice(0, 4).map((reel: InstagramMedia) => (
              <div key={reel.id} className="cursor-pointer">
                <a href={reel.permalink} target="_blank" rel="noopener noreferrer">
                  <img
                    src={reel.thumbnail_url || reel.media_url}
                    alt={reel.caption}
                    className="cursor-pointer rounded-sm"
                  />
                </a>
              </div>
            ))}
          </div>
        )}

        {isLoading && !error && (
          <div className="flex justify-center">
            <RotatingSquare
              visible={true}
              height="100"
              width="100"
              color="#e1047b"
              ariaLabel="rotating-square-loading"
            />
          </div>
        )}
      </div>
    </section>
  );
}
