/* 
 * version 0.1.2
 * ion.js - MicroFramework-helper for ajax (with jQuery)
 * https://docs.google.com/document/d/1cW2wAi8Qk266QySXL2B9TVLiKiN9RkIFHAFRTqfNDt4/edit?usp=sharing
 */

function Ion(){
    this.preloaderSelector;
    this.preloaderStartInterval = 700;
}

Ion.prototype = {
    /* for ReplaceAll */
    escapeRegExp: function (str)
    {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    },
    /* ReplaceAll */
    replaceAll: function (find, replace, str)
    {
        return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    },
    /* Preloader selector */
    setPreloader: function(selector)
    {
        this.preloaderSelector = selector;
    },
    /* Preloader show */
    preloaderShow: function ()
    {
        var selector = this.preloaderSelector;
        if(!selector){
            selector = '#Preloader';
        }
        var si = this.preloaderStartInterval;
        $(selector).attr("complite", "false");
        setTimeout(function ()
        {
            if ($(selector).attr("complite") === "false") {
                $(selector).fadeIn(300);
            }
        }, si);
    },
    /* Preloader hide */
    preloaderHide: function ()
    {
        $(this.preloaderSelector).attr("complite", "true");
        $(this.preloaderSelector).hide();
    },
    /* Parse command from ajax attribute */
    parseAttr: function (attr, ac)
    {
        if (RegExp(attr + '=(.+?);', 'ig').test(ac)) {
            return RegExp(attr + '=(.+?);', 'ig').exec(ac)[1];
        } else {
            return false;
        }
    },
    /* Patse data from inputs and textblocks by entering the css selector */
    dataParse: function (selector)
    {
        var inputs = $(selector).size();
        var data = {};
        for (var i = 0; i < inputs; i++)
        {
            var obj = $(selector).eq(i);
            var name = $(obj).attr('name');
            
            if(obj.val() !== ""){
                data[name] = obj.val();
            } else {
                
                if(obj.attr('value') === undefined){
                    data[name] = obj.text();
                } else {
                    data[name] = obj.attr('value');
                }
            }  
        }
        return data;
    },
    /* Command handler  */
    cmd: function (ac)
    {
        /* multiCommands */
        var acArr = ac.split('->');
        var acNext = false;
        if (acArr.length > 1) {
            ac = acArr[0];
            acArr.splice(0, 1);
            acNext = acArr.join('->');
        }
        
        var data = this.parseAttr('data', ac);
        var ajax = this.parseAttr('ajax', ac);
        var htmldata = this.parseAttr('html', ac);
        var appendto = this.parseAttr('append', ac);
        var prependto = this.parseAttr('prepend', ac);
        var val = this.parseAttr('val', ac);
        var run = this.parseAttr('run', ac);
        var script = this.parseAttr('script', ac);
        var modal = this.parseAttr('modal', ac);
        var debug = this.parseAttr('debug', ac);
        var type = this.parseAttr('type', ac);
        var clean = this.parseAttr('clean', ac);
        var reload = this.parseAttr('reload', ac);
        
        if(!type) {
            type = 'post';
        }

        var send = false;

        if (val) {
            val = this.replaceAll("'", '"', val);
            val = JSON.parse('{' + val + '}');
        }

        if (data) {
            send = this.dataParse(data);
        }
        
        if (val && data) {
            send = $.extend(send, val);
        }
        
        if (val && !data) {
            send = val;
        }

        if (ajax) {
            var $this = this;
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type: type,
                url: ajax,
                cache: false,
                beforeSend: function ()
                {
                    $this.preloaderShow();
                    $('body').css('cursor','wait');
                },
                data: send,
                error: function (x)
                {
                    console.log(x);
                    $('html').html(x.responseText);
                },
                success: function (html)
                {
                    $this.preloaderHide();
                    $('body').css('cursor','default');
                    if (htmldata) {
                        $(htmldata).html(html);
                    }
                    if(appendto) {
                        $(appendto).append(html);
                    }
                    if(prependto) {
                        $(prependto).prepend(html);
                    }
                    if(modal) {
                        /* For tw.bootstrap modal */
                        $(modal+' .modal-content').html(html);
                        $(modal).modal('show');
                    }
                    if(debug) {
                        console.log(html);
                    }
                }
            });
        } else {
            if (htmldata) {
                /* Value of first key in object 'send' */
                for (var html in send)
                    break;
                $(htmldata).html(send[html]);
            }
        }
        
        /* Run function */
        if(run){
            if (typeof run === "function") {
                eval(run);
            }
        }
        if(script){
            eval(script);
        }
        
        if(clean){
            $(clean).val('').text('');
        }
        
        if(reload){
            setTimeout(function(){
                location.reload();
            }, reload*1000);
        }
        if(modal === 'hide'){
            $('.modal').modal('hide');
        }
        
        /* Next command */
        if(acNext) {
            this.cmd(acNext);
        }
    }
};