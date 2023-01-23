import { render } from '@testing-library/react';
import MainRoadmaps from '.';
import { BrowserRouter as Router } from 'react-router-dom';
import { mainRoadmapsData } from './mainRoadmapsData';

describe('<MainRoadmaps />', () => {
  it('should render all roadmaps', () => {
    const { getByRole } = render(
      <Router>
        <MainRoadmaps />
      </Router>,
    );
    mainRoadmapsData.forEach((roadmap) => {
      expect(getByRole('heading', { name: roadmap.title, exact: true })).toBeInTheDocument();
    });
  });
});
