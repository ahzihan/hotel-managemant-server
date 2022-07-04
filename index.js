const express = require( 'express' );
const { MongoClient, ServerApiVersion, ObjectId } = require( 'mongodb' );
const port = process.env.PORT || 5000;
const cors = require( 'cors' );
const app = express();

app.use( cors() );
require( 'dotenv' ).config();
app.use( express.json() );


app.get( '/', ( req, res ) => {
    res.send( "Hotel is Running Now" );
} );



const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@cluster0.b4jezta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 } );


async function run() {
    try {
        await client.connect();
        const packageCollection = client.db( "hotelManagement" ).collection( "singlePackage" );

        //Get multiple data
        app.get( '/single', async ( req, res ) => {
            const query = {};
            const cursor = packageCollection.find( query );
            const packages = await cursor.toArray();
            res.send( packages );
        } );

        app.get( '/double', async ( req, res ) => {
            const packageCollection = client.db( "hotelManagement" ).collection( "doublePackage" );
            const query = {};
            const cursor = packageCollection.find( query );
            const packages = await cursor.toArray();
            res.send( packages );
        } );

        app.get( '/family', async ( req, res ) => {
            const packageCollection = client.db( "hotelManagement" ).collection( "familyPackage" );
            const query = {};
            const cursor = packageCollection.find( query );
            const packages = await cursor.toArray();
            res.send( packages );
        } );

        //Get Single Data
        app.get( '/single/:id', async ( req, res ) => {
            const id = req.params.id;
            const query = { _id: ObjectId( id ) };
            const single = await packageCollection.findOne( query );
            res.send( single );
        } );

        //POST
        app.post( '/single', async ( req, res ) => {
            const newItem = req.body;
            const result = await packageCollection.insertOne( newItem );
            res.send( result );
        } );

        //Delete
        app.delete( '/single/:id', async ( req, res ) => {
            const id = req.params.id;
            const query = { _id: ObjectId( id ) };
            const result = await packageCollection.deleteOne( query );
            res.send( result );
        } );

    }
    finally {

    }
}
run().catch( console.dir );

app.listen( port, () => {
    console.log( 'Hotel is running port: ', port );
} );
