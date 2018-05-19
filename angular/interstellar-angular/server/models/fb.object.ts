class FbObject {
    createTime = '';
    fields: Array<any> = [];
    name = '';
    updateTime = '';

    FbObject(createTime: string,
             fields: Array<any>,
             name: string,
             updateTime: string) {
        this.createTime = createTime;
        this.fields = fields ;
        this.name = name;
        this.updateTime = updateTime;
    }
}

const models = {
    FbObject: FbObject,
};

module.exports = models;
