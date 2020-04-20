import typeturaInit from '../typeturaInit';
import typeturize from '../typeturize';
import createStyleSheet from '../utils/createStyleSheet';

jest.mock('resize-observer');
jest.mock('../typeturize');
jest.mock('../utils/createStyleSheet');

document.head.insertBefore = () => {};

describe('typeturaInit', () => {
  it('calls typeturize', () => {
    typeturize.mockImplementation((cb) => {});
    return typeturaInit().then(() => {
      expect(typeturize).toBeCalled();
    });
  });
  it('calls createStyleSheet', () => {
    createStyleSheet.mockImplementation((cb) => {});
    return typeturaInit().then(() => {
      expect(createStyleSheet).toBeCalled();
    });
  });
  it('should resolve successfully', () => {
    return typeturaInit().then((res) => {
      expect(res).toBeUndefined();
    });
  });
  it('should resolve if baseSize is pased', () => {
    return typeturaInit({ baseSize: 16 }).catch((err) => {
      expect(err.message).toEqual('Base must be a number');
    });
  });
  it('should reject if baseSize is not a number', () => {
    return typeturaInit({ baseSize: 'a' }).catch((err) => {
      expect(err.message).toEqual('baseSize must be a number');
    });
  });
});
