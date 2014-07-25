/**
 * Created by christopher on 7/24/14.
 */
$(function(ready){
    $('#zipcode').change(function(e) {
        var zipCode = $(this).val();
        alert('you types her???');
        console.log('working');
    });

//        var requestURL = 'http://ziptasticapi.com/' + zipCode + '?' + '?callback=?';
//        $.getJSON(requestURL, null, function(data){
//            console.log(data);
//        });
});