// sql语句
var sqlMap = {
  property: {
    // 显示数据
    selectmono: "select * from monodna",
    selectdidnapseinone: "select * from `didna-pse-in-one`",
    selectdidnaultrapse: "select * from `didna-ultrapse`",
    selectdidnavis: "select * from `didna-visfeature`",
    selectdirnapseinone: "select * from `dirna-pse-in-one`",
    selectdirnaultrapse: "select * from `dirna-ultrapse`",
    selectdirnavis: "select * from `dirna-visfeature`",
    selecttridnaultrapse: "select * from `tridna-ultrapse`",
    selecttridnavis: "select * from `tridna-visfeature`",

    // 搜索数据
    searchmono: 'select * from monodna where PropertyName like "%"?"%"',
    searchdidnapseinone:
      'select * from `didna-pse-in-one` where PropertyName like "%"?"%"',
    searchdidnaultrapse:
      'select * from `didna-ultrapse` where PropertyName like "%"?"%"',
    searchdidnavis:
      'select * from `didna-visfeature` where PropertyName like "%"?"%"',
    searchdirnapseinone:
      'select * from `dirna-pse-in-one` where PropertyName like "%"?"%"',
    searchdirnaultrapse:
      'select * from `dirna-ultrapse` where PropertyName like "%"?"%"',
    searchdirnavis:
      'select * from `dirna-visfeature` where PropertyName like "%"?"%"',
    searchtridnaultrapse:
      'select * from `tridna-ultrapse` where PropertyName like "%"?"%"',
    searchtridnavis:
      'select * from `tridna-visfeature` where PropertyName like "%"?"%"'
  }
};

module.exports = sqlMap;
