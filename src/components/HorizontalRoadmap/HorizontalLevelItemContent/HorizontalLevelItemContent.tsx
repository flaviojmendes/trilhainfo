import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Checkbox } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { RoadmapItem } from "../../../entity/RoadmapModel";
import { getColorFromContentType } from "../../../support/contentType";
import { useSectionRoadmapActions, useSelectedItem } from "../LevelProvider/LevelProvider";

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
          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          className="flex flex-col px-4"
        >
          <h2 className="font-title text-2xl text-light-orange">
            {selectedItem.label}
          </h2>
          <p className="font-title text-xl text-light-orange mt-2">
            {selectedItem.description}
          </p>
          <Accordion className="mt-4" allowToggle>
            {selectedItem?.children?.map((section, index) => (
              <HorizontalLevelItemSection
                key={section.label + index}
                section={section}
              />
            ))}
          </Accordion>
        </motion.div>
      )}
    </>
  );
}

function HorizontalLevelItemSection({ section }: { section: RoadmapItem }) {
  const { isRead, saveRead } = useSectionRoadmapActions(section);

  return (
    <AccordionItem>
      <h2 className="font-semibold">
        <AccordionButton color="#e9dad5">
         <div className='flex'>
            <Checkbox
              className="my-auto mr-2"
              size="lg"
              isChecked={isRead()}
              onChange={(e) => saveRead(e.target.checked)}
            />
            <span className="text-light-brown font-title">{section.label}</span>
          </div>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {section.links?.length
          ? section.links?.map((link) => (
              <div className="flex my-2 justify-between items-start">
                <a
                  href={link.url}
                  target="_blank"
                  className="text-light-brown hover:underline"
                >
                  {link.label}
                </a>
               
                <span
                  className={`badge  ${getColorFromContentType(link.contentType)}`}
                >
                  {link.contentType ? link.contentType : null}
                </span>
              </div>
            ))
          : "Ainda não possuimos conteúdo."}
      </AccordionPanel>
    </AccordionItem>
  );
}
