


//AJAX URL
const articleURL = "ArticleJSON";
const categoryURL = "CategoryJSON";
const generalResultURL = "GeneralResultJSON";
const ordersURL ="OrderJSON";
const transactionURL = "TransactionJSON";
const userURL = "UserJSON";
const addArticleFormServlet = "";
const updateTransactionStatusServlet = "";
const editArticleServlet = ""
const deleteArticleServlet = "";
//BACKGROUND
const colorBgGreen = "#ABD5AB";
const colorBgRed = "#F79C9B";
const yellowBgColor = "#FFFDD0" ;
//Display ALL Menu
const userMenuBtn = $("#user-picture");
const userMenu = $(".admin-user-menu");
//LANGUAGE API
const languageURL = "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json";

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

//GENERAL VIEW

$.ajax({
    url: generalResultURL,
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
        url: userURL,
        dataSrc: ""
    },
    columns: [
        {targets: 0, data: function (row, type, val, meta){
            return row.firstname + " " + row.lastname
        }},
        {data: "email"},
        {data: "cellphone"}
    ],
    pageLength: 4,
    lengthMenu: [[4], [4]],
    language:{
        url : languageURL
    },
    responsive: true,
});

$("#datatable-order").DataTable({
    ajax:{
        url: ordersURL,
        dataSrc: ""
    },
    columns: 
    [
        {targets: 0, data: function (row, type, val, meta){
            return row.firstname + " " + row.lastname
        }},
        {data: function(row){
            return "EN ESPERA";
        }}
    ],
    "rowCallback": function(row, data, index){
        if(data.statusID === 0){
            $('td', row).css("background-color", colorBgRed)
        } else{
            $('td', row).remove();
        }
    },
    language:{
        url : languageURL
    },
    responsive: true
});

//MENU TABLE
const dataList = $("#categories");
const listCatInput = $("#table-category");
$.ajax({
    url: categoryURL,
    type: "GET",
    dataType: "json",
    success: function(result){
        for (let i = 0; i < result.length; i++) {
            const optionHTML = $('<option value="'+ result[i].name.toUpperCase() +'"></option>');
            dataList.append(optionHTML);
        }
    }
})

const tableArticles = $("#datatable-articles").DataTable({
    ajax:{
        url: articleURL,
        dataSrc: ""
    },
    columns:[
        {data: function(row, type, val, meta){
            const str = row.category;
            const str2 = str.charAt(0).toUpperCase() + str.slice(1);
            return str2
        }},
        {data: "name"},
        {data: "description"},
        {data: "stock"},
        {data: "price"}
    ],
    columnDefs: [{
        targets: 5,
        data: null,
        defaultContent:  '<button id="edit-btn" style="border: 0; background: none; color: #d6a218; cursor: pointer"><i class="fas fa-edit"></i></button><button id="delete-btn" style="border: 0; background: none; color: #425c59; cursor: pointer"><i class="fas fa-trash-alt"></i></button>'
    }],
    language:{
        url : languageURL
    },
    responsive: true
});
//FILTER
$.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex){

        if(settings.nTable.id !== "datatable-articles"){
            return true;
        }
        let valueList = listCatInput.val().toLowerCase();
        let categoryData = data[0].toLowerCase();
        if(valueList === categoryData){
            return true;
        }
        return false;
    }
)

listCatInput.on("input", function(){
    tableArticles.draw();
})

let activeEditArt;

$("#datatable-articles tbody").on("click", "button#edit-btn", function(){
    activeEditArt = tableArticles.row($(this).parents('tr')).data();
    $("#edit-product-name").val(activeEditArt.name);
    $("#edit-product-desc").val(activeEditArt.description);
    $("#edit-product-stock").val(activeEditArt.stock);
    $("#edit-product-expense").val(activeEditArt.price);
    $(".overlay-edit-table").fadeIn().css("display", "flex");
    
});



$("#edit-product-form").on("submit", function(evt){
    evt.preventDefault();
    let formValues = $(this).serialize();
    $.post(editArticleServlet, formValues, function(data){
        tableArticles.ajax.reload();
        $(".overlay-edit-table").fadeOut();
    })

})


$("#datatable-articles tbody").on("click", "button#delete-btn", function(){
    const data = tableArticles.row($(this).parents('tr')).data();
    if(confirm("¿Está seguro de borrar este artículo?")){
        $.ajax({
            url: deleteArticleServlet,
            type: POST,
            data: {name: data.name},
            success: function(){
                tableArticles.ajax.reload();
            }
        })
    }
});

function offOverlay(){
    $(".overlay-edit-table").fadeOut();
}
//TRANSACTIONS VIEW
//GRAPH
/*
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
  ); */
  //DATATABLE
  
const tableTransaction = $("#datatable-transactions-pending").DataTable({
    ajax:{
        url: transactionURL,
        dataSrc: ""
    },
    columns:[
        {targets: 0, data: function(row, type, val, meta){
            if(row.status === 1){
                return 0;
            } else if(row.status === 2){
                return 1;
            } else{
                return 2;
            }
        }},
        {targets: 1, data: function (row, type, val, meta){
            return row.firstname + " " + row.lastname
        }},
        {data: "email"},
        {data: "amount"},
    ],
    columnDefs: [
        {
            targets: 4,
            data: function(row, type, val, meta){
                return '<a href="'+ row.voucher +'" target="_blank"><i class="fas fa-external-link-alt"></i></a>'
            }
        },
        
        {
        targets: 5,
        data:  function(row, type, val, meta){
            if(row.status === 1){//1 is pending
                return '<button id="accept-btn" style="border: 0; background: none; color: #03AC13; cursor: pointer"><i class="fas fa-check-square"></i></button><button id="deny-btn" style="border: 0; background: none; color: #DC143C; cursor: pointer"><i class="fas fa-window-close"></i></button>'
            }  else if(row.status === 2){
                return '<p style="color: white; font-weight: bold;">ACEPTADO</p>'
            } else{
                return '<p style="color: white; font-weight: bold;">RECHAZADO</p>'
            }
        }
    }],
    "rowCallback": function(row, data, index){
        if(data.status === 1){
            $('td', row).css("background-color", yellowBgColor);  
        } else if(data.status === 2){
            $('td', row).css("background-color", colorBgGreen);  
        } else{
            $('td', row).css("background-color", colorBgRed);  
        }
        //$('td', row).hide();
    },
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
    $.ajax({
        type: "POST",
        url: updateTransactionStatusServlet,
        data: {id_transaction: tableTransaction.row(parentRow).data().transaction_id ,status: 2},
        success: function(data){
            $(cell).empty();
            $(cell).append('<p style="color: green; font-weight: bold;">ACEPTADO</p>')
            $(row).css("background-color", colorBgGreen).css("color", "white");
            tableTransaction.ajax.reload(null, false);
        }
    })
});

$("#datatable-transactions-pending tbody").on("click", "button#deny-btn", function(){
    const parentRow = $(this).closest("tr");
    const parentCell = $(this).closest("td");
    let cell = tableTransaction.cell(parentCell).node();
    let row = tableTransaction.row(parentRow).node();
    $.ajax({
        type: "POST",
        url: updateTransactionStatusServlet,
        data: {id_transaction: tableTransaction.row(parentRow).data().transaction_id ,status: 0},
        success: function(data){
            $(cell).empty();
            $(cell).append('<p style="color: #B02220; font-weight: bold;">RECHAZADO</p>')
            $(row).css("background-color", colorBgRed).css("color", "white");
            tableTransaction.ajax.reload(null, false);
        }
    })
});

/////////7USERS VIEW/////////7/////////7/////////7/////////7/////////
/////////7/////////7/////////7/////////7/////////7/////////7/////////
const usersTable = $("#datatable-users-view").DataTable({
    ajax:{
        url: userURL,
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
        url: ordersURL,
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

///SEND INFO SERVER
$("#add-product-form").on("submit", function(evt){
    evt.preventDefault();
    let formValues = $(this).serialize();
    if(validateAddProduct())
    $.post(addArticleFormServlet, formValues, function(data){
        tableArticles.ajax.reload(null, false)
        const message = $("<p></p>").text("Formulario Enviado Correctamente");
        message.css("display", "block").css("background-color", colorBgGreen).css("color", "white");
        $("#add-product-form").append(message)
        setTimeout(function(){
            message.remove();
        }, 5000);
    })
    else 
        return;
})



/*
function seriald(){
    console.log(form);
    const s = form.serialize()
    form.find("input").attr("disabled", "disabled");
    console.log(s);
}*/

/*const video = document.getElementById("video-slider");
function videoUrl(videoName){
    video.src = `/video/${videoName}`;
    video.classList.remove("none");
}
video.addEventListener("ended", function(){

})


*/
function validateAddProduct(){
    let validation = {
        categories: false,
    }
    validation.categories = validateCategories($("#product_ctgry").val());
    if(!isAllObjectTrue(validation)){
        return false;
    }  
        
    return true;
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