var $imgs = $('.carousel .img-ct>li');
var $imgCt = $('.carousel .img-ct');
var $preBtn = $('.carousel .pre');
var $nextBtn = $('.carousel .next');
//变量，记录当前在第几页
var $bullets = $('.carousel .bullet>li');
var pageIndex = 0;
var imgCount = $imgs.length;
var imgWidth = $imgs.width();
//防止用户的重复点击，定义一个状态锁
var isAnimate = false;

//克隆第一个放在最后
$imgCt.append($imgs.first().clone());
//克隆最后一个放在最前
$imgCt.prepend($imgs.last().clone());
//容器的宽度使用JS计算，不要用CSS写死
$imgCt.width((imgCount + 2) * imgWidth);
//使第一个元素不是克隆元素，还是真实的第一个，方法：使元素像左移动一格
$imgCt.css({left: -imgWidth});


//点击下一页，跳转下一页
$preBtn.click(function(){
    playPre(1);
});


//点击上一页，跳转上一页
$nextBtn.click(function(){
    playNext(1);
});

//点击可以快速定位到某一张图片
$bullets.click(function(){
    //获取点击的元素的下表
    var index = $(this).index();
    if(index > pageIndex){
        playNext(index - pageIndex);
    }else if(index < pageIndex){
        playPre(pageIndex - index);
    }

});

function playPre(len){
    if(isAnimate)return;
    isAnimate = true;
    $imgCt.animate({
        left: '+='+len*imgWidth
    },function(){
        pageIndex -= len;
        //当到达第一张图片时
        if(pageIndex < 0){
            pageIndex = imgCount - 1;
            $imgCt.css({left: -imgCount * imgWidth});
        }
        setBullet();
        isAnimate = false;
    })
}


function playNext(len){
    if(isAnimate) return;
    isAnimate = true;
    $imgCt.animate({
        left: '-='+len*imgWidth
    },function(){
        pageIndex += len;
        //当到达最后一张图片时
        if(pageIndex === imgCount){
            pageIndex = 0;
            $imgCt.css({left: -imgWidth});
        }
        setBullet();
        isAnimate = false;
    })
}


//对应图片下面的那个样式
function setBullet(){
    //去掉所有li的active,选中的照片在添加class
    $bullets.removeClass('active').eq(pageIndex).addClass('active');
}

/*
* 自动轮播
* setInterval(function(){playNext(1),2000})
*
* */