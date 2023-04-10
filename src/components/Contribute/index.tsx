import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Contribute() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get('https://api.github.com/repos/flaviojmendes/trilhainfo/issues').then((response) => {
      setIssues(response.data);
    });
  }, []);

  return (
    <section id="mainRoadmaps" className="mb-10 px-10 pt-4 xl:px-64">
      <h2 className="font-semibolds c-yellow my-6 font-title text-4xl md:w-1/3">
        Contribua com a <span className="font-title text-red">Trilha</span>
      </h2>
      <div className="grid grid-cols-1 gap-4  md:grid-cols-2">
        {/* Change ANY to relevant TYPE */}
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          issues.map((issue: any) => (
            <button
              key={issue.id}
              className="rounded-md bg-light-brown p-4 text-dark-brown shadow-brutalist-red transition-all duration-300 hover:bg-light-orange hover:shadow-brutalist-red-hover"
            >
              <a href={issue.html_url} target="_blank" rel="noreferrer">
                {issue.title}
              </a>
            </button>
          ))
        }
      </div>
    </section>
  );
}
