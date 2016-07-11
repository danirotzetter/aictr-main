# Development instructions
## Run application server as non-admin on windows
Windows is struggling with symbolic link creation. The command succeeds when running the server as admin.
To run server as non-admin, go to
angular-cli/lib/broccoli/broccoli-typescript.js

and replace the symbolic line creation instruction
`fs.symlinkSync(absoluteFilePath, outputFilePath);`
(line 81 and 206)
with the following code

    try {
      fs.symlinkSync(absoluteFilePath, outputFilePath);
    } catch(e) {
      const contentStr = fs.readFileSync(absoluteFilePath);
      fs.writeFileSync(outputFilePath, contentStr);
    }


In order to build packages into the /vendor folder, type "ng build"