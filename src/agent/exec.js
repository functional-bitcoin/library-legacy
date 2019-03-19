/**
 * @function    agent/exec
 * @description Executes another script inline, accepting the current context
 * @param       {string} txid   32 byte hex string transaction ID of script to execute
 * @return      [description]
 */
module.exports = ({ ctx, $agent }, txid) => {
  // If buf is precisely 32 bytes, then assume it is raw hex
  // Otherwise convert to utf-8 string
  txid = txid.toString(txid.length === 32 ? 'hex' : 'utf8')
  
  return new Promise((resolve, reject) => {
    $agent.runScript(txid, { ctx })
      .on('success', script => resolve(script.result))
      .on('error', err => reject(err))
  })
}