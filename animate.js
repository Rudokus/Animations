
/**
 * Initialize animations based on the animate-in/out data attributes and append them as a style tag to the body. The first
 * check is if the url contains no-animations=true query parameter.
 * @method initAnimations
 */
function initAnimations(){
    //all the animations
    if( location.search.indexOf("no-animations=true") == -1   ){
        var in_css = $('[data-animate-in]').map(function(){
            var settings = $(this).data('animate-in');
            return createAnimationCss($(this), settings,".in");
        }).get().join("\n");

        var out_css = $('[data-animate-out]').map(function(){
            var settings = $(this).data('animate-out');
            return createAnimationCss($(this),settings,".out");
        }).get().join("\n");

        $("#spread_animations").remove();
        $("body").append('<style style="text/css" id="animations" >'+in_css+'\n'+out_css+'</style>');
    }

}

function generateUUID(length) {
    var d = new Date().getTime();
    /* UUID has to start with alphabetical letter to be a correct node ID */
    var uuid = 'Hxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*length)%length | 0;
        d = Math.floor(d/length);
        return (c=='x' ? r : (r&0x3|0x8)).toString(length);
    });
    return uuid;
};


/**
 * Initialize animations based on the animate-in and animate-out data attribute.
 * @method createAnimationCss
 * @param element
 * @param settings
 * @param classCss
 * @returns {string}
 */
function createAnimationCss(element, settings, classCss){
    var settings_array, id, base = 4, loop, animations = [], res;
    
    settings_array = settings.replace(' ', '').split(',');

    id = element.attr("id"); // id
    loop = settings_array.length / base;
    if(settings_array.length > base){
        for(var i= 0; i < loop; i++){
            animations[i] = settings_array.splice(0,4);
        }
    }
    if( !id ){
        id = generateUUID(10);
        $(element).attr('id', ""+id);
    }

    /**
     * To hide the animations when a delay is being set up.
     * 
     */
    var opacity = "";
    if( settings_array[1] > 0){
        opacity = "opacity:0;";
    }

    /*
     * settings_array key => value meaning
     * 0 = duration
     * 1 = delay
     * 2 = iteration times
     * 3 = effect
     */
    return "#"+id+classCss+".animated{ -webkit-animation: "+settings_array[3]+" "+settings_array[0]+"s "+settings_array[1]+"s "+settings_array[2]+"; animation: "+settings_array[3]+" "+settings_array[0]+"s "+settings_array[1]+"s "+settings_array[2]+"; "+opacity+" }";
}
