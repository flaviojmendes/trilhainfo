// import axios from 'axios';
// import { useEffect, useState } from 'react';

export default function Contribute() {
  // const [issues, setIssues] = useState([]);

  // useEffect(() => {
  //   // axios.get('https://api.github.com/repos/flaviojmendes/trilhainfo/issues').then((response) => {
  //     // setIssues(response.data);
  //   // });
  // }, []);

  return (
    <section id="mainRoadmaps" className="px-10 pt-4 xl:px-64">
      <h2 className="font-semibolds c-yellow my-6 font-title text-4xl md:w-1/3">
        Contribua com a Trilha <span className="font-title text-red">contribuições</span>
      </h2>
      <div className="flex flex-col">
        {/* Change ANY to relevant TYPE */}
        {/* {issues.map((issue: any) => (
          <div key={issue.id} className="text-yellow">
            <a href={issue.html_url}>{issue.title}</a>
          </div>
        ))} */}
      </div>
    </section>
  );
}
