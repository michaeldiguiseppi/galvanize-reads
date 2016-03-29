// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
});

$('#delete').on('click', function(event) {
  event.preventDefault();
  delConfirm();
});

function delConfirm() {
  bootbox.confirm('Are you sure you want to delete this book?', function(result) {

  });
}
