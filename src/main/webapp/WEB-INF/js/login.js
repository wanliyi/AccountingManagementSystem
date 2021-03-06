layui.use(['form','layer','jquery'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer
        $ = layui.jquery;


    form.on('submit(login)',function (data) {
        $.ajax({
            type:'post',
            url:'/final/index/login',
            data:data.field,
            dataType:'json',
            success:function (res) {
                if(res.code == 200){
                    // 访问主页
                    window.location.href="/final/index/index";
                }else{
                    layer.alert(res.msg,{icon:2});
                    setTimeout(function () {
                        parent.location.reload();
                    },1000);

                }
            }
        });
        return false;
    });

    //表单输入效果
    $(".loginBody .input-item").click(function(e){
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })
    $(".loginBody .layui-form-item .layui-input").focus(function(){
        $(this).parent().addClass("layui-input-focus");
    })
    $(".loginBody .layui-form-item .layui-input").blur(function(){
        $(this).parent().removeClass("layui-input-focus");
        if($(this).val() != ''){
            $(this).parent().addClass("layui-input-active");
        }else{
            $(this).parent().removeClass("layui-input-active");
        }
    })
});

//更新验证码的操作
function changeCode(){
    var img =  document.getElementById("codeImg")
    // 当某个操作过于频繁   地址都是一样的 浏览器就有可能出现直接从上一次的缓存中获取值
    img.src = "index/getCode?time="+ new Date().getTime();
}

