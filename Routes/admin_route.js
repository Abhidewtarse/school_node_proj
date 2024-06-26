var express = require("express");
var router = express.Router();
var exe = require("./../connection");


router.get("/", function (req, res) {
  res.render("admin/Home.ejs");
});

router.get("/manage_faculty", async function (req, res) {
  var fac_list = await exe (`SELECT * FROM faculty_detail`);
  var obj = {"fac_list":fac_list} 
  res.render("admin/faculty.ejs",obj);
});

router.post("/save_faculty_detail",async function(req,res){
  var d= req.body;

      var file_name = new Date().getTime()+".png";
      req.files.faculty_photo.mv("public/uploads/"+file_name);
      

  var sql =`INSERT INTO faculty_detail(faculty_name,faculty_Designation,faculty_photo,) VALUES('${d.faculty_name}','${d.faculty_Designation}','${file_name}')`;

  var data= await exe(sql);
  // console.log(req.files);
  res.redirect("/admin/manage_faculty")
  
});
router.get("/edit_faculty/:id",async function(req,res){


  var fac_info = await exe(`SELECT * FROM faculty_detail WHERE faculty_id ='${req.params.id}'`);

  var obj = {"fac_info":fac_info};

  res.render("admin/edit_faculty.ejs",obj)

});

router.post("/update_faculty_detail",async function(req,res){
var d = req.body;
// var sql2;
// var data2;
// var file_name;
  if(req.files)
  {
    var file_name = new Date().getTime()+".png";
    req.files.faculty_photo.mv("public/uploads/"+file_name);

    sql2 = `UPDATE faculty_detail SET faculty_photo='${file_name}' WHERE faculty_id='${d.faculty_id}'`;
      var data= await exe(sql2);

  }

  var sql = `UPDATE faculty_detail SET faculty_name='${d.faculty_name}',faculty_Designation='${d.faculty_Designation}' WHERE faculty_id = '${d.faculty_id}'`;

  var data= await exe(sql);
  // res.send(data);
  res.redirect("/admin/manage_faculty");
});
router.get("/delete_faculty/:id",async function(req,res){
  var sql = `DELETE FROM faculty_detail WHERE faculty_id = '${req.params.id}'`;
  var data = await exe(sql);
  // res.send(data);
  res.redirect("/admin/manage_faculty")
})
module.exports = router;