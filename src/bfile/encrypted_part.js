/**
 * @function    bfile/encrypted_part
 * @description Extends a bfile object with encrytped data, and a decrypt method that accepts a privateKey to decrypt the data
 * @param       {buffer} secret Encrytped secret key
 * @param       {buffer} data   Encrytped data
 * @return      data [description]
 */
module.exports = ({ ctx }, secret, data) => {
  return {
    ...ctx,
    encrypted: {
      secret,
      data
    },
    decrypt(privateKey) {
      const secretKey = privateKey.decrypt(this.encrypted.secret, 'RSA-OAEP', { md: forge.md.sha256.create() })
      const iv        = this.encrypted.data.slice(0, 12),
            encrypted = this.encrypted.data.slice(12, this.encrypted.data.length-16),
            tag       = this.encrypted.data.slice(this.encrypted.data.length-16),
            byteBuf   = new forge.util.ByteBuffer(encrypted);

      const decipher  = forge.cipher.createDecipher('AES-GCM', secretKey)
      decipher.start({ 
        iv: iv.toString('binary'),
        tag: forge.util.createBuffer(tag)
      })
      decipher.update(forge.util.createBuffer(encrypted))
      const res = decipher.finish()
      return res ? forge.util.decodeUtf8(decipher.output.data) : res;
    }
  };
}