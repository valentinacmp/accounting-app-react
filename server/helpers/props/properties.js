const props = {
  host: "localhost",
  user: "root",
  password: "",
  database: "accounting_db",
  db: "connecta2",

  //GLOBAL QUERYS

  query_get: "SELECT * FROM ??.??",
  query_deleteDB: "DROP DATABASE IF EXISTS ??",

  //ACCESO A LOS USUARIOS ACCOUNTING

  getAccoUser:
    "SELECT usuario FROM connecta2.webusuario INNER JOIN connecta2.restriccionesweb ON connecta2.webusuario.idUser=restriccionesweb.idUser WHERE restriccionesweb.ID_MODULO = 46",
  checkAccoUser:
    "SELECT usuario FROM connecta2.webusuario INNER JOIN connecta2.restriccionesweb ON connecta2.webusuario.idUser = restriccionesweb.idUser WHERE restriccionesweb.ID_MODULO = 46 AND connecta2.webusuario.usuario = ?",

  //CHEQUEAR SI LA BASE DE DATOS EXISTE

  checkDatabases: "SHOW DATABASES LIKE ?",
  createDatabase: "CREATE DATABASE IF NOT EXISTS ??",
  createDB: "CREATE DATABASE ??",
  // showDatabases: "SHOW DATABASES",

  //EMPRESA EN CONNECTA2 (CLIENTE)

  getSucursal: "SELECT * FROM connecta2.sucursal WHERE empresa= ?",
  getAllCompanies: "SELECT * FROM connecta2.empresa",
  createCompanyUser:
    "INSERT INTO `connecta2`.`empresa` (`empresa`, `nombre`,`rif`,`diasevaluacion`,`fechainicio`,`fechafinal`,`estatus`) VALUES(?,?,?,?,?,?,?)",
  checkCompanyUser: "SELECT * FROM connecta2.empresa WHERE empresa= ?",
  createSucursal:
    "INSERT INTO `connecta2`.`sucursal` (`empresa`, `sucursal`, `nombre`,`estatus`) VALUES(?,?,?,?)",
  checkSucursal:
    "SELECT * FROM connecta2.sucursal WHERE empresa=? AND sucursal=?",

  //OBETENER LAS EMPRESAS TOMADAS -> NOMBRE DE LA BD Y DE LA EMPRESA
  databases:
    "SELECT TABLE_SCHEMA FROM information_schema.TABLES WHERE TABLE_NAME = ?",

  //EMPRESA

  // query_ShowDB: "SHOW DATABASES",
  // databases: "SELECT TABLE_SCHEMA FROM information_schema.TABLES WHERE TABLE_NAME = ?",
  createCompany:
    "INSERT INTO ??.??(`empresa_des`,`empresa_direccion`,`empresa_contacto`,`empresa_ciudad`,`empresa_telefono`,`empresa_rif`,`empresa_telefax`,`empresa_email`,`empresa_website`,`empresa_status`, `empresa_fecha_inicio`,`empresa_fecha_fin`,`empresa_separador_pc`,`empresa_mascara_pc`,`empresa_simbolo`,`empresa_fecha_mov`,`empresa_centros_costos`,`empresa_correlativo`,`empresa_num_lineas`,`empresa_separador_cc`,`empresa_mascara_cc`,`empresa_created_at`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
  deleteCompany: "DELETE FROM ??.?? WHERE `empresa_id` = 1",
  updateCompany:
    "UPDATE ??.?? SET `empresa_des` = ?,`empresa_direccion` = ?,`empresa_contacto` = ?,`empresa_ciudad` = ?,`empresa_telefono` = ?,`empresa_rif` = ?,`empresa_telefax` = ?,`empresa_email` = ?,`empresa_website` = ?,`empresa_status` = ?, `empresa_fecha_inicio` = ?,`empresa_fecha_fin` = ?, `empresa_separador_pc` = ?,`empresa_mascara_pc` = ?,`empresa_simbolo` = ?,`empresa_fecha_mov` = ?,`empresa_centros_costos` = ?,`empresa_correlativo` = ?,`empresa_num_lineas` = ?,`empresa_separador_cc` = ?,`empresa_mascara_cc` = ?,`empresa_created_at` = ? WHERE `empresa_id` = 1 ",
  createTable:
    "CREATE TABLE IF NOT EXISTS  ??.?? (`id` int(11) NOT NULL AUTO_INCREMENT, PRIMARY KEY(`id`)) ENGINE = InnoDB DEFAULT CHARSET = latin1",
  query_drop: "DROP TABLE IF EXISTS ??.??",
  getCompanies: "SELECT * FROM ??.?? WHERE `empresa_id` = 1",
  query_companyName: "SELECT empresa_des FROM ??.??",

  //USUARIO

  createUser:
    "INSERT INTO ??.`users`(`user_name`, `user_lastname`,`user_username`,`user_email`,`user_password`,`user_address`,`user_created_at`) VALUES (?,?,?,?,?,?,?)",
  deleteUser: "DELETE FROM ??.`users` WHERE `user_id` = ?",
  updateUser:
    "UPDATE ??.`users` SET `user_name` = ?,`user_lastname` = ?,`user_username` = ?,`user_role` = ?,`user_email` = ?,`user_password` = ?,`user_address` = ?,`user_status` = ?,`user_type` = ?,`user_expiration_date` = ? WHERE `user_id` = ?",
  getUsers: "SELECT * FROM accounting_db.users;",
  checkUser:
    "SELECT user_email, user_username FROM accounting_db.users WHERE user_email = ? OR user_username = ?",
  getUserByEmail: "SELECT * FROM accounting_db.users WHERE user_email = ?",

  //USUARIO EN LA TABLE WEBUSUARIO

  createAccUser:
    "INSERT INTO `connecta2`.`webusuario`(`usuario`,`clave`,`clave2`,`nombre_perfil`,`fecha`,`tipoUsuario`,`perfil`,`consecutivo`,`serialseguro`) VALUES(?,?,?,?,?,?,?,?,?);",
  checkAccUser:
    "SELECT usuario FROM `connecta2`.`webusuario` WHERE usuario = ?",
  getUserByName: "SELECT * FROM `connecta2`.`webusuario` WHERE usuario=?",
  getUser: "SELECT * FROM connecta2.webusuario",
  getAccUser: "SELECT * FROM `connecta2`.`webusuario` WHERE tipoUsuario = 3",
  checkModule:
    "SELECT * FROM connecta2.restriccionesweb WHERE idUser=? AND ID_MODULO=46",
  getUserId: "SELECT idUser FROM `connecta2`.`webusuario` WHERE usuario=?",
  deleteAccUser:
    "DELETE FROM `connecta2`.`restriccionesweb` WHERE idUser=? AND ID_MODULO=46",

  //USUARIO EN LA TABLA USUARIOBDD

  getAllUsers: "SELECT * FROM connecta2.usuariobdd",
  insertAccUser:
    "INSERT INTO `connecta2`.`usuariobdd` (`empresa`,`sucursal`,`usuario`, `nombre`, `clave`, `perfil`, `consecutivo`, `serialseguro`) VALUES(?,?,?,?,?,?,?,?)",
  insertAcc:
    "INSERT INTO connecta2.usuariobdd (usuario, nombre, clave, perfil, consecutivo) SELECT usuario, nombre_perfil, clave, tipoUsuario, consecutivo FROM connecta2.webusuario WHERE `idUser` = ?",
  createUserProfile:
    "INSERT INTO connecta2.usuarioperfil(idUser, perfiluser, idUserCreador, idUserPrincipal) SELECT idUser, tipoUsuario, idUser, idUser FROM connecta2.webusuario WHERE `idUser` = ?",
  createUserProfileAcc:
    "INSERT INTO connecta2.usuarioperfil(idUser, perfiluser, idUserCreador, idUserPrincipal) SELECT idUser, 3 , ? , idUser FROM connecta2.webusuario WHERE `idUser` = ?",
  createUserRestrictions:
    "INSERT INTO connecta2.restriccionesweb(ID_MODULO, idUser, id_usuarioperfil) SELECT connecta2.modulosweb.ID_MODULOWEB, connecta2.webusuario.idUser, connecta2.usuarioperfil.id_usuarioperfil FROM connecta2.modulosweb, connecta2.webusuario, connecta2.usuarioperfil WHERE connecta2.modulosweb.ID_MODULOWEB = 46 AND connecta2.webusuario.idUser = ? AND connecta2.usuarioperfil.id_usuarioperfil = ?",
  createUserRestriction:
    "INSERT INTO connecta2.restriccionesweb(`ID_MODULO`,`idUser`,`id_usuarioperfil`) VALUES(46, ?, ?)",
  checkUserProfile: "SELECT * FROM connecta2.usuarioperfil WHERE idUser=?",
  createUserAccProfile:
    "INSERT INTO connecta2.usuarioperfil(idUser, perfiluser, idUserCreador, idUserPrincipal) SELECT idUser, '3', ? , idUser FROM connecta2.webusuario WHERE `idUser` = ?",

  //USUARIO ACCOUNTING - CREADO POR EL USUARIO MASTER

  createUserAcc:
    "INSERT INTO ??.??(`usuario_nombre`,`usuario_des`,`usuario_clave`,`usuario_created_at`,`usuario_expiration_date`,`usuario_status`,`usuario_ubicacion`,`usuario_email`,`usuario_grupo`,`usuario_acceso_empresa`, `usuarios_accesos`) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
  checkUserAcc: "SELECT usuario_nombre FROM ??.?? WHERE usuario_nombre = ? ",
  query_deleteUserAcc: "DELETE FROM ??.?? WHERE usuario_nombre = ?",
  query_deleteFromC2: "DELETE FROM connecta2.webusuario WHERE usuario = ?",
  query_updateUserAcc:
    "UPDATE ??.?? SET `usuario_nombre` = ?, `usuario_des` = ?, `usuario_clave` = ?,`usuario_expiration_date` = ?, `usuario_status` = ?, `usuario_ubicacion` = ?, `usuario_email` = ?, `usuario_acceso_empresa` = ?, `usuarios_accesos` = ? WHERE `user_id` = ?",
  query_deleteAllUserAcc: "DELETE FROM ??.?? WHERE usuario_acceso_empresa = ?",

  //OBTENER ID DEL USUARIO CREADOR

  query_creatorId:
    "SELECT idUserCreador FROM connecta2.usuarioperfil WHERE idUserPrincipal = ?",

  //OBTENER PERMISOS DEL USUARIO

  query_permissions:
    "SELECT usuarios.usuarios_accesos, usuarios.usuario_acceso_empresa, webusuario.usuario FROM ??.usuarios, connecta2.webusuario WHERE usuarios.usuario_nombre = webusuario.usuario",

  //PLAN DE CUENTAS

  query_createCA:
    "INSERT INTO ??.?? (`plan_de_cuentas_cod`, `plan_de_cuentas_cod_replace` ,`plan_de_cuentas_des`,`plan_de_cuentas_actv`,`plan_de_cuentas_created_at`) VALUES (?,REPLACE(plan_de_cuentas_cod,?,?),?,?,?)",
  query_deleteCA: "DELETE FROM ??.?? WHERE ?? = ?",
  query_updateCA:
    "UPDATE ??.?? SET `plan_de_cuentas_cod` = ?,`plan_de_cuentas_des` = ?, `plan_de_cuentas_actv` = ? WHERE `plan_de_cuentas_id` = ?",
  query_checkCA:
    "SELECT plan_de_cuentas_cod_replace FROM ??.?? WHERE plan_de_cuentas_cod = ?",

  //CENTROS DE COSTOS

  query_createCC:
    "INSERT INTO ??.?? (`centros_de_costos_cod`, `centros_de_costos_cod_replace` ,`centros_de_costos_des`,`centros_de_costos_status`,`centros_de_costos_created_at`) VALUES (?,REPLACE(centros_de_costos_cod,?,?),?,?,?)",
  query_checkCC:
    "SELECT centros_de_costos_cod_replace FROM ??.?? WHERE centros_de_costos_cod = ?",
  query_updateCC:
    "UPDATE ??.?? SET `centros_de_costos_id` = ?, `centros_de_costos_cod` = ?, `centros_de_costos_des` = ?, `centros_de_costos_status` = ? WHERE `centros_de_costos_id` = ?",

  //MONEDAS

  query_createCurrency:
    "INSERT INTO ??.??(`monedas_des`,`monedas_simbolo`,`monedas_factor`,`monedas_status`,`monedas_created_at`) VALUES(?,?,?,?,?)",
  query_checkCurrency: "SELECT monedas_des FROM ??.?? WHERE monedas_des = ?",
  query_deleteCurrency: "DELETE FROM ??.?? WHERE monedas_id = ?",
  query_updateCurrency:
    "UPDATE ??.?? SET `monedas_des` = ?, `monedas_simbolo` = ?, `monedas_factor` = ?, `monedas_status` = ? WHERE `monedas_id` = ?",

  //PARTIDAS PRESUPUESTARIAS

  query_createBudget:
    "INSERT INTO ??.?? (`partidas_presupuestarias_cod`,`partidas_presupuestarias_des`,`partidas_presupuestarias_espec`,`partidas_presupuestarias_responsable`,`partidas_presupuestarias_partida`,`partidas_presupuestarias_cc`,`partidas_presupuestarias_cuentas`,`partidas_presupuestarias_mod`,`partidas_presupuestarias_total`,`partidas_presupuestarias_fecha_inicio`,`partidas_presupuestarias_fecha_fin`,`partidas_presupuestarias_status`,`partidas_presupuestarias_created_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?) ",
  query_checkBudget:
    "SELECT partidas_presupuestarias_des FROM ??.?? WHERE partidas_presupuestarias_des = ?",
  query_deleteBudget: "DELETE FROM ??.?? WHERE partidas_presupuestarias_id = ?",
  query_updateBudget:
    "UPDATE ??.?? SET partidas_presupuestarias_cod` = ?,`partidas_presupuestarias_des` = ?, `partidas_presupuestarias_espec` = ?,`partidas_presupuestarias_responsable` = ?,`partidas_presupuestarias_partida` = ?,`partidas_presupuestarias_cc` = ?,`partidas_presupuestarias_cuentas` = ?,`partidas_presupuestarias_mod` = ?,`partidas_presupuestarias_total` = ?,`partidas_presupuestarias_fecha_inicio` = ?,`partidas_presupuestarias_fecha_fin` = ?,`partidas_presupuestarias_status` = ? WHERE `partidas_presupuestarias_id` = ?",
  query_createBudgetCC: "INSERT INTO ??.?? (`partidas_presupuestarias_id`,`partidas_presupuestarias_cc_partida`,`partidas_presupuestarias_cc_total`,`partidas_presupuestarias_cc_codigo`,`partidas_presupuestarias_cc_des`,`partidas_presupuestarias_cc_pres`,`partidas_presupuestarias_cc_asig`,`partidas_presupuestarias_cc_dif`,`partidas_presupuestarias_cc_created_at`) VALUES (?,?,?,?,?,?,?,?,?)",
  query_getBudgetCC: "SELECT * FROM ??.?? WHERE partidas_presupuestarias_id = ?",

  //TABLAS

  tableEmpresa:
    "CREATE TABLE IF NOT EXISTS  ??.?? (`empresa_id` int(11) NOT NULL DEFAULT 1,`empresa_des` varchar(45) NOT NULL,`empresa_direccion` varchar(45) NOT NULL,`empresa_contacto` varchar(45) NOT NULL,`empresa_ciudad` varchar(45) NOT NULL,`empresa_telefono` varchar(45) NOT NULL,`empresa_rif` varchar(45) NOT NULL,`empresa_telefax` varchar(45) NOT NULL,`empresa_email` varchar(45) NOT NULL,`empresa_website` varchar(45) NOT NULL,`empresa_status` varchar(45) NOT NULL,`empresa_fecha_inicio` datetime NOT NULL,`empresa_fecha_fin` datetime NOT NULL,`empresa_separador_pc` varchar(45) NOT NULL,`empresa_mascara_pc` varchar(45) NOT NULL,`empresa_simbolo` varchar(45) NOT NULL,`empresa_fecha_mov` varchar(45) NOT NULL,`empresa_centros_costos` varchar(45) NOT NULL,`empresa_correlativo` varchar(45) NOT NULL,`empresa_num_lineas` varchar(45) NOT NULL,`empresa_separador_cc` varchar(45) NOT NULL,`empresa_mascara_cc` varchar(45) NOT NULL,`empresa_created_at` datetime NOT NULL, PRIMARY KEY (`empresa_id`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1",
  tableActivos:
    "CREATE TABLE IF NOT EXISTS  ??.?? (`activos_id` int(45) NOT NULL AUTO_INCREMENT,`activos_cod` varchar(45) NOT NULL,`activos_des` varchar(45) NOT NULL,`activos_tipos` varchar(45) NOT NULL,`activos_created_at` datetime NOT NULL,PRIMARY KEY (`activos_id`)) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1",
  tableCC:
    "CREATE TABLE IF NOT EXISTS  ??.?? (`centros_de_costos_cod` varchar(45) NOT NULL,`centros_de_costos_cod_replace` varchar(45) NOT NULL,`centros_de_costos_des` varchar(45) NOT NULL,`centros_de_costos_status` varchar(45) NOT NULL,`centros_de_costos_created_at` datetime NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1",
  tableComprobantes:
    "CREATE TABLE IF NOT EXISTS  ??.?? (`comprobantes_id` int(11) NOT NULL AUTO_INCREMENT,`comprobantes_des` varchar(45) NOT NULL,`comprobantes_tipo` varchar(45) NOT NULL,`comprobantes_numero` varchar(45) NOT NULL,`comprobantes_fecha` date NOT NULL,`comprobantes_created_at` datetime NOT NULL,PRIMARY KEY (`comprobantes_id`)) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1",
  tableMonedas:
    "CREATE TABLE IF NOT EXISTS  ??.?? (`monedas_id` int(11) NOT NULL AUTO_INCREMENT,`monedas_des` varchar(45) NOT NULL,`monedas_simbolo` varchar(45) NOT NULL,`monedas_factor` varchar(45) NOT NULL,`monedas_status` varchar(45) NOT NULL,`monedas_created_at` datetime NOT NULL,PRIMARY KEY (`monedas_id`)) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1",
  tablePartidas:
    "CREATE TABLE IF NOT EXISTS  ??.?? (`partidas_presupuestarias_id` int(11) NOT NULL AUTO_INCREMENT,`partidas_presupuestarias_cod` varchar(45) NOT NULL,`partidas_presupuestarias_des` varchar(45) NOT NULL,`partidas_presupuestarias_espec` varchar(45) NOT NULL,`partidas_presupuestarias_responsable` varchar(45) NOT NULL,`partidas_presupuestarias_status` varchar(45) NOT NULL,`partidas_presupuestarias_created_at` datetime NOT NULL,PRIMARY KEY (`partidas_presupuestarias_id`)) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1",
  tablePlan:
    "CREATE TABLE IF NOT EXISTS  ??.?? (`plan_de_cuentas_cod` varchar(100) NOT NULL,`plan_de_cuentas_cod_replace` varchar(100) NOT NULL,`plan_de_cuentas_des` varchar(45) NOT NULL,`plan_de_cuentas_actv` varchar(45) NOT NULL,`plan_de_cuentas_created_at` datetime NOT NULL,PRIMARY KEY (`plan_de_cuentas_cod`)) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1",
  tableTerceros:
    "CREATE TABLE IF NOT EXISTS  ??.?? (`terceros_id` int(11) NOT NULL AUTO_INCREMENT,`terceros_cod` varchar(45) NOT NULL,`terceros_des` varchar(45) NOT NULL,`terceros_tipo` varchar(45) NOT NULL,`terceros_contacto` varchar(45) NOT NULL,`terceros_direccion` varchar(45) NOT NULL,`terceros_ciudad` varchar(45) NOT NULL,`terceros_telefono` varchar(45) NOT NULL,`terceros_rif` varchar(45) NOT NULL,`terceros_status` varchar(45) NOT NULL,`terceros_created_at` datetime NOT NULL,PRIMARY KEY (`terceros_id`)) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1",
  noTaken:
    "CREATE TABLE IF NOT EXISTS  ??.?? (`no_taken_id` int(11) NOT NULL AUTO_INCREMENT, PRIMARY KEY(`no_taken_id`)) ENGINE = InnoDB DEFAULT CHARSET = latin1",
  tableUser:
    "CREATE TABLE IF NOT EXISTS  ??.?? (`id_user_username` int(11) NOT NULL AUTO_INCREMENT,`username` varchar(45) NOT NULL,PRIMARY KEY (`id_user_username`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1",
  inserUser: "INSERT INTO ??.?? (`username`) VALUES (?)",
  tableUsuarios:
    "CREATE TABLE IF NOT EXISTS ??.?? (`user_id` int(11) NOT NULL AUTO_INCREMENT,`usuario_nombre` varchar(45) NOT NULL,`usuario_des` varchar(45) NOT NULL,`usuario_clave` varchar(45) NOT NULL,`usuario_created_at` datetime NOT NULL,`usuario_expiration_date` datetime NOT NULL,`usuario_status` varchar(45) NOT NULL DEFAULT '1',`usuario_ubicacion` varchar(45) NOT NULL,`usuario_email` varchar(45) NOT NULL,`usuario_grupo` varchar(45) NOT NULL,`usuario_acceso_empresa` varchar(45) NOT NULL,PRIMARY KEY (`user_id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1"

  // //THIRD PARTIES

  // query_createThirdParThirdParty:
  //   "INSERT INTO ??.??(`terceros_cod`,`terceros_des`,`terceros_tipo`,`terceros_contacto`,`terceros_direccion`,`terceros_ciudad`,`terceros_telefono`,`terceros_rif`,`terceros_status`,`terceros_created_at`) VALUES(?,?,?,?,?,?,?,?,?,?)",
  // query_deleteThirdParty: "DELETE FROM ??.?? WHERE ?? = ?",
  // query_updateThirdParty:
  //   "UPDATE ??.?? SET `terceros_cod` = ?,`terceros_des` = ?,`terceros_tipo` = ?,`terceros_contacto` = ?,`terceros_direccion` = ?, `terceros_ciudad` = ?, `terceros_telefono` = ?, `terceros_rif` = ?, `terceros_status` = ? WHERE `terceros_id` = ?",

  // //ASSETS

  // query_createAsset:
  //   "INSERT INTO ??.?? (`activos_cod`,`activos_des`,`activos_tipos`,`activos_created_at`) VALUES (?,?,?,?)",
  // query_deleteAsset: "DELETE FROM ??.?? WHERE ?? = ?",
  // query_updateAsset:
  //   "UPDATE ??.?? SET `activos_cod` = ?,`activos_des` = ?, `activos_tipos` = ? WHERE `activos_id` = ?",

  //BUDGET

  // query_createBudget:
  //   "INSERT INTO ??.?? ( `partidas_presupuestarias_cod`,`partidas_presupuestarias_des`,`partidas_presupuestarias_espec`,`partidas_presupuestarias_responsable`,`partidas_presupuestarias_status`,`partidas_presupuestarias_created_at`) VALUES (?,?,?,?,?,?) ",
  // query_deleteBudget: "DELETE FROM ??.?? WHERE ?? = ?",
  // query_updateBudget:
  //   "UPDATE ??.?? SET `partidas_presupuestarias_cod` = ?, `partidas_presupuestarias_des` = ?, `partidas_presupuestarias_espec` = ?, `partidas_presupuestarias_responsable` = ?, `partidas_presupuestarias_status` = ? WHERE `partidas_presupuestarias_id` = ? ",
  // query_Budget: "SELECT * FROM ??.??",

  //ACCOUNTING VOUCHERS

  // query_createVoucher:
  //   "INSERT INTO ??.?? (`comprobantes_des`,`comprobantes_tipo`,`comprobantes_numero`,`comprobantes_fecha`,`comprobantes_created_at`) VALUES (?,?,?,?,?)",
  // query_deleteVoucher: "DELETE FROM ??.?? WHERE ?? = ?",
  // query_updateVoucher:
  //   "UPDATE ??.?? SET `comprobantes_des` = ?,`comprobantes_tipo` = ?,`comprobantes_numero` = ?, `comprobantes_fecha` = ? WHERE `comprobantes_id` = ?",
  // query_Voucher: "SELECT * FROM ??.??"
};

module.exports = props;
