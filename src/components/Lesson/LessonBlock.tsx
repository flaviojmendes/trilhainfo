import { GuideBlockView } from '../Guide/GuideBlock';
import { LessonBlock } from '../../lessons/types';
import { Classify, Fill, Order, Quiz } from './activities';
import { BoxModel, ContrastLab, LayoutLab, SpecificityLab } from './labs';
import { Playground } from './Playground';
import { PythonLab, SqlLab, Terminal } from './runners';
import { Analogy, Anatomy, CodeTabs, DomTree, Flow, Reveal, ScreenReader, Trace } from './visuals';

export function LessonBlockView({
  block,
  activityId,
  lessonId,
}: {
  block: LessonBlock;
  activityId: string;
  lessonId: string;
}) {
  switch (block.type) {
    case 'quiz':
      return <Quiz block={block} activityId={activityId} />;
    case 'order':
      return <Order block={block} activityId={activityId} />;
    case 'classify':
      return <Classify block={block} activityId={activityId} />;
    case 'fill':
      return <Fill block={block} activityId={activityId} />;
    case 'playground':
      return <Playground block={block} activityId={activityId} />;
    case 'terminal':
      return <Terminal block={block} activityId={activityId} />;
    case 'sql':
      return <SqlLab block={block} activityId={activityId} />;
    case 'python':
      return <PythonLab block={block} activityId={activityId} />;
    case 'analogy':
      return <Analogy block={block} />;
    case 'reveal':
      return <Reveal block={block} />;
    case 'anatomy':
      return <Anatomy block={block} />;
    case 'flow':
      return <Flow block={block} />;
    case 'trace':
      return <Trace block={block} />;
    case 'codeTabs':
      return <CodeTabs block={block} />;
    case 'domTree':
      return <DomTree block={block} />;
    case 'screenReader':
      return <ScreenReader block={block} />;
    case 'boxModel':
      return <BoxModel />;
    case 'layoutLab':
      return <LayoutLab block={block} />;
    case 'specificity':
      return <SpecificityLab block={block} />;
    case 'contrast':
      return <ContrastLab block={block} />;
    default:
      return <GuideBlockView block={block} guideId={`aula-${lessonId}`} />;
  }
}
