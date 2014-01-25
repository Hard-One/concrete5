jQuery.fn.ccmlayout=function(a){return this.each(function(){var b=$(this),c=b.data("ccmlayout");c||b.data("ccmlayout",c=new CCMLayout(this,a))})},jQuery.fn.ccmlayoutpresetdelete=function(a){return this.each(function(){$(this).on("click",function(){var b=$(this).attr("data-area-layout-preset-id");jQuery.fn.dialog.showLoader();var c=CCM_TOOLS_PATH+"/area/layout_presets?arLayoutPresetID="+b+"&task=submit_delete&ccm_token="+a.token;$.get(c,function(b){jQuery.fn.dialog.replaceTop(b),$(".delete-area-layout-preset").ccmlayoutpresetdelete(a);var c=CCM_TOOLS_PATH+"/area/layout_presets?task=get_list_json&ccm_token="+a.token;$.getJSON(c,function(b){var c=$(a.selector).data("ccmlayout");c._updatePresets(b),jQuery.fn.dialog.hideLoader()})})})})};var CCMLayout=function(a,b){this.options=$.extend({toolbar:"#ccm-layouts-toolbar",btnsave:"#ccm-layouts-save-button",btncancel:"#ccm-layouts-cancel-button",editing:!1,supportsgrid:!1,gridrowtmpid:"ccm-theme-grid-temp"},b),this.$element=$(a),this.$toolbar=$(this.options.toolbar),this._setupDOM(),this._setupToolbarView(),this._setupFormSaveAndCancel(),this._setupFormEvents(),this._updateChooseTypeForm()};CCMLayout.prototype._setupDOM=function(){this.$formviews=this.$toolbar.find("li[data-grid-form-view]"),this.$formviewcustom=this.$toolbar.find("li[data-grid-form-view=custom]"),this.$formviewthemegrid=this.$toolbar.find("li[data-grid-form-view=themegrid]"),this.$selectgridtype=this.$toolbar.find("select[name=gridType]"),this.$selectcolumnscustom=this.$toolbar.find("input[type=text][name=columns]"),this.$customspacing=this.$toolbar.find("input[name=spacing]"),this.$customautomatedfrm=this.$toolbar.find("input[name=isautomated]"),this.$customautomated=this.$toolbar.find("[data-layout-button=toggleautomated]"),this.$selectgridcolumns=this.$toolbar.find("input[type=text][name=themeGridColumns]"),this.$savebtn=this.$toolbar.find(this.options.btnsave),this.$cancelbtn=this.$toolbar.find(this.options.btncancel),this.$slider=!1},CCMLayout.prototype._setupFormSaveAndCancel=function(){var a=this;this.$cancelbtn.unbind().on("click",function(){ConcreteEvent.fire("EditModeExitInline"),a.$toolbar.remove(),ConcreteEvent.on("EditModeExitInlineComplete",function(b){a._rescanAreasInPage(b)})}),this.$savebtn.unbind().on("click",function(){a.$toolbar.hide().prependTo("#ccm-block-form"),$("#ccm-block-form").submit(),ConcreteEvent.on("EditModeExitInlineComplete",function(b){a._rescanAreasInPage(b)})})},CCMLayout.prototype._rescanAreasInPage=function(a,b){var c=Concrete.getEditMode(),d=b.block;a.stopPropagation(),d.getElem().find("div.ccm-area").each(function(){area=new Concrete.Area($(this),c),area.bindMenu(),c.addArea(area)})},CCMLayout.prototype._setupToolbarView=function(){var a=this;this.$formviews.each(function(){$(this).attr("data-grid-form-view")!=a.options.formview&&$(this).hide()})},CCMLayout.prototype._updateChooseTypeForm=function(){var a=this.$selectgridtype.find("option:selected").val(),b=this;switch(a){case"FF":this.$formviewthemegrid.hide(),this.$formviewcustom.show(),this._updateCustomView();break;case"TG":this.$formviewcustom.hide(),this.$formviewthemegrid.show(),this._updateThemeGridView();break;default:var c=a;jQuery.fn.dialog.showLoader();var d=CCM_TOOLS_PATH+"/area/layout_presets?arLayoutPresetID="+c+"&task=get_area_layout&ccm_token="+CCM_SECURITY_TOKEN;$.getJSON(d,function(a){b.$formviewthemegrid.hide(),b.$formviewcustom.hide(),parseInt(a.arLayout.arLayoutUsesThemeGridFramework)?(b.$formviewthemegrid.show(),b.$selectgridcolumns.val(a.arLayout.arLayoutNumColumns),b._updateThemeGridView(!0)):(b.$formviewcustom.show(),b.$selectcolumnscustom.val(a.arLayout.arLayoutNumColumns),b.$customspacing.val(a.arLayout.arLayoutSpacing),parseInt(a.arLayout.arLayoutIsCustom)?(b.$customautomatedfrm.val(0),b.$customautomated.parent().removeClass("ccm-inline-toolbar-icon-selected")):(b.$customautomated.val(1),b.$customautomated.parent().addClass("ccm-inline-toolbar-icon-selected")),b._updateCustomView(!0),parseInt(a.arLayout.arLayoutIsCustom)&&($.each(a.arLayoutColumns,function(a,c){b.columnwidths.push(parseInt(c.arLayoutColumnWidth));var d=$(b.$element.find(".ccm-layout-column").get(a));d.css("width",c.arLayoutColumnWidth+"px"),$("#ccm-edit-layout-column-width-"+a).val(c.arLayoutColumnWidth)}),b._showCustomSlider())),jQuery.fn.dialog.hideLoader()})}this.options.editing&&this.$selectgridtype.prop("disabled",!0)},CCMLayout.prototype._setupFormEvents=function(){var a=this;this.$selectcolumnscustom.on("keyup",function(){a._updateCustomView()}),this.$customspacing.on("keyup",function(){a._updateCustomView()}),this.$customautomatedfrm.on("change",function(){a._updateCustomView()}),this.$customautomated.on("click",function(){return $(this).parent().hasClass("ccm-inline-toolbar-icon-selected")?($(this).parent().removeClass("ccm-inline-toolbar-icon-selected"),a.$customautomatedfrm.val(0)):($(this).parent().addClass("ccm-inline-toolbar-icon-selected"),a.$customautomatedfrm.val(1)),a.$customautomatedfrm.trigger("change"),!1}),this.$selectgridcolumns.on("keyup",function(){a._updateThemeGridView()}),this.$selectgridtype.on("change",function(){a._updateChooseTypeForm()})},CCMLayout.prototype.buildThemeGridGrid=function(){this.$element.html("");var a=this.options.rowstart;a+='<div id="ccm-theme-grid-edit-mode-row-wrapper">';var b=this._getThemeGridColumnSpan(this.columns);$.each(b,function(b,c){var d='<div id="ccm-edit-layout-column-'+b+'" class="'+c.cssClass+' ccm-theme-grid-column" data-offset="0" data-span="'+c.value+'"><div class="ccm-layout-column-highlight"><input type="hidden" id="ccm-edit-layout-column-offset-'+b+'" name="offset['+b+']" value="0" /><input type="hidden" id="ccm-edit-layout-column-span-'+b+'" name="span['+b+']" value="'+c.value+'" /></div></div>';a+=d}),a+="</div>",a+=this.options.rowend,this.$element.append(a)},CCMLayout.prototype._updateThemeGridView=function(a){a||this.$selectgridtype.find("option[value=TG]").prop("selected",!0),this.columns=parseInt(this.$selectgridcolumns.val()),this.maxcolumns=parseInt(this.$selectgridcolumns.attr("data-maximum")),this.options.editing?this.$selectgridcolumns.prop("disabled",!0):this.buildThemeGridGrid(),this._resetSlider(),this.columns>1&&this._showThemeGridSlider()},CCMLayout.prototype._buildThemeGridGridFromPresetColumns=function(a){this.$element.html("");var b=this.options.rowstart;b+='<div id="ccm-theme-grid-edit-mode-row-wrapper">',$.each(a,function(a,c){var d='<div id="ccm-edit-layout-column-'+a+'" class="ccm-theme-grid-column" data-offset="'+c.arLayoutColumnOffset+'" data-span="'+c.arLayoutColumnSpan+'"><div class="ccm-layout-column-highlight"><input type="hidden" id="ccm-edit-layout-column-offset-'+a+'" name="offset['+a+']" value="'+c.arLayoutColumnOffset+'" /><input type="hidden" id="ccm-edit-layout-column-span-'+a+'" name="span['+a+']" value="'+c.arLayoutColumnSpan+'" /></div></div>';b+=d}),b+="</div>",b+=this.options.rowend,this.$element.append(b),this.columns=a.length,this.maxcolumns=parseInt(this.$selectgridcolumns.attr("data-maximum")),this._resetSlider(),this._redrawThemeGrid(),this._showThemeGridSlider()},CCMLayout.prototype._updateCustomView=function(a){for(a||this.$selectgridtype.find("option[value=FF]").prop("selected",!0),this.columns=parseInt(this.$selectcolumnscustom.val()),this.customspacing=this.$customspacing.val(),this.automatedcustomlayout=1==this.$customautomatedfrm.val(),this.columnwidths=[],this.options.editing&&this.$selectcolumnscustom.prop("disabled",!0),this.options.editing||this.$element.html(""),i=0;i<this.columns;i++)if(!(this.options.editing&&$("#ccm-edit-layout-column-"+i).length>0)){var b=$("<div />").attr("class","ccm-layout-column");b.attr("id","ccm-edit-layout-column-"+i);var c=$("<div />").attr("class","ccm-layout-column-highlight");c.append($("<input />",{name:"width["+i+"]",type:"hidden",id:"ccm-edit-layout-column-width-"+i})),b.append(c),this.$element.append(b)}var d=this.$element.find(".ccm-layout-column");if(this.columns<d.length)for(i=columns;i<d.length;i++)$("#ccm-edit-layout-column-"+i).remove();for(i=0;i<this.columns;i++){if(c=$("#ccm-edit-layout-column-"+i+" .ccm-layout-column-highlight"),i>0&&c.css("margin-left",this.customspacing/2+"px"),i+1<this.columns&&c.css("margin-right",this.customspacing/2+"px"),b=$("#ccm-edit-layout-column-"+i),b.attr("data-width")){var e=b.attr("data-width")+"px";this.columnwidths.push(parseInt(b.attr("data-width")))}else var e=100/this.columns+"%";b.css("width",e)}this._resetSlider(),!this.automatedcustomlayout&&this.columns>1&&this._showCustomSlider()},CCMLayout.prototype._resetSlider=function(){this.$slider&&(this.$slider.slider("destroy"),this.$slider=!1),$("#ccm-area-layout-active-control-bar").hasClass("ccm-area-layout-control-bar-add")&&$("#ccm-area-layout-active-control-bar").css("height","0px")},CCMLayout.prototype._getThemeGridColumnSpan=function(a){var b=Math.ceil(this.maxcolumns/a),c=[];for(i=0;a>i;i++)c[i]=b;var d=b*a;for(i=0;i<d-this.maxcolumns;i++){var e=c.length-i-1;c[e]--}var f=[];for(i=0;i<c.length;i++)f[i]={},f[i].cssClass=this.options.gridColumnClasses[c[i]-1],f[i].value=c[i];return f},CCMLayout.prototype._getThemeGridNearestValue=function(a,b){for(var c=null,d=null,e=0;e<b.length;e++)if(b[e]<=a||b[e]>=a){var f=Math.abs(a-b[e]);(null==d||d>f)&&(c=b[e],d=f)}return c},CCMLayout.prototype._showThemeGridSlider=function(){var a=this;a.$slider=$("#ccm-area-layout-active-control-bar"),a.$slider.css("height","6px");var b=[];for(i=0;i<a.columns;i++)k=$("#ccm-edit-layout-column-"+i),0==i?b.push(parseInt(k.width())):i+1==a.columns?b.push(parseInt(k.position().left)):(b.push(parseInt(k.position().left)),b.push(parseInt(k.width()+k.position().left)));var c=$("#ccm-area-layout-active-control-bar").width(),d=[],e=[],f=a.options.maxcolumns,g=a.options.gridColumnClasses[0];$("<div />",{id:a.options.gridrowtmpid}).appendTo(document.body);var h="";for(i=1;f>=i;i++)h+='<div class="'+g+'"></div>';$("#"+a.options.gridrowtmpid).append($(a.options.rowstart+h+a.options.rowend));var j=0;for(i=0;f>i;i++){var k=$($("#"+a.options.gridrowtmpid+" ."+g).get(i));if(0==i){var l=k.position().left;0>l&&(j=Math.abs(l))}d.push(parseInt(k.position().left+j)),e.push(parseInt(k.width()+k.position().left+j))}$("#"+a.options.gridrowtmpid).remove(),a.$slider.slider({min:0,max:c,step:1,values:b,slide:function(b,c){"TG"!=a.$selectgridtype.val()&&a.$selectgridtype.find("option[value=TG]").prop("selected",!0);var f,g=$(c.handle).index();f=g%2==0?e:d;var h=a.$slider.slider("values",g),i=a._getThemeGridNearestValue(c.value,f),j=!0;if($.each(c.values,function(a,b){i>=b&&a>g?j=!1:b>=i&&g>a&&(j=!1)}),j&&(a.$slider.slider("values",g,i),h!=i)){if(g%2==0){var k=Math.floor(g/2);$innercolumn=$("#ccm-edit-layout-column-"+k);var l=parseInt($innercolumn.attr("data-span")),m=$innercolumn.nextAll(".ccm-theme-grid-column:first"),n=m.attr("data-offset");n=n?parseInt(n):0,i>h?(l++,n--):(l--,n++)}else{var k=Math.ceil(g/2);$innercolumn=$("#ccm-edit-layout-column-"+k);var l=parseInt($innercolumn.attr("data-span")),m=$innercolumn,n=m.attr("data-offset");n=n?parseInt(n):0,h>i?(l++,n--):(l--,n++)}m.attr("data-offset",n),$innercolumn.attr("data-span",l),a._redrawThemeGrid()}return!1}})},CCMLayout.prototype._redrawThemeGrid=function(){var a=this;a.$element.find(".ccm-theme-grid-offset-column").remove(),$.each(a.$element.find(".ccm-theme-grid-column"),function(b,c){var d=$(c);if(d.removeClass(),d.attr("data-span")){var e=parseInt(d.attr("data-span"))-1;d.addClass(a.options.gridColumnClasses[e]),$("#ccm-edit-layout-column-span-"+b).val(parseInt(d.attr("data-span")))}if(d.attr("data-offset")){var f=parseInt(d.attr("data-offset"))-1;$("<div />",{"data-offset-column":!0}).addClass("ccm-theme-grid-offset-column").addClass(a.options.gridColumnClasses[f]).insertBefore(d),$("#ccm-edit-layout-column-offset-"+b).val(parseInt(d.attr("data-offset")))}d.addClass("ccm-theme-grid-column"),a.options.editing&&d.addClass("ccm-theme-grid-column-edit-mode")})},CCMLayout.prototype._showCustomSlider=function(){this.$slider=$("#ccm-area-layout-active-control-bar"),this.$slider.css("height","6px");var a=[],b=0,c=this.$slider.width(),d=this.$element.find(".ccm-layout-column");if(this.columnwidths.length>0)for(i=0;i<this.columnwidths.length-1;i++)b+=this.columnwidths[i],a.push(b);else{var e=c/this.columns;for(i=1;i<this.columns;i++)b+=e,a.push(b)}var f=this;this.$slider.slider({min:0,max:c,step:1,values:a,create:function(){var b=0;$.each(d,function(e,f){var g=a[e];if(e+1==d.length)var h=c-b;else var h=g-b;var h=Math.floor(h);$(f).find("#ccm-edit-layout-column-width-"+e).val(h),b=g})},slide:function(a,b){"FF"!=f.$selectgridtype.val()&&f.$selectgridtype.find("option[value=FF]").prop("selected",!0);var e=0,g=!0;return $.each(b.values,function(a,b){e>b&&(g=!1),e=b}),g?(e=0,void $.each(d,function(a,f){if(a+1==d.length)var g=c-e;else var g=b.values[a]-e;var g=Math.floor(g);$(f).find("#ccm-edit-layout-column-width-"+a).val(g),$(f).css("width",g+"px"),e=b.values[a]})):!1}})};