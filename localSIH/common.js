function ajax(type, urlApi, data, func, efunc, dataType, contentType, aSync, processData) {
    var api = "http://localhost:3001/"
    dataType = dataType || 'JSON';
    if (contentType !== false)
        contentType = contentType || 'application/json';
    if (aSync === undefined)
        aSync = true;
    if (processData === undefined)
        processData = true;

    return $.ajax({
        statusCode: {
            401: function () { }
        },
        type: type,
        url: api + urlApi,
        dataType: dataType,
        contentType: contentType,
        data: data,
        success: func,
        error: efunc
    });
}