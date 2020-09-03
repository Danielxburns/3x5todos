const projects = require('./json-data/projects.json');
const todos = require('./json-data/items.json');
const test = require('./json-data/items-test.json');
const sections = require('./json-data/sections.json');
const fs = require('fs');
var pdf = require('html-pdf');



/* 

pull relevant data from files and place in HTML file styled to fit on 3X5 card

loop thru todos array
skip item if item.parent_id is not null
save each as html file

for each todo:
  read index.html 
  // stringify file first? yes. otherwise you just get a buffer and updateing a buffer is not something I want to get into right now
  // going to use fs.readFile first. could probably use readFileSync since I won't be using it a browser. It might make the code easier to read. I wonder under what cases could the code get blocked under these circumstances

  set InnerHTML // there is no DOM, no document or window so to update the file I will use a regex
  write file (use createWriteStream - first arg is a string that contains the [path (optional)] and filename and extension) with id as filename and .html as extension (can i do that?) (use Path.join or path.resolve to create the path)

batch print as pdf to printer


[x] set up sample data to test with

[x] write script to format data

[x] test in nodejs

[x] write script to batch save

[] write script to convert to pdf

[] write script to send to printer

[] run test of one on printer

[] run batch print of test data on printer

[] run on real data

*/

/* ---- CREATE A FOLDER FOR HTML FILES --- */

const dt  = new Date().toLocaleDateString().replace(/\//g, "-")
const dir = __dirname + dt;
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

/* ----- GENERATE HTML FILES AND SAVE ---- */

function getProjectById(projId) {return projects.find(project => /* console.log('inside getProjectById - project.name :>> ', project.name) */project.id === projId)};
function getSectionById(secId) {return sections.find(section => section.id === secId)};
test1.forEach(todo => {
  fs.readFile('index.html', (err, html) => {
    if (err) return console.err('Error reading file:', err);
    let text = html.toString();
    let projName = getProjectById(todo.project_id).name;
    let sectName = getSectionById(todo.section_id) ? getSectionById(todo.section_id).name : "";
    text = text.replace('project', projName);
    text = text.replace('section', sectName);
    text = text.replace('content', todo.content)
    pdf.create(text).toFile(`${dir}/todo_${todo.id}.html`, (err) => {
      if (err) { console.log('Error writing file :>> ', err) }
    })
  });
});

