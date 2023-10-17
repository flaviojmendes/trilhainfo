import { useEffect, useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import Markdown from 'markdown-to-jsx';
import { useParams } from 'react-router';
import useDocumentTitle from '../components/useDocumentTitle';

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
      <div className="my-32 px-64 text-text-primary">
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
                component: 'h1',
                props: {
                  className:
                    'text-4xl text-center mx-auto text-text-primary mt-4 text-center font-title',
                },
              },
              h2: {
                component: 'h2',
                props: {
                  className: 'text-3xl mx-auto text-text-primary mt-6 text-center font-title',
                },
              },
              h3: {
                component: 'h3',
                props: {
                  className: 'text-2xl mx-auto text-text-primary mt-6 text-center font-title',
                },
              },
              h4: {
                component: 'h4',
                props: {
                  className: 'text-xl mx-auto text-text-primary mt-6 text-center font-title',
                },
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
