describe('audiob/action', () => {
  describe('action 2', () => {
    describe('with valid args', () => {
      const priceBuf = Buffer.alloc(8);
      priceBuf.writeDoubleBE(99.123, 0)
      const args = [[1], 'abcdef', priceBuf, 'USD', '1Address', [true, false]],
            script = createTestScript('audiob/action', args);

      it('must return a file object', (done) => {
        script.execute().then(res => {
          expect(res.action).toEqual(1);
          expect(res.hash).toEqual('abcdef');
          expect(res.price).toEqual(99.123);
          expect(res.currency).toEqual('USD');
          expect(res.address).toEqual('1Address');
          expect(res.permitted).toEqual(true);
          done()
        })
      })
    })

    describe('with invalid args', () => {
      const args = [[1], 'foo'],
            script = createTestScript('audiob/action', args);

      it('must throw error', (done) => {
        script.execute()
          .then(res => done(new Error('Promise should not be resolved')) )
          .catch(err => done() )
      })
    })
  })

  describe('action 2', () => {
    describe('with valid args', () => {
      const args = [[2], 'abcdef'],
            script = createTestScript('audiob/action', args);

      it('must return a file object', (done) => {
        script.execute().then(res => {
          expect(res.action).toEqual(2);
          expect(res.txid).toEqual('abcdef');
          done()
        })
      })
    })

    describe('with invalid args', () => {
      const args = [[2]],
            script = createTestScript('audiob/action', args);

      it('must throw error', (done) => {
        script.execute()
          .then(res => done(new Error('Promise should not be resolved')) )
          .catch(err => done() )
      })
    })
  })


  describe('action 3', () => {
    describe('with valid args', () => {
      const args = [[3], 'abcdef'],
            script = createTestScript('audiob/action', args);

      it('must return a file object', (done) => {
        script.execute().then(res => {
          expect(res.action).toEqual(3);
          expect(res.txid).toEqual('abcdef');
          done()
        })
      })
    })

    describe('with invalid args', () => {
      const args = [[2]],
            script = createTestScript('audiob/action', args);

      it('must throw error', (done) => {
        script.execute()
          .then(res => done(new Error('Promise should not be resolved')) )
          .catch(err => done() )
      })
    })
  })

});