/**
 * Created by sxy on 2018/6/28.
 */



$(function(){
  var currentPage = 1 ;
  var pageSize = 5;
  // 定义一个数组, 专门用于存储所有上传的图片地址
  var picArr = [];
  render()
  function render(){
    $.ajax({
      url:'/product/queryProductDetailList',
      type:'get',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        var tmp = template('tmp',info);
        $('.content tbody').html(tmp);

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

  //显示模态框
  $('#addBtn').click(function(){
    $('#productModal').modal('show')

    //渲染二级分类
     $.ajax({
    url:'/category/querySecondCategoryPaging',
      type:'get',
      dataType:'json',
      data:{
      page:1,
      pageSize:100
    },
    success:function(info){
      var tmp1 = template('tmp1',info);
      $('#ul').html(tmp1)

    }

    })
  })


  //通过事件委托 给ul下的a注册点击事件
  $('#ul').on('click','a',function(){
    var id = $(this).text();
    $('#text').text(id);

    // 将 id 设置到隐藏域中
    var id = $(this).data("id");
    $('[name="brandId"]').val( id );

    // 手动重置隐藏域校验状态
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  });



  //上传图片
  $("#file").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过 data.result.picAddr 可以获取上传后的图片地址
    done:function (e, data) {
      var picUrl = data.result.picAddr;
      // 每次上传成功, 将图片地址和图片名称的对象, 推到 picArr 数组的最前面, 和图片结构同步
      picArr.unshift(data.result);

      // 根据图片地址进行图片预览
      $('#img').prepend('<img src="' + picUrl + '" width="100" height="100">');

      // 如果长度大于 3, 就应该删除
      if ( picArr.length > 3 ) {
        // 图片数组要删除最后一个, (最早添加的那个)
        picArr.pop();
        // 图片结构也要删除最后一个图片
        // img:last-of-type 找到最后一个 img 类型的标签, 让他自杀
        $('#img:last-of-type').remove();
      }


      // 如果 picArr 数组长度等于 3, 就说明当前用户已经上传满了 3 张图片
      // 需要手动重置图片校验状态为 成功 VALID 状态
      if ( picArr.length === 3 ) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }

  });


  //校验
  //使用表单校验插件
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '二级分类不能为空'
          },
        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品名称不能为空'
          },
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品描述不能为空'
          },
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品描述不能为空'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '商品尺码必须是 xx-xx 的格式, 例如 32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传 3 张图片"
          }
        }
      }
    }

  });


  //添加
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    var paramsStr = $('#form').serialize();  // 获取到表单中的数据
    // 还需要拼接上图片的地址和名称
    // &picAddr1=xx&picName1=xx
    // &picAddr2=xx&picName2=xx
    // &picAddr3=xx&picName3=xx
    paramsStr += "&picAddr1=" + picArr[0].picAddr + "&picName1=" + picArr[0].picName;
    paramsStr += "&picAddr2=" + picArr[1].picAddr + "&picName2=" + picArr[1].picName;
    paramsStr += "&picAddr3=" + picArr[2].picAddr + "&picName3=" + picArr[2].picName;
    $.ajax({
      url:'/product/addProduct',
      type:'post',
      datatype:'json',
      data:paramsStr,
      success:function(info){
        $('#productModal').modal('hide');
        currentPage = 1 ;
        render()


        // 手动重置文本
        $('#text').text("请选择二级分类");

        // 手动重置图片, 找到所有图片, 让所有图片自杀
        $('#img img').remove();
      }


    })


  })
})

