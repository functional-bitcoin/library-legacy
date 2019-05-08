describe('audiob/action', () => {
  describe('action 2', () => {
    describe('with valid args', () => {
      const priceBuf = Buffer.alloc(8);
      priceBuf.writeDoubleBE(99.123, 0)
      const args = [[1], 'abcdef', priceBuf, '1Address'],
            script = createTestScript('audiob/action', args);

      it('must return a file object', (done) => {
        script.execute().then(res => {
          expect(res.action).toEqual(1);
          expect(res.hash).toEqual('abcdef');
          expect(res.price).toEqual(99.123);
          expect(res.address).toEqual('1Address');
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

//  describe('with minimal args', () => {
//    const args = ['hello world', 'text/plain'],
//          script = createTestScript('bfile/new', args)
//
//    it('must return a file object', (done) => {
//      script.execute().then(file => {
//        expect(file.data.toString()).toEqual('hello world');
//        expect(file.type).toEqual('text/plain');
//        done()
//      })
//    });
//
//    it('must default to UTF-8', (done) => {
//      script.execute().then(file => {
//        expect(file.encoding).toEqual('UTF-8');
//        done()
//      })
//    });
//
//    it('must have no filename', (done) => {
//      script.execute().then(file => {
//        expect(file.name).toBe(undefined);
//        done()
//      })
//    });
//  })
//
//  describe('with minimal binary args', () => {
//    const args = ['IMAGEDATA', 'image/png'],
//          script = createTestScript('bfile/new', args)
//
//    it('wont default to UTF-8', (done) => {
//      script.execute().then(file => {
//        expect(file.encoding).toBe(undefined);
//        done()
//      })
//    });
//  })
//
//  describe('with skipped args', () => {
//    const args = ['hello world', 'text/plain', '', 'hello.txt'],
//          script = createTestScript('bfile/new', args)
//
//    it('must default to UTF-8', (done) => {
//      script.execute().then(file => {
//        expect(file.encoding).toEqual('UTF-8');
//        done()
//      })
//    });
//
//    it('must have filename', (done) => {
//      script.execute().then(file => {
//        expect(file.name).toEqual('hello.txt');
//        done()
//      })
//    });
//  })
//
//  describe('with skipped binary args', () => {
//    const args = ['IMAGEDATA', 'image/png', '', 'hello.png'],
//          script = createTestScript('bfile/new', args)
//
//    it('must default to UTF-8', (done) => {
//      script.execute().then(file => {
//        expect(file.encoding).toBe(undefined);
//        done()
//      })
//    });
//
//    it('must have filename', (done) => {
//      script.execute().then(file => {
//        expect(file.name).toEqual('hello.png');
//        done()
//      })
//    });
//  })
});