//const { ApolloServer, gql} = require("apollo-server");
require('dotenv').config();

import { ApolloServer} from "apollo-server";
import schema from "./schema";

const PORT = process.env.PORT;
const server = new ApolloServer({
    schema,
    context: {
        Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE1MjA3NzgwfQ.VG9D743GwUpSvGEXbXiR8uFfKADvEKvG1bg6lRqrN6A"
    },
});

server.listen(PORT).then(()=> console.log(`🚀 Server is running on http://localhost:${PORT} 🧡`));

