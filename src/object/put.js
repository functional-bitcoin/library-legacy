/**
 * @function    object/put
 * @description Puts the given key in the context object, with the given args value.
 * @param       {string}    key   Object key
 * @param       {...string} args  Any number of arguments
 * @return      {object}
 */
module.exports = ({ ctx }, key, ...args) => {
  if ( !key || !key.length ) {
    throw new Error('Invalid arguments');
  }

  let val;
  ctx = { ...ctx };

  if (args.length === 1) {
    val = args[0].toString();
  } else {
    val = args.reduce((obj, arg, i) => {
      if (i % 2 === 0) {
        const v = args[i + 1];
        obj[ arg.toString() ] = v ? v.toString() : undefined;
      };
      return obj;
    }, {})
  }

  ctx[ key.toString() ] = val;
  return ctx;
}