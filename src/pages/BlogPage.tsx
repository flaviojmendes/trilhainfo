import { Link } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import posts from '../../public/posts/posts.json';
import '../components/Guide/guide.css';
import '../components/Lesson/lesson.css';

export default function BlogPage() {
  return (
    <MainLayout>
      <div className="guide-page">
        <header className="guide-hero">
          <h1>Blog de tecnologia e carreira</h1>
          <p className="guide-summary">
            Conceitos de desenvolvimento de software, livros e reflexões para quem estuda e trabalha
            com tecnologia.
          </p>
        </header>
        <ul className="lessons-list">
          {posts.map((post) => (
            <li key={post.url}>
              <Link to={`/blog/${post.url}`}>
                <span className="lessons-text">
                  <strong>{post.title}</strong>
                  <span>{post.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
}
