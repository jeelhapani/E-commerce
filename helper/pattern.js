// // // Interview question list
// https://chatgpt.com/c/695c9f25-fca4-8325-bc1f-1d9517c98934 



// **“Good morning. My name is Jeel. I have around 2 years of experience as a Node.js backend developer.
// I mainly work with Node.js, Express.js, MongoDB, and Mongoose. I have experience building REST APIs, 
// implementing JWT-based authentication, role-based access control, and handling file uploads using Multer.

// I’ve worked on projects like an e-commerce platform and a social media–style application, 
// where I handled user, seller, and admin flows, API security, and database design.

// I focus on writing clean, structured code using controller–service architecture and proper error handling. 
// Currently, I’m looking for an opportunity where I can grow my backend skills and contribute to real-world scalable applications.”**



let num = 5;
let pattern = "";

// * 
// * *
// * * *
// * * * *
// * * * * *
// for (let i = 1; i <= num; i++) {
//     for (let j = 1; j <= i; j++) {
//         pattern += "* ";
//     }
//     if (i != num) pattern += "\n";
// }



// * 
// * *
// *   *
// *     *
// * * * * *

// for (let i = 1; i <= num; i++) {
//     for (let j = 1; j <= i; j++) {
//         if (j == 1 || j == i || i == num) {
//             pattern += "* ";
//         } else {
//             pattern += "  ";
//         }
//     }
//     if (i != num) pattern += "\n";
// }



// * * * * * 
// * * * *
// * * *
// * *
// *

// for (let i = 1; i <= num; i++) {
//     for (let j = 0; j <= (num-i); j++) {
//         pattern += "* ";
//     }
//     if (i != num) pattern += "\n";
// }



// * * * * * 
// *     *
// *   *
// * *
// *

// for (let i = 1; i <= num; i++) {
//     for (let j = 0; j <= (num-i); j++) {
//         if (j == 0 || j == (num-i) || i == 1) {
//             pattern += "* ";
//         } else {
//             pattern += "  ";
//         }
//     }
//     if (i != num) pattern += "\n";
// }



//         * 
//       * *
//     * * *
//   * * * *
// * * * * *

// for (let i = 1; i <= num; i++) {
//     for (let j = 1; j <= (num-i); j++) {
//         pattern += "  ";
//     }
//     for (let k = 1; k <= i; k++) {
//         pattern += "* ";
//     }
//     if (i != num) pattern += "\n";
// }



//         * 
//       * *
//     *   *
//   *     *
// * * * * *

// for (let i = 1; i <= num; i++) {
//     for (let j = 1; j <= (num-i); j++) {
//         pattern += "  ";
//     }
//     for (let k = 1; k <= i; k++) {
//         if (k == 1 || k == i || i == num) {
//             pattern += "* ";

//         } else {
//             pattern += "  ";
//         }
//     }
//     if (i != num) pattern += "\n";
// }



// * * * * * 
//   * * * *
//     * * *
//       * *
//         *

// for (let i = num; i >= 1; i--) {
//     for (let j = 1; j <= (num-i); j++) {
//         pattern += "  ";
//     }
//     for (let k = 1; k <= i; k++) {
//         pattern += "* ";
//     }
//     pattern += "\n";
// }



// * * * * * 
//   *     *
//     *   *
//       * *
//         *

// for (let i = num; i >= 1; i--) {
//     for (let j = 1; j <= (num-i); j++) {
//         pattern += "  ";
//     }
//     for (let k = 1; k <= i; k++) {
//         if (i == num || k == 1 || k == i) {
//             pattern += "* ";
//         } else {
//             pattern += "  ";
//         }
//     }
//     pattern += "\n";
// }



//         * 
//       * * *
//     * * * * *
//   * * * * * * *
// * * * * * * * * *

// for (let i = 1; i <= num; i++) {
//     for (let j = 1; j <= (num - i); j++) {
//         pattern += "  ";
//     }
//     for (let k = 1; k <= ((2 * i) - 1); k++) {
//         pattern += "* ";
//     }
//     pattern += "\n";
// }



//         * 
//       *   *
//     *       *
//   *           *
// * * * * * * * * *

// for (let i = 1; i <= num; i++) {
//     for (let j = 1; j <= (num - i); j++) {
//         pattern += "  ";
//     }
//     for (let k = 1; k <= ((2 * i) - 1); k++) {
//         if (k == 1 || k == ((2 * i) - 1) || i == num ) {
//             pattern += "* ";
            
//         } else {
//             pattern += "  ";
            
//         }
//     }
//     pattern += "\n";
// }



// * * * * * * * * * 
//   * * * * * * *
//     * * * * *
//       * * *
//         *

// for (let i = num; i >= 0; i--) {
//     for (let j = 1; j <= (num - i); j++) {
//         pattern += "  ";
//     }
//     for (let k = 1; k <= ((2 * i) - 1); k++) {
//         pattern += "* ";
//     }
//     pattern += "\n";
// }



// * * * * * * * * * 
//   *           *
//     *       *
//       *   *
//         *
        
// for (let i = num; i >= 0; i--) {
//     for (let j = 1; j <= (num - i); j++) {
//         pattern += "  ";
//     }
//     for (let k = 1; k <= ((2 * i) - 1); k++) {
//         if (i == num || k == 1 || k == ((2 * i) - 1) ) {
//             pattern += "* ";
            
//         } else {
//             pattern += "  ";
            
//         }
//     }
//     pattern += "\n";
// }



// * * * * * 
// * * * * *
// * * * * *
// * * * * *
// * * * * *

// for (let i = 1; i <= num; i++) {
//     for (let j = 1; j <= num; j++) {
//         pattern += "* ";
//     }
//     pattern += "\n";
// }



// * * * * * 
// *       *
// *       *
// *       *
// * * * * *

// for (let i = 1; i <= num; i++) {
//     for (let j = 1; j <= num; j++) {
//         if (i == 1 || j == 1 || j == num || i == num) {
//             pattern += "* ";
//         } else {
//             pattern += "  ";
//         }
//     }
//     pattern += "\n";
// }



// * * * * * 
// * *   * *
// *   *   *
// * *   * *
// * * * * *

// for (let i = 1; i <= num; i++) {
//     for (let j = 1; j <= num; j++) {
//         if (i == 1 || i == num || j == 1 || j == num || i == j || j == (num - i + 1) ) {
//             pattern += "* ";
//         } else {
//             pattern += "  ";
//         }
//     }
//     pattern += "\n";
// }



//         * 
//       * * *
//     * * * * *
//   * * * * * * *
// * * * * * * * * *
//   * * * * * * *
//     * * * * *
//       * * *
//         *

// for (let i = 1; i <= num; i++) {
//     for (let j = 1; j <= (num-i); j++) {
//         pattern += "  ";
//     }
//     for (let k = 1; k <= ((2 * i) - 1); k++) {
//         pattern += "* ";
//     }
//     pattern += "\n";
// }
// for (let i = num-1; i >= 1; i--) {
//     for (let j = 1; j <= (num-i); j++) {
//         pattern += "  ";
//     }
//     for (let k = 1; k <= ((2 * i) - 1); k++) {
//         pattern += "* ";
//     }
//     pattern += "\n";
// }



//         * 
//       *   *
//     *       *
//   *           *
// *               *
//   *           *
//     *       *
//       *   *
//         *

// for (let i = 1; i <= num; i++) {
//     for (let j = 1; j <= (num-i); j++) {
//         pattern += "  ";
//     }
//     for (let k = 1; k <= ((2 * i) - 1); k++) {
//         if (k == 1 || k == ((2 * i) - 1)) {
//             pattern += "* ";
//         } else {
//             pattern += "  ";
//         }
//     }
//     pattern += "\n";
// }
// for (let i = num-1; i >= 1; i--) {
//     for (let j = 1; j <= (num-i); j++) {
//         pattern += "  ";
//     }
//     for (let k = 1; k <= ((2 * i) - 1); k++) {
//         if (k == 1 || k == ((2 * i) - 1)) {
//             pattern += "* ";
//         } else {
//             pattern += "  ";
//         }
//     }
//     pattern += "\n";
// }





console.log(pattern);