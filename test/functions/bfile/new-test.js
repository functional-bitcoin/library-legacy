describe('bfile/new', () => {
  const fn    = loadFunction('bfile/new');
  const ctx   = undefined;

  describe('with full args', () => {
    const args = argsFromArray(['hello world', 'text/plain', 'UTF-8', 'hello.txt']);
    const file = fn({ ctx }, ...args)

    it('must return a file object', () => {
      
      expect(file.data.toString()).toEqual('hello world');
      expect(file.type).toEqual('text/plain');
      expect(file.encoding).toEqual('UTF-8');
      expect(file.name).toEqual('hello.txt');
    });
  })

  describe('with minimal args', () => {
    const args = argsFromArray(['hello world', 'text/plain']);
    const file = fn({ ctx }, ...args)

    it('must return a file object', () => {
      expect(file.data.toString()).toEqual('hello world');
      expect(file.type).toEqual('text/plain');
    });

    it('must default to UTF-8', () => {
      expect(file.encoding).toEqual('UTF-8');
    });

    it('must have no filename', () => {
      expect(file.name).toBe(undefined);
    });
  })

  describe('with minimal binary args', () => {
    const args = argsFromArray(['IMAGEDATA', 'image/png']);
    const file = fn({ ctx }, ...args)

    it('wont default to UTF-8', () => {
      expect(file.encoding).toBe(undefined);
    });
  })

  describe('with skipped args', () => {
    const args = argsFromArray(['hello world', 'text/plain', '', 'hello.txt']);
    const file = fn({ ctx }, ...args)

    it('must default to UTF-8', () => {
      expect(file.encoding).toEqual('UTF-8');
    });

    it('must have filename', () => {
      expect(file.name).toEqual('hello.txt');
    });
  })

  describe('with skipped binary args', () => {
    const args = argsFromArray(['IMAGEDATA', 'image/png', '', 'hello.png']);
    const file = fn({ ctx }, ...args)

    it('must default to UTF-8', () => {
      expect(file.encoding).toBe(undefined);
    });

    it('must have filename', () => {
      expect(file.name).toEqual('hello.png');
    });
  })
});