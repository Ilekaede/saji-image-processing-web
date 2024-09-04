import { Button } from "@chakra-ui/react";
import React from "react";

interface TagSelectorProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

const TagSelector = ({ tags, selectedTag, onTagSelect }: TagSelectorProps) => {
  return (
    <div>
      <Button
        onClick={() => onTagSelect(null)}
        colorScheme={selectedTag === null ? "blue" : "gray"}
      >
        全て表示
      </Button>
      {tags.map((tag) => (
        <Button
          key={tag}
          onClick={() => onTagSelect(tag)}
          colorScheme={selectedTag === tag ? "blue" : "gray"}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
};

export default TagSelector;
