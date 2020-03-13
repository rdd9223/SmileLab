var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');


/* GET users listing. */
router.post('/', (req, res) => {
  let sourcePath = path.join(__dirname, `../source/${req.body.userId}`);
  console.log(sourcePath)
  if (!fs.existsSync(sourcePath)) {
    fs.mkdirSync(sourcePath);
  }

  fs.writeFileSync(path.join(sourcePath, "Main.py"), req.body.source);
  sourcePath = sourcePath.replace(/\\/gi ,"/");
  console.log(sourcePath)
  //sourcePath.split("\\\\").join("\\")
  // docker run --rm -v C:\Users\rdd92:/usr/src -w /usr/src python:3 python hello1.py
  // const docker = spawn("docker", ["run", "--rm", "-v", `${sourcePath}:/usr/src`, "-w", "/usr/src", "python:3", "python", "Main.py"]);
  const docker = exec(`docker run --rm -v ${sourcePath}:/usr/src -w /usr/src python:3 python Main.py`, (err, out, stderr) => {
    console.log(out)
  })
  console.log(docker)
  
  
});

router.get('/result', (req, res) => {
  const isError = JSON.parse(req.query.is_error);
  let index = req.query.index ? parseInt(req.query.index, 10) : -1;

  if (!dockerInstance) {
    res.status(404).end();
    return;
  }

  while (!((isError && dockerInstance.stderr[index+1]) ||
    (!isError && dockerInstance.stderr.length > 0) ||
    (!isError && dockerInstance.stdout[index + 1]))) {
      new Promise(resolve => {
        setTimeout(resolve, 500);
      })
    }

  if (!isError && dockerInstance.stderr.length > 0) {
    index = -1;
  }

  if (dockerInstance.stderr.length > 0) {
    res.status(200).json({
      err: true,
      data: dockerInstance.stderr[index + 1].data,
      index: index + 1,
      closed: dockerInstance.stderr[index + 1].closed
    });
  } else {
    console.log(index + 1, dockerInstance.stdout[index + 1]);
    res.status(200).json({
      err: false,
      data: dockerInstance.stdout[index + 1].data,
      index: index + 1,
      closed: dockerInstance.stdout[index + 1].closed
    })
  }
})

module.exports = router;