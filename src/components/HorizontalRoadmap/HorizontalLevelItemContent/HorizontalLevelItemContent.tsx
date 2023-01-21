import { motion } from 'framer-motion';
import { RoadmapAccordion } from '../../Accordion';
import { useSelectedItem } from '../LevelProvider/LevelProvider';
import { Root as AccordionContainer } from '@radix-ui/react-accordion';

export function HorizontalLevelItemContent() {
  const [selectedItem] = useSelectedItem();

  return (
    <>
      {!selectedItem && (
        <div className="flex h-full ">
          <p className="m-auto font-title text-red">
            Selecione um Item à esquerda para estudar.
          </p>
        </div>
      )}

      {selectedItem && (
        <motion.div
          key={selectedItem.label}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          className="flex flex-col px-4"
        >
          <h2 className="font-title text-2xl text-light-orange">
            {selectedItem.label}
          </h2>
          <p className="font-title text-xl text-light-orange my-2">
            {selectedItem.description}
          </p>
          <AccordionContainer className="w-full" collapsible type="single">
            {selectedItem?.children?.map((section, index) => (
              <RoadmapAccordion
                isHorizontalPage
                key={section.label + index}
                section={section}
              />
            ))}
          </AccordionContainer>
        </motion.div>
      )}
    </>
  );
}
