const path = require('path');
const nock = require('nock')

describe('bcat/file', () => {
  const fn    = loadFunction('bcat/file');
  const ctx   = undefined;

  describe('with full args', () => {
    const args = argsFromArray(['add.bico.media', 'video/mp4', 'binary', 'Top Gun I feel the need... the need for speed!.mp4', '']);
    const parts = [ '76d0361a383b00f5584c9e8fcbc6a5eb18e6cc9dcd948f8bcc272f0b4122753c',
      '8bc9896adbb54dc8397dc236ebd3225fe6b7534db126fcbdb9f55e914b8727d3',
      '6be05b774455fdc929741e8cb4baa2f67418fdb288e2f43edbe2c17e0e16bcab',
      '46ea31dc82016c54bc6bbae7ba49bf0d936c4c4c2c9105764c874efcf012ae49',
      'f21393f3c44ec3fe391e7d4e31207870ced887a6a399ade6032fad1986526fb6',
      'fa5841eae16b284bdae4bf2074a025f18edb4d394c3e555aa90d3a0b80fe2e5f',
      'fa193febd368bdb9c3e975ae382e656a40e936cf4a0b1b6ae6af16a0a2c67343',
      '4c67d89a31cb5eb3d057509d333ec4ef1a99c816db9e674083717ef1d1e833c3'
    ]

    parts.forEach(part => args.push( Buffer.from(part, 'hex') ))

    it('must return a file object', (done) => {
      nock('https://babel.bitdb.network')
        .filteringPath(path => '/')
        .get('/')
        .replyWithFile(200, './test/mocks/bcat1.json')

      fn({ ctx }, ...args).then(file => {
        expect(file.data.length).toEqual(766356);
        expect(file.info).toEqual('add.bico.media');
        expect(file.type).toEqual('video/mp4');
        expect(file.encoding).toEqual('binary');
        expect(file.name).toEqual('Top Gun I feel the need... the need for speed!.mp4');
        done()
      })
    });
  })

})