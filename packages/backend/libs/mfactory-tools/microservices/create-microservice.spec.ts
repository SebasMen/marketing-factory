import { Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { createMicroserviceGenerator } from './create-microservice';
import { CreateMicroserviceGeneratorSchema } from './schema';

describe('create-microservice generator', () => {
  let tree: Tree;
  const options: CreateMicroserviceGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await createMicroserviceGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
