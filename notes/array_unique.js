//思路清晰很重要


let obj = [
    { "indexcode": "000905", "stkqty": 2, "new_nav": 30.2 },
    { "indexcode": "399007", "stkqty": 75, "new_nav": 9 },
    { "indexcode": "399007", "stkqty": 12, "new_nav": 39 },
    { "indexcode": "399007", "stkqty": 0.7, "new_nav": 3.239 },
    { "indexcode": "000998", "stkqty": 15, "new_nav": 7 }
];


let keyIndex = {}, objItem, result = [], index, baseItem, keyCnt = 0;
for (let i = 0; i < obj.length; i++) {
    objItem = obj[i];
    if (undefined === keyIndex[objItem.indexcode]) {
        index = result.length;
        keyIndex[objItem.indexcode] = index;
        objItem.key = keyCnt++;
        result.push(objItem);
    } else {
        index = keyIndex[objItem.indexcode];
        if (undefined === result[index].children) {
            baseItem = {};
            for (let k in result[index]) {
                if (result[index].hasOwnProperty(k)) baseItem[k] = result[index][k];
            }
            result[index].children = [];
            baseItem.key = keyCnt++;
            result[index].children.push(baseItem);
        }
        result[index].stkqty += objItem.stkqty;
        result[index].new_nav += objItem.new_nav;
        result[index].stkvaluetonav += objItem.stkvaluetonav;
        objItem.key = keyCnt++;
        result[index].children.push(objItem);
    }
}

console.log(result)