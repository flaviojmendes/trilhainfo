import { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '../../entity/PostModel';
import { Link } from 'react-router-dom';
import { BsArrowRightCircleFill } from 'react-icons/bs';

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get<Post[]>(`/posts/posts.json`);
      setPosts(res.data);
    })();
  }, []);

  return (
    <section id="blog" className="px-10 pt-4 xl:px-72">
      <h2 className=" my-6 font-title text-4xl text-title-primary md:w-1/3 ">Revista Semanal</h2>

      <div className="my-10 flex flex-wrap">
        {posts.map((post) => {
          return (
            <Link
              key={post.title}
              className="z-20 flex w-full flex-col rounded-sm bg-box-primary py-3 pr-2 duration-100 hover:shadow-primary-blue"
              to={`/blog/${post.url}`}
            >
              <div className="w-fit">
                <h3 className="ml-4 mb-2 font-title text-3xl font-semibold text-text-primary">
                  {post.title}
                </h3>
                <div className="to-transparent ml-4 h-1 w-full bg-gradient-to-r from-primary"></div>
              </div>
              <p className="m-4 font-title text-sm text-text-primary">{post.summary}</p>
              <div className="ml-4 flex text-primary">
                <span className="my-auto font-title font-semibold">Ler</span>
                <BsArrowRightCircleFill className="my-auto ml-2" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex w-full gap-2">
        <div className="flex-grow"></div>
        <div className="h-3 w-4 bg-gradient-to-r from-text-secondary to-black"></div>
        <div className="h-3 w-64 bg-gradient-to-r from-primary via-primary to-black"></div>
      </div>
    </section>
  );
}
