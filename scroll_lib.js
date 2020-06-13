/*
 * @Date: 2020-06-10 11:02:41
 * @LastEditors: Goodhao
 * @LastEditTime: 2020-06-13 11:26:02
 * @FilePath: \js\static\plugin\scroll-lib\main.js
 */ 
 var common_scroll_ops = {
     elements:null,
     init:function(el){
         if(el == undefined){
             el = document
         }
         this.elements = el.querySelectorAll("*[data-scroll]")
         window.addEventListener("scroll",this.scroll_callback) 
     },
     scroll_callback:function(e){
         var offset = .75
        var scrolled = document.documentElement.scrollTop + document.documentElement.clientHeight
        els = common_scroll_ops.elements
        for(let i = 0; i < els.length ;i++){
            var el_percent = (scrolled - els[i].offsetTop) / (els[i].offsetHeight + document.documentElement.clientHeight)
            if(el_percent > 0 && el_percent < 1)
            {
                //通过标签的data-scroll-arg参数获取滚动参数
                var arg_str = els[i].getAttribute('data-scroll-arg')
                    if(arg_str){
                        var args = arg_str.split(",")
                    }
                    
                var mode = els[i].getAttribute('data-scroll');
                //fade渐入渐出
                if(mode.indexOf('fade')!=-1){
                    if(args && args.length == 4)
                    {
                        for(let j = 0; j < args.length ; j++){
                            args[j] = parseFloat(args[j])
                        }
                    }else{
                        args = [0.3,0.5,0.7,1.0]
                    }
                    common_scroll_ops.fade(els[i],el_percent,args[0],args[1],args[2],args[3]) 
                }
                //放大缩小                
                if(mode.indexOf('scale')!=-1){
                    if(args && args.length == 4)
                    {
                        for(let j = 0; j < args.length ; j++){
                            args[j] = parseFloat(args[j])
                        }
                    }else{
                        args = [1,2,0,0.5]
                    }
                    
                    console.log(args);
                    
                    
                    common_scroll_ops.scale(els[i],el_percent,args[0],args[1],args[2],args[3])
                    
                }
                // console.log(mode)
                //左移
                if(mode.indexOf("left") != -1 ){
                    if(args && args.length == 3){
                        args[0] = parseInt(args[0])
                        args[1] = parseFloat(args[1])
                        args[2] = parseFloat(args[2])
                    }else{
                        args = [0,0,0]//初始化数组
                        args[0] = els[i].clientWidth
                        args[1] = 0
                        args[2] = 0.7
                    }
                    
                    common_scroll_ops.left(els[i],el_percent,args[0],args[1],args[2])
                }

                //右移
                if(mode.indexOf("right") != -1 ){
                    if(args && args.length == 3){
                        args[0] = parseInt(args[0])
                        args[1] = parseFloat(args[1])
                        args[2] = parseFloat(args[2])
                    }else{
                        args = [0,0,0]//初始化数组
                        args[0] = els[i].clientWidth
                        args[1] = 0
                        args[2] = 0.7
                    }
                    
                    common_scroll_ops.right(els[i],el_percent,args[0],args[1],args[2])
                }

                //Z轴旋转
                if(mode.indexOf("rotateZ") != -1){
                    if(args && args.length == 3){
                        args[0] = parseInt(args[0])
                        args[1] = parseFloat(args[1])
                        args[2] = parseFloat(args[2])
                    }else{
                        args = [0,0,0]//初始化数组
                        args[0] = 180
                        args[1] = 0
                        args[2] = 0.7
                    }

                    common_scroll_ops.rotateZ(els[i],el_percent,args[0],args[1],args[2])
                }
        }
        
        
        
     }
    },
    fade:function (el,el_scrolled,start_in,end_in,start_out,end_out){
        if(el_scrolled > start_in && el_scrolled < end_in)
            {
                
                el.style.opacity =normalization(el_scrolled,start_in,end_in)
                // console.log("In"+el.style.opacity);
                
            }else if(el_scrolled > start_out && el_scrolled < end_out){
                el.style.opacity = 1 - normalization(el_scrolled,start_out,end_out)
                // console.log("Out"+el.style.opacity);

            }
        
    },
    scale:function (el,el_scrolled,start_rate,end_rate,start_scale,end_scale){
        
        // console.log(start_scale,end_scale);
        
        if(el_scrolled > start_scale && el_scrolled <end_scale){
            var s = normalization(el_scrolled,start_scale,end_scale)
            var tmp = start_rate + s * (end_rate-start_rate)
            el.style.transform = `scale(${tmp},${tmp})`
        }

    },
    left:function(el,el_scrolled,left_distance,start,end){     
     if(el_scrolled > start && el_scrolled < end ){
         console.log(left_distance * (1-normalization(el_scrolled,start,end)));
         
         el.style.transform = `translateX(${-1 * left_distance * (1-normalization(el_scrolled,start,end))}px)`
     }
        



    },
    right:function(el,el_scrolled,right_distance,start,end){

    
        if(el_scrolled > start && el_scrolled < end ){
            console.log(right_distance * (1-normalization(el_scrolled,start,end)));
            
            el.style.transform = `translateX(${ right_distance * (1-normalization(el_scrolled,start,end))}px)`
        }
    



    },
    rotateZ:function (el,el_scrolled,angle,start,end){
        if(el_scrolled > start  && el_scrolled < end){
            el.style.transform = `rotateZ(${angle * (1-normalization(el_scrolled,start,end))}deg)`
        }else{
            el.style.transform = `rotateZ(0deg)`
        }
    }
 }
 function normalization(x,min,max){
      /**
  * @description:  数值归一化,标准化
  * @param {type} x当前值，min最小值，max最大值
  * @return: 0到1 的归一化值
  */ 
    return (x -min) / (max - min)
}