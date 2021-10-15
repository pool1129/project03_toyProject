var li = document.querySelectorAll('.cir_menu li');
var text = document.querySelectorAll('.cir_menu li a');
var num = document.querySelectorAll('.cir_menu li .text');
var circle = document.querySelector('.cir_menu');
var box = document.querySelector('.box');
var wrapper = document.querySelector('.wrapper')

var body = document.querySelector('body');

var degValue = 360 / li.length;

for(let i=0; i<li.length; i++){
    var deg = Math.round(degValue * i);

    li[i].style.transform = `rotate(${deg}deg)`;

    text[i].style.transform = 'rotate(-180deg)';
    num[i].style.transform = 'rotate(-180deg)';

    num[i].innerHTML += `${i}`
}

window.body.addEventListener('mousewheel',function(e){
    const sY = e.wheelDelta;

    // console.log(sY)
    if(sY > 0){
        // console.log('+')
        circle.style.transform += `rotate(${degValue}deg)`
    }else if(sY < 0){
        // console.log('-')
        circle.style.transform += `rotate(-${degValue}deg)`
    }
})

// 모달창 열기
function modalOpen(){
    box.style.visibility = 'visible';
    circle.style.display = 'none';
}

// 모달창 닫기
document.addEventListener('click',function(e){
    var box_out = e.target;

    if(box_out == wrapper){
        box.style.visibility = 'hidden';
        circle.style.display = 'block';
    }
});

//popup html
const pop_num = document.querySelector('.top_num');
const pop_txt = document.querySelector('.top_name');
const pop_decs = document.querySelector('.decs');
const pop_link = document.querySelector('.adress > a');
const pop_img = document.querySelector('.img');
const pop_img2 = document.querySelector('.img > img');

const pop_gif = document.querySelector('.gif');
const pop_gif2 = document.querySelector('.gif > img');

const pop_decs1 = document.querySelector('.decs1');


function html(data){
    for(let i=0; i<li.length; i++){
        li[i].addEventListener('click',function(){
            pop_gif.classList.remove('mobile','desktop');
            pop_img.classList.remove('mobile','desktop');

            if(i >= data.toy.length){
                alert('해당 페이지는 준비중입니다.')
            }else{
                modalOpen();

                pop_txt.innerHTML = data.toy[i].name;

                if(i < 10){
                    pop_num.innerHTML = `0${i}`;
                }else{
                    pop_num.innerHTML = i;
                }

                pop_decs.innerHTML = data.toy[i].decs;
                pop_link.setAttribute('href',data.toy[i].adress);
                pop_img2.setAttribute('src',data.toy[i].mockup);
                pop_gif2.setAttribute('src',data.toy[i].gif);
                pop_decs1.innerHTML = data.toy[i].decs1;

                if(data.toy[i].size == 'mobile'){
                    pop_img.classList.add('mobile');
                    pop_gif.classList.add('mobile');
                }else{
                    pop_img.classList.add('desktop');
                    pop_gif.classList.add('desktop');
                }
            }
        })
    }
}

// json 파일 fetch
function init(){
    fetch('../js/data.json')
    .then(function(res){return res.json();})
    .then(function(data){callback(data)});

    function callback(data){
        html(data);
    }
}

init()
