var models = require("../data.base.conf");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var $sql = require("../sqlMap");

// 连接数据库
var connection = mysql.createConnection(models.mysql);
connection.connect();

// 将数据转换为json格式
var jsonWrite = function(res, ret) {
  if (typeof ret === "undefined") {
    res.json({
      code: "1",
      msg: "操作失败"
    });
  } else {
    res.json(ret);
  }
};

// 单元DNA测试显示接口
router.post("/mono", (req, res) => {
  var sql = $sql.property.selectmono;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM monodna ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/didnapseinone", (req, res) => {
  var sql = $sql.property.selectdidnapseinone;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM didna-pse-in-one ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/didnaultrapse", (req, res) => {
  var sql = $sql.property.selectdidnaultrapse;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM didna-ultrapse ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/didnavisfeature", (req, res) => {
  var sql = $sql.property.selectdidnavis;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM didna-visfeature ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/dirnapseinone", (req, res) => {
  var sql = $sql.property.selectdirnapseinone;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM dirna-pse-in-one ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/dirnaultrapse", (req, res) => {
  var sql = $sql.property.selectdirnaultrapse;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM dirna-ultrapse ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/dirnavisfeature", (req, res) => {
  var sql = $sql.property.selectdirnavis;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM dirna-visfeature ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/tridnaultrapse", (req, res) => {
  var sql = $sql.property.selecttridnaultrapse;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM tridna-ultrapse ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/tridnavisfeature", (req, res) => {
  var sql = $sql.property.selecttridnavis;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM tridna-visfeature ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

// 直接通过sql语句进行搜索查询
router.post("/searchmono", (req, res) => {
  var sql = $sql.property.searchmono;
  var proname = req.body;
  connection.query(sql, [proname.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM monodna ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchdidnapseinone", (req, res) => {
  var sql = $sql.property.searchdidnapseinone;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM didna-pse-in-one ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchdidnaultrapse", (req, res) => {
  var sql = $sql.property.searchdidnaultrapse;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM didna-ultrapse ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchdidnavisfeature", (req, res) => {
  var sql = $sql.property.searchdidnavis;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM didna-visfeature ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchdirnapseinone", (req, res) => {
  var sql = $sql.property.searchdirnapseinone;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM dirna-pse-in-one ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchdirnaultrapse", (req, res) => {
  var sql = $sql.property.searchdirnaultrapse;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM dirna-ultrapse ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchdirnavisfeature", (req, res) => {
  var sql = $sql.property.searchdirnavis;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM dirna-visfeature ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchtridnaultrapse", (req, res) => {
  var sql = $sql.property.searchtridnaultrapse;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM tridna-ultrapse ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchtridnavisfeature", (req, res) => {
  var sql = $sql.property.searchtridnavis;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM tridna-visfeature ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

module.exports = router;
