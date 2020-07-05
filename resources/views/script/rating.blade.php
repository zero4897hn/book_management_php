<script type="text/javascript">
jQuery(document).ready(function() {
    jQuery('.button-rating').click(function(event) {
        var currentStar = jQuery(this);
        var currentStarValue = currentStar.data('value');
        jQuery('.button-rating').each(function() {
            if (jQuery(this).data('value') <= currentStarValue) jQuery(this).addClass('checked');
            else jQuery(this).removeClass('checked');
        });
        jQuery('#field_rating').val(currentStarValue);
    });
});
</script>
