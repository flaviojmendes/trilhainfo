import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Checkbox, Flex, Spacer } from "@chakra-ui/react";
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
          <p className="m-auto txt-title text-red">
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
          <h2 className="txt-title text-2xl text-light-orange">
            {selectedItem.label}
          </h2>
          <p className="txt-title text-xl text-light-orange mt-2">
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
          <Box flex="1" textAlign="left">
            <Checkbox
              className="my-auto mr-2"
              size="lg"
              isChecked={isRead()}
              onChange={(e) => saveRead(e.target.checked)}
            />
            <span className="text-light-brown txt-title">{section.label}</span>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {section.links?.length
          ? section.links?.map((link) => (
              <Flex className="my-2">
                <a
                  href={link.url}
                  target="_blank"
                  className="text-light-brown hover:underline"
                >
                  {link.label}
                </a>
                <Spacer />
                <Badge
                  colorScheme={getColorFromContentType(link.contentType)}
                  p={1}
                  rounded={"md"}
                  className="h-5"
                  fontSize="0.6em"
                  mr="1"
                  cursor={"default"}
                >
                  <span>{link.contentType ? link.contentType : null}</span>
                </Badge>
              </Flex>
            ))
          : "Ainda não possuimos conteúdo."}
      </AccordionPanel>
    </AccordionItem>
  );
}
