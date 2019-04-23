/**
 * @function    bfile/new
 * @description Initiates a new object following the B:// protocol specification.
 * @param       {buffer}  data      File blob data
 * @param       {string}  type      File media-type
 * @param       {string}  encoding  Optional file encoding
 * @param       {string}  name      Optional file name
 * @return      {object}
 */
module.exports = ({ ctx }, data, type, encoding, name) => {
  if ( !data ) {
    throw new Error('Invalid arguments')
  }
  const file = {
    data,
    type:     type && type.length         ? type.toString()     : undefined,
    encoding: encoding && encoding.length ? encoding.toString() : undefined,
    name:     name && name.length         ? name.toString()     : undefined
  }
  if ( !file.encoding && /^text\//.test(file.type) ) {
    file.encoding = 'UTF-8';
  }
  return file;
}