describe('bfile/new', () => {
  describe('with full args', () => {
    const args = ['hello world', 'text/plain', 'UTF-8', 'hello.txt'],
          script = createTestScript('bfile/new', args);

    it('must return a file object', (done) => {
      script.execute().then(file => {
        expect(file.data.toString()).toEqual('hello world');
        expect(file.type).toEqual('text/plain');
        expect(file.encoding).toEqual('UTF-8');
        expect(file.name).toEqual('hello.txt');
        done()
      })
    });
  })

  describe('with minimal args', () => {
    const args = ['hello world', 'text/plain'],
          script = createTestScript('bfile/new', args)

    it('must return a file object', (done) => {
      script.execute().then(file => {
        expect(file.data.toString()).toEqual('hello world');
        expect(file.type).toEqual('text/plain');
        done()
      })
    });

    it('must default to UTF-8', (done) => {
      script.execute().then(file => {
        expect(file.encoding).toEqual('UTF-8');
        done()
      })
    });

    it('must have no filename', (done) => {
      script.execute().then(file => {
        expect(file.name).toBe(undefined);
        done()
      })
    });
  })

  describe('with minimal binary args', () => {
    const args = ['IMAGEDATA', 'image/png'],
          script = createTestScript('bfile/new', args)

    it('wont default to UTF-8', (done) => {
      script.execute().then(file => {
        expect(file.encoding).toBe(undefined);
        done()
      })
    });
  })

  describe('with skipped args', () => {
    const args = ['hello world', 'text/plain', '', 'hello.txt'],
          script = createTestScript('bfile/new', args)

    it('must default to UTF-8', (done) => {
      script.execute().then(file => {
        expect(file.encoding).toEqual('UTF-8');
        done()
      })
    });

    it('must have filename', (done) => {
      script.execute().then(file => {
        expect(file.name).toEqual('hello.txt');
        done()
      })
    });
  })

  describe('with skipped binary args', () => {
    const args = ['IMAGEDATA', 'image/png', '', 'hello.png'],
          script = createTestScript('bfile/new', args)

    it('must default to UTF-8', (done) => {
      script.execute().then(file => {
        expect(file.encoding).toBe(undefined);
        done()
      })
    });

    it('must have filename', (done) => {
      script.execute().then(file => {
        expect(file.name).toEqual('hello.png');
        done()
      })
    });
  })
});