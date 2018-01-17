import './index.scss';

import closest from 'dom-closest';

(function() {
  // set up background hovers to highlight related explainer item
  var legend = document.querySelector('.legend');
  var zones = document.querySelectorAll('[data-zone]');

  function disableActiveLegendItem() {
    var activeItem = document.querySelector('.legend-item.active');

    if (activeItem) {
      activeItem.classList.remove('active');
    }
  }

  function handleZoneMouseOver(event) {
    legend.classList.add('active');

    disableActiveLegendItem();

    var elem = event.target;

    var zone = elem.getAttribute('data-zone');

    var target = document.querySelector('#legend-item-' + zone);

    target.classList.add('active');
  }

  function handleZoneMouseOut(event) {
    legend.classList.remove('active');

    disableActiveLegendItem();
  }

  [].forEach.call(zones, function(elem) {
    elem.addEventListener('mouseover', handleZoneMouseOver);
    elem.addEventListener('mouseout', handleZoneMouseOut);
  });

  var directionsZone = document.querySelector('.directions-bg');
  var distinctionZone = document.querySelector('.distinctions-bg');

  // set up item modals
  var items = document.querySelectorAll('.js-framework-item');
  var examples = document.querySelectorAll('.example');

  var modal = document.querySelector('.framework .modal');
  var modalTag = modal.querySelector('.modal-tag');
  var modalTitle = modal.querySelector('.modal-title');
  var modalText = modal.querySelector('.modal-text');
  var modalCloseButton = modal.querySelector('.modal-close');
  var modalPrevButton = modal.querySelector('.modal-prev');
  var modalNextButton = modal.querySelector('.modal-next');

  function setModalContent(tag, title, text, modifier) {
    modalTag.innerText = tag;
    modalTitle.innerText = title;
    modalText.innerText = text;
    if (tag) {
      modal.classList.add('modal-' + tag);
    }
  }

  function openModal(elem) {
    var values = getItemValues(elem);

    hideExamples();

    showExamples(elem);

    setModalContent(values.tag, values.title, values.text);

    elem.classList.add('active');
    modal.classList.add('active');
  }

  function getActiveItem() {
    return document.querySelector('.js-framework-item.active');
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.classList.remove('modal-direction', 'modal-distinction');

    var activeItem = getActiveItem();
    if (activeItem) {
      activeItem.classList.remove('active');
    }
  }

  function getItemValues(elem) {
    var titleElem = closest(elem, '[data-title]');

    var tag = titleElem.getAttribute('data-title');
    var title = elem.innerText;
    var text = elem.getAttribute('data-text');

    return {
      tag: tag,
      title: title,
      text: text
    };
  }

  function showExamples(elem) {
    var selector = elem.getAttribute('data-examples');
    var exampleElems = document.querySelectorAll(selector);

    if (!exampleElems) {
      return;
    }

    [].forEach.call(exampleElems, function(elem) {
      elem.classList.add('active');
    });
  }

  function hideExamples() {
    [].forEach.call(examples, function(item, i) {
      item.classList.remove('active');
    });
  }

  function handleItemClick(e) {
    e.preventDefault();

    var elem = e.currentTarget;

    openModal(elem);
  }

  // bind clickable items
  [].forEach.call(items, function(item) {
    item.addEventListener('click', handleItemClick);
  });

  function handleNextClick(event) {
    event.preventDefault();

    var activeItem = getActiveItem();

    if (!activeItem) {
      return;
    }

    closeModal();

    var parent = activeItem.parentElement;
    var nextElem = parent.nextElementSibling;

    if (!nextElem) {
      nextElem = closest(parent, '[data-title]').firstElementChild;
    }

    var nextLink = nextElem.querySelector('a');

    if (!nextLink) {
      return;
    }

    openModal(nextLink);
  }

  function handlePrevClick(event) {
    event.preventDefault();

    var activeItem = getActiveItem();

    if (!activeItem) {
      return;
    }

    closeModal();

    var parent = activeItem.parentElement;
    var prevElem = parent.previousElementSibling;

    if (!prevElem) {
      prevElem = closest(parent, '[data-title]').lastElementChild;
    }

    var prevLink = prevElem.querySelector('a');

    if (!prevLink) {
      return;
    }

    openModal(prevLink);
  }

  function handleCloseClick(event) {
    event.preventDefault();
    closeModal();
  }

  modalNextButton.addEventListener('click', handleNextClick);
  modalPrevButton.addEventListener('click', handlePrevClick);
  modalCloseButton.addEventListener('click', handleCloseClick);
})();
