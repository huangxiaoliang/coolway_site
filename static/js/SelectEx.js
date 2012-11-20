//	* is must
//	params = {
//		*selector: string,
//		unit: number,							(default: 20)
//		*fix: number,
//		shows: number,							(default: 10)
//		step: number,							(default: 5)
//		smooth: boolean							(default: false)
//		oninit: function(SelectEx)
//		onkeydown: function(event, SelectEx)
//		onkeypress: function(event, SelectEx)
//		onkeyup: function(event, SelectEx)
//		onchange: function(index, value, SelectEx)
//	}
//	warn: if you handler the own event and your browser is IE6,
//		you should use this script: "var select = this; setTimeout(function(){ alert(select.value); }, 1);".
function SelectEx(params) { if (typeof params != "undefined") { with (params) this.Selector = typeof selector == "string" || typeof selector == "object" && selector.length != 0 ? selector : null, this.Unit = typeof unit == "number" && unit >= 12 ? unit : 20, this.Fix = typeof fix == "number" ? fix : null, this.Shows = typeof shows == "number" && shows > 0 ? shows : 10, this.Step = typeof step == "number" && step > 0 ? step : 5, this.Smooth = typeof smooth == "boolean" ? smooth : !1, this.OnInit = typeof oninit == "function" ? oninit : null, this.OnTitleClick = typeof ontitleclick == "function" ? ontitleclick : null, this.OnKeyDown = typeof onkeydown == "function" ? onkeydown : null, this.OnKeyPress = typeof onkeypress == "function" ? onkeypress : null, this.OnKeyUp = typeof onkeyup == "function" ? onkeyup : null, this.OnChange = typeof onchange == "function" ? onchange : null; this.Div = null, this.Select = null, this.Text = null, this.Layer = null, this.ScrollBar = null, this.ScrollBarI = null, this.UL = null, this.Index = -1, this.Value = null, this._status = { isIE6: $.browser.msie && $.browser.version == "6.0"} } this._hasInited = !1 } SelectEx.prototype.init = function () { if (!this.Selector || !this.Fix || this._hasInited) return !1; var a = function () { var a = $(".layer_dropdownlist"); a.hide(), a.data("show", "") }, b = this; if (typeof this.Selector == "object") this.Div = this.Selector, this.Selector = this.Div.selector; else { this.Div = $(this.Selector); if (this.Div.length == 0) return } this.Select = $("select", this.Div); if (this.Select.length == 0) return; this._status.isIE6 ? this.Select.wrap($("<div>").hide()) : this.Select.hide(), this.Text = this.$div("text"); var c = this.$div("icon"); c.hover(function () { c.addClass("icon-hover") }, function () { c.removeClass("icon-hover") }); var d = this.$div("dropdownlist").append(c).append(this.Text); this.OnTitleClick && d.click(this.OnTitleClick), this.Div.append(d); var e = !0, f = function (a, b, c) { a.hover(function () { (!c || e) && b.addClass("hover") }, function () { (!c || e) && b.removeClass("hover") }), c && (a.mousedown(function () { b.addClass("click") }), a.mouseup(function () { b.removeClass("click") })) }, g = $("<div>"), h = this.$div("up").append(g); f(h, g, !0); var i = $("<div>"), j = this.$div("down").append(i); f(j, i, !0), this.ScrollBarI = $("<div>"); var k = this.$div("scroll").height(this.Unit * this.Shows - this.Fix).append(this.ScrollBarI); f(this.ScrollBarI, this.ScrollBarI), this.ScrollBar = this.$div("scrollbar").append(h).append(k).append(j), this.ScrollBar.click(function (a) { a.stopPropagation() }), this.UL = $("<ul>"), this.Layer = this.$div("layer_dropdownlist").append(this.ScrollBar).append(this.UL); var l = function (a, c, d) { if (b._status.show_scrollbar) { var e = b._status.normal_scrollbar, f = b._status.list_max, g = f; e || (g = b._status.scrollbar_max); var h = b._status.list_top, i = b._status.scrollbar_top, j = !1; return a > 0 && h >= 0 ? (h -= c, h < 0 && (c += h, h = 0), e ? i -= c : h == 0 ? i = 0 : i -= b._status.top_percent * c, i < 0 && (i = 0), j = !0) : a < 0 && h <= f && (h += c, h > f && (c -= h - f, h = f), e ? i += c : h == f ? i = g : i += b._status.top_percent * c, i > g && (i = g), j = !0), j && (b.UL.stop(), d || !b.Smooth ? (b.UL.scrollTop(h), b.ScrollBarI.css("top", Math.round(i))) : (b.UL.animate({ scrollTop: h }, "fast"), b.ScrollBarI.animate({ top: Math.round(i) }, "fast")), b._status.list_top = h, b._status.scrollbar_top = i), j } return !1 }; this.mousewheel(this.Layer[0], function (a) { if (b._status.show_scrollbar) l(a, b._status.step); else return !0 }); var m, n; h.mousedown(function () { l(1, 8, !0) && (m = setTimeout(function () { n = setInterval(function () { l(1, 8, !0) || clearInterval(n) }, 45) }, 300)) }), h.mouseup(function () { m && clearTimeout(m), n && clearInterval(n) }); var o, p; j.mousedown(function () { l(-1, 8, !0) && (o = setTimeout(function () { p = setInterval(function () { l(-1, 8, !0) || clearInterval(p) }, 45) }, 300)) }), j.mouseup(function () { o && clearTimeout(o), p && clearInterval(p) }), this.ScrollBarI.bind("mousedown", function (a) { var c = $(document.body); c[0].setCapture ? c[0].setCapture() : a.preventDefault(); var d = a.screenY, f = b.ScrollBarI.data("normal"), g = b._status.list_top, h = b._status.scrollbar_top, i = b._status.list_max, j = i, k = 0, l = 0; f || (j = b._status.scrollbar_max); var m = function (a) { if (b._status.show_scrollbar) { var c = parseInt(a.screenY - d), e = c * -1; c = Math.abs(c), e > 0 && c > h ? c = h : e < 0 && c > j - h && (c = j - h), k = c, l = c, f || (k = c / b._status.top_percent); var m = g, n = h, o = !1; e > 0 && m >= 0 ? (m -= k, m < 0 && (k += m, m = 0), n -= l, k *= -1, l *= -1, o = !0) : e < 0 && m < i && (m += k, m > i && (k -= m - i, m = i), n += l, o = !0), o && (b.UL.stop(), b.UL.scrollTop(Math.round(m)), b.ScrollBarI.css("top", n)), document.selection ? document.selection.empty() : window.getSelection().removeAllRanges() } }, n = function (a) { c.unbind("mouseup", n), c.unbind("mousemove", m), c.removeClass("SelectEx-scrolling"), b.ScrollBarI.removeClass("click"), e = !0, b._status.list_top = Math.round(g + k), b._status.scrollbar_top = h + l, c[0].releaseCapture && c[0].releaseCapture() }; c.bind("mouseup", n), c.bind("mousemove", m), c.addClass("SelectEx-scrolling"), e = !1, b.ScrollBarI.addClass("click") }), this.Div.append(this.Layer), d.bind("click", function (c) { var d = b.Layer.data("show") ? !0 : !1; d ? (b.Layer.hide(), b.Layer.data("show", "")) : (a(), b.Layer.show(), b.UL.scrollTop(b._status.list_top), b.ScrollBarI.css("top", b._status.scrollbar_top), b.Layer.data("show", "1")), c.stopPropagation() }), this.refresh(!0), SelectEx.bodyEvent || ($(document.body).click(a), SelectEx.bodyEvent = !0), this._hasInited = !0, SelectEx.objects.push([this.Select[0], this.Layer[0], this]), this.OnInit && this.OnInit(this) }, SelectEx.prototype.refresh = function (a) { if (!a && !this._hasInited) return; var b = $("option", this.Select); this.UL.empty(), this.Text.text(""), this.Index = -1, this.Value = null; if (b.length > 0) { var c = 0, d = this, a = !0, e = null; b.each(function (b, f) { var g = $(f), h = g.text(), i = g.val(), j = $("<li>"); j.text(h), j.click(function () { e.removeClass("current"), j.addClass("current"), d.Text.text(h), d.Index = b, d.Value = i; var c = function () { d.Select.val(i), a ? a = !1 : (g.trigger("click"), d.Select.trigger("change"), d.OnChange && d.OnChange(d.Index, d.Value)) }; d._status.isIE6 ? setTimeout(function () { c() }, 1) : c() }), j.hover(function () { j.addClass("hover") }, function () { j.removeClass("hover") }), d.UL.append(j), g[0].selected && (c = b) }), e = $("li", d.UL); if (b.length > this.Shows) { var f = this.Shows * this.Unit, g = this.Step * this.Unit, h = b.length * this.Unit - f, i = f - this.Fix - 20; i - h >= 20 ? (this.ScrollBarI.height(i - h), this._status.normal_scrollbar = !0) : (this.ScrollBarI.height(20), this._status.normal_scrollbar = !1), this.UL.height(f), this.ScrollBar.show(), this._status.step = g, this._status.list_max = h, this._status.scrollbar_max = i, this._status.top_percent = i / h, this._status.list_top = 0, this._status.scrollbar_top = 0, this._status.show_scrollbar = !0 } else this._status.show_scrollbar = !1; $($("li", this.UL)[c]).click(), this.jump(c, 0) } else this.UL.height(this.Unit) }, SelectEx.prototype.jump = function (a, b, c) { var d = -1; switch (b) { case 0: d = a; break; case 1: $("option", this.Select).each(function (b, c) { if ($(c).val() == a) return d = b, !1 }); break; case 2: $("option", this.Select).each(function (b, c) { if ($(c).text() == a) return d = b, !1 }) } if (d != -1) { var e = (d + 1) * this.Unit - this.Shows * this.Unit, f = e * this._status.top_percent; return e > this._status.list_max ? e = this._status.list_max : e < 0 && (e = 0), f > this._status.scrollbar_max ? f = this._status.scrollbar_max : f < 0 && (f = 0), this._status.list_top = e, this._status.scrollbar_top = f, c && this.Layer.data("show") && this._status.show_scrollbar && (this.UL.scrollTop(e), this.ScrollBarI.css("top", Math.round(f))), !0 } return !1 }, SelectEx.prototype.getValue = function () { return { index: this.Index, value: this.Value} }, SelectEx.prototype.$$ = function (a, b) { return $("<" + a + ">").addClass(b) }, SelectEx.prototype.$div = function (a) { return this.$$("div", a) }, SelectEx.prototype.mousewheel = function (a, b) { var c = function (a) { a = a || window.event; var c = a.detail || a.wheelDelta; if ($.browser.mozilla || $.browser.opera) c = -c; var d = Math.abs(c); b(c / d, d) || (window.addEventListener ? (a.stopPropagation(), a.preventDefault()) : a.returnValue = !1) }; a.addEventListener && a.addEventListener("DOMMouseScroll", c, !1), a.onmousewheel = c }, SelectEx.bodyEvent = !1, SelectEx.objects = new Array, SelectEx.get = function (a) { var b = null; return $.each(SelectEx.objects, function (c, d) { if (a == d[0] || a == d[1]) return b = d[2], !1 }), b }, SelectEx.getCurrent = function () { var a = null, b = $(".layer_dropdownlist:visible"); return b.length != 0 && (a = SelectEx.get(b)), a }, SelectEx.init = function (a, b, c, d) { $(".div-select").each(function (e, f) { var g = new SelectEx({ selector: $(f), unit: a, fix: b, shows: c, step: d }); g.init() }) }, $(window).keydown(function (a) { var b = SelectEx.getCurrent(); b && b.OnKeyDown && b.OnKeyDown(a, b) }).keypress(function (a) { var b = SelectEx.getCurrent(); b && b.OnKeyPress && b.OnKeyPress(a, b) }).keyup(function (a) { var b = SelectEx.getCurrent(); b && b.OnKeyUp && b.OnKeyUp(a, b) })