// @ts-nocheck
import mongoose from "mongoose";
import { createClient } from "redis";
import { log } from "../../utils/Logger";
const exec = mongoose.Query.prototype.exec;
const loger = log.Log("cache");
let url: any = process.env.REDIS_HOST;
let client = createClient({ url });

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function (...args) {
  loger.info("Executing");

  if (!this.useCache) {
    return exec.apply(this, ...args);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.model.collection.name,
    })
  );

  if (!client.isOpen) {
    try {
      await client.connect();
    } catch (err) {
      console.log(err);
    }
  }

  const cached = await client.hGet(this.hashKey, key);

  if (!cached) {
    const result = await exec.apply(this, ...args);

    client.hSet(this.hashKey, key, JSON.stringify(result));
    return result;
  }

  const doc = JSON.parse(cached);

  return Array.isArray(doc)
    ? doc.map((e) => new this.model(e))
    : new this.model(doc);
};

export default mongoose;

export const clearHash = (hashKey) => {
  client.del(JSON.stringify(hashKey));
};
