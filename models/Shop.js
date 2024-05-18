const assert = require("assert");
const Definer = require("../lib/mistake");
const MemberModel = require("../schema/member.model");
const Member = require("../models/Member");

class Shop {
    constructor() {
        this.memberModel = MemberModel;
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
}

module.exports = Shop;