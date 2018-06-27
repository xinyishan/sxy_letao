/**
 * Created by sxy on 2018/6/27.
 */



$(function(){

  var currentPage = 1;
  var pageSize = 5;

  render();

  function render(){
    $.ajax({
      url:'/category/querySecondCategoryPaging',
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
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a, b, c,page){
            currentPage = page ;
            render()
          }
        });
      }

    })

  }

  //模态框显示

  $('#addBtn').click(function(){
    $('#secondModal').modal('show');

    //获取下拉菜单数据
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      dataType:'json',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        console.log(info);
        var tmp1 = template('tmp1',info);
        $('#ul').html(tmp1)

      }

    })
  })


  //通过事件委托 给下面a注册点击事件
  $('.dropdown').on('click','a',function(){
    var txt = $(this).text();
    $('#text').text(txt);
    console.log(txt);
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);

    //更新校验
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')

  })

  //上传图片
  $("#file").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data.result.picAddr);
      var src = data.result.picAddr;
      $('#img img').attr('src',src)
      $('[name="brandLogo"]').val(src)
      //更新校验
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
    }
  });


    //校验
    $('#form').bootstrapValidator({
      excluded: [],

      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },

      //3. 指定校验字段
      fields: {
        //校验用户名，对应name表单的name属性
        categoryId: {
          validators: {
            //不能为空
            notEmpty: {
              message: '请选择一级分类'
            },
          }
        },
        categoryName: {
          validators: {
            //不能为空
            notEmpty: {
              message: '请输入二级分类'
            },
          }
        },

        brandLogo: {
          validators: {
            //不能为空
            notEmpty: {
              message: '请上传图片'
            },
          }
        },

      }

    });

//添加
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      dataType:'json',
      data:$('#form').serialize(),
      success:function (info){
        $('#secondModal').modal('hide');
        currentPage = 1;
        render();
        $("#form").data('bootstrapValidator').resetForm(true);
        $('#rg').val('');
        $('#text').text('请选择一级分类');
        $('#img img').attr('src','images/IMG_5533.JPG')
      }
     })
    });
})
