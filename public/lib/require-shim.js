/**
 * @author mesuperjs@gmail.com
 */
(function (c,r) {

    // c type{RequireConfig}
    // r type{require}

    var _op = {},
        _config;

    _op.type = c.type || 'default';
    _op.main = c.main || (function () {throw 'RequireConfig.main is not defined'})();
    _op.content = (c.type == 'custom' && c.content && c.content.paths && c.content.shim)?c.content:{};

    switch (_op.type){
        case 'default':
            _config = {
                paths : {
                    "modernizr" : "modernizr-custom",
                    "es5shim" : "es5-shim.min",
                    "es5sham" : "es5-sham.min",
                    "common" : "../script/common"
                },
                shim : {
                    "es5sham" : {
                        //deps type{Array} deps数组，表明该模块的依赖
                        deps : ["es5shim"]
                    }
                }
            };

            _config.paths[_op.main] = "../script/" + _op.main;
            _config.shim[_op.main] = {
                deps : ["common"]
            };
            break;
        case 'custom':
            _config = _op.content;
            break;
        default:
            throw 'RequireConfig.type only can String ( default | custom )'
    }

    r.config(_config);

    r(["modernizr-custom"],loadModernizr);

    function loadModernizr() {
        
        (Modernizr.es5)?r([_op.main],loadMain):r(["es5sham"],loadShim)
    }

    function loadShim() {
        r([_op.main],loadMain)
    }

    function loadMain() {
        //自定义功能写在这里
    }

})(window.RequireConfig,require);