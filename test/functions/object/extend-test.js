describe('object/extend', () => {
  const fn    = loadFunction('object/extend');
  const ctx   = { foo: '1' };

  describe('with full args', () => {
    const args = argsFromArray(['bar', '2', 'qux', '3']);
    const obj = fn({ ctx }, ...args)

    it('must return an extended object', () => {
      expect(obj.foo).toEqual('1');
      expect(obj.bar).toEqual('2');
      expect(obj.qux).toEqual('3');
    });
  })

  describe('with odd num args', () => {
    const args = argsFromArray(['bar', '2', 'qux']);
    const obj = fn({ ctx }, ...args)

    it('must return an extended object', () => {
      expect(Object.keys(obj)).toContain('qux');
      expect(obj.qux).toBe(undefined);
    });
  })

  describe('with no args', () => {
    const obj = fn({ ctx })

    it('must return an extended object', () => {
      expect(obj.foo).toEqual('1');
      expect(obj).toEqual(ctx);
    });
  })

  describe('with no context', () => {
    const ctx = undefined;
    const args = argsFromArray(['bar', '2']);
    const obj = fn({ ctx }, ...args)

    it('must return an extended object', () => {
      expect(obj.foo).toBe(undefined);
      expect(obj.bar).toEqual('2');
    });
  })
})