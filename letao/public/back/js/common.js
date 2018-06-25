/**
 * Created by sxy on 2018/6/25.
 */


//公共功能
// 1. 左侧二级菜单切换显示
// 2. 左侧整个侧边栏显示隐藏功能
// 3. 点击头部退出按钮, 显示退出模态框
// 4. 点击模态框中的退出按钮, 需要进行退出操作(ajax)
// 5. 如果当前用户没有登录, 需要拦截到登陆页面
// 6. 进度条


// 5. 如果当前用户没有登录, 需要拦截到登陆页面
$(function () {
  $.ajax({
    url:'/employee/checkRootLogin',
    type:'GET',
    dataType:'json',
    success:function(info){
      if(info.error === 400){
        location.href = 'login.html'
      }
    }
  })
})

$(function(){
  // 1. 左侧二级菜单切换显示
  $('.nav .category').click(function(){
    $('.nav .child').stop().slideToggle()
  })

  // 2. 左侧整个侧边栏显示隐藏功能
  $('.lt-main .icon-menu').click(function(){
    $('.lt-aside').toggleClass('hide-menu');
    $('.lt-main').toggleClass('hide-menu');
    $('.topbar').toggleClass('hide-menu');
  })

  // 3. 点击头部退出按钮, 显示退出模态框
  $('.lt-main .icon-logout').click(function(){
    $('#myModal').modal({
      show:true
    })
  })

  // 4. 点击模态框中的退出按钮, 需要进行退出操作(ajax)
  $('#logout-btn').click(function(){
    $.ajax({
      url:'/employee/employeeLogout',
      type:'GET',
      dataType:'json',
      success:function(info){
        if(info.success){

          setTimeout(function(){
            location.href = 'login.html'
          },1000)
        }
      }

    })
  })

})


// 6. 进度条
$(function(){
  $(document).ajaxStart(function(){
    NProgress.start()
  })
  $(document).ajaxStop(function(){
      NProgress.done()
  })
})