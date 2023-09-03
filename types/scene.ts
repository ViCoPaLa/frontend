import { ChatType } from "./chat";

export interface SceneType {
  scene_no: number;
  description: string;
  mission: {
    mission_no: number;
    mission_description: string;
    mission_hint: string;
  }[];
  background_image: string;
  location: string;
  chats: ChatType[];
}
