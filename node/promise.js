/**
 * 实现一个Promise
 */
function Promise(task) {
    //接收一个处理函数
    let that = this; //缓存this
    //promise有三种状态  默认为pending
    that.status = "pending";
    that.onFulfilledFns = []; //所有成功的回调
    that.onRejectedFns = []; //所有失败的回调
    that.value = undefined;
    function resolve(value) {
        //成功函数
        if (that.status == "pending") {
            that.status = "fulfilled";
            that.value = value;
            //执行所有成功的回调
            that.onFulfilledFns.forEach(item => item(value));
        }
    }
    function reject(reason) {
        //失败函数
        if (that.status == "pending") {
            that.status = "rejected";
            that.value = reason;
            //执行所有失败的回到
            that.onRejectedFns.forEach(item => item(reason));
        }
    }
    //立即执行传入的处理函数
    try {
        task(resolve, reject);
    } catch (err) {
        reject(err);
    }
}
function resolvePromise(promise2, x, resolve, reject) {
    let then;
    if (promise2 === x) {
        return reject(new Error("循环引用"));
    }
    if (x instanceof Promise) {
        //判断x的prototype所指向的对象是否存在Promise的原型链上
        if ((x.status = "pending")) {
            x.then(function(y) {
                //递归 调用
                resolvePromise(promise2, y, resolve, reject);
            }, reject);
        } else if (x.status == "fulfilled") {
            resolve(x.value);
        } else if (x.status == "rejected") {
            reject(x.value);
        }
    } else if ((x != null && typeof x == "object") || typeof x == "function") {
        try {
            then = x.then;
            if (typeof then == "function") {
                then.call(
                    x,
                    function(y) {
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    function(y) {
                        reject(y);
                    }
                );
            }
        } catch (e) {
            reject(e);
        }
    } else {
        resolve(x);
    }
}
//then方法
Promise.prototype.then = function(onFulfilled, onRejected) {
    //假如没有传入异步处理程序则直接返回结果
    onFulfilled =
        typeof onFulfilled == "function"
            ? onFulfilled
            : function(value) {
                  return value;
              };
    onRejected =
        typeof onRejected == "function"
            ? onRejected
            : function(reason) {
                  return reason;
              };
    var promise2; //用来实现链式调用
    let that = this;
    if (that.status == "fulfilled") {
        promise2 = new Promise(function(resolve, reject) {
            let x = onFulfilled(that.value);
            resolvePromise(promise2, x, resolve, reject);
        });
    } else if (that.status == "rejected") {
        promise2 = new Promise(function(resolve, reject) {
            let x = onRejected(that.value);
            reject(x);
        });
    } else if (that.status == "pending") {
        promise2 = new Promise(function(resolve, reject) {
            that.onFulfilledFns.push(function() {
                let x = onFulfilled(that.value);
                resolve(x);
            });
            that.onRejectedFns.push(function() {
                let x = onRejected(that.value);
                reject(x);
            });
        });
    } else {
        promise2 = new Promise(function(resolve, reject) {
            reject("Promise内部状态错误");
        });
    }
    return promise2;
};
Promise.resolve = function(val) {
    return new Promise(function(resolve, reject) {
        resolve(val);
    });
};
Promise.reject = function(val) {
    return new Promise(function(resolve, reject) {
        reject(val);
    });
};
Promise.all = function(arrs) {
    //all方法接收一个promise数组，数组中所有异步操作结束后返回一个新的promise
    if (typeof arrs == "object" && arrs.length > 0) {
        return new Promise(function(resolve, reject) {
            let result = []; //新的promise返回结果
            let indexNum = 0; //当前完成几个
            let resolved = function(index) {
                return function(data) {
                    result[index] = data;
                    indexNum++;
                    if (indexNum == arrs.length) {
                        resolve(result);
                    }
                };
            };
            for (let i = 0; i < arrs.length; i++) {
                arrs[i].then(resolved(i), function(reason) {
                    reject(reason);
                });
            }
        });
    } else {
        return new Promise(function(resolve, reject) {
            reject(new Error("all方法传入参数错误"));
        });
    }
};
Promise.race = function(arrs) {
    if (typeof arrs == "object" && arrs.length > 0) {
        return new Promise(function(resolve, reject) {
            for (let i = 0; i < arrs.length; i++) {
                arrs[i].then(
                    function(data) {
                        resolve(data);
                    },
                    function(err) {
                        reject(err);
                    }
                );
            }
        });
    } else {
        return new Promise(function(resolve, reject) {
            reject(new Error("race方法传入参数错误"));
        });
    }
};

module.exports = Promise;
