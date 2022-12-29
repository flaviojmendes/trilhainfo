import { LinkContentType } from "../entity/RoadmapModel";

export function getColorFromContentType(contentType: LinkContentType | string) {
    switch (contentType) {
      case LinkContentType.LISTEN || "Ouça":
        return "blue";
      case LinkContentType.READ || "Leia":
        return "yellow";
      case LinkContentType.VISIT || "Visite":
        return "purple";
      case LinkContentType.PRACTICE || "Pratique":
        return "green";
      case LinkContentType.WATCH || "Assista":
      default:
        return "orange";
    }
  }