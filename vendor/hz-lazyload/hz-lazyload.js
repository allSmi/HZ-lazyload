// 增加： 监听容器大小改变
// -------------类要在调用之前引入---------------
// HzLazyLoad构造函数   selector：使用lazyload的img上的class   option:自定义配置{placeholder,container,distance}
let HzLazyLoad = window.HzLazyLoad = (function() {
    function HzLazyLoad(option) {
        this.placeholderUrl = (option && option.placeholder) || 'data:image/gif;base64,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'; // loading图片
        this._opacity1px = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////AAAAVcLTfgAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII='; // 透明1像素
        this.selector = (option && option.id) || 'lazy-load'; // 使用lazyload的图片上的class
        this._container = (option && option.container && document.getElementsByClassName(option.container)[0]) || document.body;
        this._distance = (option && option.distance) || 0; // 距离底部多少触发图片加载
        this._elesTotal = []; // 所有元素集合
        this._elesInView = []; // 可视区内的元素
        this._watchScrollTimer; // 监听页面滚动定时器
        this._userScrollTemp = this._container.onscroll; // 用户定义的滚动事件，必须在实例化之前定义，否者会覆盖lazyload的scroll事件,或者在html添加事件
    }

    HzLazyLoad.prototype.render = function() {
        let _this = this;
        // 筛选可视区内的元素
        this._filterInView();
        // 监听滚动事件，出现在可视区内，执行loadImage方法
        this._container.onscroll = function() {
            // console.log(this); // 指向container
            if (typeof _this._userScrollTemp === 'function') {
                _this._userScrollTemp();
            }

            // 防止频繁触发,如果用户滑的很快,略过的图片不回下载，节省流量
            clearTimeout(_this._watchScrollTimer);
            _this._watchScrollTimer = setTimeout(function() {
                // 筛选可视区内的元素
                _this._filterInView();
            }, 200);
        }
    }

    // 筛选可视区内的元素，并放到_elesInView中
    HzLazyLoad.prototype._filterInView = function() {
        this._elesTotal = [...this._container.getElementsByClassName(this.selector)] // 获取所有使用lazyload的img并转换为数组
        this._elesInView = [];

        if (this._elesTotal.length === 0) {
            return;
        }

        // 筛选可视区内的元素，并放到_elesInView中
        this._elesTotal.forEach(element => {
            if (this._isInView(element)) {
                // 如果在可视区内，添加到_elesInView中
                this._elesInView.push(element);
            }
        })

        if (this._elesInView.length === 0) {
            return;
        }

        // 执行loadImage方法
        this._loadImage();
    }

    // 给HzLazyLoad添加方法
    // lazyload核心方法，加载图片，并返回实例
    HzLazyLoad.prototype._loadImage = function() {
        let eles = this._elesInView;
        let _this = this;
        for (let i = 0; i < eles.length; i++) {
            let urlTemp = eles[i].getAttribute('data-src'); // 缓存原始图片---html中把原始图片放在data-src上，如果直接放在src上，一进入页面就会下载图片，就不能做延时加载了
            // eles[i].setAttribute('data-src', urlTemp);
            let el = eles[i];
            let userClass = this.filterUserClass(el.className.split(' '), this.selector);
            el.className = 'lazy-load-pending ' + userClass; // 将图片的样式设置为pending

            // 这段其实也可以放在下面解决节流函数bug的地方，这样即使图片不在可视区也会直接变成loading态，不过如果滑的很快，会让用户以为一直在加载
            el.style.background = 'url(' + this.placeholderUrl + ') center center no-repeat'; // 图片改为背景图
            // el.style.backgroundSize = '100px';
            this._loadImageAsync(urlTemp, el).then(function(data) {
                console.log(data);
                // console.log(this === window); // true

                // 重置el背景图和宽高
                el.style.background = '';
                el.style.width = el.originalWidth ? el.originalWidth + 'px' : 'auto';
                el.style.height = el.originalHeight ? el.originalHeight + 'px' : 'auto';

                el.src = urlTemp; // 图片加载成功后将图片替换为原始图片
                // 将图片的样式置为done
                el.className = 'lazy-load-done ' + userClass; // 加载成功后将class设置为done
            }, function(err) {
                console.log(err);

                // 重置el背景图和宽高
                el.style.background = '';
                el.style.width = el.originalWidth ? el.originalWidth + 'px' : 'auto';
                el.style.height = el.originalHeight ? el.originalHeight + 'px' : 'auto';

                // 将图片的样式置为fail
                el.className = 'lazy-load-fail ' + userClass; // 加载成功后将class设置为fail
                el.src = './fail.png'; // 加载失败图片
            });
        }
        return this;
    }

    // 返回promise对象,内部私有方法
    HzLazyLoad.prototype._loadImageAsync = function(url, el) {
        let _this = this;
        return new Promise(function(resolve, reject) {
            const image = new Image();
            image.onload = function(e) {
                resolve('image load success');

                // 可以在这里给图片指定宽高等样式逻辑
                // if (el.tagName.toLowerCase() === 'img') {
                //     // 给图片定义宽高
                //     let img = e.target;
                //     let width = img.naturalWidth;
                //     let height = img.naturalHeight;
                //     let realWidth = Math.min(width, parseInt(window.getComputedStyle(_this._container).width));

                //     el.style.width = realWidth + 'px';
                //     el.style.height = height * (realWidth / width) + 'px';
                // }
            }
            image.onerror = function() {
                reject('load image fail');
            }
            image.src = url;
        })
    }

    /**
     * 删除数组中指定元素,并返回字符串形式--筛选用户的class集合
     * @param {Array} array
     * @param {string} item
     */
    HzLazyLoad.prototype.filterUserClass = function(array, item) {
        let temp = [];
        array.forEach((element) => {
            if (element !== item) {
                temp.push(element);
            }
        });
        return temp.join(' ');
    }

    /**
     * 图片是否在容器的可视区内,这里只做了上下的位置，左右同理
     * @param {element} el 当前元素
     */
    HzLazyLoad.prototype._isInView = function(el) {
        // console.log(window.getComputedStyle(el).boxSizing);
        // console.log(el.offsetWidth) // 包含了边框的宽度
        // window.getComputedStyle(el).width  当设置box-sizing: border-box;是宽度包含边框的宽度 当不设置或content-box時，不包含变宽的宽度
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect    空边框盒（译者注：没有内容的边框）会被忽略。如果所有的元素边框都是空边框，那么这个矩形给该元素返回的 width、height 值为0，left、top值为第一个css盒子（按内容顺序）的top-left值。
        if (!el.sizeHasTemp) {
            el.style.border = 'none'; // 为了不计算border值，设置为0或者none
            // 如果img没有src時，getBoundingClientRect会有问题，所以要先给他一个默认的宽高然后再图片切换的时候再去掉这个默认的宽高
            if (parseInt(window.getComputedStyle(el).width) === 0) {
                el.style.width = '100%'; // 高度给它的父容器的100%；
            } else {
                el.originalWidth = parseInt(window.getComputedStyle(el).width); // 缓存用户设置的大小
            }

            if (parseInt(window.getComputedStyle(el).height) === 0) {
                el.style.height = el.offsetWidth + 'px'; // 宽度和高度一样
            } else {
                el.originalHeight = parseInt(window.getComputedStyle(el).height); // 缓存用户设置的大小
            }
            el.sizeHasTemp = true;

            // 节流函数会引发一个bug，如果一直滚动的时候，图片会出现灰色边框，目前思路是一开始就给所有元素的src都设置为那张1像素的图片，放在这里的原因是第一次一定会执行这个方法
            el.src = this._opacity1px; // 因为如果没有图片，src有宽度和高度時，浏览器会出现边框，所以这里默认给src一个1px的透明图替代，解决边框问题，
        }

        let currentTop = el.getBoundingClientRect().top - this._container.getBoundingClientRect().top; // 这里减去自身偏移的值和容器偏移的值才是真正的位置
        let currentBottom = el.getBoundingClientRect().bottom - this._container.getBoundingClientRect().top; // 这里加上自身偏移的值减去容器偏移的值才是真正的位置

        // 图片顶部或者底部在可视区
        return (this._container.clientHeight > currentTop - this._distance) && currentBottom > 0;
    }

    return HzLazyLoad;
}())
