interface JwtType {
    id: string;
    username: string;
    role:string,
    iat?: number;
    exp?: number;
    hasPassword:boolean,
  }

export default JwtType 