// Este es el modulo mysql2 en modo promesas para peticiones asincronas a la bbdd
import mysql2 from "mysql2/promise";
//esto es la importancion de la database que configuramos en enviroments
import enviroments from "../config/enviroments.js";
//creamos una coleccion que va a tener los datos de la conexion a la bbdd
const {database} = enviroments;

//con createpool nos encargamos de crear la conexion a la bbdd, usando los datos que guardamos en {database}
const connection = mysql2.createPool({
    host: database.host,
    database: database.name,
    user:database.user,
    password:database.pasword
});

//finalmente exportamos las conexiones para que sea reutilizado
export default connection;