const express = require('express');
const joi = require('joi');
var app = express();
const cors = require('cors');

// ********** DATA ***********

var product = [
    {
        id : "ToothBrush",
        brand : "Oral-B",
        category : "Personal Hygiene",
        sku : 10001,
        status : "available",
        mode_of_selling : "Physical",
        price_inc_tax : 14.92,
        price : 14,
        demograph : "All",
        metadate : "No 1 brand in the world"
    },
    {
        id : "Deodorant",
        brand : "AXE",
        category : "Personal Hygiene",
        sku : 10002,
        status : "available",
        mode_of_selling : "Physical",
        price_inc_tax : 231.24,
        price : 226,
        demograph : "Adults",
        metadata : "Frangrance"
    },
    {
        id : "Washing Machine",
        brand : "Whirlpool",
        category : "Home Appliances",
        sku : 10003,
        status : "available",
        mode_of_selling : "Physical",
        price_inc_tax : 23006,
        price : 22000,
        demograph : "Adults",
        metadata : "Makes your life easier"
    },
    {
        id : "AC",
        brand : "LG",
        category : "Home Appliances",
        sku : 10004,
        status : "available",
        mode_of_selling : "Physical",
        price_inc_tax : 42000,
        price : 40000,
        demograph : "All",
        metadata : "Life's Good"
    },
    {
        id : "Chocolate",
        brand : "Snickers",
        category : "Food and Consumables",
        sku : 10005,
        status : "available",
        mode_of_selling : "Physical",
        price_inc_tax : 25,
        price : 23.92,
        demograph : "Children",
        metadata : "Hungry? Grab a snickers"
    },
    {
        id : "Car",
        brand : "Mercedes",
        category : "Car Appliances",
        sku : 10006,
        status : "available",
        mode_of_selling : "Physical",
        price_inc_tax : 500000,
        price : 423000,
        demograph : "Adults",
        metadata : "Class Apart"
    },
    {
        id : "Website",
        brand : "Godaddy",
        category : "Web Hosting Services",
        sku : 10007,
        status : "available",
        mode_of_selling : "Digital",
        price_inc_tax : 1000,
        price : 980,
        demograph : "Adults",
        metadata : "Your No.1 website hosting site"
    }
];

var categories =  [{
    '1': {
        'name' : 'Personal Hygiene',
    },
    '2' : {
        'name' : 'Home Appliances',
    },
    '3' : {
        'name' : 'Food and Consumables',
    },
    '4' : {
        'name' : 'Car Appliances',
    } ,
    '5' : {
        'name' : 'Web Hosting Services'
    },

}]

var modes_of_selling = [{
    '1' : {
        'name' : 'Physical',
    },
    '2' : {
        'name' : 'Digital'
    }
}]

var demographs = [{
    '1' : {
        'name' : 'Children',
    },
    '2' : {
        'name' : 'Adults',
    },
    '3' : {
        'name' : 'All'
    }
}]

const productSchema = {
    id : joi.string().required(),
    brand : joi.string().min(1).max(20).required(),
    category : joi.string().max(30).required(),
    sku : joi.number().integer().max(11000).required(),
    status : joi.string().required(),
    mode_of_selling : joi.string().required(),
    price_inc_tax : joi.number().required(),
    price : joi.number().required(),
    demograph : joi.string().required(),
    metadata : joi.string().required()
}

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

// ****** For adding a new product to our store *******

app.post('/product', function(req, res) {
    
    let newproduct = {
        id: req.body.id,
        brand: req.body.brand,
        category: req.body.category,
        sku: req.body.sku,
        status : req.body.status,
        mode_of_selling : req.body.mode_of_selling,
        price_inc_tax : req.body.price_inc_tax,
        price : req.body.price,
        demograph : req.body.demograph,
        enrolled_users : 0
    };

    joi.validate(newproduct, productSchema, function(err, value) {
        if(err) {
            console.log(err);
            res.status(400).json({
                status: 'error',
                message: 'Invalid request data',
                data: newproduct
            });
        }
        else {
            product.push(newproduct);
            res.write('Product added successfully!!!!');
        }
    });

});

//******  Updating a product by SKU ********

app.put('/product',function(req,res) {
    const schema = {
        id : joi.string(),
        brand : joi.string().min(1).max(20),
        category : joi.string().max(30),
        sku : joi.number().integer().max(11000).required(),
        status : joi.string(),
        mode_of_selling : joi.string(),
        price_inc_tax : joi.number(),
        price : joi.number(),
        demograph : joi.string(),
        metadata : joi.string()
    }
    const result = joi.validate(req.body, schema)
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        if (!(result.value.sku in product)) {
            res.status(400).send({"message": "Product SKU Does not exist"});
        }
        else if(result.value.category && !(result.value.category in categories)){
            res.status(400).send({"message": "The category is does not exist"})
        }
        else{
            if(result.value.id)
            product[result.value.sku].id=result.value.id;
            if(result.value.brand)
            product[result.value.sku].price=result.value.brand;
            if(result.value.category)
            product[result.value.sku].category=result.value.category;
            if(result.value.status)
            product[result.value.sku].status=result.value.status;
            if(result.value.mode_of_selling)
            product[result.value.sku].mode_of_selling=result.value.mode_of_selling;
            if(result.value.price_inc_tax)
            product[result.value.sku].price_inc_tax=result.value.price_inc_tax;
            if(result.value.price)
            product[result.value.sku].price=result.value.price;
            if(result.value.demograph)
            product[result.value.sku].demograph=result.value.demograph;
            if(result.value.metadata){
            product[result.value.sku].metadata=result.value.metadata;
            }
            var dict=product[result.value.sku]
            res.status(200).send({
                "message": "The product is successfully updated", dict
                })
        }        
    }
});

// ****** FInding a product by different attributes of a product *******

app.get('/product/findByBrand',function(req,res) {
    var brand=req.query.brand;
    var dict={}
    for(prod in product){
        if(product[prod]['brand']==brand){
            dict[prod]=product[prod];
        }
    }
    if(Object.keys(dict).length>0){
        res.status(200).send(dict);
        }
    else
    res.status(404).send({"message":"No product with this name"});

})

// ***** For listing all items under a selected category *******

app.get('/product/findByCategory',function (req,res) {
    var category=req.query.category;
    var cnt=0;
    //find the category id of the given category
    for (cid in categories){
        if(categories[cid]['name']==category)
        {
            cnt=1;
            var catid=cid;
            break;
        }
    }
    if(cnt==0)
    {
        res.status(404).send({"message":"Category does not exist"});
    }
    //find all the products having that category id
    var dict={}
    for(prod in product){
        if(product[prod]['category']==catid){
            
            dict[prod]=product[prod];
        }
    }
    if(Object.keys(dict).length>0){
    res.status(200).send(dict);
    }
    else
    res.status(404).send({"message":"No product with this category"});

})

// ***** For listing all products based on their mode of selling *******

app.get('/product/findByMode',function (req,res) {
    var mode=req.query.mode_of_selling;
    var cnt=0;
    //find the category id of the given category
    for (mid in modes_of_selling){
        if(modes_of_selling[mid]['name']==mode)
        {
            cnt=1;
            var modeid=mid;
            break;
        }
    }
    if(cnt==0)
    {
        res.status(404).send({"message":"This mode of selling does not exist"});
    }
    //find all the products having that category id
    var dict={}
    for(prod in product){
        if(product[prod]['mode_of_selling']==modeid){
            
            dict[prod]=product[prod];
        }
    }
    if(Object.keys(dict).length>0){
    res.status(200).send(dict);
    }
    else
    res.status(404).send({"message":"No product with this Mode of being sold"});

})

// ***** Listing the products based on the demograph of its users *****

app.get('/product/findByDemograph',function (req,res) {
    var demogrph=req.query.demograph;
    var cnt=0;
    //find the category id of the given category
    for (mid in demographs){
        if(demographs[mid]['name']==demogrph)
        {
            cnt=1;
            var demoid=mid;
            break;
        }
    }
    if(cnt==0)
    {
        res.status(404).send({"message":"Demograph does not exist"});
    }
    //find all the products having that category id
    var dict={}
    for(prod in product){
        if(product[prod]['demograph']==demoid){
            
            dict[prod]=product[prod];
        }
    }
    if(Object.keys(dict).length>0){
    res.status(200).send(dict);
    }
    else
    res.status(404).send({"message":"No product with this Demograph value"});

})

// ****** Finding a product by its  SKU *******
app.get('/product/findBySKU',(req,res)=>{
    var sku=req.query.sku;
    var dict={}
    for(prod in product){
        if(product[prod]['sku']==sku){
            
            dict[prod]=product[prod];
        }
    }
    if(Object.keys(dict).length>0){
    res.status(200).send(dict);
    }
    else
    res.status(404).send({"message":"No product with this colour"});

})

// ******* Removing a product from our store ********

app.delete('/product/:id',(req,res)=>{
    var id=req.params.id;
    if(id in product){
        delete product[id];
        res.status(200).send({"message": "Deleted Successfully"});
    }
    else{
        res.status(404).send({"message": "Product Doesn't Exist"});
    }
});

// ***** Creating a new category ******
app.post('/category',function(req,res) {
    const schema = {
        id: joi.number().required(),
        name: joi.string().min(4).required(),
    }
    const result = joi.validate(req.body, schema)
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        if (result.value.id in categories) {
            res.status(403).send({"message": "Category Id already in use"});
        }
        else{
            var dict={}
            dict.name=result.value.name;
            dict.tax=result.value.tax;
            categories[result.value.id]=dict;
            res.status(200).send({
                "message": "The category was successfully added", dict
                })
        }        
    }
});

// ***** Deleting a particular category along with all its products ******

app.delete('/category/:id',function (req,res) {
    var id=req.params.id;
    if(id in categories){
        delete categories[id];
        //deleting the product in the given category
        for(prod in product){
            if(product[prod]['category']==id){
                
                delete product[prod];
            }
        }
        res.status(200).send({"message": "Deleted Successfully"});
    }
    else{
        res.status(404).send({"message": "Category Doesn't Exist"});
    }
});



app.listen(3000);
