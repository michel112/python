function setScrollHeight(e){e||(e=$(this));var t=window.innerHeight-e.offset().top;t<400&&(t=400),e.height(t)}function exportCSV(e){0==$("#confirm_dialog").size()&&$("body").append('<div id="confirm_dialog"/>');var t=0;e&&(t=$(".search-item.active").attr("id").substring(3)),$("#confirm_dialog").load("?do=campaigns&act=export"+(t?"&id="+-t:""),function(){$("#confirm_dialog .modal").modal("show"),$("#confirm_dialog form").submit(function(){if(3==$("select",this).val()){var e=[];if($(".scroll-block input[type=checkbox]:checked").each(function(){e.push($(this).closest("tr").attr("id").substring(5))}),0==e.length)return $("#confirm_dialog .modal").modal("hide"),alert("Nothing selected."),!1;$("#selected_ids").val(e.join(","))}})})}function get_bulk_filter(){var e=[];return $("input.filter_cb:checked").each(function(){e.push("filter["+$(this).val()+"]=1")}),0==e.length?e.push("filter[0]=1"):3==e.length&&(e=[]),e.join("&")}function statusOrderChanged(){var e=document.location.href.match(/^(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/)[3],t="",a=document.location.href.match(/search=(.+?)(&|$)/);a&&a[1]&&(t="&search="+a[1]);var i=get_bulk_filter();document.location=e+"?statusOrder="+$(this).val()+t+(i?"&"+i:"")}function loadUpcomingTasks(e){$("#upcoming_tasks").load("?do=tasks&act=upcoming"+(e?"&page="+e:""),function(){$("#upcoming_tasks .pagination li a").click(function(){return loadUpcomingTasks($(this).attr("href").replace(/^.*page=(\d+).*$/,"$1")),!1})})}function loadFinishedTasks(e){$("#finished_tasks").load("?act=finished"+(e?"&page="+e:""),function(){$("#finished_tasks .pagination li a").click(function(){return loadFinishedTasks($(this).attr("href").replace(/^.*page=(\d+).*$/,"$1")),!1})})}function loadSearchTable(e,t,a){$("#search_people").load("?act=people&id="+e+(t?"&page="+t:"")+(a?"&find="+encodeURIComponent(a):""),function(){$("#search_people .pagination li a").click(function(){$(this).parent().hasClass("disabled")||loadSearchTable($(".search-item.active").attr("id").substring(3),$(this).attr("href").replace(/^.*page=(\d+).*$/,"$1"),$("#search_find input").val());return!1}),$("#search_find").submit(function(){return loadSearchTable($(".search-item.active").attr("id").substring(3),0,$("#search_find input").val()),!1}),setScrollHeight($("#search_people .scroll-block"))})}function add2bulk(e,t){var a=$("#add2campaign"),i=a.find("input[type=hidden]").val(),n="",o="";if("all"==i){n="all",o=get_bulk_filter();var c=$("#camp_search input").val();c&&(o&&(o+="&"),o+="search="+encodeURIComponent(c))}else{var s=i.split(",");s.length>0&&(n=s.join("&ids[]="))}n&&($(".modal").modal("hide"),$.getJSON("?act=add2bulk&ids[]="+n+"&id="+a.find("select").val()+(o?"&"+o:"")+(t?"&save=1":""),function(e){if(e.success)location.reload();else{var t=getModalDiv();t.html(e.message),t.find(".modal").modal("show")}}))}function getModalDiv(){var e=$("#modal_div");return 0==e.length&&($("body").append('<div id="modal_div" />'),e=$("#modal_div")),e}$(document).on("click",function(e){for(var t=e.target;!t.dataset.click&&t.parentElement;)t=t.parentElement;if(t.dataset.click){var a=t.dataset.click;if("change_status"==a){var i=$(t).closest("tr").attr("id").substring(5);$(t).popover({container:$(t).closest("div"),content:'<div class="list-group" style="margin:0" data-cid="'+i+'"><a href="#" data-status="20" data-click="changeStatus" class="list-group-item">Mark Later</a><a href="#" data-status="21" data-click="changeStatus" class="list-group-item bg-gray">Mark No Interest</a><a href="#" data-status="10" data-click="changeStatus" class="list-group-item bg-green">Mark Replied</a><a href="#" data-status="12"  data-click="changeStatus" class="list-group-item bg-yellow">Mark Talking</a><a href="#" data-status="22" data-click="changeStatus" class="list-group-item bg-maroon">Mark Old Connect</a></div>',html:!0,placement:"bottom",trigger:"manual",template:'<div class="popover"><div class="arrow"></div><div class="popover-content" style="padding:0"></div></div>'}).popover("toggle")}else{if("changeStatus"==a){i=$(t).closest("div").data("cid");var n=$(t).data("status");return $("#ctct_"+i+" .btn").popover("hide"),$("#ctct_"+i+" .btn").parent().load("?do=campaigns&act=change_status&id="+i+"&status="+n),!1}if("removeAccount"==a)confirmDialog("remove_account",function(){document.location="?act=delete&id="+r},{id:r=$(t).attr("id").substring(4)});else if("removeStep"==a)$(t).tooltip("hide"),confirmDialog("remove_step",function(){$(t).closest(".box").slideUp(function(){$(this).remove()})});else if("checkAll"==a)$(t).is(":checked")?$("td input[type=checkbox]").prop("checked",!0):$("td input[type=checkbox]").prop("checked",!1);else if("addSelected2Campaign"==a){var o=[];if($("td input[type=checkbox]:checked").each(function(){o.push($(this).closest("tr").attr("id").substring(5))}),0==o.length)alert("Nothing selected");else{var c=$("#add2campaign").find("input[type=hidden]");$("#add2campaign").modal("show"),c.val(o.join(","))}}else if("addAll2Campaign"==a)$("#add2campaign").modal("show"),$("#add2campaign").find("input[type=hidden]").val("all");else{if("saveNotes"==a)return saveNotes(),!1;if("markRead"==a||"markUnread"==a){o=[];$("td input[type=checkbox]:checked").each(function(){o.push($(this).closest("tr").attr("id").substring(5))}),o.length>0&&$.getJSON("?act=mark_conv&ids="+o.join(",")+"&id="+("markRead"==a?0:1),function(e){for(var t in e)"markRead"==a?$("#ctct_"+e[t]).hasClass("unread")&&($("#ctct_"+e[t]).removeClass("unread"),decUnread(1)):$("#ctct_"+e[t]).hasClass("unread")||($("#ctct_"+e[t]).addClass("unread"),decUnread(-1))}),$("td input[type=checkbox]:checked").prop("checked",!1),$("#checkAll").prop("checked",!1)}else if("closeTicket"==a)confirmDialog("close_ticket",function(){document.location=document.location.href+"?act=close"});else if("changePlan"==a||"changePlanUp"==a||"changePlanDown"==a){var s=t.dataset.plan;"changePlan"==a?document.location=document.location.href+"?act=change_plan&id="+s:confirmDialog("change_plan",function(){document.location=document.location.href+"?act=change_plan&id="+s},{id:"changePlanUp"==a?1:0})}else if("cancelSubscription"==a)confirmDialog("cancel_subscription",function(){document.location=document.location.href+"?act=cancel"});else if("removeSearch"==a){var r;confirmDialog("remove_search",function(){document.location="?act=delete&id="+r},{id:r=$(t).parent().attr("id").substring(3)})}else if("removeCampaign"==a){confirmDialog("remove_campaign",function(){document.location="?act=delete&id="+i},{id:i=$(t).data("cid")})}else if("removeFromCampaign"==a){o=[];$("td input[type=checkbox]:checked").each(function(){o.push($(this).closest("tr").attr("id").substring(5))}),o.length>0?confirmDialog("remove_from_campaign",function(){$.get("?act=delete_people&ids="+o.join(","),function(){document.location.reload()})},{id:$(t).data("cid")?1:0}):alert("Nothing selected")}else"move_confirmed"==a?add2bulk(!1,!0):"export"==a&&exportCSV("search"==t.dataset.page)}}}}),$(".scroll-block").each(setScrollHeight),$("#new_ticket_msgs").size()>0&&$.get("/support/?act=new_messages",function(e){e>0&&$("#new_ticket_msgs").html(e+"&nbsp;").show()}),$("input.filter_cb").change(function(){document.location="?"+get_bulk_filter()}),$("#statusOrder").change(statusOrderChanged),loadUpcomingTasks(),loadFinishedTasks(),$(".search-item").click(function(){$(".search-item").removeClass("active"),$(this).addClass("active"),loadSearchTable($(this).attr("id").substring(3))}),$(".search-item:first").click(),$("#add2campaign").on("show.bs.modal",function(e){var t=$(e.relatedTarget).data("cid");$(this).find("input[type=hidden]").val(t)}),$("#add2campaign .add_button").click(function(){var e=$("#add2campaign"),t=e.find("input[type=hidden]").val();if(isNaN(t))if("all"==t){var a=$(".search-item.active").attr("id").substring(3);a&&$.get("?act=add2campaign&ids[]=all&cid="+e.find("select").val()+"&tid="+a,function(e){location.reload()})}else{var i=t.split(",");if(i.length>0){var n={};for(var o in i)n[i[o]]=$("a[data-cid="+i[o]+"]").parent(),n[i[o]].html('<img src="/dist/img/ajax-loader.gif" alt="" />');$.getJSON("?act=add2campaign&ids[]="+i.join("&ids[]=")+"&cid="+e.find("select").val(),function(e){for(var t in e.ids=e.ids.split(","),e.ids){var a=n[e.ids[t]];a.html(e.html),a.parent().find("input[type=checkbox]").remove()}})}}else{var c=$("a[data-cid="+t+"]").parent();c.html('<img src="/dist/img/ajax-loader.gif" alt="" />'),$.get("?act=add2campaign&id="+t+"&cid="+e.find("select").val(),function(e){c.html(e),c.parent().find("input[type=checkbox]").remove()})}e.modal("hide")}),$("#add2campaign .add2bulk_button").click(add2bulk);var search_loading=!1;function decUnread(e){$(".inUnread span").text($(".inUnread span").text()-e),$(".inUnread span").text()<=0?$(".inUnread").hide():$(".inUnread").show()}function people_row_clicked(){$("#campaign_people tr.contact").removeClass("active");var e=$(this);e.addClass("active");var t=e.attr("id").substring(5);$("#uinfo_box").append('<div class="overlay"><div><i class="fa fa-refresh fa-spin"></i></div></div>'),$("#uinfo_box").load("?act=contact_info&id="+t,function(){e.hasClass("unread")&&(e.removeClass("unread"),decUnread(1))})}function chatFocus(){$("#chat_message").height(100),$("#chat_form button").addClass("act")}function chatBlur(e){""==$(e).val()&&($("#chat_message").height(""),$("#chat_form button").removeClass("act"))}function send_message(){var e=$("#campaign_people tr.contact.active");if(1==e.size()){var t=e.attr("id").substring(5),a=$("#chat_message").val();$("#chat_message").val(""),a&&$.post("?do=campaigns&act=send_message",{message:{contact_id:t,text:a}},function(t){if("ok"==t.status)if(t.html)e.find("td:last").html(t.html),e.click();else{var a=document.location.href,i=a.indexOf("?");i>=0&&(a=a.substring(0,i)),document.location=a}},"json")}return!1}function saveNotes(){var e=$("#campaign_people tr.contact.active");if(1==e.size()){var t=e.attr("id").substring(5),a=$("#save_notes").html();$("#save_notes").html('&nbsp;<img src="/dist/img/ajax-loader.gif" alt="" />&nbsp;'),$.post("?do=campaigns&act=save_notes&id="+t+"&notes="+encodeURIComponent($("#notes").val()),function(e){"OK"==e&&$("#save_notes").html(a)})}}function confirmDialog(e,t,a){0==$("#confirm_dialog").size()&&$("body").append('<div id="confirm_dialog"/>');var i="";if(a)for(var n in a)i+="&"+n+"="+a[n];$("#confirm_dialog").load("/?do=confirm&act="+e+i,function(){$("#confirm_button").click(function(){$("#confirm_dialog .modal").modal("hide"),t()}),$("#confirm_dialog .modal").modal("show")})}function DDInput(e,t,a){var i,n=this,o=a,c=$('<ul class="ddinput_list"/>');e.after(c);var s=$('<input type="hidden" name="search['+t.toLowerCase()+'][value]">');e.after(s);var r,d="";$(document).click(function(t){$(t.target).is(e)||(c.is(":visible")&&c.hide(),""==s.val()&&e.val(""),o=a)}),e.focus(function(){c.is(":visible")||(c.show(),n.drawList())}),c.css({display:"none",top:e.position().top+e.outerHeight(),left:e.position().left,width:e.outerWidth()}),e.keyup(function(){var c=e.val().toLowerCase();""!=c?c!=d&&(s.val(""),d=c,clearTimeout(i),i=setTimeout(function(){var e;e=c,"object"==typeof r&&r.abort(),r=$.getJSON("?act=typehint&search[hint]="+encodeURIComponent(e)+"&search[type]="+t,function(t){""!=d&&e==d&&(o=t.length>0?t:a,n.drawList(e))})},300)):(d="",s.val(""),o=a,n.drawList())}),this.drawList=function(t){if(c.empty(),o.length>0){c.show();for(var i=0;i<o.length;i++){var n=o[i].name;if(t){var r=n.toLowerCase().indexOf(t);r>-1&&(n=n.substring(0,r)+"<strong>"+n.substring(r,r+t.length)+"</strong>"+n.substring(r+t.length))}c.append('<li class="item" data-id="'+o[i].id+'">'+n+"</li>")}c.scrollTop(0),c.height(31*(o.length>5?5:o.length)-1),$(".item",c).click(function(){return e.val($(this).text()),d=e.val().toLowerCase(),c.hide(),s.val($(this).data("id")),o=a,!1})}else c.hide()}}$("#new_search").click(function(){if(!search_loading)return 0==$("#add_search").size()&&$("body").append('<div id="add_search"/>'),search_loading=!0,$("#add_search").load("?act=add_search",function(){search_loading=!1,$("#add_search .modal").modal("show");var e="",t=$("#advanced_search");$("#search_keyword").keyup(function(){$(this).val()!=e&&(e=$(this).val(),$("#search_keyword").parent().removeClass("has-error"),t.empty().hide(),$("#advanced_search_toggle").show())}),$("#advanced_search_toggle").click(function(){return t.is(":visible")||(""!=$("#search_keyword").val()?(t.html('<div class="text-center"><img src="/dist/img/ajax-loader.gif" alt="" /></div>'),t.show(),t.load("?act=advanced&search[term]="+encodeURIComponent($("#search_keyword").val())),$(this).hide()):$("#search_keyword").prop("placeholder","Enter keyword(s)").parent().addClass("has-error")),!1}),$("#search_dialog a[data-toggle=tab]").on("shown.bs.tab",function(e){var t=$(e.target).attr("href");"#search_url"==t?($("#search_type").val("1"),$("#search_keyword").attr("required",!1).val(""),$("#search_sales input").attr("required",!1).val(""),$("#search_url input").attr("required",!0)):"#search_sales"==t?($("#search_type").val("2"),$("#search_sales input").attr("required",!0),$("#search_keyword").attr("required",!1).val(""),$("#search_url input").attr("required",!1).val("")):($("#search_type").val("0"),$("#search_keyword").attr("required",!0),$("#search_url input").attr("required",!1).val(""),$("#search_sales input").attr("required",!1).val(""))})}),!1}),$("#campaigns_list").load("?do=campaigns&act=campaigns"),$("#bulk_campaigns_list").load("?do=campaigns&act=bulk_campaigns"),$(".switch_campaign").change(function(){var e=$(this);$.get("?act=switch_status&id="+e.data("cid"),function(t){"0"==t?$(".switch_campaign").not(e).prop("checked",!0):"1"==t&&$(".switch_campaign").not(e).removeAttr("checked")})}),$("#campaign_people tr.contact").click(people_row_clicked),$("#campaign_people tr.contact:first").click(),$("td input[type=checkbox]").click(function(e){e.stopPropagation()}),$("#add_step").click(function(){var e=$("#new_step").find("label.title span");return e.text(1*e.text()+1),$($("#new_step").html()).insertBefore($(this)),!1});var pay_form=$("#payment-form");function stripeResponseHandler(e,t){if(t.error)pay_form.find(".payment-errors").text(t.error.message),pay_form.find(".submit").prop("disabled",!1),$(".payment-errors").css("display","block");else{var a=t.id;pay_form.append($('<input type="hidden" name="stripeToken">').val(a)),pay_form.get(0).submit()}}if(pay_form.submit(function(e){return pay_form.find(".payment-errors").hide(),pay_form.find(".submit").prop("disabled",!0),Stripe.card.createToken(pay_form,stripeResponseHandler),!1}),void 0!==$.fn.knob&&$(".knob").knob(),$("input[size]").keyup(function(){var e=$(this).val();if((e=e.replace(/[^\d]/g,"")).length>$(this).attr("size")&&(e=e.substring(0,$(this).attr("size"))),$(this).hasClass("cnum"))for(var t=4;t<e.length;)e=e.substring(0,t)+" "+e.substring(t),t+=5;$(this).val(e)}),$(".info .panel").on("shown.bs.collapse",function(e){$(this).find("a i").removeClass("glyphicon-plus").addClass("glyphicon-minus"),Cookies.remove("info_panel",{path:""})}),$(".info .panel").on("hidden.bs.collapse",function(e){$(this).find("a i").addClass("glyphicon-plus").removeClass("glyphicon-minus"),Cookies.set("info_panel","hidden",{expires:300,path:""})}),$(".measured").length>0){var el=$("#tab_2"),previousCss=el.attr("style");el.is(":visible")||el.css({position:"absolute",visibility:"hidden",display:"block"}),$(".measured").each(function(){$(this).text()&&$(this).innerHeight($(this)[0].scrollHeight)}),el.attr("style",previousCss||"")}$(".charslimit").keyup(function(){$(this).val().length>280?$(".longmsg").show():$(".longmsg").hide()}),$("#x2speed").change(function(){var e=$(this);return $.get("?do=accounts&act=x2",function(t){1==t?e.prop("checked",!0):e.prop("checked",!1)}),!1}),function(e){var t=!1;if("function"==typeof define&&define.amd&&(define(e),t=!0),"object"==typeof exports&&(module.exports=e(),t=!0),!t){var a=window.Cookies,i=window.Cookies=e();i.noConflict=function(){return window.Cookies=a,i}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var a=arguments[e];for(var i in a)t[i]=a[i]}return t}return function t(a){function i(t,n,o){var c;if("undefined"!=typeof document){if(arguments.length>1){if("number"==typeof(o=e({path:"/"},i.defaults,o)).expires){var s=new Date;s.setMilliseconds(s.getMilliseconds()+864e5*o.expires),o.expires=s}o.expires=o.expires?o.expires.toUTCString():"";try{c=JSON.stringify(n),/^[\{\[]/.test(c)&&(n=c)}catch(e){}n=a.write?a.write(n,t):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=(t=(t=encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var r="";for(var d in o)o[d]&&(r+="; "+d,!0!==o[d]&&(r+="="+o[d]));return document.cookie=t+"="+n+r}t||(c={});for(var l=document.cookie?document.cookie.split("; "):[],p=/(%[0-9A-Z]{2})+/g,h=0;h<l.length;h++){var u=l[h].split("="),f=u.slice(1).join("=");this.json||'"'!==f.charAt(0)||(f=f.slice(1,-1));try{var m=u[0].replace(p,decodeURIComponent);if(f=a.read?a.read(f,m):a(f,m)||f.replace(p,decodeURIComponent),this.json)try{f=JSON.parse(f)}catch(e){}if(t===m){c=f;break}t||(c[m]=f)}catch(e){}}return c}}return i.set=i,i.get=function(e){return i.call(i,e)},i.getJSON=function(){return i.apply({json:!0},[].slice.call(arguments))},i.defaults={},i.remove=function(t,a){i(t,"",e(a,{expires:-1}))},i.withConverter=t,i}(function(){})});