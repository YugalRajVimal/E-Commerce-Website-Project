import UserModel from '../models/user.model.js';
import ProductModel from '../models/product.model.js';

export default class UserController{

    getRegister(req,res){
        res.render('register');
    }

    getLogIn(req,res){
        res.render('login',{
            errorMessage: null,
        });
    }

    postRegister(req,res){
        const {name ,email ,password} = req.body;
        UserModel.add(name,email,password);
        res.render('login',{
            errorMessage: null,
        });
    }

    postLogIn(req,res){
        const {email, password} = req.body;
        const user = UserModel.validateUser(email, password);
        if(!user){
            return res.render('login',{
                errorMessage: "Invalid Login Details",
            });
        }
        req.session.userEmail=email;
        var products = ProductModel.getAll();
        res.render('index', { products, userEmail: req.session.userEmail  });

    }

    getLogOut(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log("Error in destroying sessions" , err);
            }
            else{
                res.redirect('/login');
            }
        })
        res.clearCookie('lastVisit');
    }

}