let _ = require("lodash")
let path = require("path")
let ignore = require("ignore-file")
let vile = require("@brentlintner/vile")

// TODO: support custom ignoring (with is_not_ignored)
// TODO: get a list of all haskell files based on ignore

let allowed = (ignore_list = []) => {
  // TODO: support windows
  let ignored = ignore.compile(ignore_list.join("\n"))

  return (file) => {
    return file.match(/\.hs$/) && !ignored(file)
  }
}

let hlint = (custom_config_path) => {
  let opts = {}

  if (custom_config_path) { opts.h = custom_config_path }

  opts.args = _.reduce(opts, (arr, option, name) => {
    return arr.concat([`-${name}`, option])
  }, []).concat(["--color=never", ".", "--json"])

  return vile
    .spawn("hlint", opts)
    .then((stdout) => {
      return stdout ? JSON.parse(stdout) : { files: [] }
    })
}

let to_vile_issue_type = (hlint_severity) => {
  return hlint_severity.toLowerCase() == "error" ?
    vile.ERROR : vile.WARNING
}

let vile_issue = (issue) => {
  return vile.issue(
    to_vile_issue_type(issue.severity),
    path.normalize(issue.file),
    `${issue.hint} (${issue.from} ---> ${issue.to})`,
    { line: issue.startLine, character: issue.startColumn },
    { line: issue.endLine, character: issue.endColumn }
  )
}

// TODO: get all Haskell files checked for reporting
let punish = (plugin_data) => {
  return vile.promise_each(
    process.cwd(),
    allowed(plugin_data.ignore),
    (filepath) => vile.issue(vile.OK, filepath),
    { read_data: false }
  )
  .then((all_files) => {
    return hlint(_.get(plugin_data, "config"))
      .then((hlint_json) => hlint_json.map(vile_issue))
      .then((issues) => {
        return _.reject(all_files, (file) => {
          return _.any(issues, (issue) => issue.file == file)
        }).concat(issues)
      })
  })
}

module.exports = {
  punish: punish
}
