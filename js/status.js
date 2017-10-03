(function($, window) {
  'use strict';

  $.extend(true, window, {
    'StatusApp': StatusApp
  });

  /**
   * This application builds and displays a status table constructed from
   * queries to a list of services. Each row in the table contains
   * the status of a service.
   *
   * @param {{}} opts - values to be supplied to this application
   * @param {String} [opts.resourceCaps='http://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/reg/resource-caps']
                  Resource caps URL
   * @param {Number} [opts.refreshPeriodSeconds=180]    Seconds to wait until refresh.
   * @param {String} [opts.imagesDir='images/']          Images directory
   */
  function StatusApp(opts) {

    this.onCapabilitiesLoaded = new $.Event('opencadc:onCapabilitiesLoaded');
    this.onCapabilitiesLoadFailed = new $.Event('opencadc:onCapabilitiesLoadFailed');
    this.onAvailabilityLoaded = new $.Event('opencadc:onAvailabilityLoaded');

    var defaultOptions = {
      refreshPeriodSeconds: 180,
      imagesDir: 'images/',
      tableSelector: '#status',
      resourceCapsURL: 'http://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/reg/resource-caps'
    };

    this.tableSelector = opts.tableSelector || defaultOptions.tableSelector;

    if ($.find(this.tableSelector).length === 0)
    {
      throw new Error('Severe bug: No table to output to!');
    }

    this.versionParam = '?version=' + new Date().getTime();
    this.xmlContentType = 'application/xml; charset=utf-8';
    this.textContentType = 'text/plain; charset=utf-8';
    this.standardID = '[standardID="ivo://ivoa.net/std/VOSI#availability"]';

    this.$table = $(this.tableSelector);
    this.refreshPeriodSeconds = opts.refreshPeriodSeconds || defaultOptions.refreshPeriodSeconds;
    this.imagesDir = opts.imagesDir || defaultOptions.imagesDir;
    this.resourceCapsURL = opts.resourceCapsURL || defaultOptions.resourceCapsURL;

    /**
     * A function which parses the status document and updates
     * the availability status of the service.
     *
     * @param statusXML - XML document containing service availability status
     * @param accessURL - The URL used to get the status.
     * @param rowNode - a node containing one table row of status information
     * @private
     */
    this._processAvailabilityStatus = function(statusXML, accessURL, $rowNode) {
      var serviceName = $rowNode.data('service-name');
      var $link = $('<a></a>').attr('href', accessURL).text(serviceName);
      $rowNode.find('.' + serviceName + '-service').removeAttr('colspan').empty().append($link);

      var $statusXML = $(statusXML);
      var isAvailable = $statusXML.find('available').text() || $statusXML.find('vosi\\:available').text();

      $('<td></td>').addClass(serviceName + '-available').text(isAvailable).appendTo($rowNode);

      var note = $statusXML.find('note').text() || $statusXML.find('vosi\\:note').text();

      $('<td></td>').addClass(serviceName + '-availability').text(note).appendTo($rowNode);
      $('<td></td>').addClass(serviceName + '-time').text(new Date().toUTCString()).appendTo($rowNode);
      $rowNode.removeClass('loading');
    };

    /**
     * A function to extract the name of a service from the resource-caps
     * document.
     *
     * param: serviceURL - a URL containing the name of the service
     *        e.g. http://canfar.phys.uvic.ca/ac/capabilities
     * @private
     */
    this._extractServiceName = function(serviceURL) {
      var head = serviceURL.substring(0, serviceURL.lastIndexOf('/'));
      return head.substring(head.lastIndexOf('/') + 1);
    };

    /**
     * A function to create a node which represents a table cell.
     * The node is used to initialize the status table and does not
     * contain any status information.
     *
     * @param serviceName - the name of a service, e.g. ac
     * @returns {jQuery}
     * @private
     */
    this._createRow = function(capsServerURL) {
      var serviceName = this._extractServiceName(capsServerURL);
      var $rowNode = $('<tr class="' + serviceName + '"></tr>').appendTo(this.$table);
      $rowNode.data('service-name', serviceName);

      var $serviceNameNode = $('<td></td>').addClass(serviceName + '-service').text(serviceName).attr('colspan', 4).appendTo($rowNode);
      $rowNode.addClass('loading');

      // Cheating...
      var app = this;

      $.ajax({
        type: 'GET',
        dataType: 'xml',
        url: capsServerURL
      }).done(function(serviceCapabilitiesXML) {
        var element = $(serviceCapabilitiesXML).find(this.standardID);
        var accessURL = $(element).find('accessURL').text();

        if (accessURL) {
          $.ajax({
            type: 'GET',
            dataType: 'xml',
            url: accessURL
          }).done(function(availabilityXML) {
            app._processAvailabilityStatus(availabilityXML, accessURL, $rowNode);
          });
        } else {
          $('<td></td>').addClass(serviceName + '-available').text('false').appendTo($rowNode);
          $('<td></td>').addClass(serviceName + '-availability').text('Availability URL is not defined.').appendTo($rowNode);
          $('<td></td>').addClass(serviceName + '-time').text(new Date().toUTCString()).appendTo($rowNode);
          $rowNode.removeClass('loading');
          $serviceNameNode.removeAttr('colspan');
        }
      }.bind(this)).fail(function(jqXHR) {
        $rowNode.remove();
        throw new Error('Unable to query ' + capsServerURL + ' >> ' + jqXHR.status);
      }.bind(this));
    };

    /**
     * A function which parses the resource-caps document, filters out
     * the capabilities url of all services relevant to CADC and
     * initializes the status table based on these urls.
     *
     * @param serviceCapabilities   Contains service capabilities URLs for
     *        all supported services
     * @param tbodyNode   A node containing all rowNodes of the status
     *        table to be displayed
     * @private
     */
    this._processCapabilities = function(event, eventData) {
      $.each(eventData.results.split('\n'), function(index, line) {
        if (line[0] && (line[0] !== '#')) {
          var urls = line.split('=');
          var capsServerURL = urls[1];
          if ((capsServerURL.indexOf('canfar') > 0) || (capsServerURL.indexOf('cadc') > 0)) {
            eventData.app._createRow(capsServerURL);
          }
        }
      });
    };

    /**
     * An ajax query to obtain capabilities and availability of a service.
     *
     * param: queryURL - the URL to be queried
     * param: ct - content type for this query
     * param: successFunc - callback function on success
     * param: rowNode - a node containing one table row of status information
     */
    this._getResourceCaps = function() {
      var $t = this.$table;
      var app = this;

      $.ajax({
          url: this.resourceCapsURL + this.versionParam,
          type: 'GET',
          dataType: 'text',
          jsonp: false,
          timeout: 10000
        })
        .done(function(results) {
          $t.trigger(app.onCapabilitiesLoaded.type, {results: results, app: app});
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          $t.trigger(app.onCapabilitiesLoadFailed.type, {status: jqXHR.status, app: app});
        })
        .always(function() {
          $t.removeClass('loading');
        });
    };

    /**
     * A function to obtain the resource-caps file. This is the main function
     * to be invoked from outside of this script.
     */
    this.printStatus = function() {
      this.$table.empty();
      this._getResourceCaps();
    };

    /**
     * Start this Status Machine.
     */
    this.start = function() {
      this.$table.addClass('loading');
      this.$table.on(this.onCapabilitiesLoaded.type, this._processCapabilities);
      this.printStatus();

      // Set refresh...
      setInterval(function() {
        this.printStatus();
      }.bind(this), this.refreshPeriodSeconds * 1000); // Convert to milliseconds
    }
  }

  // In case this is imported directly into a page...
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = StatusApp;
  }
})(jQuery, window);
