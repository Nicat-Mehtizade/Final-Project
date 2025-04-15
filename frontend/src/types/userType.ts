interface ActivityRef {
    activityId: string; 
  }

interface userType{
    _id?:string,
    username:string,
    email:string,
    password:string,
    image:string,
    role:string,
    wishlist:ActivityRef[],
    basket:ActivityRef[]
}

export default userType
