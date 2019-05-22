/**
 * @function    audiob/action
 * @description Initiates a new audioB action.
 * @param       {number}    action  Action number
 * @param       {...string} args    Any number of arguments (dependent on action)
 * @return      [description]
 */
module.exports = ({ ctx }, action, ...args) => {
  if ( !action || isNaN(action[0]) || action[0] < 1 ) throw new Error('Invalid action');
  if ( args.length < 1 || !args.every(a => !!a) )     throw new Error('Invalid arguments');

  let payload;

  function parseFile(hash, price, currency, address, survey) {
    survey = survey ? [...survey] : [survey];
    return {
      hash:       hash.toString(),
      price:      price.readDoubleBE(),
      currency:   currency.toString(),
      address:    address.toString(),
      permitted:  survey.includes(1)
    }
  }

  switch(action[0]) {
    case 1:
      payload = parseFile(...args)
      break;
    default:
      payload = { txid: args[0].toString() }
      break;
  }

  return {
    action: action[0],
    ...payload
  }
}