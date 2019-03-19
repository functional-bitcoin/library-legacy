describe('file/new', () => {
  describe('with valid args', () => {
    const args = ['text/plain', 'hello world'],
          script = createTestScript('file/new', args);

    it('must return file object', (done) => {
      script.execute().then(file => {
        expect(file.type).toEqual('text/plain');
        expect(file.data.toString()).toEqual('hello world');
        done()
      })
      
    });
  })

  describe('with empty args', () => {
    const args = ['', ''],
          script = createTestScript('file/new', args);

    it('must throw error', (done) => {
      script.execute()
        .then(res => done(new Error('Promise should not be resolved')) )
        .catch(err => done() )
    });
  })
});