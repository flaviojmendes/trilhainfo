import { useEffect, useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import Markdown from 'markdown-to-jsx';
import { useParams } from 'react-router';
import useDocumentTitle from '../components/useDocumentTitle';

type TitleProps = {
  children: React.ReactNode;
};

const Title = ({ children, ...props }: TitleProps) => (
  <div {...props} className="w-full">
    {' '}
    <h1 className="mx-auto mt-4 text-center font-title text-4xl text-text-primary">{children}</h1>
    <div className="mt-2 mb-16 flex w-full gap-2">
      <div className="mx-auto h-2 w-64 bg-gradient-to-r from-black via-primary to-black"></div>
    </div>
  </div>
);

const SecondaryTitle = ({ children, ...props }: TitleProps) => (
  <div {...props} className="flex h-fit w-full">
    <div className="flex">
      <div className="mx-auto h-full w-4 bg-gradient-to-r from-text-secondary via-text-secondary to-black"></div>
      <h2 className="mx-auto grow text-center font-title text-3xl text-text-primary">{children}</h2>
    </div>
  </div>
);

const H3Title = ({ children, ...props }: TitleProps) => (
  <div {...props} className="mt-8 flex h-fit w-full">
    <div className="flex">
      {/* <div className="mx-auto h-full w-4 bg-gradient-to-r from-text-secondary via-text-secondary to-black"></div> */}
      <h2 className="mx-auto grow text-center font-title text-xl font-semibold text-text-primary">
        {children}
      </h2>
    </div>
  </div>
);

const H4Title = ({ children, ...props }: TitleProps) => (
  <div {...props} className="mt-8 flex h-fit w-full">
    <div className="flex">
      {/* <div className="mx-auto h-full w-4 bg-gradient-to-r from-text-secondary via-text-secondary to-black"></div> */}
      <h2 className="mx-auto grow text-center font-title text-lg font-semibold text-text-primary">
        {children}
      </h2>
    </div>
  </div>
);

export default function BlogPostPage() {
  const { title } = useParams<string>();

  const [post, setPost] = useState('');

  useEffect(() => {
    fetch(`/posts/${title}.md`)
      .then((res) => {
        console.log(res);
        return res.text();
      })
      .then((res) => {
        console.log(res);
        return setPost(res);
      })
      .catch((err) => console.log(err));
  });

  useDocumentTitle(
    `${
      title
        ? title.split('-')[0].charAt(0).toUpperCase() +
          title.split('-')[0].slice(1) +
          ' #' +
          title.split('-')[1]
        : ''
    }`,
  );

  return (
    <MainLayout>
      <div className="my-32 px-2 text-text-primary lg:px-64">
        <Markdown
          options={{
            forceWrapper: false,
            overrides: {
              article: {
                component: 'article',
                props: {
                  className: 'flex',
                },
              },
              p: {
                component: 'p',
                props: {
                  className: 'my-4',
                },
              },
              h1: {
                component: Title,
              },
              h2: {
                component: SecondaryTitle,
              },
              h3: {
                component: H3Title,
              },
              h4: {
                component: H4Title,
              },
              img: {
                component: 'img',
                props: {
                  className: 'mx-auto',
                },
              },

              a: {
                component: 'a',
                props: {
                  className: 'text-primary hover:text-primary-shadow',
                },
              },
            },
          }}
        >
          {post}
        </Markdown>
      </div>
    </MainLayout>
  );
}
