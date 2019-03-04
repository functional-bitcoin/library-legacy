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
    async decrypt(privateKey) {
      const secretKey = crypto.privateDecrypt(privateKey, this.encrypted.secret)
      const iv        = this.encrypted.data.slice(0, 12),
            encrypted = this.encrypted.data.slice(12, this.encrypted.data.length-16),
            tag       = this.encrypted.data.slice(this.encrypted.data.length-16);

      const decipher  = crypto.createDecipheriv('aes-256-gcm', secretKey, iv)
      decipher.setAuthTag(tag)
      return decipher.update(encrypted) + decipher.final();
    }
  };
}