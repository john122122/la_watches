const assert = require("assert");
const Definer = require("../lib/mistake");
const memberModel = require("../schema/member.model");
const Member = require("../models/Member");
const { shapeIntoMongooseObjectId } = require("../lib/config");

class Shop {
  constructor() {
    this.memberModel = memberModel;
  }

async getAllShopData() {
    try {
      const result = await this.memberModel
        .find({
          mb_type: "SHOP",
        })
        .exec();
                
      assert(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
  }
}
  
async updateShopByAdminData(update_data) {
  try {
    const id = shapeIntoMongooseObjectId(update_data?.id);
    const result = await this.memberModel
      .findByIdAndUpdate({ _id: id }, update_data, {
        runValidators: true,
        lean: true,
        returnDocument: "after",
      })
      .exec();
    
    assert.ok(result, Definer.general_err1);
    return result;
  } catch (err) {
    throw err;
  }
}
  
}

module.exports = Shop;