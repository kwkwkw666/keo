if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
};
(function() {
  const jsExpand = document.querySelector('.js-expand');

  if (jsExpand) {
    jsExpand.addEventListener('click', function (event) {
      const collapsibleElem = document.querySelector('.collapsible-text');

      collapsibleElem.classList.toggle("-expanded");

      const text_height = collapsibleElem.scrollHeight;

      if (collapsibleElem.style.maxHeight === text_height + 'px')
        collapsibleElem.style.maxHeight = '';
      else
        collapsibleElem.style.maxHeight = text_height + 'px';

      const elem = event.target;
      const current_text = elem.innerHTML;

      elem.innerHTML = elem.dataset.expandedText;
      elem.dataset.expandedText = current_text;

      elem.blur();
    });
  }
}).call(this);
(function() {
  const followButtons = document.querySelectorAll('.js-follow');

  function followSuccessLoggedIn() {
    followButtons.forEach(function (button) {
      button.classList.toggle('button-outline');
      button.querySelector('.not-following').classList.toggle('show');
      button.querySelector('.is-following').classList.toggle('show');
    });
    window.location.reload();
  }

  function followErrorLoggedIn(data) {
    console.log('ERROR Logged in', data);
  }

  function followSuccesNewUser(data) {
    const checkInbox = document.querySelector('.modal.check-inbox');
    const createAccount = document.querySelector('.modal.create-account')
    createAccount.classList.remove('show-modal');
    createAccount.setAttribute('aria-hidden', 'true');

    var modalBody = checkInbox.querySelector('.modal__main p');
    modalBody.innerHTML = modalBody.innerHTML.replace('__email__', data.email);
    checkInbox.classList.add('show-modal');
    checkInbox.setAttribute('aria-hidden', 'false');
    document.querySelector('.modal.create-account form').reset();
  }

  function followErrorNewUser(data) {
    const errors = data.errors;

    if (errors.email) {
      document.querySelector('.js-email-error').innerHTML = errors.email.join(' ');
      document.querySelector('#follow_email').classList.add('has-error');
    }

    if (errors.accept_terms) {
      document.querySelector('.js-terms-error').innerHTML = errors.accept_terms.join(' ');
      document.querySelector('#accept_terms').classList.add('has-error');
    }

    if (errors.base) {
      document.querySelector('.js-base-error').innerHTML = errors.base.join(' ');
    }
  }

  function followFetch(url, callbackObj, method, body) {
    fetch(url, {
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      method: method,
      body: body
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.errors && Object.keys(data.errors).length > 0) {
        return callbackObj.error(data);
      }

      return callbackObj.success(data);
    }).catch(function (error) {
      return callbackObj.error(error);
    });
  }

  function handleFollowOverlay() {
    document.querySelector('body').style.overflow = null;
    document.querySelector('.modal.create-account form').reset();
    document.querySelector('.js-email-error').innerHTML = '';
    document.querySelector('.js-terms-error').innerHTML = '';
    document.querySelector('.js-base-error').innerHTML = '';
    document.querySelector('#follow_newsroom_button').disabled = true;

    var modalBody = document.querySelector('.modal.check-inbox .modal__main p');
    modalBody.innerHTML = modalBody.innerHTML.replace(/\S+@\S+\w{2,}/, '__email__');

    this.classList.remove('show-modal');
    const openModals = this.querySelectorAll('.show-modal');

    if (openModals) {
      openModals.forEach(function(openModal) {
        openModal.classList.remove('show-modal');
        document.querySelector('.modal.create-account').setAttribute('aria-hidden', 'true');
        document.querySelector('.modal.check-inbox').setAttribute('aria-hidden', 'true');
      });
    }
  }

  function addFollowCloseModalEvent(callback) {
    const modalFollowClose = document.querySelectorAll('.modal .modal__close');

    for (var i = 0; i < modalFollowClose.length; i++) {
      modalFollowClose[i].addEventListener('click', function (event) {
        event.preventDefault();
        //document.querySelector('.modal.create-account').setAttribute('aria-hidden', 'true');
        callback();
      });
    }
  }

  function addFollowCheckInboxModalEvent(callback) {
    const modalCheckInboxButton = document.querySelector('.modal.check-inbox .button');

    modalCheckInboxButton.addEventListener('click', function (event) {
      event.preventDefault();
      var modalBody = document.querySelector('.modal.check-inbox .modal__main p');
      modalBody.innerHTML = modalBody.innerHTML.replace(/\S+@\S+\w{2,}/, '__email__');
      callback();
    });
  }

  const modalFollowOverlay = document.querySelector('.follow-modals');
  const modalFollowOverlayBackdrop = document.querySelector('.follow-modals .modal__backdrop');

  if (modalFollowOverlay && modalFollowOverlayBackdrop) {

    modalFollowOverlayBackdrop.addEventListener('click', handleFollowOverlay.bind(modalFollowOverlay));

    // Modal close events START
    addFollowCloseModalEvent(handleFollowOverlay.bind(modalFollowOverlay));
    // Modal close events END

    // Check inbox modal events START
    addFollowCheckInboxModalEvent(handleFollowOverlay.bind(modalFollowOverlay));
    // Check inbox modal events END

    // Email Input field
    const modalFollowEmailInput = document.querySelector('#follow_email');
    // Accept Terms Field
    const modalFollowTermsCheckbox = document.querySelector('#accept_terms');
    // Follow Button on Modal create account
    const modalCreateFollowButton = document.querySelector('#follow_newsroom_button');

    if (modalFollowEmailInput && modalFollowTermsCheckbox) {
      modalFollowEmailInput.addEventListener('change', function () {
        modalCreateFollowButton.disabled = !(modalFollowEmailInput.value !== '' && modalFollowTermsCheckbox.checked);
        document.querySelector('#follow_email').classList.remove('has-error');
      });

      modalFollowTermsCheckbox.addEventListener('change', function () {
        modalCreateFollowButton.disabled = !(modalFollowEmailInput.value !== '' && modalFollowTermsCheckbox.checked);
        document.querySelector('#accept_terms').classList.remove('has-error');
      });
    }

    const modalCreateAccount = document.querySelector('.modal.create-account');
    const modalCreateFollowForm = modalCreateAccount.querySelector('form');

    modalCreateFollowForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const form = this;

      if (modalFollowEmailInput.value !== '' && modalFollowTermsCheckbox.checked) {
        followFetch(form.action, {success: followSuccesNewUser, error: followErrorNewUser}, 'POST', new FormData(form));
      }
    })
  }

  if (followButtons.length > 0) {
    for (var j = 0; j < followButtons.length; j++) {
      followButtons[j].addEventListener('click', function (event) {
        event.preventDefault();
        const followButton = this;

        if (followButton.classList.contains('js-follow-logged-in')) {
          followFetch(followButton.dataset.toggleUrl,  {success: followSuccessLoggedIn, error: followErrorLoggedIn}, 'GET', null);
        } else {
          document.querySelector('body').style.overflow = "hidden";
          document.querySelector('.follow-modals').classList.add('show-modal');
          document.querySelector('.modal__backdrop').classList.add('show-modal');
          const firstModal = document.querySelector('.modal.create-account')
          firstModal.classList.add('show-modal');
          firstModal.setAttribute('aria-hidden', 'false');
        }
      });
    }
  }
}).call(this);
(function() {
  const infinite_section = document.querySelector('.js-infinite-pagination');

  function renderResult(result, addListeners) {
    const pagination_wrapper = document.querySelector('.infinite-pagination-wrapper');
    const pagination_item = document.querySelector('.infinite-pagination__item');
    pagination_wrapper.removeChild(pagination_item);
    const materialGrid = infinite_section.querySelector('.js-material-grid');

    materialGrid.insertAdjacentHTML('beforeend', result);

    const new_pagination_item = document.querySelector('.infinite-pagination__item');

    if (new_pagination_item) {
      pagination_wrapper.appendChild(new_pagination_item);

      document.querySelector('.js-material-grid .infinite-pagination-wrapper').remove();
    }

    // new browsers can do: window.dispatchEvent(new Event('resize'));
    // but for ie11 we need this old implementation

    var resizeEvent = window.document.createEvent('UIEvents');
    resizeEvent.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(resizeEvent);

    addListeners();
    return true;
  }

  function loadData(nextPageUrl, addListeners) {
    infinite_section.querySelector('.infinite-pagination__item__loader').classList.remove('is-hidden');

    if (window.fetch) {
      fetch(nextPageUrl, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(function (response) {
        return response.text();
      }).then(function (data) {
        infinite_section.querySelector('.infinite-pagination__item__loader').classList.add('is-hidden');
        renderResult(data, addListeners);
      });
    } else {
      // workaroud for ie11 or browser not supporting fetch
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          renderResult(this.responseText, addListeners);
        }
      };
      xhttp.open("GET", nextPageUrl, true);
      xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhttp.send();
    }
  }

  if (infinite_section) {
    var nextPageButton = document.querySelector('.infinite-pagination__item__next-button');

    if (nextPageButton) {
      var nextPageUrl = nextPageButton.href;

      const removeListeners = function() {
        nextPageButton.removeEventListener('click', buttonListener);
      }

      const addListeners = function() {
        nextPageButton = document.querySelector('.infinite-pagination__item__next-button');
        if (nextPageButton) {
          // suffix with &infinite-pagination to ensure separate cache for noscript version
          nextPageUrl = nextPageButton.href + '&infinite-pagination';
          nextPageButton.addEventListener('click', buttonListener);
        }
      }

      const buttonListener = function(event) {
        event.preventDefault();
        nextPageButton.parentNode.removeChild(nextPageButton);
        loadData(nextPageUrl, addListeners);
        removeListeners();
      }

      if (nextPageUrl) {
        addListeners();
      }
    }
  }
}).call(this);
(function() {
  const navigationToggle = document.getElementById('navigation-toggle');

  if (navigationToggle) {
    navigationToggle.addEventListener('change', function (event) {
      if (event.target.checked) {
        document.querySelector('body').style.overflow = "hidden";
      } else {
        document.querySelector('body').style.overflow = null;
      }
    });
  }
}).call(this);
(function() {
  const dropdowns = document.querySelectorAll('.select__toggle');

  if (dropdowns.length > 0) {
    document.querySelector('body').addEventListener('click', function(event) {
      for (var i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].checked && event.target !== dropdowns[i])
          dropdowns[i].checked = false;
      }
    })
  }
}).call(this);
(function() {
  const listElement = document.querySelector('.js-select-taglist');
  if (!listElement) {
    return;
  }

  const urlBase = listElement.dataset.tagListEndpoint;
  const scrollOffset = 400; // load more data when scrolling is this close the element bottom
  const debounceWaitTime = 1000; // 1 seconds wait until callback is called again
  const activeTagId = listElement.dataset.tagListActiveTagId;
  let page = 0;
  let fullyLoaded = false;

  function debounce(callback) {
    let withinInterval = false;

    return function() {
      const args = arguments;
      const context = this;

      if (!withinInterval) {
        callback.call(context, args);
        withinInterval = true;
        setTimeout(() => (withinInterval = false), debounceWaitTime);
      }
    };
  };

  function loadData(page) {
    let nextPageUrl = urlBase + '?page=' + page + '&namespace=' + listElement.dataset.tagListNamespace;
    if (activeTagId) {
      nextPageUrl += '&active_tag_id=' + activeTagId;
    }

    return fetch(nextPageUrl).then(function (response) {
      if (response.status === 204){
        fullyLoaded = true;
        listElement.removeEventListener('scroll', debouncedHandleScroll)

        if (page === 1) {
          listElement.parentNode.classList.add('is-disabled');
        }
      } else if (response.ok) {
        return response.text();
      }
    }).then(function (contents) {
      if (contents) {
        listElement.insertAdjacentHTML('beforeend', contents);
      }
    });
  }

  function handleScroll() {
    if(listElement.scrollTop + scrollOffset > (listElement.scrollHeight - listElement.offsetHeight)) {
      page = page + 1;

      if(!fullyLoaded){
        listElement.removeEventListener('scroll', debouncedHandleScroll)

        loadData(page)
          .then(function() {
            listElement.addEventListener('scroll', debouncedHandleScroll)
          });
      }
    }
  }

  function debouncedHandleScroll() {
    return debounce(handleScroll.call(this));
  }

  handleScroll();
}).call(this);







