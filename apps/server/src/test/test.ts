import { getPullRequestFiles } from "../github";
import { reviewPullRequest } from "../ai/engine";
import "dotenv/config";

const files = await getPullRequestFiles(
  "yogesh201sits",
  "testRepo",
  1
);

console.log(
  JSON.stringify(files, null, 2)
);

const result = await reviewPullRequest(files[0]!.patch!);

console.log(
  JSON.stringify(result, null, 2)
);

// OutputFileType:
// E:\wdProj\codefox\apps\server> bun run src/test/test.ts
// [
//   {
//     "sha": "e75154b7c390fdc4aa85d86e0a191be255a00627",
//     "filename": "main.py",
//     "status": "added",
//     "additions": 1,
//     "deletions": 0,
//     "changes": 1,
//     "blob_url": "https://github.com/yogesh201sits/testRepo/blob/4a275ab119b85a9ee4617006c48aac5a7de6ad3a/main.py",
//     "raw_url": "https://github.com/yogesh201sits/testRepo/raw/4a275ab119b85a9ee4617006c48aac5a7de6ad3a/main.py",
//     "contents_url": "https://api.github.com/repos/yogesh201sits/testRepo/contents/main.py?ref=4a275ab119b85a9ee4617006c48aac5a7de6ad3a",
//     "patch": "@@ -0,0 +1 @@\n+print(\"hello world\")\n\\ No newline at end of file"
//   }
// ]
