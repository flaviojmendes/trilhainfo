import { useEffect, useState, useTransition } from 'react';
import { InstagramMedia } from '../../entity/InstagramModel';
import { FidgetSpinner, RotatingSquare } from 'react-loader-spinner';

export default function Glossary() {
  const [reels, setReels] = useState<InstagramMedia[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReels, setFilteredReels] = useState<InstagramMedia[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const token = import.meta.env.VITE_INSTAGRAM_TOKEN;

    const fetchData = async () => {
      setLoading(true);
      try {
        const media = await fetchUserMedia(token);
        if (media) {
          setReels(media);
          console.log(media);
        }
      } catch (error) {
        console.error('Error fetching media:', error);
      }
      setLoading(false);
    };

    // Call the fetchData function
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredReels(
      reels.filter((reel: InstagramMedia) =>
        reel.caption?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, reels]);

  const fetchUserMedia = async (token: string): Promise<InstagramMedia[]> => {
    let media: InstagramMedia[] = [];
    const userId = '25452501691064340'; // replace with the actual user ID
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}`;

    const fetchPage = async (url: string): Promise<any> => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        media = media.concat(data.data);

        if (data.paging && data.paging.next) {
          return fetchPage(data.paging.next);
        } else {
          return media;
        }
      } catch (error) {
        console.error('Error fetching media:', error);
        return null;
      }
    };

    return fetchPage(url);
  };

  return (
    <section id="blog" className="px-10 pt-4 xl:px-72">
      <h2 className=" my-6 font-title text-4xl text-title-primary md:w-1/3 ">Glossário</h2>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Procure um termo"
          className="h-10 w-full rounded-sm p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          {!isLoading && (
            <>
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
            </>
          )}
        </div>
        {isLoading && (
          <RotatingSquare
            visible={true}
            height="100"
            width="100"
            color="#e1047b"
            ariaLabel="rotating-square-loading"
            wrapperStyle={{}}
            wrapperClass="mx-auto"
          />
        )}
      </div>
    </section>
  );
}
