(function ($, window)
{
  // register namespace
  $.extend(true, window, {
    "StatusApp": StatusApp
    }
  );

  /**
   * The main Status application.
   */
  function StatusApp(_options)
  {
    const VERSION_PARAM = "?version=" + new Date().getTime();
    const XML_CONTENT_TYPE = 'application/xml; charset=utf-8';
    const TEXT_CONTENT_TYPE = 'text/plain; charset=utf-8';
    const STANDARD_ID = '[standardID="ivo://ivoa.net/std/VOSI#availability"]';
    const RESOURCE_CAPS_URL = "http://demo.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/reg/resource-caps";
    const CAPS_SERVERS = ["demo.canfar.phys.uvic.ca", "demo.cadc-ccda.hia-iha.nrc-cnrc.gc.ca"];
    const IMAGES_DIR = _options.images;
    var serviceKVPs = {};

    var _createNode = function (tagName, className, data) {
        var result = document.createElement(tagName);

        result.appendChild(document.createTextNode("" + data));
        if (className != "")
          result.className = className;
          if (tagName == "td") {
            var loadID = "load-" + jQuery.trim(data);
            $(result).append('<img id="' + loadID + '" src="' + IMAGES_DIR + 'progress_small.gif" />');
          }

        return result;
    };

    var _query = function (queryURL, ct, successFunc, rowNode)
    {
      jQuery.ajax({
        url: queryURL+VERSION_PARAM,
        type: "GET",
        contentType: ct,
        jsonp: false,
        success: function(resultXML) {
          successFunc(resultXML, rowNode);
        },
        error : function(jqXHR, textStatus, errorThrown) {
          var serviceName = $(rowNode).attr('class');
          var isAvailableNode = _createNode("td", "", textStatus);
          var noteNode = _createNode("td", "", errorThrown);
          $("." + serviceName + "-available").text(textStatus);
          $("." + serviceName + "-message").text(errorThrown);
          $("." + serviceName + "-time").text(new Date().toUTCString());
          $('#load-' + serviceName).hide();
        },
        timeout: 30000, 
      });
    };

    var _processAvailabilityStatus = function(statusXML, rowNode)
    {
      var serviceName = $(rowNode).attr('class');
      var isAvailable = $(statusXML).find('available').text();
      if (isAvailable=="")    // =="" on mozilla browser
        isAvailable = $(statusXML).find('vosi\\:available').text();

      var note = $(statusXML).find('note').text();
      if (note=="")    // =="" on mozilla browser
        note = $(statusXML).find('vosi\\:note').text();

      $("." + serviceName + "-available").text(isAvailable);
      $("." + serviceName + "-message").text(note);
      $("." + serviceName + "-time").text(new Date().toUTCString());
      $('#load-' + serviceName).hide();
    };

    var _processServiceCapabilities = function(serviceCapabilities, rowNode)
    {
      var serviceName = $(rowNode).attr('class');
      var element = $(serviceCapabilities).find(STANDARD_ID);
      var accessURL = $(element).find('accessURL').text();
      $('#load-' + serviceName).show();
      if (accessURL) {
        _query(accessURL, XML_CONTENT_TYPE, _processAvailabilityStatus, rowNode);
      }
      else {
        $("." + serviceName + "-available").text("false");
        $("." + serviceName + "-message").text("availability URL is not defined");
        $("." + serviceName + "-time").text(new Date().toUTCString());
        $('#load-' + serviceName).hide();
      }
    };

    var _refreshStatus = function ()
    {
      $.each(serviceKVPs, function(url, rowNode) {
        _query(url, XML_CONTENT_TYPE, _processServiceCapabilities, rowNode);
      });
      setTimeout(_refreshStatus, 180000);
    };

    var _extractServiceName = function(serviceURL)
    {
        var head = serviceURL.substring(0, serviceURL.lastIndexOf("/"));
        var tail = head.substring(head.lastIndexOf("/") + 1);
        return tail; 
    }
   
    var _createEmptyNode = function(serviceName)
    {
      var rowNode = _createNode("tr", serviceName, "");
      var paddedServiceName = serviceName + "          ";
      rowNode.appendChild(_createNode("td", serviceName + "-service", paddedServiceName));
      rowNode.appendChild(_createNode("td", serviceName + "-available", ""));
      rowNode.appendChild(_createNode("td", serviceName + "-message", ""));
      rowNode.appendChild(_createNode("td", serviceName + "-time", ""));
      return rowNode;
    }

    var _processCapabilities = function(serviceCapabilities, tbodyNode)
    {
      var refreshed = false;
      $.each(serviceCapabilities.split("\n"), function(index, line) {
        if (line[0] && line[0] != "#") {
          var urls = line.split("=");
          for(var capsServer of CAPS_SERVERS) {
            if (urls[1].indexOf(capsServer) != -1) {
              var rowNode = _createEmptyNode(_extractServiceName(urls[1]));
              serviceKVPs[urls[1]] = rowNode;
              tbodyNode.appendChild(rowNode);
              if (refreshed===false) {
                setTimeout(_refreshStatus, 10);
                refreshed = true;
              }
              break;
            }
          }
        }
      });
    };

    this.printStatus = function ()
    {
      var tbodyNode = _createNode("tbody", "tbody", "");
      _query(RESOURCE_CAPS_URL, TEXT_CONTENT_TYPE, _processCapabilities, tbodyNode);
      $("#status").append(tbodyNode);
    };
  }
})(jQuery, window);

