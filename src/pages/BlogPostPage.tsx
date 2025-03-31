import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Markdown from 'markdown-to-jsx';
import MainLayout from '../components/layouts/MainLayout';
import useDocumentTitle from '../components/useDocumentTitle';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

type TitleProps = {
  children: React.ReactNode;
};

const Title = ({ children }: TitleProps) => (
  <div className="w-full">
    <h1 className="mx-auto mt-4 text-4xl text-center font-title text-title-primary">{children}</h1>
    <div className="flex w-full gap-2 mt-2 mb-16">
      <div className="w-64 h-2 mx-auto bg-gradient-to-r from-black via-primary to-black"></div>
    </div>
  </div>
);

const SecondaryTitle = ({ children }: TitleProps) => (
  <div className="flex w-full h-fit">
    <div className="flex">
      <div className="w-4 h-full mx-auto bg-gradient-to-r from-text-secondary via-text-secondary to-black"></div>
      <h2 className="mx-auto text-3xl text-center grow font-title text-title-primary">
        {children}
      </h2>
    </div>
  </div>
);

const H3Title = ({ children }: TitleProps) => (
  <div className="flex w-full mt-8 h-fit">
    <h2 className="mx-auto text-xl font-semibold text-center grow font-title text-text-primary">
      {children}
    </h2>
  </div>
);

const H4Title = ({ children }: TitleProps) => (
  <div className="flex w-full mt-8 h-fit">
    <h2 className="mx-auto text-lg font-semibold text-center grow font-title text-text-primary">
      {children}
    </h2>
  </div>
);

const Hr = () => (
  <div className="flex w-full gap-2 my-10">
    <div className="flex-grow"></div>
    <div className="w-4 h-3 bg-gradient-to-r from-text-secondary to-black"></div>
    <div className="w-64 h-3 bg-gradient-to-r from-primary via-primary to-black"></div>
  </div>
);

const CodeBlock = ({ children }: TitleProps) => {
  const codeString = Array.isArray(children) ? children.join('') : String(children);

  return (
    <div className="flex w-full h-fit">
      <div className="flex mx-auto overflow-auto text-xs w-fit">
        <SyntaxHighlighter
          language="javascript"
          style={dracula}
          showInlineLineNumbers
          showLineNumbers
          wrapLines
          wrapLongLines
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default function BlogPostPage() {
  const { title } = useParams<{ title: string }>();
  const [post, setPost] = useState('');

  useEffect(() => {
    if (!title) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/posts/${title}.md`);
        const text = await res.text();
        setPost(text);
      } catch (error) {
        console.error('Erro ao carregar o post:', error);
      }
    };

    fetchPost();
  }, [title]);

  useDocumentTitle(
    title
      ? title
          .split('-')
          .map((word, index) =>
            index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : `#${word}`,
          )
          .join(' ')
      : '',
  );

  return (
    <MainLayout>
      <div className="px-4 my-32 text-justify text-text-primary lg:mx-80">
        <Markdown
          options={{
            forceWrapper: false,
            overrides: {
              article: { component: 'article', props: { className: 'flex' } },
              p: { component: 'p', props: { className: 'my-4' } },
              h1: { component: Title },
              h2: { component: SecondaryTitle },
              h3: { component: H3Title },
              h4: { component: H4Title },
              img: { component: 'img', props: { className: 'mx-auto' } },
              hr: { component: Hr },
              a: { component: 'a', props: { className: 'text-primary hover:text-primary-shadow' } },
              code: { component: CodeBlock },
            },
          }}
        >
          {post}
        </Markdown>
      </div>
    </MainLayout>
  );
}
