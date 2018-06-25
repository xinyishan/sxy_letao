/**
 * Created by sxy on 2018/6/25.
 */



/*
 * 1. 进行表单校验配置
 *    校验要求:
 *        (1) 用户名不能为空, 长度为2-6位
 *        (2) 密码不能为空, 长度为6-12位
 * */

$(function () {
  //校验表单初始化
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
      //制定校验字段
      fields:{
        username:{
          //配置校验规则
          validators:{
            //配置非空校验
            notEmpty:{
              message:'用户名不能为空'
            },
            //配置长度校验
            stringLength:{
              min:2,
              max:6,
              message:'用户名长度必须在2-6位'
            },
            callback:{
              message:'用户名或密码错误'
            }
          }
        },
        password:{
          validators:{
            notEmpty:{
              message:'密码不能为空'
            },
            stringLength:{
              min:6,
              max:12,
              message:'密码长度必须在6-12位'
            },
            callback:{
              message:'用户名或密码错误'
            }
          }
        }
      }

    });

  //验证
  $('#form').on('success.form.bv',function(e){
    //阻止默认的表单提交
    e.preventDefault();

    //ajax
    $.ajax({
      type:'POST',
      url:'/employee/employeeLogin',
      dataType:'json',
      data:$('#form').serialize(),
      success:function(info){
        console.log(info);
        if(info.error=== 1000 || info.error=== 1001){
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }else{
          location.href = 'index.html'
        }
      }
    })
  })
})


