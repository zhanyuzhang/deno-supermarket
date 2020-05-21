import {
  HandlerFunc,
  Context,
} from "../deps.ts";

import db from "../config/db.ts";

// DB collection made
const database = db.getDatabase;
const goods = database.collection("goods");

interface Good {
  _id: {
    $oid: string;
  };
  name: string;
  price: string;
  desc: string;
}

export const createGood: HandlerFunc = async (c: Context) => {
  try {
    const body = await (c.body());
    if (!Object.keys(body).length) {
      return c.json({
        code: 400,
        msg: `Request can't be empty`
      }, 200);
    }
    const { name, price, desc } = body;

    const insertedGood = await goods.insertOne({
      name,
      price,
      desc,
    });

    return c.json({
      code: 200,
      msg: 'create successfully'
    }, 200);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const fetchAllGoods: HandlerFunc = async (c: Context) => {
  try {
    const fetchedGoods: Good[] = await goods.find();

    if (fetchedGoods) {
      const fetchedGoodsList = fetchedGoods.length
        ? fetchedGoods.map((good) => {
          const { _id: { $oid }, name, price, desc } = good;
          return { id: $oid, name, price, desc };
        })
        : [];
      return c.json({
        code: 200,
        data: fetchedGoodsList
      }, 200);
    }
  } catch (error) {
    return c.json(error, 500);
  }
};

export const fetchOneGood: HandlerFunc = async (c: Context) => {
  try {
    const { name } = c.params as { name: string };

    const fetchedGood = await goods.findOne({name: decodeURIComponent(name)});

    if (fetchedGood) {
      const { _id: { $oid }, name, price, desc } = fetchedGood;
      return c.json({
        code: 200,
        data: {
          id: $oid, name, price, desc
        }
       }, 200);
    }
    return c.json({
      code: 404,
      msg: 'Good not found'
    }, 200);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const updateGood: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params as { id: string };

    const body = await (c.body()) as {
      name?: string;
      price?: string;
      desc?: string;
    };

    if (!Object.keys(body).length) {
      return c.json({
        code: 400,
        msg: "Request can't be empty",
      }, 200);
    }

    const fetchedGood = await goods.findOne({ _id: { "$oid": id } });

    if (fetchedGood) {
      const { matchedCount } = await goods.updateOne(
        { _id: { "$oid": id } },
        { $set: body },
      );
      if (matchedCount) {
        return c.json({
          code: 200,
          msg: 'Good updated successfully!'
        }, 200);
      }
      return c.json({
        code: 500,
        msg: 'Unable to update Good'
      }, 200);
    }

    return c.json({
      code: 404,
      msg: 'Good not found'
    }, 200);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const deleteGood: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params as { id: string };

    const fetchedGood = await goods.findOne({ _id: { "$oid": id } });

    if (fetchedGood) {
      const deleteCount = await goods.deleteOne({ _id: { "$oid": id } });
      console.log(deleteCount)
      if (deleteCount) {
        return c.json({code: 200, msg: 'ok'}, 200);
      }
      return c.json({code: 500, msg: 'Unable to delete good'}, 200);
    }

    return c.json({
      code: 404,
      msg: 'good not found'
    }, 200);
  } catch (error) {
    return c.json(error, 500);
  }
};