const express = require("express");
const ejs = require("ejs");


let gdir = __dirname.split("\\");
gdir.pop();
if (gdir[gdir.length - 1] == "src") gdir.pop();
gdir = gdir.join("\\") + "\\gsrc\\ASE\\";
let a = require("child_process").spawn("", [ // Insert NPX Path
  "parcel",
  gdir + "index.html",
]);
const app = express();
app.set("renderengine", ejs)
app.get("/", (req, res) => {
    res.render("index.ejs", {name: "game"});
})


app.get("/api/action/:a", (req, res) => {
  if (req.params.a == "ovsc") {
    let gdir = __dirname.split("\\");
    gdir.pop();
    if (gdir[gdir.length - 1] == "src") gdir.pop();
    gdir = gdir.join("/") + "/gsrc/game/";
    let a = require("child_process").spawn(
      "", // Insert VS-Code path
      [gdir]
    );
    setTimeout(() => {
      if (!a.killed) {
        a.kill();
      }
    }, 1000);
  }
  res.send("");
});

app.listen("8080");
