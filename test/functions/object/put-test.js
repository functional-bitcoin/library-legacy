describe('object/put', () => {
  const fn    = loadFunction('object/put');
  const ctx   = { foo: '1' };

  describe('with args list', () => {
    const args = argsFromArray(['bar', 'qux', '3']);
    const obj = fn({ ctx }, ...args)

    it('must return an extended object', () => {
      expect(obj.foo).toEqual('1');
      expect(obj.bar).toEqual({ qux: '3' });
    });
  })

  describe('with args string', () => {
    const args = argsFromArray(['bar', 'value']);
    const obj = fn({ ctx }, ...args)

    it('must return an extended object', () => {
      expect(obj.foo).toEqual('1');
      expect(obj.bar).toEqual('value');
    });
  })

  describe('without key', () => {
    const args = argsFromArray(['', 'bar', '2']);

    it('must throw error', () => {
      expect(_ => fn({ ctx }, ...args)).toThrow();
    });
  })

  describe('without ctx', () => {
    const ctx = undefined;
    const args = argsFromArray(['bar', 'qux', '3']);
     const obj = fn({ ctx }, ...args)

    it('must throw error', () => {
      expect(obj.foo).toBe(undefined);
      expect(obj.bar).toEqual({ qux: '3' });
    });
  })
})