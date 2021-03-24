import typetura from '../typeturaSettings';
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
it('should resolve if typetura.base is pased', () => {
  return typeturaInit({ typetura.base: 16 }).catch((err) => {
    expect(err.message).toEqual('typeutra.base must be a number');
  });
});
it('should reject if typetura.base is not a number', () => {
  return typeturaInit({ typetura.base: 'a' }).catch((err) => {
    expect(err.message).toEqual('typeutra.base must be a number');
  });
});
it('should resolve if typetura.scale is pased', () => {
  return typeturaInit({ typetura.scale: 1.2 }).catch((err) => {
    expect(err.message).toEqual('typetura.scale must be a number');
  });
});
it('should reject if typetura.scale is not a number', () => {
  return typeturaInit({ typetura.scale: 'b' }).catch((err) => {
    expect(err.message).toEqual('typeutra.scale must be a number');
  });
});
});
