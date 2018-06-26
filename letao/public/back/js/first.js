/**
 * Created by sxy on 2018/6/26.
 */


$(function(){

  var currentPage = 1;
  var pageSize = 5;


  render()

  function render(){
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        var tmp = template('tmp',info);
        $('tbody').html(tmp);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total / info.size),

          onPageClicked:function(a, b, c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page ;
            render()
          }
        });
      }

    })
  }


  //点击添加分类
  $('#add-btn').click(function(){
    //显示模态框
    $('#firstModal').modal('show');

  })
  //校验
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '一级分类名称不能为空'
          }
        }
      }
    }

  });

 // 4. 注册表单校验成功事件, 阻止默认成功的提交, 通过 ajax 进行提交
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      url:'/category/addTopCategory',
      type:'post',
      dataType:'json',
      data:$('#form').serialize(),
      success:function(info){
        if(info.success){
          //关闭模态框
          $('#firstModal').modal('hide');
          currentPage = 1;
          render()

          //重置表单
          $('#form').data('bootstrapValidator').resetForm(true);
        }

      }

    })


  })

})