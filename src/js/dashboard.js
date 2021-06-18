

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
const yellowColor = "#FFFDD0" ;
//GENERAL VIEW
$("#datatable-user").DataTable({
    language:{
        url : languageURL
    },
    responsive: true
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
        console.log(data.status.toUpperCase());
        console.log(row)
        if(data.status.toUpperCase() === "PENDIENTE"){
            $('td', row).css("background-color", yellowColor)
        } 
    },
    language:{
        url : languageURL
    },
    responsive: true
});

//MENU TABLE
$("#datatable-articles").DataTable({
    language:{
        url : languageURL
    },
    responsive: true
});

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
$("#datatable-transactions-pending").DataTable({
    language:{
        url: languageURL
    },
    responsive: true
});

//USERS VIEW

$("#datatable-users-view").DataTable({
    data:[
        {
            "name":   "César",
            "surname":     "González",
            "e-mail": "caelol@outlook.com",
            "cellphone": "5527167531"
        }
    ],
    columns: [
        {targets: 0, data: function (row, type, val, meta){
            return row.name + " " + row.surname
        }},
        {data: "e-mail"},
        {data: "cellphone"}
    ],
    language:{
        url : languageURL
    },
    responsive: true
});

//ORDERS MENU
$("#datatable-pending").DataTable();
$("#datatable-oncook").DataTable();
$("#datatable-ready").DataTable();

//GENERAL VIEW
//ORDERS
/*
let datatableOrder = new DataTable(document.getElementById("datatable-order"),{
    columns: ["Nombre de Usuario", "E-Mail", "Número Celular"],
    data:[
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
        ["Benemerito de las Americas", "Benrito@Gmail.com", "5527167351"]
    ],         
    //layout: "fluid",
    noDataMessage: "No hay que mostrar",
    serialNoColumn: false,
    dynamicRowHeight: true
})
//USERS
let datatableUser = new DataTable(document.getElementById("datatable-user"),{
       columns:[
            {name: "Nombre de Usuario", resizable: false, editable: false},
            {name: "E-Mail",  resizable: false, editable: false},
            {name: "Número Celular", resizable: false, editable: false}
        ],
        data: [
            ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
            ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
            ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
            ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
            ["Pedrito Camelo", "Pedrito@Gmail.com", "5527167351"],
            ["Benemerito de las Americas", "Benrito@Gmail.com", "5527167351"]
        ],
        layout: "fluid",
        noDataMessage: "No hay que mostrar",
        serialNoColumn: false,
        dynamicRowHeight: true
    });
//ORDERS VIEW
let tableOrdersPending = new DataTable(document.getElementById("datatable-orders-oncook"),{
    columns:[
        {name: "ID Orden", resizable: false, editable: false},
        {name: "Nombre de Usuario", resizable: false, editable:false},
        {name: "Estatus de Orden", resizable: false, editable:false}
    ],
    data:[

    ],

});

*/