import { useEffect, useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import Markdown from 'markdown-to-jsx';
import { useParams } from 'react-router';
import posts from '../../public/posts/posts.json';
import E404Page from './E404Page';

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
      <h3 className="mx-auto grow text-center font-title text-xl font-semibold text-text-primary">
        {children}
      </h3>
    </div>
  </div>
);

const H4Title = ({ children, ...props }: TitleProps) => (
  <div {...props} className="mt-8 flex h-fit w-full">
    <div className="flex">
      {/* <div className="mx-auto h-full w-4 bg-gradient-to-r from-text-secondary via-text-secondary to-black"></div> */}
      <h4 className="mx-auto grow text-center font-title text-lg font-semibold text-text-primary">
        {children}
      </h4>
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

export default function BlogPostPage() {
  const { title } = useParams<string>();
  const exists = posts.some((post) => post.url === title);
  const [state, setState] = useState<{ title?: string; text?: string; error?: boolean }>({});

  useEffect(() => {
    if (!exists) return;
    const controller = new AbortController();
    fetch(`/posts/${title}.md`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Não foi possível carregar a publicação');
        return res.text();
      })
      .then((text) => {
        if (!controller.signal.aborted) setState({ title, text });
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ title, error: true });
      });
    return () => controller.abort();
  }, [title, exists]);

  if (!exists)
    return (
      <MainLayout>
        <E404Page />
      </MainLayout>
    );

  return (
    <MainLayout>
      <div className="my-32 px-4 text-justify text-text-primary lg:mx-80 ">
        {state.title !== title || (!state.text && !state.error) ? (
          <p role="status">Carregando publicação…</p>
        ) : state.error ? (
          <p role="alert">
            Não foi possível carregar a publicação. Recarregue a página para tentar novamente.
          </p>
        ) : (
          <Markdown
            options={{
              disableParsingRawHTML: true,
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
                pre: {
                  component: 'pre',
                  props: {
                    className: 'my-6 overflow-x-auto rounded-lg bg-[#1b202c] p-4 text-left text-sm',
                  },
                },
                code: {
                  component: 'code',
                  props: { className: 'font-mono text-sm' },
                },
              },
            }}
          >
            {state.text || ''}
          </Markdown>
        )}
      </div>
    </MainLayout>
  );
}
