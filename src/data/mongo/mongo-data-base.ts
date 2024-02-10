import mongoose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbName,
      });

      // este console.log es para ver si ya estamos conectados a la base de datos
      // console.log("connected")
      
      return true;
    } catch (error) {
      console.log("Mongo connection Error");
      throw error;
    }
  }
}
