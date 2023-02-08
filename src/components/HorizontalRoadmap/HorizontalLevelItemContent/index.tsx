import { motion } from 'framer-motion';
import { AccordionContainer, HorizontalRoadmapAccordion } from '../../Accordion';
import { useSelectedItem } from '../LevelProvider';

export function HorizontalLevelItemContent() {
  const [selectedItem] = useSelectedItem();

  return (
    <>
      {!selectedItem && (
        <div className="flex h-full ">
          <p className="m-auto font-title text-red">Selecione um Item à esquerda para estudar.</p>
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
          <h2 className="font-title text-2xl text-light-orange">{selectedItem.label}</h2>
          <p className="my-2 font-title text-xl text-light-orange">{selectedItem.description}</p>
          <AccordionContainer className="w-full" collapsible type="single">
            {selectedItem?.children?.map((section, index) => (
              <HorizontalRoadmapAccordion key={section.label + index} section={section} />
            ))}
          </AccordionContainer>
        </motion.div>
      )}
    </>
  );
}
