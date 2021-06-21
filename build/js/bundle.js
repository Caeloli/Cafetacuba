
const colorBgGreen = "#ABD5AB";
const colorBgRed = "#F79C9B";
const yellowBgColor = "#FFFDD0" ;
//Display ALL Menu
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
//Hamb Menu
function toggleClassName(el, className){
    if(el.hasClass(className)){
        el.removeClass(className);
    } else{
        el.addClass(className);
    }
}

const hambMenu = $(".menu-icon");
const sidenavEl = $(".sidenav-dashboard");
hambMenu.on("click", function(){
    toggleClassName(sidenavEl, "active");
})

//Change Views
let activeView = $(".general-view");
const sidenavItems = $(".sidenav-item");
sidenavItems.each(function(){
    $(this).on("click", function(){
        const selectedView = $("."+$(this).attr("data-view"));
        if(selectedView.attr("class") !== activeView.attr("class")){
            activeView.animate({
                opacity: "toggle"
            })
            selectedView.delay(800).animate({
                opacity: "toggle"
            })
            selectedView.addClass("active-view");
            activeView = selectedView;
        }
    })
});


//DataTables
const languageURL = "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json";
//GENERAL VIEW

$.ajax({
    url: "../../src/json/GeneralResult.json",
    type: "GET",
    dataType: "json",
    success: function(result){
        const numUsers = $("#data-num-users");
        const profit = $("#data-sells");
        const numArticles = $("#data-num-items");
        numUsers.text(result[0].users);
        profit.text("$" + result[0].profits);
        numArticles.text(result[0].articles);
    }
});




$("#datatable-user").DataTable({
    ajax:{
        url: "../../src/json/users.json",
        dataSrc: ""
    },
    columns: [
        {targets: 0, data: function (row, type, val, meta){
            return row.firstname + " " + row.lastname
        }},
        {data: "email"},
        {data: "cellphone"}
    ],
    language:{
        url : languageURL
    },
    responsive: true,
});

$("#datatable-order").DataTable({
    data:[
        {
            "idorder":       "1",
            "name":   "César",
            "surname":     "González",
            "status": "pendiente",
        }
    ],
    columns: [
        {targets: 0, data: 'idorder'},
        {targets: 1, data: function (row, type, val, meta){
            return row.name + " " + row.surname
        }},
        {data: function(row){
            return row.status.toUpperCase();
        }}
    ],
    "rowCallback": function(row, data, index){
        if(data.status.toUpperCase() === "PENDIENTE"){
            $('td', row).css("background-color", yellowBgColor)
        } 
    },
    language:{
        url : languageURL
    },
    responsive: true
});

//MENU TABLE
const tableArticles = $("#datatable-articles").DataTable({
    columnDefs: [{
        targets: -1,
        data: null,
        defaultContent:  '<button id="edit-btn" style="border: 0; background: none; color: #d6a218; cursor: pointer"><i class="fas fa-edit"></i></button><button id="delete-btn" style="border: 0; background: none; color: #425c59; cursor: pointer"><i class="fas fa-trash-alt"></i></button>'
    }],
    language:{
        url : languageURL
    },
    responsive: true
});

$("#datatable-articles tbody").on("click", "button#edit-btn", function(){
    const data = tableArticles.row($(this).parents('tr')).data();
    $("#edit-product-name").val(data[0]);
    $("#edit-product-desc").val(data[1]);
    $("#edit-product-stock").val(data[2]);
    $("#edit-product-expense").val(data[3].substring(1));
    $(".overlay-edit-table").fadeIn().css("display", "flex");
});

$("#datatable-articles tbody").on("click", "button#delete-btn", function(){
    const data = tableArticles.row($(this).parents('tr')).data();
    confirm("¿Está seguro de borrar este artículo?");
});

function offOverlay(){
    $(".overlay-edit-table").fadeOut();
}
//TRANSACTIONS VIEW
//GRAPH
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Transacciones Efectuadas',
      backgroundColor: '#d6a218',
      borderColor: '#d6a218',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data,
    options: {}
  };

  let graphTransPending = new Chart(
    document.getElementById('transaction-chart'),
    config
  );

  let graphMoney = new Chart(
    document.getElementById('transaction-money-chart'),
    config
  );
  //DATATABLE
  
const tableTransaction = $("#datatable-transactions-pending").DataTable({
    ajax:{
        url: "../../src/json/transaction.json",
        dataSrc: ""
    },
    columns:[
        {targets: 0, data: function (row, type, val, meta){
            return row.firstname + " " + row.lastname
        }},
        {data: "email"},
        {data: "amount"},
        {data: "voucher"},
    ],
    columnDefs: [{
        targets: 4,
        data: null,
        defaultContent:  '<button id="accept-btn" style="border: 0; background: none; color: #03AC13; cursor: pointer"><i class="fas fa-check-square"></i></button><button id="deny-btn" style="border: 0; background: none; color: #DC143C; cursor: pointer"><i class="fas fa-window-close"></i></button>'
    }],
    language:{
        url: languageURL
    },
    responsive: true
});

$("#datatable-transactions-pending tbody").on("click", "button#accept-btn", function(){
    const parentRow = $(this).closest("tr");
    const parentCell = $(this).closest("td");
    let cell = tableTransaction.cell(parentCell).node();
    let row = tableTransaction.row(parentRow).node();
    $(cell).empty();
    $(cell).append('<p style="color: green; font-size:1.5rem">ACEPTADO</p>')
    $(row).css("background-color", colorBgGreen).css("color", "white");
});

$("#datatable-transactions-pending tbody").on("click", "button#deny-btn", function(){
    const parentRow = $(this).closest("tr");
    const parentCell = $(this).closest("td");
    let cell = tableTransaction.cell(parentCell).node();
    let row = tableTransaction.row(parentRow).node();
    $(cell).empty();
    $(cell).append('<p style="color: #B02220; font-size:1.5rem">RECHAZADO</p>')
    $(row).css("background-color", colorBgRed).css("color", "white");
});

/////////7USERS VIEW/////////7/////////7/////////7/////////7/////////
/////////7/////////7/////////7/////////7/////////7/////////7/////////
const usersTable = $("#datatable-users-view").DataTable({
    ajax:{
        url: "../../src/json/users.json",
        dataSrc: ""
    },
    columns: [
        {targets: 0, data: function (row, type, val, meta){
            return row.firstname + " " + row.lastname
        }},
        {data: "email"},
        {data: "cellphone"}
    ],
    language:{
        url : languageURL
    },
    responsive: true,
    
});

setInterval(function(){
    usersTable.ajax.reload(null, false);
}, 30000);

//ORDERS MENU
$("#datatable-orders").DataTable({
    ajax:{
        url: "../../src/json/orders.json",
        dataSrc: ""
    },
    columns: [
    {targets: 0, data: function (row, type, val, meta){
        return row.firstname + " " + row.lastname
    }},
    {data: "article"},
    {data: function(row, type, val, meta){
        if(row.statusID === 0){
            return "EN ESPERA"
        } else if(row.statusID === 1){
            return "COCINANDO"
        } else{
            return "REALIZADO"
        }
    }}
],
rowCallback: function(row, data, index){
    if(data.statusID === 0){
        $('td', row).css("background-color", colorBgRed)
    } else if(data.statusID === 1){
        $('td', row).css("background-color", yellowBgColor)
    } else{
        $('td', row).css("background-color", colorBgGreen)
    }

},
language:{
    url : languageURL
},
responsive: true
});



/*const video = document.getElementById("video-slider");
function videoUrl(videoName){
    video.src = `/video/${videoName}`;
    video.classList.remove("none");
}
video.addEventListener("ended", function(){

})


*/
function validateAddProduct(evt){
    console.log(evt);
    let validation = {
        categories: false,
    }
    validation.categories = validateCategories($("#product_ctgry").val());
    if(!isAllObjectTrue(validation)){
        evt.preventDefault();
    }
};

function validateCategories(val){
    let obj = $("#categories").find("option[value='"+val+"']");
    if(!(obj != null && obj.length > 0)){
        const message = $("<p></p>").text("Campo de Categorías Incorrecto");
        message.css("display", "block").css("background-color", "red").css("color", "white");
        $("#add-product-form").append(message)
        setTimeout(function(){
            message.remove();
        }, 5000);
        return false
    }        
    return true;
}

function isStringNull(val){
    if(val === "")
        return false
    else
        return true
}

function isAllObjectTrue(obj){
    for(let i in obj)
        if(!obj[i]) return false;
    return true
}