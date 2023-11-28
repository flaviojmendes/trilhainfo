import { Level, RoadmapItem } from '../entity/RoadmapModel';
import { RoadmapRead } from '../entity/RoadmapReadModel';

export function convertToRoadmapRead(levels: Level[]): RoadmapRead[] {
  function convertItems(items: RoadmapItem[], parentLabel: string): RoadmapRead[] {
    return items.map((item) => {
      const { label, children, links } = item;

      const roadmapReadItem: RoadmapRead = {
        label: `${parentLabel}-${label}`,
        read: false, // Set default value for 'read' attribute
      };

      if (children && children.length > 0) {
        roadmapReadItem.children = convertItems(children, label);
      } else if (links && links.length > 0) {
        // Handle 'links' instead of 'children'
        roadmapReadItem.children = links.map((link) => ({
          label: `${item.label}-${link.label}`,
          read: false, // Set default value for 'read' attribute for links
        }));
      }

      return roadmapReadItem;
    });
  }

  return levels.map((level) => {
    const { items } = level;
    const roadmapReadLevel: RoadmapRead = {
      label: level.label || level.items[0].label,
      children: convertItems(items, level.label || level.items[0].label),
      read: false, // Set default value for 'read' attribute
    };

    return roadmapReadLevel;
  });
}

export function updateReadAttribute(
  labelToFind: string,
  readValue: boolean,
  setSelectedItems: (items: RoadmapRead[]) => void,
  selectedItems: RoadmapRead[],
) {
  console.log(labelToFind);

  const newData = selectedItems;

  const updateRead = (items: RoadmapRead[]): boolean => {
    let found = false;

    for (const item of items) {
      if (item.label === labelToFind) {
        item.read = readValue;
        found = true;
        if (item.children && item.children.length > 0) {
          // Update the children based on the parent's readValue
          updateChildrenRead(item.children, readValue);
        }
      } else if (item.children && item.children.length > 0) {
        // Recursively update the children
        const childUpdated = updateRead(item.children);
        if (childUpdated) {
          item.read = item.children.every((child) => !!child.read);
          found = true;
        }
      }
    }

    return found;
  };

  const updateChildrenRead = (children: RoadmapRead[], value: boolean) => {
    for (const child of children) {
      child.read = value;
      if (child.children && child.children.length > 0) {
        updateChildrenRead(child.children, value);
      }
    }
  };

  updateRead(newData);
  setSelectedItems(newData);
}

export function isRead(labelToFind: string, selectedItems: RoadmapRead[]) {
  function searchItem(items: RoadmapRead[]): boolean {
    for (const item of items || []) {
      if (item.label === labelToFind && item.read === true) {
        return true;
      }
      if (item.children && item.children.length > 0) {
        const found = searchItem(item.children);
        if (found) return true;
      }
    }
    return false;
  }
  const isRead = searchItem(selectedItems);

  return isRead;
}

export function findRoadmapReadItem(
  labelToFind?: string,
  selectedItems?: RoadmapRead[] | undefined,
) {
  if (!labelToFind || !selectedItems) return undefined;

  let foundItem: RoadmapRead | undefined;

  function searchItem(items: RoadmapRead[]): void {
    for (const item of items || []) {
      if (
        (item.label.split('-').length === 1 && item.label === labelToFind) ||
        (item.label.split('-').length > 1 &&
          item.label.split('-').slice(1).join('-').toLowerCase() === labelToFind?.toLowerCase()) ||
        ''
      ) {
        foundItem = item;
        break;
      }
      if (item.children && item.children.length > 0) {
        searchItem(item.children);
      }
    }
  }

  searchItem(selectedItems);

  return foundItem;
}
