var audio = $("audio")[0];
var page1 = $("#page1")[0];
var page2 = $("#page2")[0];
var page3 = $("#page3")[0];

//当音乐播放结束时，自动停止光盘旋转效果
audio.addEventListener('ended',function(event){
	$("#music").removeClass('play');
}) 

//点击音乐图标，控制音乐播放效果
$("#music").on('click', function() {
	if(audio.paused){
		$(this).addClass('play');
		//$(this).css('animation-play-state','running');
		audio.play();
	}else{
		$(this).removeClass('play');
		//$(this).css('animation-play-state','paused');//兼容不好
		audio.pause();
	}
});

//点击屏幕，开启好远2017
page1.addEventListener("touchstart", function(event) {
	$("#page1").hide();
	$("#page2").show();
	$("#page3").show();
	setTimeout(function(){
		$("#page2").addClass('page fadeOut');
		$("#page3").addClass('page fadeIn');
	}, 5000);
});