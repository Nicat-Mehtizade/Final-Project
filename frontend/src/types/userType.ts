import { Seat } from "./activityType";
interface ActivityRef {
    activityId: string; 
    seat: Seat
  }

interface userType{
    _id?:string,
    username:string,
    email:string,
    password:string,
    image:string,
    role:string,
    wishlist:string[],
    basket:ActivityRef[]
}

export default userType
