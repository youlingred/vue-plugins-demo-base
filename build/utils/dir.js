const path=require('path');
rootof=function(dirOrFile){
  return path.resolve(__dirname,'../../',dirOrFile)
};
module.exports={
  rootof
}
module.exports.default=module.exports;
