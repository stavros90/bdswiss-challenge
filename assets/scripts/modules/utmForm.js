var UtmCookie, UtmForm, _uf;
UtmCookie = class {
    constructor(options = {}) {
        this._cookieNamePrefix = "_uc_", this._domain = options.domain, this._sessionLength = options.sessionLength || 1, this._cookieExpiryDays = options.cookieExpiryDays || 365, this._additionalParams = options.additionalParams || [], this._utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"], this.writeInitialReferrer(), this.writeLastReferrer(), this.writeInitialLandingPageUrl(), this.setCurrentSession(), this.additionalParamsPresentInUrl() && this.writeAdditionalParams(), this.utmPresentInUrl() && this.writeUtmCookieFromParams()
    }
    createCookie(name, value, days, path, domain, secure) {
        var cookieDomain, cookieExpire, cookiePath, cookieSecure, date, expireDate;
        expireDate = null, days && ((date = new Date).setTime(date.getTime() + 24 * days * 60 * 60 * 1e3), expireDate = date), cookieExpire = null != expireDate ? "; expires=" + expireDate.toGMTString() : "", cookiePath = null != path ? "; path=" + path : "; path=/", cookieDomain = null != domain ? "; domain=" + domain : "", cookieSecure = null != secure ? "; secure" : "", document.cookie = this._cookieNamePrefix + name + "=" + escape(value) + cookieExpire + cookiePath + cookieDomain + cookieSecure
    }
    readCookie(name) {
        var c, ca, i, nameEQ;
        for (nameEQ = this._cookieNamePrefix + name + "=", ca = document.cookie.split(";"), i = 0; i < ca.length;) {
            for (c = ca[i];
                " " === c.charAt(0);) c = c.substring(1, c.length);
            if (0 === c.indexOf(nameEQ)) return c.substring(nameEQ.length, c.length);
            i++
        }
        return null
    }
    eraseCookie(name) {
        this.createCookie(name, "", -1, null, this._domain)
    }
    getParameterByName(name) {
        var results;
        return name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), (results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(window.location.search)) ? decodeURIComponent(results[1].replace(/\+/g, " ")) : ""
    }
    additionalParamsPresentInUrl() {
        var j, len, param, ref;
        for (j = 0, len = (ref = this._additionalParams).length; j < len; j++)
            if (param = ref[j], this.getParameterByName(param)) return !0;
        return !1
    }
    utmPresentInUrl() {
        var j, len, param, ref;
        for (j = 0, len = (ref = this._utmParams).length; j < len; j++)
            if (param = ref[j], this.getParameterByName(param)) return !0;
        return !1
    }
    writeCookie(name, value) {
        this.createCookie(name, value, this._cookieExpiryDays, null, this._domain)
    }
    writeAdditionalParams() {
        var j, len, param, ref, value;
        for (j = 0, len = (ref = this._additionalParams).length; j < len; j++) param = ref[j], value = this.getParameterByName(param), this.writeCookie(param, value)
    }
    writeUtmCookieFromParams() {
        var j, len, param, ref, value;
        for (j = 0, len = (ref = this._utmParams).length; j < len; j++) param = ref[j], value = this.getParameterByName(param), this.writeCookie(param, value)
    }
    writeCookieOnce(name, value) {
        this.readCookie(name) || this.writeCookie(name, value)
    }
    _sameDomainReferrer(referrer) {
        var hostname;
        return hostname = document.location.hostname, referrer.indexOf(this._domain) > -1 || referrer.indexOf(hostname) > -1
    }
    _isInvalidReferrer(referrer) {
        return "" === referrer || void 0 === referrer
    }
    writeInitialReferrer() {
        var value;
        value = document.referrer, this._isInvalidReferrer(value) && (value = "direct"), this.writeCookieOnce("referrer", value)
    }
    writeLastReferrer() {
        var value;
        value = document.referrer, this._sameDomainReferrer(value) || (this._isInvalidReferrer(value) && (value = "direct"), this.writeCookie("last_referrer", value))
    }
    writeInitialLandingPageUrl() {
        var value;
        (value = this.cleanUrl()) && this.writeCookieOnce("initial_landing_page", value)
    }
    initialReferrer() {
        return this.readCookie("referrer")
    }
    lastReferrer() {
        return this.readCookie("last_referrer")
    }
    initialLandingPageUrl() {
        return this.readCookie("initial_landing_page")
    }
    incrementVisitCount() {
        var existingValue, newValue;
        existingValue = parseInt(this.readCookie("visits"), 10), newValue = 1, newValue = isNaN(existingValue) ? 1 : existingValue + 1, this.writeCookie("visits", newValue)
    }
    visits() {
        return this.readCookie("visits")
    }
    setCurrentSession() {
        this.readCookie("current_session") || (this.createCookie("current_session", "true", this._sessionLength / 24, null, this._domain), this.incrementVisitCount())
    }
    cleanUrl() {
        var cleanSearch;
        return cleanSearch = window.location.search.replace(/utm_[^&]+&?/g, "").replace(/&$/, "").replace(/^\?$/, ""), window.location.origin + window.location.pathname + cleanSearch + window.location.hash
    }
}, UtmForm = class {
    constructor(options = {}) {
        this._utmParamsMap = {}, this._utmParamsMap.utm_source = options.utm_source_field || "USOURCE", this._utmParamsMap.utm_medium = options.utm_medium_field || "UMEDIUM", this._utmParamsMap.utm_campaign = options.utm_campaign_field || "UCAMPAIGN", this._utmParamsMap.utm_content = options.utm_content_field || "UCONTENT", this._utmParamsMap.utm_term = options.utm_term_field || "UTERM", this._additionalParamsMap = options.additional_params_map || {}, this._initialReferrerField = options.initial_referrer_field || "IREFERRER", this._lastReferrerField = options.last_referrer_field || "LREFERRER", this._initialLandingPageField = options.initial_landing_page_field || "ILANDPAGE", this._visitsField = options.visits_field || "VISITS", this._addToForm = options.add_to_form || "all", this._formQuerySelector = options.form_query_selector || "form", this._decodeURIs = options.decode_uris || !1, this.utmCookie = new UtmCookie({
            domain: options.domain,
            sessionLength: options.sessionLength,
            cookieExpiryDays: options.cookieExpiryDays,
            additionalParams: Object.getOwnPropertyNames(this._additionalParamsMap)
        }), this.addAllFields()
    }
    addAllFields() {
        var allForms, i, len;
        for (allForms = document.querySelectorAll(this._formQuerySelector), len = "none" === this._addToForm ? 0 : "first" === this._addToForm ? Math.min(1, allForms.length) : allForms.length, i = 0; i < len;) this.addAllFieldsToForm(allForms[i]), i++
    }
    addAllFieldsToForm(form) {
        var fieldName, param, ref, ref1;
        if (form && !form._utm_tagged) {
            for (param in form._utm_tagged = !0, ref = this._utmParamsMap) fieldName = ref[param], this.addFormElem(form, fieldName, this.utmCookie.readCookie(param));
            for (param in ref1 = this._additionalParamsMap) fieldName = ref1[param], this.addFormElem(form, fieldName, this.utmCookie.readCookie(param));
            this.addFormElem(form, this._initialReferrerField, this.utmCookie.initialReferrer()), this.addFormElem(form, this._lastReferrerField, this.utmCookie.lastReferrer()), this.addFormElem(form, this._initialLandingPageField, this.utmCookie.initialLandingPageUrl()), this.addFormElem(form, this._visitsField, this.utmCookie.visits())
        }
    }
    addFormElem(form, fieldName, fieldValue) {
        this.insertAfter(this.getFieldEl(fieldName, fieldValue), form.lastChild)
    }
    getFieldEl(fieldName, fieldValue) {
        var fieldEl;
        return (fieldEl = document.createElement("input")).type = "hidden", fieldEl.name = fieldName, fieldEl.value = this._decodeURIs ? decodeURIComponent(fieldValue) : fieldValue, fieldEl
    }
    insertAfter(newNode, referenceNode) {
        return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    }
}, _uf = window._uf || {}, window.UtmForm = new UtmForm(_uf);