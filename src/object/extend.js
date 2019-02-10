/**
 * @function    object/extend
 * @description Extends the context object with a list of arguments paired into key-value pairs.
 * @param       {...string} args  Any number of arguments
 * @return      {object}
 */
module.exports = ({ ctx }, ...args) => {
  return args.reduce((obj, arg, i) => {
    if (i % 2 === 0) {
      const val = args[i + 1];
      obj[ arg.toString() ] = val ? val.toString() : undefined;
    };
    return obj;
  }, { ...ctx })
}