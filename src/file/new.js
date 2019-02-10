/**
 * @function    file/new
 * @description Initiates a simple file object.
 * @param       {string}  type  File media-type
 * @param       {buffer}  data  File blob data
 * @return      {object}
 */
module.exports = ({ ctx }, type, data) => {
  if ( !type || !type.length || !data ) {
    throw new Error('Invalid arguments');
  }
  return {
    data,
    type: type.toString()
  }
}