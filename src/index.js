let _ = require("lodash")
let path = require("path")
let vile = require("@forthright/vile")

// TODO: dynamically map options base don config
let hlint = (config) => {
  let hintpath = _.get(config, "path")
  let args = [ "--color=never", ".", "--json" ]

  if (hintpath) args.push("-h", hintpath)

  return vile
    .spawn("hlint", { args: args })
    .then((stdout) =>
      stdout ? JSON.parse(stdout) : { files: [] })
}

let to_vile_issue_type = (hlint_severity) =>
  hlint_severity.toLowerCase() == "error" ?
    vile.MAIN : vile.STYL

let vile_issue = (issue) => {
  let message = `${issue.hint} (${issue.from} ---> ${issue.to})`
  return vile.issue({
    type: to_vile_issue_type(issue.severity),
    path: path.normalize(issue.file),
    title: message,
    message: message,
    signature: `hlint::${issue.hint}`,
    where: {
      start: { line: issue.startLine, character: issue.startColumn },
      end: { line: issue.endLine, character: issue.endColumn }
    }
  })
}

let punish = (plugin_data) =>
  hlint(_.get(plugin_data, "config"))
    .then((hlint_json) => hlint_json.map(vile_issue))

module.exports = {
  punish: punish
}
