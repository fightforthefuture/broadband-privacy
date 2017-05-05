/**
 *
 * @source: https://github.com/fightforthefuture
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) Fight for the Future
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

/**
 *  util : random grab bag functions
 */

var $c  = document.createElement.bind(document);
var $el = document.getElementById.bind(document);

if (!util) var util = {};

util.getReferrerTag = function() {
  var ref = document.referrer;
  if (ref.indexOf('facebook.com') !== -1)
    return 'from-facebook';
  else if (ref.indexOf('twitter.com') !== -1 || ref.indexOf('t.co') !== -1)
    return 'from-twitter';
  else if (ref.indexOf('reddit.com') !== -1)
    return 'from-reddit';
  else if (window.location.href.indexOf('_src=ga') !== -1)
    return 'from-google-adwords';
  else if (ref.indexOf('google.com') !== -1)
    return 'from-google';
};

util.parseQueryString = function () {
  var
    i,
    pairs,
    queryObject = {},
    queryString = window.location.search;

  if (queryString[0] === '?') {
    queryString = queryString.substr(1);
  }

  pairs = queryString.split('&');
  i = pairs.length;

  while (i--) {
    queryObject[pairs[i].split('=')[0]] = pairs[i].split('=')[1];
  }

  return queryObject;
};


(function (doc, win) {
  "use strict";

  var
    actionNetworkForm = doc.getElementById('petition-form') || doc.createElement('div');

  function preSubmit() {

    window.hideForm();

    actionNetworkForm.commit.setAttribute('disabled', true);
  }

  function compilePayloadPetition() {
    /**
     * Compiles FormData to send off to mothership queue
     *
     * @return {FormData} formData
     * */

    var
      tags = JSON.parse(actionNetworkForm['signature[tag_list]'].value),
      formData = new FormData();

    formData.append('guard', '');
    formData.append('hp_enabled', true);
    formData.append('org', 'fftf');
    formData.append('tag', actionNetworkForm.dataset.mothershipTag);
    formData.append('an_tags', JSON.stringify(tags));
    formData.append('an_url', win.location.href);
    formData.append('an_petition', actionNetworkForm.action.replace(/\/signatures\/?/, ''));
    formData.append('member[first_name]', actionNetworkForm['signature[first_name]'].value);
    formData.append('member[email]', actionNetworkForm['signature[email]'].value);
    formData.append('member[postcode]', actionNetworkForm['signature[zip_code]'].value);
    formData.append('member[country]', 'US');

    if (actionNetworkForm['member[phone_number]'] && actionNetworkForm['member[phone_number]'].value !== '') {
      formData.append('member[phone_number]', actionNetworkForm['member[phone_number]'].value);
    }

    return formData;
  }

  function confirmSMSSubmission() {
    actionNetworkForm.reset();
    doc.getElementById('form-phone_number').setAttribute('value', 'All set!');
    doc.getElementById('form-phone_number').setAttribute('disabled', true);
    doc.getElementById('submit-phone').setAttribute('disabled', true);
  }

  function submitForm(event) {
    /**
     * Submits the form to ActionNetwork or Mothership-Queue
     *
     * @param {event} event - Form submission event
     * */

    event.preventDefault();

    var
      submission = new XMLHttpRequest();

    if (actionNetworkForm['signature[zip_code]'].value === '') {
      // Since iOS Safari doesn’t do its goddamn job.
      return;
    }

    if (!actionNetworkForm['member[phone_number]'] || actionNetworkForm['member[phone_number]'].value === '') {
      preSubmit();
    }

    function handleHelperError(e) {
      /**
       * Figures out what to say at just the right moment
       * @param {event|XMLHttpRequest} e - Might be an event, might be a response
       * from an XMLHttpRequest
       * */

      win.modals.dismissModal();

      var
        error = e || {},
        errorMessageContainer = doc.createElement('div'),
        errorMessage = doc.createElement('h2'),
        errorMessageInfo = doc.createElement('p');

      errorMessage.textContent = 'Something went wrong';

      if (error.type) {
        errorMessageInfo.textContent = 'There seems to be a problem somewhere in between your computer and our server. Might not be a bad idea to give it another try.';
      } else if (error.status) {
        errorMessageInfo.textContent = '(the nerdy info is that the server returned a status of "' + error.status + '" and said "' + error.statusText + '".)'
      } else {
        errorMessageInfo.textContent = 'this seems to be a weird error. the nerds have been alerted.';
      }

      errorMessageContainer.appendChild(errorMessage);
      errorMessageContainer.appendChild(errorMessageInfo);

      actionNetworkForm.commit.removeAttribute('disabled');

      win.modals.generateModal({contents: errorMessageContainer});
    }

    function loadHelperResponse() {
      /**
       * Does the thing after we get a response from the API server
       * */

      if (submission.status >= 200 && submission.status < 400) {
        if (actionNetworkForm['member[phone_number]'] && actionNetworkForm['member[phone_number]'].value !== '') {
          confirmSMSSubmission();
        } else {
          console.log(submission);
        }
      } else {
        handleHelperError(submission);
      }
    }

    submission.open('POST', 'https://queue.fightforthefuture.org/action', true);
    submission.addEventListener('error', handleHelperError);
    submission.addEventListener('load', loadHelperResponse);
    submission.send(compilePayloadPetition());
  }

  actionNetworkForm.addEventListener('submit', submitForm);

})(document, window);

(function (doc, win) {
  "use strict";

  win.callbacks = win.callbacks || {};
  win.callbacks.petitions = {
     preSubmit: function() {
      /**
       * Fires up the loading modal and disables the form
       * @return {object} - modal with spinner
       * */
      doc.querySelector('[type="submit"]').setAttribute('disabled', true); // JL DEBUG ~ disable for testing
    },

    loadSignatureResponse: function(e) {
      /**
       * Does the thing after we get a response from the API server
       * */

      var xhr = e.target;

      if (xhr.status >= 200 && xhr.status < 400) {

        hideForm()

      } else {
        win.callbacks.petitions.handleSigningError(xhr);
      }
    },

    handleSigningError: function(e) {
      /**
       * Figures out what to say at just the right moment
       * @param {event|XMLHttpRequest} e - Might be an event, might be a response
       * from an XMLHttpRequest
       * */


      doc.querySelector('[type="submit"]').removeAttribute('disabled');

      alert('AN ERROR OCCURRED DURING SUBMISSION :(\n\nPlease contact team@fightforthefuture.org');
    }
  }

})(document, window);

var $c  = document.createElement.bind(document);

function googlePlus() {
  var url = window.location.protocol + '//' + window.location.host;
  window.open('https://plus.google.com/share?url='+url, 'share_gl', 'width=500, height=300, toolbar=no, status=no, menubar=no');
}



(function (doc, win) {
  "use strict";

  function triggerComponents() {
    win.components = win.components || {};
    var
      i = 0,
      components = doc.getElementsByTagName('body')[0].dataset.components;

    if (components !== undefined) {
      components = components.split(' ');
      i = components.length;

      while (i--) {
        if (components[i] !== '' && win.components[components[i]] !== undefined) {
          win.components[components[i]](doc, win);
        }
      }
    }
  }

  triggerComponents();


var gl = document.querySelectorAll('button.google');
    for (var i = 0; i < gl.length; i++) {
        gl[i].addEventListener('click', function(e) {
            e.preventDefault();
            googlePlus();
        }, false);
    }


  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status == 200)
    {
      var response = JSON.parse(xhr.response);
      if (response.country && response.country.iso_code) {
        var country = response.country.iso_code;
      }
    }
  };
  xhr.open("get", 'https://fftf-geocoder.herokuapp.com', true);
  xhr.send();

  if (window.location.href.indexOf('optout') !== -1)
    document.getElementById('opt-in').checked = false;



  var onDomContentLoaded =function() {
    var fb = document.querySelectorAll('a.share');
    for (var i = 0; i < fb.length; i++)
      fb[i].addEventListener('click', function(e) {
        e.preventDefault();
        FreeProgress.share();
      }, false);

    var tw = document.querySelectorAll('a.tweet');
    for (var i = 0; i < tw.length; i++)
      tw[i].addEventListener('click', function(e) {
        e.preventDefault();
        FreeProgress.tweet();
      }, false);
  };

  var isReady = document.readyState;

  if (isReady == "complete" || isReady == "loaded" || isReady == "interactive")
    onDomContentLoaded();
  else if (document.addEventListener)
    document.addEventListener('DOMContentLoaded', onDomContentLoaded, false);

  window.hideForm = function() {
    document.querySelector('dl:first-of-type').style.opacity = 0;
    setTimeout(function() {
      document.querySelector('dl:first-of-type').style.display = 'none';
      document.getElementById('confirm-modal').style.display = 'block';
      setTimeout(function() {
        document.getElementById('confirm-modal').style.opacity = 1;
      }, 10);
    }, 400);
  }

})(document, window);
