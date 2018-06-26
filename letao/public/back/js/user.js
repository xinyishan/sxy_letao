/**
 * Created by sxy on 2018/6/26.
 */


$(function(){
  var currentPage = 1;
  var pageSize = 5 ;
  var currentId
  var isDelete
render()
  function render (){
    $.ajax({
      url:'/user/queryUser',
      type:'get',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        var tmp = template('tmp',info);
        $('tbody').html(tmp)

        //分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          //点击事件
          onPageClicked(a,b,c,page){
            currentPage = page;
            render()
          }

        })
      }

    })
  }


//启用禁用功能
  $('tbody').on('click','.btn',function(){
    $('#userModal').modal('show');
    currentId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger')?0:1;

  })

  //点击确认按钮
  $('#submit-btn').click(function(){
    $.ajax({
      url:'/user/updateUser',
      type:'post',
      dataType:'json',
      data:{
        id:currentId,
        isDelete:isDelete
      },
      success:function(info){
        //关闭模态框
        $('#userModal').modal('hide');
        //重新渲染
        render()
      }
    })

  })



})