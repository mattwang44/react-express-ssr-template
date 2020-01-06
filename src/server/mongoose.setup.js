import mongoose from "mongoose";

export default function setup() {
  const option = { useUnifiedTopology: true, useNewUrlParser: true };
  mongoose.connect("mongodb://host.docker.internal:27017", option);
  mongoose.Promise = Promise;
}
