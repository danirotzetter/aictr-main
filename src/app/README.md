To run server as non-admin, go to
angular-cli/lib/broccoli/broccoli-typescript.js

and replace line 206 and 81 with

try {
  fs.symlinkSync(absoluteFilePath, outputFilePath);
} catch(e) {
  const conentStr = fs.readFileSync(absoluteFilePath);
  fs.writeFileSync(outputFilePath, conentStr);
}