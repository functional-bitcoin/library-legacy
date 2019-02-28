const fs          = require('fs')
const path        = require('path')
const axios       = require('axios')
const { NodeVM }  = require('vm2')

//console.log(Promise)

vm = new NodeVM({
  sandbox: {
    axios,
    bitdb: { key: 'test' }
  }
})

loadFunction = (name) => {
  const file = `${ name }.js`,
        filePath = path.join(process.cwd(), 'src', file),
        data = fs.readFileSync(filePath, 'utf8');
  
  return vm.run(data, file);
}

argsFromArray = (args) => {
  return args.map(arg => Buffer.from(arg))
}

prepareVm = (fn) => {
  fn(vm)
}