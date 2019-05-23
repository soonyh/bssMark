! function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(root); // nodejs support
        module.exports['default'] = module.exports; // es6 support
    } else root.bssmark = factory(root);
}(typeof window !== 'undefined' ? window : this, function() {
    var Bssmark = function(container, options) {
        if (!document.createElement('canvas').getContext) {
            console.warn('不支持(<=IE8)当前浏览器');
            return
        }
        var self = this;
        self.container = container;
        self.opt = {
            docWidth: $(container).innerWidth(),
            docHeight: $(container).innerHeight(),
            fontStyle: "20px 黑体", //水印字体设置
            rotateAngle: -20 * Math.PI / 180, //水印字体倾斜角度设置
            fontColor: "rgba(100, 100, 100, 0.125)", //水印字体颜色设置
            firstLinePositionX: -20, //canvas第一行文字起始X坐标
            firstLinePositionY: 80, //Y
            SecondLinePositionX: 0, //canvas第二行文字起始X坐标
            SecondLinePositionY: 70 //Y
        };
        $.extend(self.opt, options);
        self.render(container);
        self.draw(self.opt.docWidth, self.opt.docHeight);
        self.events();
    };
    Bssmark.prototype = {
        render: function(d) {
            var self = this;
            d.css({
                'background': 'transparent',
                'position': 'relative'
            })
            d.append(tpl);
        },
        draw: function(docWidth, docHeight) {
            var self = this;
            var cw = $('#bss-watermark')[0];
            var crw = $('#bss-repeat-watermark')[0];
            crw.width = docWidth;
            crw.height = docHeight;
            var ctx = cw.getContext("2d");
            //清除小画布
            ctx.clearRect(0, 0, 260, 100);
            ctx.font = self.opt.fontStyle;
            //文字倾斜角度
            ctx.rotate(self.opt.rotateAngle);
            ctx.fillStyle = self.opt.fontColor;
            //第一行文字
            ctx.fillText(self.opt.text, self.opt.firstLinePositionX, self.opt.firstLinePositionY);
            //第二行文字 
            //ctx.fillText(window.text.mobile, self.opt.SecondLinePositionX, self.opt.SecondLinePositionY);
            //坐标系还原
            ctx.rotate(-self.opt.rotateAngle);
            var ctxr = crw.getContext("2d");
            //清除整个画布
            ctxr.clearRect(0, 0, crw.width, crw.height);
            //平铺--重复小块的canvas
            var pat = ctxr.createPattern(cw, "repeat");
            ctxr.fillStyle = pat;
            ctxr.fillRect(0, 0, crw.width, crw.height);
        },
        events: function() {
            var self = this;
            $(window).resize(function() {
                var w = $(self.container).innerWidth();
                var h = $(self.container).innerHeight();
                self.draw(w, h);
            });
        }
    };
    var tpl = '<canvas id="bss-watermark" width="260px"  height="100px" style="display:none;"></canvas>' + '<canvas id="bss-repeat-watermark" style="position:fixed; left:0; top:0; z-index:-1; background:#fff;"></canvas>';
    return Bssmark;
});
