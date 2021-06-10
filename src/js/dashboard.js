const userMenuBtn = $("#user-picture");
const userMenu = $(".admin-user-menu");
let isUserMenuSelected = false;
userMenuBtn.click(function(){
    isUserMenuSelected = !isUserMenuSelected;
    userMenuBtn.attr("data-isselected", isUserMenuSelected);
        userMenu.animate({
            display: "flex",
            opacity: "toggle",
            height: "toggle"
        });
    }
)

const hambMenu = $(".menu-icon");


function toggleClassName(el, className){
    if(el.hasClass(className)){
        el.removeClass(className);
    } else{
        el.addClass(className);
    }
}

const sidenavEl = $(".sidenav-dashboard");

hambMenu.on("click", function(){
    toggleClassName(sidenavEl, "active");
})