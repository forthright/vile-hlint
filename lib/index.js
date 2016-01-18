"use strict";

var _ = require("lodash");
var path = require("path");
var vile = require("@brentlintner/vile");

// TODO: dynamically map options base don config
var hlint = function hlint(config) {
  var hintpath = _.get(config, "path");
  var args = ["--color=never", ".", "--json"];

  if (hintpath) args.push("-h", hintpath);

  return vile.spawn("hlint", { args: args }).then(function (stdout) {
    return stdout ? JSON.parse(stdout) : { files: [] };
  });
};

var to_vile_issue_type = function to_vile_issue_type(hlint_severity) {
  return hlint_severity.toLowerCase() == "error" ? vile.ERR : vile.STYL;
};

var vile_issue = function vile_issue(issue) {
  var message = issue.hint + " (" + issue.from + " ---> " + issue.to + ")";
  return vile.issue({
    type: to_vile_issue_type(issue.severity),
    path: path.normalize(issue.file),
    title: message,
    message: message,
    signature: "hlint::" + issue.hint,
    where: {
      start: { line: issue.startLine, character: issue.startColumn },
      end: { line: issue.endLine, character: issue.endColumn }
    }
  });
};

var punish = function punish(plugin_data) {
  return hlint(_.get(plugin_data, "config")).then(function (hlint_json) {
    return hlint_json.map(vile_issue);
  });
};

module.exports = {
  punish: punish
};