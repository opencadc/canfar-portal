"use strict";

(function ($, window) {
  $.extend(true, window, {
    "StatusApp": StatusApp
  });

  /**
   * This application builds and displays a status table constructed from
   * queries to a list of services. Each row in the table contains
   * the status of a service.
   *
   * @param {{}} _options - values to be supplied to this application
   * @param {String} [_options.resourceCaps]    Resource caps URL
   * @param {String} [_options.images]          Images directory
   */
  function StatusApp(_options)
  {
    this.versionParam = "?version=" + new Date().getTime();
    this.xmlContentType = "application/xml; charset=utf-8";
    this.textContentType = "text/plain; charset=utf-8";
    this.standardID = "[standardID=\"ivo://ivoa.net/std/VOSI#availability\"]";
    this.servers = ["www.canfar.phys.uvic.ca", "www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca"];
    this.refreshPeriod = 180000; // 180 seconds or 3 minutes

    this.imagesDir = _options.images;
    this.resourceCapsURL = _options.resourceCaps;

    /*
     * serviceKVPs contains key/value pairs which map service capabilities URL to 
     * an html element containing a row of status info for a service, e.g.
     * key=http://canfar.phys.uvic.ca/ac/capabilities
     * value=<tr class="ac">
     *         <td class="ac-service">
     *           ac          
     *           <img id="load-ac" src="../../images/progress_small.gif"></td>
     *         <td class="ac-available">true</td>
     *         <td class="ac-message">/ac is available</td>
     *         <td class="ac-time">Fri, 18 Aug 2017 14:59:06 GMT</td>
     *       </tr>
     */
    this.serviceKVPs = {};

    /**
     * A function to create a node which represents a table cell.
     *
     * param: tagName - tag name for the html element in this node
     * param: className - class name to identify the html element in this ndoe
     * param: data - the text data associated with this html element
     * @private
     */
    this._createNode = function (tagName, className, data) {
      var result = document.createElement(tagName);

      result.appendChild(document.createTextNode("" + data));
      if (className !== "")
      {
        result.className = className;
        if (tagName === "td")
        {
          var loadID = "load-" + jQuery.trim(data);
          $(result).append("<img id=\"" + loadID + "\" src=\"" + this.imagesDir + "progress_small.gif\" />");
        }
      }

      return result;
    };

    /**
     * An ajax query to obtain capabilities and availability of a service.
     *
     * param: queryURL - the URL to be queried
     * param: ct - content type for this query
     * param: successFunc - callback function on success
     * param: rowNode - a node containing one table row of status information
     */
    this._query = function (queryURL, ct, successFunc, rowNode) {
      $.ajax({
               url: queryURL + this.versionParam,
               type: "GET",
               contentType: ct,
               jsonp: false,
               timeout: 10000
             })
          .done(function (resultXML) {
            successFunc.bind(this)(resultXML, rowNode);
          }.bind(this))
          .fail(function (jqXHR, textStatus, errorThrown) {
            var serviceName = $(rowNode).attr("class");
            $("." + serviceName + "-available").text(textStatus);
            $("." + serviceName + "-message").text(errorThrown);
            $("." + serviceName + "-time").text(new Date().toUTCString());
            $("#load-" + serviceName).hide();
          });
    };

    /**
     * A function which parses the status document and updates
     * the availability status of the service.
     *
     * param: statusXML - XML document containing service availability status
     * param: rowNode - a node containing one table row of status information
     * @private
     */
    this._processAvailabilityStatus = function (statusXML, rowNode) {
      var serviceName = $(rowNode).attr("class");
      var isAvailable = $(statusXML).find("available").text();
      if (isAvailable === "")
      {
        // ==="" on mozilla browser
        isAvailable = $(statusXML).find("vosi\\:available").text();
      }

      var note = $(statusXML).find("note").text();
      if (note === "")
      {
        // ==="" on mozilla browser
        note = $(statusXML).find("vosi\\:note").text();
      }

      $("." + serviceName + "-available").text(isAvailable);
      $("." + serviceName + "-message").text(note);
      $("." + serviceName + "-time").text(new Date().toUTCString());
      $("#load-" + serviceName).hide();
    };

    /**
     * A function which parses the capabilities document, extracts
     * the availability url for the service and queries the
     * availability of the service based on that url.
     *
     * param: serviceCapabilitiesXML - XML document containing the
     *        capabilities of a service
     * param: rowNode - a node containing one table row of status information
     * @private
     */
    this._processServiceCapabilities = function (serviceCapabilitiesXML, rowNode) {
      var serviceName = $(rowNode).attr("class");
      var element = $(serviceCapabilitiesXML).find(this.standardID);
      var accessURL = $(element).find("accessURL").text();
      $("#load-" + serviceName).show();
      if (accessURL)
      {
        this._query(accessURL, this.xmlContentType, this._processAvailabilityStatus, rowNode);
      }
      else
      {
        $("." + serviceName + "-available").text("false");
        $("." + serviceName + "-message").text("availability URL is not defined");
        $("." + serviceName + "-time").text(new Date().toUTCString());
        $("#load-" + serviceName).hide();
      }
    };

    /**
     * A function which iterates through a list of previously stored
     * services and queries the availability of each service. This function
     * schedules itself so that the availability status of each service
     * is updated periodically.
     *
     * @private
     */
    this._refreshStatus = function () {
      $.each(this.serviceKVPs, function (url, rowNode) {
        this._query(url, this.xmlContentType, this._processServiceCapabilities, rowNode);
      }.bind(this));
    };

    /**
     * A function to extract the name of a service from the resource-caps
     * document.
     *
     * param: serviceURL - a URL containing the name of the service
     *        e.g. http://canfar.phys.uvic.ca/ac/capabilities
     * @private
     */
    this._extractServiceName = function (serviceURL) {
      var head = serviceURL.substring(0, serviceURL.lastIndexOf("/"));
      return head.substring(head.lastIndexOf("/") + 1);
    };

    /**
     * A function to create a node which represents a table cell.
     * The node is used to initialize the status table and does not
     * contain any status information.
     *
     * param: serviceName - the name of a service, e.g. ac
     * @private
     */
    this._createEmptyNode = function (serviceName) {
      var rowNode = this._createNode("tr", serviceName, "");
      var paddedServiceName = serviceName + "          ";
      rowNode.appendChild(this._createNode("td", serviceName + "-service", paddedServiceName));
      rowNode.appendChild(this._createNode("td", serviceName + "-available", ""));
      rowNode.appendChild(this._createNode("td", serviceName + "-message", ""));
      rowNode.appendChild(this._createNode("td", serviceName + "-time", ""));
      return rowNode;
    };

    /**
     * A function which parses the resource-caps document, filters out
     * the capabilities url of all services relevant to CADC and
     * initializes the status table based on these urls.
     *
     * param: serviceCapabilities - contains service capabilities URLs for
     *        all supported services
     * param: tbodyNode - a node containing all rowNodes of the status
     *        table to be displayed
     * @private
     */
    this._processCapabilities = function (serviceCapabilities, tbodyNode) {
      $.each(serviceCapabilities.split("\n"), function (index, line) {
        if (line[0] && line[0] !== "#")
        {
          var urls = line.split("=");
          for (var si = 0, serverLen = this.servers.length; si < serverLen; si++)
          {
            var capsServer = this.servers[si];
            if (urls[1].indexOf(capsServer) !== -1)
            {
              var rowNode = this._createEmptyNode(this._extractServiceName(urls[1]));
              this.serviceKVPs[urls[1]] = rowNode;
              tbodyNode.appendChild(rowNode);
            }
          }

          this._refreshStatus();
        }
      }.bind(this));
    };

    /**
     * A function to obtain the resource-caps file. This is the main function
     * to be invoked from outside of this script.
     */
    this.printStatus = function () {
      var tbodyNode = this._createNode("tbody", "tbody", "");
      this._query(this.resourceCapsURL, this.textContentType, this._processCapabilities, tbodyNode);
      $("#status").append(tbodyNode);

      // Set refresh...
      setInterval(function () {
        this._refreshStatus();
      }.bind(this), this.refreshPeriod);
    };
  }

  // In case this is imported directly into a page...
  if (typeof module !== "undefined" && module.exports)
  {
    module.exports = StatusApp;
  }
})(jQuery, window);
