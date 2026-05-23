const mongoose = require('mongoose');

const connectDB = async () => {
  try {

    await mongoose.connect(
      'mongodb://users:14112006@ac-gc6vzdr-shard-00-00.80v1brr.mongodb.net:27017,ac-gc6vzdr-shard-00-01.80v1brr.mongodb.net:27017,ac-gc6vzdr-shard-00-02.80v1brr.mongodb.net:27017/?ssl=true&replicaSet=atlas-utpb6j-shard-0&authSource=admin&appName=Cluster0'
    );

    console.log("MongoDB Connected");

  } catch (error) {

    console.log("MongoDB Connection Error:", error);

    process.exit(1);
  }
};

module.exports = connectDB;