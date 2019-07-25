const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

/*
//Hardcoded data
const customers = [
  { id: "1", name: "John Doe", email: "john@gmail.com", age: 35 },
  { id: "2", name: "Steve Smith", email: "smith@gmail.com", age: 25 },
  { id: "3", name: "Sarah Williams", email: "sara@gmail.com", age: 32 }
];
*/

//Customer Type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //individual customer
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        /*
        for (let i = 0; customers.length; i++) {
          if (customers[i].id === args.id) {
            return customers[i];
          }
        }
        */
        return axios
          .get("http://localhost:3000/customers/" + args.id)
          .then(res => res.data);
      }
    },
    //all customers
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        //return customers;

        return axios
          .get("http://localhost:3000/customers/")
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
