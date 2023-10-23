import { useEffect, useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import Markdown from 'markdown-to-jsx';
import { useParams } from 'react-router';
import useDocumentTitle from '../components/useDocumentTitle';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

type TitleProps = {
  children: React.ReactNode;
};

const Title = ({ children, ...props }: TitleProps) => (
  <div {...props} className="w-full">
    {' '}
    <h1 className="mx-auto mt-4 text-center font-title text-4xl text-title-primary">{children}</h1>
    <div className="mb-16 mt-2 flex w-full gap-2">
      <div className="mx-auto h-2 w-64 bg-gradient-to-r from-black via-primary to-black"></div>
    </div>
  </div>
);

const SecondaryTitle = ({ children, ...props }: TitleProps) => (
  <div {...props} className="flex h-fit w-full">
    <div className="flex">
      <div className="mx-auto h-full w-4 bg-gradient-to-r from-text-secondary via-text-secondary to-black"></div>
      <h2 className="mx-auto grow text-center font-title text-3xl text-title-primary">
        {children}
      </h2>
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

const hr = ({ children, ...props }: TitleProps) => (
  <div {...props} className="">
    <div className="my-10 flex w-full gap-2">
      <div className="flex-grow"></div>
      <div className="h-3 w-4 bg-gradient-to-r from-text-secondary to-black"></div>
      <div className="h-3 w-64 bg-gradient-to-r from-primary via-primary to-black"></div>
    </div>
  </div>
);

const code = ({ children, ...props }: TitleProps) => (
  <div {...props} className="flex h-fit w-full">
    <div className="mx-auto flex w-fit text-xs">
      <SyntaxHighlighter
        language="javascript"
        style={dracula}
        showInlineLineNumbers={true}
        showLineNumbers={true}
        breakpoint={40}
        wrapLines={true}
        wrapLongLines={true}
      >
        {children?.toString() || ''}
      </SyntaxHighlighter>
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
      <div className="my-32 px-4 text-justify text-text-primary lg:mx-80 ">
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
              hr: {
                component: hr,
              },
              a: {
                component: 'a',
                props: {
                  className: 'text-primary hover:text-primary-shadow',
                },
              },
              code: {
                component: code,
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
