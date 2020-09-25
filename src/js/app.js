//Import Polyfills and external dependencies
import svg4everybody from "svg4everybody";
import "@cake-hub/web-css_framework/js/cakeDOM";

//Import CAKE Dependencies as you want (you can simply remove the lines you do not need)
import accordion from "@cake-hub/web-css_framework/js/accordion";
import alert from "@cake-hub/web-css_framework/js/alert";
import "@cake-hub/web-css_framework/js/cookieAlert";
import form from "@cake-hub/web-css_framework/js/form";
import header from "@cake-hub/web-css_framework/js/header";
import popover from "@cake-hub/web-css_framework/js/popover";
import subnavigation from "@cake-hub/web-css_framework/js/subnavigation";
import tab from "@cake-hub/web-css_framework/js/tab";
import themeSlider from "@cake-hub/web-css_framework/js/themeSlider";
import totop from "@cake-hub/web-css_framework/js/toTop";

( () => {
    //Run external dependencies
    svg4everybody ();

    //Scripts to load when document-loaded
    accordion ();
    alert ();
    form ();
    header ();
    popover ();
    subnavigation ();
    tab ();
    themeSlider.initializeAllSliders ();
    totop ();
})();
