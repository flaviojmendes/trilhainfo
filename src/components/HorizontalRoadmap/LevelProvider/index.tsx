import { emojisplosion } from "emojisplosion";
import { createContext, useContext, useState } from "react";
import { RoadmapItem } from "../../../entity/RoadmapModel";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

type LevelContextValue = {
  selectedItem: RoadmapItem | undefined;
  setSelectedItem: (item: RoadmapItem | undefined) => void;
  // Actions
  isAllContentRead: (label: string, contentLength: number) => boolean;
  isRead: (label: string) => boolean;
  checkAllContent: (item: RoadmapItem, check: boolean) => void;
  saveRead: (label: string, checked: boolean) => void;
};

const LevelContext = createContext<LevelContextValue | undefined>(undefined);

type LevelProviderProps = {
  children: React.ReactNode;
};

export const LevelProvider = ({ children }: LevelProviderProps) => {
  const [items, setItems] = useLocalStorage<Map<string, boolean>>(
    "items",
    new Map(),
    {
      serializer: (value) => JSON.stringify(Object.fromEntries(value)),
      deserializer: (value) => new Map(Object.entries(JSON.parse(value))),
    }
  );
  const [selectedItem, setSelectedItem] = useState<RoadmapItem>();

  function checkAllContent(item: RoadmapItem, check: boolean) {
    item.children?.forEach((section) => {
      const label = `${section.label}-${item.label}`;
      saveRead(label, check);
    });

    if (check) {
      emojisplosion({
        emojiCount: 1,
        uniqueness: 1,
        position: {
          x: innerWidth / 2,
          y: innerHeight / 2,
        },
        emojis: ["🎉", "🎊", "🎈", "🤓"],
      });
    }
  }

  function isAllContentRead(label: string, contentLength: number) {
    if (items.size) {
      const contentRead = Array.from(items.keys()).filter(
        (key) => key.endsWith("-" + label) && items.get(key) === true
      );
      return contentRead.length === contentLength;
    }

    return false;
  }

  function isRead(label: string) {
    return items.get(label) === true;
  }

  function saveRead(label: string, checked: boolean) {
    setItems((currentMap) => {
      const newMap = new Map(currentMap);
      newMap.set(label, checked);
      return newMap;
    });

    if (checked) {
      emojisplosion({
        emojiCount: 1,
        uniqueness: 1,
        position: {
          x: innerWidth / 2,
          y: innerHeight / 2,
        },
        emojis: ["🎉", "🎊", "🎈", "🤓"],
      });
    }
  }
  return (
    <LevelContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
        isAllContentRead,
        isRead,
        saveRead,
        checkAllContent,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export const useSelectedItem = () => {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error("`useSelectedItem` must be used within `LevelProvider`");
  }
  return [context.selectedItem, context.setSelectedItem] as const;
};

export const useLevelRoadmapActions = (item: RoadmapItem) => {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error(
      "`useLevelRoadmapActions` must be used within `LevelProvider`"
    );
  }

  return {
    isAllContentRead: () =>
      context.isAllContentRead(item.label, item.children?.length ?? -1),
    checkAllContent: (check: boolean) => context.checkAllContent(item, check),
  };
};

export const useSectionRoadmapActions = (section: RoadmapItem) => {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error(
      "`useSectionRoadmapActions` must be used within `LevelProvider`"
    );
  }

  const label = `${section.label}-${context.selectedItem?.label}`;
  return {
    saveRead: (check: boolean) => context.saveRead(label, check),
    isRead: () => context.isRead(label),
  };
};
