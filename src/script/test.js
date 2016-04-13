import "babel-polyfill";
import "../lib/fetch";
import "../lib/template";
import "tween.js/src/Tween";
import raf from "raf"; //requestAnimationFrame polyfill library
// import {tween} from 'popmotion';
/**
 * es6 Object Example
 */
console.log(Object.assign({},{age:12}));

/**
 * url-loader Example
 */
require('./../images/test.jpg');

/**
 * es6 async func Example
 */
async function jjc() {
    await console.log('cc');
    return true;
}

jjc().then(ret => {
    console.log(ret);
}).catch(err => {
    console.log(err);
});


/**
 *  es6 class Example
 */
    
class BoosMb{
    constructor(name,age) {
        this.name = name || 'not name';
        this.age = age || 1;
    }
}

Object.assign(BoosMb.prototype,{
    show(){
        console.log(`My name is：${this.name}, age is：${this.age}`);
    }
});

var boos = new BoosMb();

boos.show();

const WDLoad = () => {
    /**
     * Base Dom Var
     */
    let
        domElemList = {
            content : document.getElementById('content'),
            circle : document.getElementById('circle'),
            btn : document.getElementById('btn')
        };

    /**
     * artTemplate Example
     */
    let

        data = {
            title : '水果大王',
            list : ['哈密瓜','草莓','柚子','橘子','香蕉','甘蔗','火龙果','人参果','奇异果','芒果','苹果','李子','梨子','菠萝','菠萝蜜','榴莲','葡萄']
        },
        html = template('artContent',data);

    domElemList.content.innerHTML = html;

    domElemList.content.addEventListener('click',ev => {
        console.log(ev);
    });

    /**
     * Tween Example https://github.com/tweenjs/tween.js
     */

    let
        tween = null,
        updateFunc = function (){

            if(isNaN(this.x)) return;  //ie8 必须过滤 NaN
            domElemList.circle.style.left = `${this.x}px`;
        },
        initCircleAnimate = function (){

            tween = new TWEEN.Tween({x:10})
                .to({x:110},1000)
                .easing(TWEEN.Easing.Elastic.InOut)
                .onUpdate(updateFunc)
                .start();

        },
        animate = (time) => {
            raf(animate);
            TWEEN.update(time);
        };

    domElemList.btn.addEventListener('click',function () {
        initCircleAnimate();
        animate(domElemList.circle);
    });


    /**
     * fetch Example
     */

    let
        fetchUrl = '',
        fetchExample = () => {
            fetch(fetchUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: {},   //参数
                credentials: "include"    //默认不带cookie，增加此参数带cookie
            }).then(function(response) {

                //reponse是promise对象
                return response.json();

            }).then(function(result) {

                //返回结果result
                doSomething();

            }, function(e) {

                //error回调

            });
        };



    /**
     * popmotion Example https://popmotion.io supported ie10 && Mobile
     */

    let
        popmotionExample = () => {
            const circleTween = tween({
                values : {
                    x : 200
                }
            });

            circleTween.on(domElemList.circle).start();
        };

};

(document.readyState === 'complete')?WDLoad():window.onload = WDLoad;
