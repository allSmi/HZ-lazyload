// 增加： 当容器大小大于浏览器可视区大小時，要比较图片位置和可视区位置的关系
// -------------类要在调用之前引入---------------
// HzLazyLoad构造函数   selector：使用lazyload的img上的class   option:自定义配置{placeholder,container,distance}
let HzLazyLoad = window.HzLazyLoad = (function() {
    function HzLazyLoad(option) {
        this.placeholderUrl = (option && option.placeholder) || 'data:image/gif;base64,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'; // loading图片
        this.errorSrc = (option && option.errorSrc) || 'data:image/png;base64,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';
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
                el.src = _this.errorSrc; // 加载失败图片
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
            el.style.background = 'url(' + this.placeholderUrl + ') center center no-repeat'; // 图片改为背景图
        }

        let currentTop = el.getBoundingClientRect().top - this._container.getBoundingClientRect().top; // 这里减去自身偏移的值和容器偏移的值才是真正的位置
        let currentBottom = el.getBoundingClientRect().bottom - this._container.getBoundingClientRect().top; // 这里加上自身偏移的值减去容器偏移的值才是真正的位置
        console.log(this._container.clientHeight, currentTop)
        // 图片顶部或者底部在可视区
        return (this._container.clientHeight > currentTop - this._distance) && currentBottom > 0;
    }

    return HzLazyLoad;
}())
