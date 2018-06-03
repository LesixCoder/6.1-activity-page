$(function() {
  function view() {
    return {
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight
    }
  }
  function heightAuto() {
    let wrapHeight = document.querySelector('.wechat-wrap').clientHeight
    let domHeight = document.documentElement.clientHeight
    if (wrapHeight < domHeight) {
      jQuery('.wechat-phone').height(view().h + 'px')
    } else {
      jQuery('.wechat-phone').css('height', 'auto')
    }
  }
  heightAuto()

  var select = {
    init: function() {
      var _this = this
      _this.bind()
      _this.render()
      _this.methods = _this.methods()
      _this.async = _this.async()
      setTimeout(function(){
        _this.methods.convertCanvas()
      },50)
      _this.logoArr = [
        '/image/head/logo-1.png',
        '/image/head/logo-2.png',
        '/image/head/logo-3.png',
        '/image/head/logo-4.png',
        '/image/head/logo-5.png',
        '/image/head/logo-6.png'
      ]
      _this.textArr = [
        '/image/effect/eff-1.png',
        '/image/effect/eff-2.png',
        '/image/effect/eff-3.png',
        '/image/effect/eff-4.png',
        '/image/effect/eff-5.png'
      ]
    },
    bind: function() {
      var _this = this
      _this.logoBtn = $('.wechat-content-logo li')
      _this.textBtn = $('.wechat-content-text li')
      _this.headLogo = $('.headImg-logo img')
      _this.headText = $('.headImg-text img')
    },
    render: function() {
      var _this = this
      _this.logoBtn.on('touchend', function(e) {
        e.stopPropagation()
        var me = this
        $.proxy(_this.methods.logoSelFn(me))
        $.proxy(_this.methods.renderImg(me))
        setTimeout(function(){
          _this.methods.convertCanvas()
        },50)
      })
      _this.textBtn.on('touchend', function(e) {
        e.stopPropagation()
        var me = this
        $.proxy(_this.methods.textSelFn(me))
        $.proxy(_this.methods.renderText(me))
        setTimeout(function(){
          _this.methods.convertCanvas()
        },50)
      })
    },
    methods: function() {
      var _this = this
      return {
        logoSelFn: function(me) {
          if ($(me).hasClass('logo-select')) {
            return
          }
          $(me)
            .addClass('logo-select')
            .siblings('li')
            .removeClass('logo-select')
        },
        textSelFn: function(me) {
          if ($(me).hasClass('text-select')) {
            return
          }
          $(me)
            .addClass('text-select')
            .siblings('li')
            .removeClass('text-select')
        },
        renderImg: function(me) {
          var imgSrc = _this.logoArr[$(me).index()]
          _this.headLogo.attr('src', imgSrc)
        },
        renderText: function(me) {
          var imgSrc = _this.textArr[$(me).index()]
          _this.headText.attr('src', imgSrc)
        },
        convertCanvas: function() {
          html2canvas(content, {
            // allowTaint: true,
            useCORS: true,
            onrendered: function(canvas) {
              //添加属性
              canvas.setAttribute('id', 'thecanvas')
              //读取属性值
              document.getElementById('images').innerHTML = ''
              var image = canvas.toDataURL("image/jpg");
              var pHtml = "<img src='"+image+"' style='display:block;width:100%;height:100%'>";
              jQuery("#images").html(pHtml);
            }
          })
        }
      }
    },
    async: function() {
      var _this = this
      return {}
    }
  }
  select.init()

  $("#wechat-wrap").addClass("preload-img")
})
