/**
 * Created by sxy on 2018/6/29.
 */


$(function () {
  // 1. 一进入页面, 通过 ajax 请求一级分类的数据, 通过模板引擎渲染左侧列表
  $.ajax({
    url:'/category/queryTopCategory',
    type:'get',
    dataType:'json',
    success:function(info){
      console.log(info);
      var tmp = template('tmp',info);
      $('.nav ul').html(tmp);
      render(info.rows[0].id)
    }

  })

  // 2. 点击左侧按钮, 获取当前点击的 一级分类id, 让二级列表重新渲染
  //    用事件委托给 a 注册点击事件
  $('.nav').on('click','a',function(){
    var id = $(this).data('id')
    render(id)
    $(this).addClass('current').parent().siblings().find('a').removeClass('current')


  })

  function render(id){

    $.ajax({
      url:'/category/querySecondCategory',
      type:'get',
      dataType:'json',
      data:{
        id:id
      },
      success:function(info){
        var tmp1 = template('tmp1',info);
        $('.product ul').html(tmp1)
      }

    })
  }



})