/**
 * Created by sxy on 2018/6/28.
 */


 mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false
});

function getSearch( name ) {
 var search = location.search;
 // 对中文解码, 得到 ?name=pp&age=18&desc=帅
 search = decodeURI( search );
 // 去掉问号, 得到 name=pp&age=18&desc=帅
 search = search.slice( 1 );

 var arr = search.split("&");  // 得到 ["name=pp", "age=18", "desc=帅"]
 var obj = {};
 arr.forEach(function( v, i ) {
  var key = v.split("=")[0];  // name
  var value = v.split("=")[1]; // pp
  obj[ key ] = value;
 });
 return obj[name];
}