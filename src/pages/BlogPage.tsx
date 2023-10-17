import MainLayout from '../components/layouts/MainLayout';
import Markdown from 'markdown-to-jsx';

export default function BlogPage() {
  return (
    <MainLayout>
      <div>
        <Markdown
          options={{
            overrides: {
              h1: {
                component: 'h1',
                props: {
                  className: 'text-4xl mt-4 text-center font-title',
                },
              },
            },
          }}
        >
          # Hello world!
        </Markdown>
      </div>
    </MainLayout>
  );
}
