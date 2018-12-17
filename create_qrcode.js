var isOpera = Object.prototype.toString.call(window.opera) === '[object Opera]',

guiValuePairs = [
    ["size", "px"],
    ["minversion", ""],
    ["quiet", " modules"],
    ["radius", "%"],
    ["msize", "%"],
    ["mposx", "%"],
    ["mposy", "%"]
],

updateGui = function () {

    $.each(guiValuePairs, function (idx, pair) {

        var $label = $('label[for="' + pair[0] + '"]');

        $label.text($label.text().replace(/:.*/, ': ' + $('#' + pair[0]).val() + pair[1]));
    });
},

updateQrCode = function (obj,code,_mSize) {
    var options = {
            render: 'canvas', 
            ecLevel: 'L',
            minVersion: 6,
            fill: '#333333',
            background: '#ffffff',
            text: code,
            size: 380,
            radius:0.5,
            quiet: 1,
            mode: 4,
            mSize:_mSize?_mSize:0,
            mPosX: 0.5,
            mPosY: 0.5,
            label: '',
            fontname: 'Ubuntu',
            fontcolor:'#ff9818',
            image: top.window.$("#img-buffer")[0]
        };
    obj.empty().qrcode(options);
},

updateCode = function (obj,code,_mSize) {
    updateGui();
    updateQrCode(obj,code,_mSize);
},

onImageInput = function () {

    var input = $("#image")[0];

    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (event) {
            top.window.$("#img-buffer").attr("src", event.target.result);
            $("#mode").val("4");
            setTimeout(update, 250);
        };
        reader.readAsDataURL(input.files[0]);
    }
},
dataURLtoBlob = function(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
},
download = function (event) {
    var data = $("#container canvas")[0].toDataURL('image/png');
    $("#download").attr("href", data);
};