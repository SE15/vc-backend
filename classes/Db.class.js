const mysql = require('mysql');
const {promisify} = require("util");
const _ = require("lodash");
var pool = require('index');
const { createConnection } = require('net');
const { PRIORITY_LOW } = require('constants');
let instance=null;
class Db{
    constructor(){
        
    }


   
    //to count skills
    countQuery(table="",where=[],groupBy="") {
        if (typeof this.table != "string" || this.table.length < 1)
          throw new Error("invalid table name");
        if (where.length > 0) {
              
              where = " WHERE " + where.join(" AND ");  
        }
        if (groupBy.length > 0) {
              
            groupBy = " GROUP BY " + groupBy;  
        }       
        try {
            pool.query(`SELECT COUNT(*) AS total FROM ${this.pool.database}.${table} ${where} ${groupBy} `);
          } catch (e) {
            console.log("query exception", e);
            return new Promise((rs, rj) => rj(e));
          }
    }

    //Search user, search event
    search(table="",fields=["*"], where=[],limit="limit",offset="offset",groupBy="",orderby=[]){
        if (typeof this.table != "string" || this.table.length < 1)
          throw new Error("invalid table name");
        if (where.length > 0) {
              
            where = " WHERE " + where.join(" AND ");  
        }
        if (groupBy.length > 0) {
              
            groupBy = " GROUP BY " + groupBy;  
        }
        if (orderby.length > 0) {
              
            orderby = " ORDER BY " + orderby.join(",");  
        }
        try {
            let extra = "";
            if (!isNaN(limit)) extra = " LIMIT " + limit;
            if (!isNaN(offset)) extra += " OFFSET " + offset;
            pool.query( `SELECT ${fields} FROM ${this.pool.database}.${table} ${where} ${groupBy} ${orderby} ${extra}`);
          } catch (e) {
            console.log("query exception", e);
            return new Promise((rs, rj) => rj(e));
          }

    
    }

    async insertNew(table,rows = [],fields=["*"]) {
        if (typeof this.table != "string" || this.table.length < 1)
          throw new Error("invalid table name");
        if (!Array.isArray(rows) && rows.length < 1)
          throw new Error("`rows` variable should be array and must have values");
        
        try {
            pool.query(
            `INSERT INTO ${this.pool.database}.${table} (${fields}) VALUES (${rows.join(", ")})`
          );
        } catch (e) {
          throw new Error(e);
        }
      }

      async update(set = [], condition = []) {
        if (typeof this.table != "string" || this.table.length < 1)
          throw new Error("invalid table name");
        if (!Array.isArray(set) && set.length < 1)
          throw new Error("`set` variable should be array and must have values");
        let where = "";
        if (condition.length > 0) where = " WHERE " + condition.join(" AND ");
        
        try {
            pool.query(
            `UPDATE ${this.pool.database}.${table} SET ${set.join(", ")} ${where}`
          );
        } catch (e) {
          throw new Error(e);
        }
        
      }





}
