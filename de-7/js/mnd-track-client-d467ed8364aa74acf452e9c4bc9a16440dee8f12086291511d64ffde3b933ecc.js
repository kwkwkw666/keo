// Minimal client for mnd-track-backend built to be IE10 compatible without
// requiring polyfills. See https://github.com/mynewsdesk/mnd-track-backend
// for more documentation.

(function() {
  // IE <= 11 doesn't support Object.assign so here is a simplified version
  // expecting sources to be an Array of Object's.
  function assign(target, sources) {
    for (var i = 0; i < sources.length; i++) {
      var source = sources[i]

      for (var key in source) {
        target[key] = source[key]
      }
    }
    return target
  }

  function reasonablyUniqueIdentifier() {
    return Math.floor(Math.random() * 1000000000000).toString() + new Date().getTime().toString()
  }

  function screenSize() {
    var width = parseInt(screen.width, 10)
    var height = parseInt(screen.height, 10)

    return width.toString() + "x" + height.toString()
  }

  function windowSize() {
    var html = document.documentElement || {}
    var width = html.clientWidth
    var height = html.clientHeight

    if (window.innerWidth && width > window.innerWidth) {
      width = window.innerWidth
    }

    if (window.innerHeight && height > window.innerHeight) {
      height = window.innerHeight
    }

    return parseInt(width, 10).toString() + "x" + parseInt(height, 10).toString()
  }

  function browserData() {
    return {
      agent: window.navigator.userAgent,
      platform: window.navigator.platform,
      browser_language: window.navigator.language,
      oscpu: window.navigator.oscpu,
      screen_resolution: screenSize(),
      browser_size: windowSize()
    }
  }

  function locationData() {
    if (!document.location) return {} // shouldn't be necessary, however: https://git.io/JT5FJ

    return {
      href: document.location.href,
      host: document.location.host,
      origin: document.location.origin,
      hostname: document.location.hostname,
      pathname: document.location.pathname,
      protocol: document.location.protocol,
      query: document.location.search
    }

  }

  function referrer() {
    var referrer = null

    try {
      referrer = window.top.document.referrer
    } catch (_e) {
      if (window.parent) {
        try {
          referrer = window.parent.document.referrer
        } catch (_e2) {}
      }
    }

    return {
      referrer: referrer || window.referrer,
    }
  }

  // The settings Object must include:
  // host: String URL to the backend, eg. "https://mnd-track-backend-staging.herokuapp.com"
  // The settings Object may also include:
  // additional: Object including extra properties to track, eg. { pressroom_id: 1337 }. Note that
  // the additional properties need to be explicitly whitelisted in the backend to be accepted.
  function MndTrackClient(settings) {
    if(!localStorage.getItem("mnd_track_anonymous_id")) {
      localStorage.setItem("mnd_track_anonymous_id", reasonablyUniqueIdentifier())
    }

    this.host = settings.host
    this.additional = settings.additional || {}
    this.anonymousId = localStorage.getItem("mnd_track_anonymous_id")
    this.requestId = reasonablyUniqueIdentifier()
  }

  // Run .start() to send the initial page load request and prepare an event handler on
  // document visibilitychange to send the "unload" request (to track "time on page").
  MndTrackClient.prototype.start = function() {
    this._trackPageLoad()

    // Must use a self variable here since .bind(this) on the function would break arguments.callee
    var self = this

    var unloadHandler = function() {
      var url = self.host + "/unload"
      var encodedPayload = self._preparePayload()

      if(navigator.sendBeacon) {
        navigator.sendBeacon(url, encodedPayload)
      }
      else {
        var request = new XMLHttpRequest()
        request.open("POST", url, false) // Note: synchronous request
        request.send(encodedPayload)
      }
      window.removeEventListener("beforeunload", arguments.callee)
    }

    // Note that the "beforeunload" event doesn't actually run on iOS devices so this approach
    // for tracking "time on page" will need to change to a more sophisticated implementation
    // using the "visibilitychange" event in the future. See Ilya Grigorik's post for details:
    // https://www.igvita.com/2015/11/20/dont-lose-user-and-app-state-use-page-visibility/
    window.addEventListener("beforeunload", unloadHandler)
  }

  MndTrackClient.prototype._trackPageLoad = function() {
    var url = this.host + "/track"
    var data = assign({}, [browserData(), locationData(), referrer(), this.additional])
    var encodedPayload = this._preparePayload(data)

    var request = new XMLHttpRequest()
    request.open("POST", url)
    request.send(encodedPayload)
  }

  MndTrackClient.prototype._preparePayload = function(data) {
    data = data || {}
    data.session_id = this.anonymousId
    data.request_id = this.requestId

    var base64EncodedJSON = btoa(JSON.stringify(data))

    var formData = new FormData()
    formData.append("data", base64EncodedJSON)

    return formData
  }

  window.MndTrackClient = MndTrackClient
})();
