describe('object/extend', () => {
  describe('with full args', () => {
    const ctx = { foo: '1' },
          args = ['bar', '2', 'qux', '3'],
          script = createTestScript('object/extend', args, { ctx });

    it('must return an extended object', (done) => {
      script.execute().then(obj => {
        expect(obj.foo).toEqual('1');
        expect(obj.bar).toEqual('2');
        expect(obj.qux).toEqual('3');
        done()
      })
    });
  })

  describe('with odd num args', () => {
    const ctx = { foo: '1' },
          args = ['bar', '2', 'qux'],
          script = createTestScript('object/extend', args, { ctx });

    it('must return an extended object', (done) => {
      script.execute().then(obj => {
        expect(Object.keys(obj)).toContain('qux');
        expect(obj.qux).toBe(undefined);
        done()
      })
    });
  })

  describe('with no args', () => {
    const ctx = { foo: '1' },
          script = createTestScript('object/extend', [], { ctx });

    it('must return an extended object', (done) => {
      script.execute().then(obj => {
        expect(obj.foo).toEqual('1');
        expect(obj).toEqual(ctx);
        done()
      })
    });
  })

  describe('with no context', () => {
    const args = ['bar', '2'],
          script = createTestScript('object/extend', args);

    it('must return an extended object', (done) => {
      script.execute().then(obj => {
        expect(obj.foo).toBe(undefined);
        expect(obj.bar).toEqual('2');
        done()
      })
    });
  })
})