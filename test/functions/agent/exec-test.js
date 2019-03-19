const nock = require('nock')

setupMocks = _ => {
  nock('https://genesis.bitdb.network')
    .filteringPath(path => '/')
    .get('/')
    .replyWithFile(200, './test/mocks/exec1.json')

  nock('https://babel.bitdb.network')
    .filteringPath(path => '/')
    .get('/')
    .replyWithFile(200, './test/mocks/exec2.json')
}

describe('agent/exec', () => {

  describe('without a ctx', () => {
    const txid = 'ece0d339ac04f90e8c8d1e031b4a1e7391cd85d894327d262d4699af9f95d321';

    it('must return the result of the exec script', (done) => {
      setupMocks()
      const args    = [ Buffer.from(txid, 'hex') ],
            script  = createTestScript('agent/exec', args)

      script.execute().then(result => {
        expect(result.foo).toEqual('bar');
        expect(result.qux.cat).toEqual('dog');
        done()
      })
    })
  })

  describe('with a ctx', () => {
    const ctx = { foo: 100, bar: 200 },
          txid = 'ece0d339ac04f90e8c8d1e031b4a1e7391cd85d894327d262d4699af9f95d321';

    it('must build the result on top of the ctx', (done) => {
      setupMocks()
      const args    = [ Buffer.from(txid, 'hex') ],
            script  = createTestScript('agent/exec', args, { ctx })

      script.execute().then(result => {
        expect(result.foo).toEqual('bar');
        expect(result.bar).toEqual(200);
        done()
      })
    })
  })
  

})