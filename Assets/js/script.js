$(document).ready(function(){

  const $currentDay = $('#currentDay');
  const saveButton = $('button');
  const alertList = $('.alert');
  const alerts = alertList.map((i, element) => new bootstrap.Alert(element)).get();
  
  const localStorageMap = JSON.parse(localStorage.getItem('map')) || {};
  const mergedStorage = { ...localStorageMap, ...{} };
  
  function saveLocalStorage(bodyText, id) {
    mergedStorage[id] = bodyText;
    localStorage.setItem('map', JSON.stringify(mergedStorage));
  }
  
  function saveEvent(event) {
    event.preventDefault();
  
    if (event.target.className === 'btn-close') {
      alertList.addClass('d-none');
      return;
    }
    const $description = $(event.target).parent().children('.description');
    const bodyText = $description.val().trim();
    const bodyId = $description.attr('id');
    saveLocalStorage(bodyText, bodyId);
  
    alertList.removeClass('d-none');
  }
  
  function checkTime() {
    $currentDay.text(`${dayjs().format('dddd, MMMM D, hh:mm:ss a')}`);
  
    for (let i = 9; i <= 17; i++) {
      const $timeDiv = $(`#hour-${i}`);
      let timeEl = $timeDiv.children('div').text().slice(0, -2);
      let currentHour = parseInt(dayjs().format('HH'), 10);
  
      if (i >= 13) {
        timeEl = (parseInt(timeEl, 10) + 12).toString();
      }
  
      $timeDiv.removeClass('past present future');
  
      if (timeEl < currentHour) {
        $timeDiv.addClass('past');
      } else if (timeEl === currentHour.toString()) {
        $timeDiv.addClass('present');
      } else {
        $timeDiv.addClass('future');
      }
    }
  }
  
  function init() {
    for (const key in localStorageMap) {
      $(`#${key}`).text(localStorageMap[key]);
    }
  
    checkTime();
  }
  
  saveButton.on('click', saveEvent);
  setInterval(checkTime, 1000);
  
  init();
  });
  
    $("button").on("click", function(){
        $('input, select, textarea').each(function() {
         var value = $(this).val(),
             name = $(this).attr('name');
         localStorage[name] = value;           
    })});