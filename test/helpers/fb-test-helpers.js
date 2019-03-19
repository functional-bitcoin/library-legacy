const fs          = require('fs')
const path        = require('path')
const fb          = require('@functional-bitcoin/agent')
const forge       = require('node-forge')
const axios       = require('axios')
const { NodeVM }  = require('vm2')

fb.config.adapter.key = 'test'

const agent = new fb.Agent({
  sandbox: {
    axios,
    forge,
    bitdb: { key: fb.config.adapter.key }
  }
})

createTestScript = (name, args = [], opts = {}) => {
  // Load function
  const file = `${ name }.js`,
        filePath = path.join(process.cwd(), 'src', file),
        fn = fs.readFileSync(filePath, 'utf8');

  // Build arguments
  args = args.map(arg => Buffer.from(arg))

  // Init script
  script = new fb.Script({ txid: 'TEST', ctx: opts.ctx, agent })
  script.stack = [
    { cmd: name, fn: agent._vm.run(fn, file), args }
  ]
  return script
}
