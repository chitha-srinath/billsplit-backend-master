// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// // import { User } from "../models/apps/auth/user.models.js";
// // import { UserLoginType, UserRolesEnum } from "../constants.js";
// // import { ApiError } from "../utils/ApiError.js";
// import { UserEntity } from "../Entity/UserEntity";
// import Repository from "../Repository/BaseRepository";
// import { Constants } from "../Utility/Constants";
// import UniqueIDGenerator from "../Utility/RandomUniqueIdGenerator";
// import HandleResponse from "../Utility/ResponseHandle";

// // passport.serializeUser((user, next) => {
// //   next(null, user._id);
// // });

// passport.serializeUser((user: any, next) => {
//   // Storing the user's essential details in the session
//   next(null, {
//     userId: user?.userId,
//     userEmail: user?.userEmail,
//     userName: user?.userName,
//   });
// });
// // userEmail: email, userName, userId

// // passport.deserializeUser(async (id, next) => {
// //   try {
// //     const user = await User.findById(id);
// //     if (user) next(null, user); // return user of exist
// //     else next(new ApiError(404, "User does not exist"), null); // throw an error if user does not exist
// //   } catch (error) {
// //     next(
// //       new ApiError(
// //         500,
// //         "Something went wrong while deserializing the user. Error: " + error
// //       ),
// //       null
// //     );
// //   }
// // });

// passport.deserializeUser(async (storedUser, next) => {
//   next(storedUser, null);
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL!,
//     },
//     async (_: any, __: any, profile: any, next: any) => {
//       // Check if the user with email already exist
//       let userRepository = new Repository(Constants.USER_INFO);
//       const user = await userRepository.getOne({
//         userEmail: profile._json.email,
//       });
//       if (user) {
//         // // if user exists, check if user has registered with the GOOGLE SSO
//         // if (user.loginType !== UserLoginType.GOOGLE) {
//         //   // If user is registered with some other method, we will ask him/her to use the same method as registered.
//         //   // TODO: We can redirect user to appropriate frontend urls which will show users what went wrong instead of sending response from the backend
//         //   next(
//         //     new ApiError(
//         //       400,
//         //       "You have previously registered using " +
//         //         user.loginType?.toLowerCase()?.split("_").join(" ") +
//         //         ". Please use the " +
//         //         user.loginType?.toLowerCase()?.split("_").join(" ") +
//         //         " login option to access your account."
//         //     ),
//         //     null
//         //   );
//         // } else {
//         //   // If user is registered with the same login method we will send the saved user
//         //   next(null, user);
//         // }
//         next(null, user);
//       } else {
//         // // If user with email does not exists, means the user is coming for the first time
//         // const createdUser = await User.create({
//         //   email: profile._json.email,
//         //   // There is a check for traditional logic so the password does not matter in this login method
//         //   password: profile._json.sub, // Set user's password as sub (coming from the google)
//         //   username: profile._json.email?.split("@")[0], // as email is unique, this username will be unique
//         //   isEmailVerified: true, // email will be already verified
//         //   role: UserRolesEnum.USER,
//         //   avatar: {
//         //     url: profile._json.picture,
//         //     localPath: "",
//         //   }, // set avatar as user's google picture
//         //   loginType: UserLoginType.GOOGLE,
//         // });
//         // this.uniqueId = new UniqueIDGenerator();
//         let uid = new UniqueIDGenerator().generate();
//         let userRepository = new Repository(Constants.USER_INFO);
//         let userInfo: UserEntity = {
//           userId: uid,
//           userName: profile._json.email?.split("@")[0],
//           userEmail: profile._json.email,
//           password: profile._json.sub,
//           createdAt: new Date(),
//           updatedAt: null,
//           createdBy: "Admin",
//           updatedBy: null,
//           isActive: 1,
//         };
//         await userRepository.insert(userInfo);
//         const createduser = await userRepository.getOne({
//           userEmail: profile._json.email,
//         });
//         if (createduser) {
//           next(null, createduser);
//         } else {
//           next(
//             HandleResponse.handleResponse(
//               false,
//               500,
//               "google resitered failed",
//               null
//             )
//           );
//         }
//       }
//     }
//   )
// );

// export default passport;
