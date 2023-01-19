import { LinkContentType } from "../entity/RoadmapModel";

export function getColorFromContentType(contentType: LinkContentType | string) {
  switch(contentType) {
    case LinkContentType.LISTEN || "Ouça":
      return "badge-blue";
    case LinkContentType.READ || "Leia":
      return "badge-yellow";
    case LinkContentType.VISIT || "Visite":
      return "badge-purple";
    case LinkContentType.PRACTICE || "Pratique":
      return "badge-green";
    case LinkContentType.WATCH || "Assista":
    default:
      return "badge-orange";
  }
}