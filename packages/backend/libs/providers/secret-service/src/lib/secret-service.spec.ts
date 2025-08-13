import { secretService } from './secret-service';

describe('secretService', () => {
  it('should work', () => {
    expect(secretService()).toEqual('secret-service');
  });
});
