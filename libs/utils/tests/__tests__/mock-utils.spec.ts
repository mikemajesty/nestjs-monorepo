import { MockUtils } from '../mock-utils';

describe('MockUtils', () => {
  test('should setMock successfully', () => {
    expect(MockUtils.setMock({ ok: 1 })).toEqual({ ok: 1 });
  });
});
