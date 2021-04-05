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
  it('should resolve if base is pased', () => {
    return typeturaInit({ base: 16 }).catch((err) => {
      expect(err.message).toEqual('typeutra.base must be a number');
    });
  });
  it('should reject if base is not a number', () => {
    return typeturaInit({ base: 'a' }).catch((err) => {
      expect(err.message).toEqual('typeutra.base must be a number');
    });
  });
  it('should resolve if scale is passed', () => {
    return typeturaInit({ scale: 1.2 }).catch((err) => {
      expect(err.message).toEqual('scale must be a number');
    });
  });
  it('should reject if scale is not a number', () => {
    return typeturaInit({ scale: 'b' }).catch((err) => {
      expect(err.message).toEqual('scale must be a number');
    });
  });
});
