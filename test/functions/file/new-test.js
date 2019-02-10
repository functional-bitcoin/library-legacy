describe('file/new', () => {
  const fn    = loadFunction('file/new');
  const ctx   = undefined;

  describe('with valid args', () => {
    const args  = argsFromArray(['text/plain', 'hello world']);

    it('must return file object', () => {
      const file = fn({ ctx }, ...args)
      expect(file.type).toEqual('text/plain');
      expect(file.data.toString()).toEqual('hello world');
    });
  })

  describe('with empty args', () => {
    const args  = argsFromArray(['', '']);

    it('must throw error', () => {
      expect(_ => fn({ ctx }, ...args)).toThrow();
    });
  })
});