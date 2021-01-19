(function($) {
    $(function() {
        var wrong1 = $('#id_mistake1');
			
		var wrong2 = $('#id_mistake2');
			
		var wrong3 = $('#id_mistake3');
			

        function toggleVerified(current, next) {
            if (current != ' ') {
                next.show();
            } else {
                next.hide();
            }
        }
		
		var mistakes = [wrong1, wrong2, wrong3];
		for (i = 0; i < mistakes.length; i++){
			toggleVerified(mistakes[i], mistakes[i+1])
		}

        // show/hide on change
        wrong1.change(function() {
            toggleVerified($(this).val());
        });
		wrong2.change(function() {
            toggleVerified($(this).val());
        });
		wrong3.change(function() {
            toggleVerified($(this).val());
        });
    });
})(django.jQuery);