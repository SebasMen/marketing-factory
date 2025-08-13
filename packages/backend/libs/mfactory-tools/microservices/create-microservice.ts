import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import { CreateMicroserviceGeneratorSchema } from './schema';

const updateTsConfigFile = async (name: string)=>{
  // Update tsconfig file
  const tsConfigBaseFile = './tsconfig.base.json';
  const currentContent = fs.readFileSync(tsConfigBaseFile, 'utf-8');
  const fileLines = currentContent.split('\n');
  const initEnumIdx = fileLines.findIndex(line => line.includes('"paths": {'));
  const endEnumIdx = fileLines.slice(initEnumIdx).findIndex(line => line.includes('}')) + initEnumIdx;
  const newLineCommonType = `      "@mfactory-be/commonTypes/${name}": ["libs/commonTypes/${name}/src/index.ts"],`;
  fileLines[endEnumIdx - 1] += ',';
  fileLines.splice(endEnumIdx, 0, newLineCommonType);

  // Update file
  fs.writeFileSync(tsConfigBaseFile, fileLines.join('\n'));
}

const addCommonTypesFiles = async (tree: Tree, options: CreateMicroserviceGeneratorSchema) => {
  const projectRoot = `libs/commonTypes/${options.name}`;
  const upperName = options.name.toUpperCase();
  const camelName = _.startCase(_.camelCase(options.name));

  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'commonTypes'), projectRoot, {
    ...options,
    upperName,
    camelName,
  });

  // Rename missing files
  tree.rename(
    `libs/commonTypes/${options.name}/src/lib/{{name}}.ts`,
    `libs/commonTypes/${options.name}/src/lib/${options.name}.ts`,
  );
  tree.rename(
    `libs/commonTypes/${options.name}/src/lib/{{name}}-api.ts`,
    `libs/commonTypes/${options.name}/src/lib/${options.name}-api.ts`,
  );

  await formatFiles(tree);

  // Update necessary files
  await updateTsConfigFile(options.name);
};

export async function createMicroserviceGenerator(tree: Tree, options: CreateMicroserviceGeneratorSchema) {
  const projectRoot = `apps/${options.name}`;
  const upperName = options.name.toUpperCase();

  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    upperName,
  });
  await formatFiles(tree);

  // Update microservice file enum
  const msFilePath = 'libs/commonTypes/global/src/lib/microservices.ts';
  const currentContent = fs.readFileSync(msFilePath, 'utf-8');
  const fileLines = currentContent.split('\n');
  const initEnumIdx = fileLines.findIndex(line => line.includes('enum MS {'));
  const endEnumIdx = fileLines.slice(initEnumIdx).findIndex(line => line.includes('}'));
  fileLines.splice(endEnumIdx + 1, 0, `  ${upperName} = '${options.name}',`);

  // Update file
  fs.writeFileSync(msFilePath, fileLines.join('\n'));

  // Add common types
  await addCommonTypesFiles(tree, options);
}

export default createMicroserviceGenerator;
