const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

if (tsConfig.compilerOptions.paths) {
    tsConfigPaths.register({
        paths: tsConfig.compilerOptions.paths,
        baseUrl: tsConfig.compilerOptions.outDir,
    });
}