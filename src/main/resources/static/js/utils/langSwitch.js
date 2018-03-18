$(document).ready(function(){
    var rusImgLink = "http://www.roemheld.de/IT/Data/Images/Address/Russland.gif";
    var engImgLink = "http://www.roemheld.de/IT/Data/Images/Address/Grossbritanien.gif";


    var imgBtnSel = $('#imgBtnSel');
    var imgBtnRus = $('#imgBtnRus');
    var imgBtnEng = $('#imgBtnEng');

    var imgNavSel = $('#imgNavSel');
    var imgNavRus = $('#imgNavRus');
    var imgNavEng = $('#imgNavEng');

    var spanNavSel = $('#lanNavSel');
    var spanBtnSel = $('#lanBtnSel');

    imgBtnSel.attr("src",engImgLink);
    imgBtnRus.attr("src",rusImgLink);
    imgBtnEng.attr("src",engImgLink);

    imgNavSel.attr("src",engImgLink);
    imgNavRus.attr("src",rusImgLink);
    imgNavEng.attr("src",engImgLink);

    $( ".language" ).on( "click", function( event ) {
        var currentId = $(this).attr('id');

        if(currentId == "navRus") {
            imgNavSel.attr("src",rusImgLink);
            spanNavSel.text("RUS");
        } else if (currentId == "navEng") {
            imgNavSel.attr("src",engImgLink);
            spanNavSel.text("ENG");
        } else if (currentId == "navDeu") {
            imgNavSel.attr("src",deuImgLink);
            spanNavSel.text("DEU");
        } else if (currentId == "navFra") {
            imgNavSel.attr("src",fraImgLink);
            spanNavSel.text("FRA");
        }

        if(currentId == "btnRus") {
            imgBtnSel.attr("src",rusImgLink);
            spanBtnSel.text("RUS");
        } else if (currentId == "btnEng") {
            imgBtnSel.attr("src",engImgLink);
            spanBtnSel.text("ENG");
        } else if (currentId == "btnDeu") {
            imgBtnSel.attr("src",deuImgLink);
            spanBtnSel.text("DEU");
        } else if (currentId == "btnFra") {
            imgBtnSel.attr("src",fraImgLink);
            spanBtnSel.text("FRA");
        }

    });
});