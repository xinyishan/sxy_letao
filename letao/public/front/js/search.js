/**
 * Created by sxy on 2018/6/29.
 */

$(function(){

  // 功能1: 搜索历史记录渲染功能
  // (1) 获取本地存储中存储的数据 jsonStr
  // (2) 转换成数组
  // (3) 将数组, 通过模板引擎渲染历史记录
  render()
  function getHistory(){
    var history = localStorage.getItem('search-list') || '[]';
    var arr = JSON.parse(history);
    return arr;

  }

  // 读取历史记录, 进行页面渲染
  function render () {
    var arr = getHistory();
    var tmp = template('tmp',{arr:arr});
    $('.history').html(tmp);
  }


  // 功能2: 清空历史记录功能
  // (1) 给清空按钮添加点击事件, 通过事件委托
  // (2) 将 search_list 从本地存储中删除  使用 removeItem
  // (3) 页面需要重新渲染

  $('.history').on('click','.empty',function(){
    mui.confirm( "你是否要清空全部的历史记录?", "温馨提示", ["取消", "确认"], function( e ) {
      if ( e.index === 1 ) {
        // 点击的确认, 执行清空操作
        localStorage.removeItem( "search-list" );
        render();
      }
    })

  })

  // 功能3: 删除一条记录的功能
  // (1) 点击删除按钮, 删除该条记录, 添加点击事件 (事件委托)
  // (2) 将 数组下标存储在 标签中, 将来用于删除
  // (3) 获取 下标, 根据下标删除数组的对应项  arr.splice( index, 1 );
  // (4) 将数组存储到本地历史记录中
  // (5) 重新渲染

  $('.history').on('click','.delete',function(){
    var that = this;
    mui.confirm("你确认要删除该条数据么", "温馨提示", ["取消", "确认"], function( e ) {
      if ( e.index === 1 ) {
        // 获取下标
        var index = $(that).data("id");
        // 获取数组
        var arr = getHistory();
        // 根据下标删除 数组对应项
        //arr.splice( 从哪开始, 删除几个, 替换的项1, 替换的项2, 替换的项3, .... )
        arr.splice( index, 1 );
        // 存储到本地存储中
        localStorage.setItem( "search-list", JSON.stringify( arr ) );
        // 重新渲染
        render();
      }
    })

  })



  // 功能4: 添加搜索记录功能
  // (1) 给搜索按钮添加点击事件
  // (2) 获取搜索关键字
  // (3) 获取数组
  // (4) 添加到数组最前面
  // (5) 存储到本地历史记录中
  // (6) 重新渲染

  $('.search-btn').click(function(){
    //获取关键字
    var key = $('.search-input').val();
    if(key === ''){
      mui.toast( "请输入搜索关键字");
      return;
    }
    //获取数组
    var arr = getHistory();

    // 需求:
    // 1. 不能有重复的项, 如果有, 将旧的删除
    // 2. 如果数组长度最多 10个

    var index = arr.indexOf(key);
    if(index > - 1){
      //将重复的项删除
      arr.splice(index,1);
    }
    if(arr.length >= 10){
      //删除最后一项
      arr.pop();
    }
    arr.unshift(key);
    //存储到本地
    localStorage.setItem('search-list',JSON.stringify(arr));
    render();

    //清空搜索框
    $('.search input').val('');

    //进行页面跳转
    location.href = "searchList.html?key="+key;

  })

})














