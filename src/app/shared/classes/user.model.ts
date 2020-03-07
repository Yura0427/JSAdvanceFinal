// import { IUser } from '../interfaces/user.interfaces';

export class User {
    key: string;
    userName: string;
    userEmail: string;
    userPass: string;
    userAdmin: boolean;
    loginStatus:boolean

}
// export class User implements IUser{
//     constructor(
//         public id: string,
//         public userName: string,
//         public userEmail: string,
//         public userPass: string,
//         public userAdmin: boolean,
//     ){}
// }