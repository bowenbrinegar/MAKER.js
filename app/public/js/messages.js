
console.log('messages');

//  newFlash function creates a new flash message, it takes in two parameters:
//  flashType: 'success' or 'error'
//  flashText: a string of the message to be displayed

const newFlash = (flashType, flashText) => {

  const flashContainer = $('<div></div>');
  flashContainer.addClass('flash-messages');

  const flashInner = $('<div></div>');
  flashInner.addClass(`flash flash--${flashType}`);

  const flashMsg = $('<p></p>');
  flashMsg.addClass('flash__text');
  flashMsg.append(flashText);

  const newBtn = $('<button></button>');
  newBtn.addClass('flash__remove');
  newBtn.attr('onClick', 'this.parentElement.remove()');
  newBtn.append('&times;');

  flashInner.append(flashMsg).append(newBtn);
  flashContainer.append(flashInner);

  $('.inner').addClass('innerMod').append(flashContainer);
}

const destroyFlash = () => {
  $('.inner').html('');
  $('.inner').removeClass('innerMod');
};

const checkLogInStatus = (newLink) => {
  $.ajax({
    url:'/login-needed',
    type: "GET"
  }).done(function(res) {
    console.log(res);
    if (!res) {
      newFlash('error', 'You must be logged in to view that page');
      setTimeout(destroyFlash, 2500);
    } else {
      $('#inventoryLink a').attr('href', '/inventory');
      window.location.replace(newLink);
    }
  })
};




// Check to see if user is logged in when clicking on the protected pages' links
// If not logged in, the links are disabled and a flash message is shown
$(document).ready(() => {
  $('#inventoryLink a').on('click', function () {
    $(this).removeAttr('href');
    checkLogInStatus('/inventory');
    console.log('link clicked');
  });

  $('#makerSpaceLink a').on('click', function() {
    $(this).removeAttr('href');
    checkLogInStatus('/form');
  });
});
