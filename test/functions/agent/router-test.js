const nock = require('nock')

const routes = {
  '/about': {
    b: 'b930def6e95538b63e4bac915652ccd46d00be94929c88af4ec9993266a1420d',
    c: '8a62a3e6b69811a45b8416ddc0d21e886441bbb582262b9b01ff2c7dd2b55cb1'
  },
  '/foo/bar': {
    b: 'aaaaaaaa',
    c: '11111111'
  },
  '/baz/index.html': {
    b: 'bbbbbbbb',
    c: '22222222'
  },
  '/qux/index.htm': {
    b: 'cccccccc',
    c: '33333333'
  }
}

describe('agent/router', () => {

  describe('with valid context', () => {
    const ctx = {
      data: JSON.stringify({
        routes
      })
    }

    it('must have a routes object', (done) => {
      const script = createTestScript('agent/router', [], { ctx })

      script.execute().then(result => {
        expect(result.routes).toEqual( jasmine.any(Object) );
        done()
      })
    })

    it('must match a route', (done) => {
      const script = createTestScript('agent/router', [], { ctx })

      script.execute().then(result => {
        expect(result.match('/foo/bar').c).toEqual('11111111');
        expect(result.match('/baz').c).toEqual('22222222');
        expect(result.match('/qux').c).toEqual('33333333');
        done()
      })
    })

    it('must throw error on missing route', (done) => {
      const script = createTestScript('agent/router', [], { ctx })

      script.execute().then(result => {
        try {
          result.match('/not-here')
        } catch(e) {
          done()
        }
        done(new Error('Should throw not found error'))
      })
    })    

    it('must call a route and return a new script', (done) => {
      const script = createTestScript('agent/router', [], { ctx })

      script.execute().then(result => {
        nock('https://genesis.bitdb.network')
          .filteringPath(path => '/')
          .get('/')
          .replyWithFile(200, './test/mocks/router1.json')
        nock('https://babel.bitdb.network')
          .filteringPath(path => '/')
          .get('/')
          .replyWithFile(200, './test/mocks/router2.json')

        const route = result.handle('/about')
        expect(route.constructor.name).toEqual('FBScript');
        
        route.on('success', script => {
          expect(script.result.data).toMatch(/About us/)
          expect(script.result.name).toEqual('index.html')
          done()
        })
      })
    })
  })

  describe('with spa mode', () => {
    const ctx = {
      data: JSON.stringify({
        routes,
        options: {
          spa: '/baz/index.html'
        }
      })
    }

    it('must fallback to root path in SPA mode', (done) => {
      const script = createTestScript('agent/router', [], { ctx })

      script.execute().then(result => {
        expect(result.match('/not-here').c).toEqual('22222222');
        done()
      })
    })
  })

  describe('with no context', () => {
    const script = createTestScript('agent/router')

    it('must throw error', (done) => {
      script.execute()
        .then(res => done(new Error('Promise should not be resolved')) )
        .catch(err => done() )
    });
  })
})