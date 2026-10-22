import { homeQuestions } from '../seo/faq';

export default function HomeQuestions() {
  return (
    <section className="home-section home-questions" aria-labelledby="questions-title">
      <header className="home-section-head">
        <h2 id="questions-title">Dúvidas sobre como estudar</h2>
      </header>
      <dl>
        {homeQuestions.map(({ question, answer }) => (
          <div key={question}>
            <dt>{question}</dt>
            <dd>{answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
