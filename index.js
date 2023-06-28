const nodeCmd = require('node-cmd');

function parseJson(json)
{
  if(Object.keys(json).length === 0) return "";

  const text = JSON.stringify(json);
  const char1 = "\\";
  const char2 = "\"";
  return text.replaceAll("\"", `${char1}${char2}`);
}

class SuperFacturaAPI {
  constructor(user, password, environment) {
    this.user = user;
    this.pass = password;
    this.env = environment;
  }

  SendDTE(json, env, opts = {}) {
    return new Promise ((resolve, reject) => {
      if(!env) env = this.env ? this.env : "cer";

      const cmd = `${__dirname}\\res\\superfactura.exe "${this.user}" "${this.pass}" "${env}" "${parseJson(json)}" ${parseJson(opts)}`;
      nodeCmd.run(
        cmd,
        (err, data, stderr) => {
          if(err || stderr) reject(err, stderr);
          else resolve(data);
        }
      );
    })
  }
}

module.exports = SuperFacturaAPI