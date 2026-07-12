import "dotenv/config";
import { reviewPullRequest } from "./engine";

const diff = `
File: src/auth.ts

@@
+ const password = "123456";

function login(user) {
  if(user.password === password){
    return true;
  }
}
`;

const result = await reviewPullRequest(diff);

console.log(
  JSON.stringify(result, null, 2)
);



// let op:string = `{
//   "summary": "The changes introduce a hard‑coded password and a login function that may return undefined, leading to security risks and logical bugs.",
//   "findings": [
//     {
//       "title": "Hard‑coded password in source code",
//       "category": "security",
//       "severity": "critical",
//       "file": "src/auth.ts",
//       "startLine": 1,
//       "endLine": 1,
//       "description": "A plaintext password \"123456\" is stored directly in the source file, exposing credentials and making the application vulnerable to credentialleakage.",
//       "suggestion": "Remove the hard‑coded password. Use a secure secret management solution (environment variables, vault, or hashed password verification) and never store plaintext credentials in code."
//     },
//     {
//       "title": "`login` function may return undefined on failed authentication",
//       "category": "bug",
//       "severity": "medium",
//       "file": "src/auth.ts",
//       "startLine": 3,
//       "endLine": 5,
//       "description": "When `user.password` does not match the stored password, the function reaches the end without an explicit return, resulting in `undefined` instead of a clear false/ error value.",
//       "suggestion": "Add an explicit `return false;` (or throw an authentication error) after the password check to ensure a deterministic return type."
//     },
//     {
//       "title": "Plaintext password comparison without hashing",
//       "category": "maintainability",
//       "severity": "high",
//       "file": "src/auth.ts",
//       "startLine": 3,
//       "endLine": 5,
//       "description": "The login logic compares the user‑provided password directly to a plaintext constant, which is insecure and prevents future enhancements like password hashing or salting.",
//       "suggestion": "Implement proper password hashing (e.g., bcrypt) and compare hashed values. Abstract authentication logic into a dedicated service to improve maintainability."
//     }
//   ]
// }`