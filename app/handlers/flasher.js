

//  newFlash function creates a new flash message, it takes in two parameters:
//  flashType: 'success' or 'error'
//  flashText: a string of the message to be displayed

// exports.newFlash = (req, res, flashType, flashText) => {

//   const flashContainer = $('<div></div>');
//   flashContainer.addClass('flash-messages');

//   const flashInner = $('<div></div>');
//   flashInner.addClass(`flash flash--${flashType}`);

//   const flashMsg = $('<p></p>');
//   flashMsg.addClass('flash__text');
//   flashMsg.append(flashText);

//   const newBtn = $('<button></button>');
//   newBtn.addClass('flash__remove');
//   newBtn.attr('onClick', 'this.parentElement.remove()');
//   newBtn.append('&times;');

//   flashInner.append(flashMsg).append(newBtn);
//   flashContainer.append(flashInner);

//   $('.inner').addClass('innerMod').append(flashContainer);
// }

// exports.destroyFlash = () => {
//   $('.inner').html('');
//   $('.inner').removeClass('innerMod');
// };