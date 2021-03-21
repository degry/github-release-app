import childProcess from 'child_process'

const exec = (command: string) => (
  new Promise((resolve, reject) => {
    const processInstance = childProcess.exec(`${command}`, (err, res) => (
      err ? reject(err) : resolve(res)
    ));

    processInstance.stdout.pipe(process.stdout);
  })
);

export default exec
