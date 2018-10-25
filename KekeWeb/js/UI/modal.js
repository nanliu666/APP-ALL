"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function modal(params, index) {
    // 礼包开启modal index === 0
    if (index === 0) {
        var _params = _slicedToArray(params, 2),
            describe = _params[0],
            game_name = _params[1];

        var modalHTML = "\n    <div class=\"modal fade\" id=\"downModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal-dialog white_content\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <h4 class=\"modal-title\" id=\"myModalLabel\" style=\"text-align: center\">\u9886\u53D6\u6210\u529F</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"modalBody flexCenterH\">\n                        <p>\u60A8\u5DF2\u6210\u529F\u9886\u53D6" + game_name + "\u7684\u793C\u5305</p>\n                        <p class=\"describe\">CDKEY:" + describe + "</p>\n                    </div>\n                </div>\n                <div class=\"modal-footer flexCenterW\">\n                    <p data-dismiss=\"modal\">\u6211\u77E5\u9053\u4E86</p>\n                </div>\n            </div>\n        </div>\n    </div>\n    ";
        return modalHTML;
    } else {
        // 下载modal
        var _params2 = _slicedToArray(params, 5),
            logoList = _params2[0],
            nameHTML = _params2[1],
            _describe = _params2[2],
            android_download_url = _params2[3],
            ios_download_url = _params2[4];

        var _modalHTML = "\n        <div class=\"modal fade\" id=\"downModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n            <div class=\"modal-dialog white_content\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h4 class=\"modal-title\" id=\"myModalLabel\" style=\"text-align: center\">\u4E0B\u8F7D\u6E38\u620F</h4>\n                    </div>\n                    <div class=\"modal-body\">\n                        <div class=\"modalBody\">\n                            <div class=\"top\">\n                                <div class=\"left_img\">\n                                    <img src=" + logoList + " style=\"width: 96%;\" class=\"gameImg\" />\n                                </div>\n                                <div class=\"right_info\">\n                                    <p class=\"name\">" + nameHTML + "</p>\n                                    <p style=\"line-height: 1.1rem;\">\n                                        <img src=\"images/angle.svg\" />\n                                        <img src=\"images/angle.svg\" />\n                                        <img src=\"images/angle.svg\" />\n                                        <img src=\"images/angle.svg\" />\n                                        <img src=\"images/angle.svg\" />\n                                    </p>\n                                    <p class=\"describe\">" + _describe + "</p>\n                                </div>\n                            </div>\n                            <div class=\"bottom\">\n                                <a hrf=" + android_download_url + " class=\"android\"><span><img src=\"images/android.svg\"></span>\u5B89\u5353\u7248\u4E0B\u8F7D</a>\n                                <a hrf=" + ios_download_url + " class=\"iOS\"><span><img src=\"images/iOS.svg\"></span>\u82F9\u679C\u7248\u4E0B\u8F7D</a>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"modal-footer flexCenterW\">\n                        <p data-dismiss=\"modal\">\u5173\u95ED</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ";
        return _modalHTML;
    }
}
