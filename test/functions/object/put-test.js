describe('object/put', () => {
  describe('with args list', () => {
    const ctx = { foo: '1' },
          args = ['bar', 'qux', '3'],
          script = createTestScript('object/put', args, { ctx })

    it('must return an extended object', (done) => {
      script.execute().then(obj => {
        expect(obj.foo).toEqual('1');
        expect(obj.bar).toEqual({ qux: '3' });
        done()
      })
    });
  })

  describe('with args string', () => {
    const ctx = { foo: '1' },
          args = ['bar', 'value'],
          script = createTestScript('object/put', args, { ctx })

    it('must return an extended object', (done) => {
      script.execute().then(obj => {
        expect(obj.foo).toEqual('1');
        expect(obj.bar).toEqual('value');
        done()
      })
    });
  })

  describe('without key', () => {
    const ctx = { foo: '1' },
          args = ['', 'bar', '2'],
          script = createTestScript('object/put', args, { ctx })

    it('must throw error', (done) => {
      script.execute()
        .then(res => done(new Error('Promise should not be resolved')) )
        .catch(err => done() )
    });
  })

  describe('without ctx', () => {
    const args = ['bar', 'qux', '3'],
          script = createTestScript('object/put', args)

    it('must throw error', (done) => {
      script.execute().then(obj => {
        expect(obj.foo).toBe(undefined);
        expect(obj.bar).toEqual({ qux: '3' });
        done()
      })
    });
  })
})