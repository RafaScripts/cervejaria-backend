import knexfile from "../../knexfile";
const Knex = require("knex")(knexfile.development);


export default Knex;