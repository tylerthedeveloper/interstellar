"use strict";
class FbObject {
    constructor() {
        this.createTime = '';
        this.fields = [];
        this.name = '';
        this.updateTime = '';
    }
    FbObject(createTime, fields, name, updateTime) {
        this.createTime = createTime;
        this.fields = fields;
        this.name = name;
        this.updateTime = updateTime;
    }
}
const models = {
    FbObject: FbObject,
};
module.exports = models;
//# sourceMappingURL=fb.object.js.map