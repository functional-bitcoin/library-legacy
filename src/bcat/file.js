/**
 * @function    bcat/file
 * @description Initiates a new object following the B://cat protocol specification.
 * @param       {string}  info      Optional arbitrary information
 * @param       {string}  type      File media-type
 * @param       {string}  encoding  Optional file encoding
 * @param       {string}  name      Optional file name
 * @param       {string}  flag      Optional flags. Currently unsupported
 * @return      [description]
 */
module.exports = ({ ctx }, info, type, encoding, name, flag, ...txids) => {
  if ( !txids || !txids.length ) {
    throw new Error('Invalid arguments')
  }

  const file = {
    info:     info && info.length         ? info.toString()     : undefined,
    type:     type && type.length         ? type.toString()     : 'text/plain',
    encoding: encoding && encoding.length ? encoding.toString() : 'UTF-8',
    name:     name && name.length         ? name.toString()     : undefined,
    flag:     flag && flag.length         ? flag.toString()     : undefined
  }

  const query = {
    "v": 3,
    "q": {
      "find": {
        "tx.h": {
          "$in": txids.map(txid => txid.toString('hex'))
        }
      },
      "limit": txids.length
    },
    "r": {
      "f": "[.[] | { h: .tx.h, d: .out[0] | (.lh2 // .h2) }]"
    }
  }

  const path    = Buffer.from(JSON.stringify(query)).toString('base64');
  const url     = `https://babel.bitdb.network/q/1DHDifPvtPgKFPZMRSxmVHhiPvFmxZwbfh/${ path }`;
  const headers = { key: bitdb.key };

  return axios.get(url, { headers })
    .then(r => {
      const txs = r.data.u.concat(r.data.c),
            data = [];

      txids.forEach(txid => {
        const tx = txs.find(t => t.h === txid.toString('hex'));
        data.push(tx.d)
      })

      file.data = Buffer.from(data.join(''), 'hex');

      return file;
    })
}