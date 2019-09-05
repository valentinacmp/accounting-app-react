module.exports.isAuth = (req,res,next)=>{
    if (req.isAuthenticated()) {
        next();
        console.log('no logout');
    }else{     
        res.send({
            status: 400,
            response: 'Debes de haber iniciado sesion'
        });
        console.log('Debes de haber iniciado sesion');
    }
}

module.exports.isLogged=(req,res,next)=>{
    if (req.isAuthenticated()) {
        res.send({
            status: 304,
            response: 'Ya existe una sesion'
        });
        console.log('Ya existe una sesion', req.isAuthenticated());
    }
    else{
        next();
        console.log('inicio sesion ok', req.isAuthenticated());
    }
}