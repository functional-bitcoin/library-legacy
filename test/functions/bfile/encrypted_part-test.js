const util    = require('util')
const forge   = require('node-forge')

describe('bfile/encrytped_part', () => {
  const fn      = loadFunction('bfile/encrypted_part');
  const ctx     = { data: 'Unencrypted data' };
  const rawText = 'Hello world!';

  const keys = forge.pki.rsa.generateKeyPair({bits: 2048, e: 0x10001})

  describe('with full args', () => {
    this.secretKey  = forge.random.getBytesSync(32)
    this.encSecret  = keys.publicKey.encrypt(this.secretKey, 'RSA-OAEP', { md: forge.md.sha256.create() })
    const iv        = forge.random.getBytesSync(12),
          cipher    = forge.cipher.createCipher('AES-GCM', this.secretKey);

    cipher.start({ iv })
    cipher.update( forge.util.createBuffer(rawText) )
    cipher.finish()

    const encrypted = cipher.output;
          tag       = cipher.mode.tag;

    this.encData    = Buffer.concat([iv, encrypted.data, tag.data].map(d => Buffer.from(d, 'binary')));

    const args = argsFromArray([Buffer.from(this.encSecret, 'binary'), Buffer.from(this.encData, 'binary')])
    const file = fn({ ctx }, ...args)

    it('must return a file object', () => {
      expect(file.data).toEqual(ctx.data)
      expect(typeof file.encrypted).toEqual('object')
      expect( file.encrypted.secret ).toEqual( Buffer.from(this.encSecret, 'binary') )
      expect( file.encrypted.data ).toEqual( this.encData )
      expect(typeof file.decrypt).toEqual('function')
    });

    it('must return decrytped data', done => {
      file.decrypt(keys.privateKey).then(data => {
        expect(data).toEqual(rawText)
        done()
      })
    })
  })

})