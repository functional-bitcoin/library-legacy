const util    = require('util')
const crypto  = require('crypto')

const textEncoder = new util.TextEncoder()

describe('bfile/encrytped_part', () => {
  const fn    = loadFunction('bfile/encrypted_part');
  const ctx   = { data: 'Unencrypted data' };

  const rawText     = 'Hello world!';
  const rawTextBuf  = textEncoder.encode(rawText)

  const rsa = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  })

  describe('with full args', () => {
    this.secretKey  = crypto.randomBytes(32)
    this.encSecret  = crypto.publicEncrypt(rsa.privateKey, this.secretKey)
    const iv        = crypto.randomBytes(12),
          cipher    = crypto.createCipheriv('aes-256-gcm', this.secretKey, iv),
          encrypted = Buffer.concat([cipher.update(rawTextBuf), cipher.final()]),
          tag       = cipher.getAuthTag();
    this.encData    = Buffer.concat([iv, encrypted, tag]);

    const args = argsFromArray([this.encSecret, this.encData])
    const file = fn({ ctx }, ...args)

    it('must return a file object', () => {
      expect(file.data).toEqual(ctx.data)
      expect(typeof file.encrypted).toEqual('object')
      expect( file.encrypted.secret ).toEqual( this.encSecret )
      expect( file.encrypted.data ).toEqual( this.encData )
      expect(typeof file.decrypt).toEqual('function')
    });

    it('must return decrytped data', done => {
      file.decrypt(rsa.privateKey).then(text => {
        expect(text).toEqual(rawText)
        done()
      })
    })
  })

})