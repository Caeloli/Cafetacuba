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