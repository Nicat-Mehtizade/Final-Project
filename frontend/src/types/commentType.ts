import { Activity } from "./activityType";
export interface Comment{
    text:string,
    activity:Activity,
    userId: {
        _id: string;
        username: string;
        image?: string;
      };
    date:string,
    createdAt: string;
    updatedAt: string;
    _id: string;
}