// ** ac4y-usertext

// *


class Ac4yUserText {

    text(text){return text;}

} // Ac4yUserText

// ** ac4y-common

// *


class Ac4yBulbAlgebra {

    constructor(object) {

        if (object != undefined && object === 0) return;
        if (object) this.copy(object, this);

    } // constructor


    createSelf(object) {
        return new Ac4yBulbAlgebra(object);

    } // createSelf


    setBulb(aBulb) {
        this.bulb = aBulb;
    }
    getBulb() {
        return this.bulb;
    }
    hasBulb() {
        return this.bulb != undefined;
    }
    isBulb() {
        return this.bulb;
    }


    rebuild(object, target) {

        target = target || this;
        if (object) {

            if (object.bulb != undefined) target.setBulb(object.bulb);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        target = target || this;
        if (object) return this.rebuild(object, this.copy(object));

        else return target;

    } // rebuilded

    copy(object, target) {

        target = target || this;
        if (object) {

            if (object.bulb != undefined) target.setBulb(object.bulb);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yBulbAlgebra

// *


class Ac4yBulbConstant {

    constructor() {

        this.ON = 1;
        this.OFF = 0;
        this.UNDEFINED = -1;

    } // constructor

} // Ac4yBulbConstant

// *


class Ac4yBulb extends Ac4yBulbAlgebra {

    constructor(object){

        super(object);
        if (object != undefined && object === 0) return;

        if (!this.hasBulb()) this.reset();

    } // constructor

    createSelf(object) {return new Ac4yBulb(object);}

    set(aValue){
        this.bulb = aValue;}
    get(){return this.bulb;}

    switch(){

        if (!this.isUndefined()) {

            if (this.on())
                this.switchOff();
            else
                this.switchOn();

        } // if

    } // switch

    switchOn(){
        this.bulb=new Ac4yBulbConstant().ON;}
    switchOff(){
        this.bulb=new Ac4yBulbConstant().OFF;}

    isUndefined(){return this.bulb==new Ac4yBulbConstant().UNDEFINED;}

    on(){return this.bulb==new Ac4yBulbConstant().ON;}
    off(){return this.bulb==new Ac4yBulbConstant().OFF;}

    is(){return this.on();}


    light(){return this.on();}
    dark(){return this.off();}

    reset(){this.bulb = new Ac4yBulbConstant().UNDEFINED;}

} // Ac4yBulb

// *


class Ac4yArray {

    constructor(){this.create();}
    create(){this.store=[];}
    getStore(){return this.store;}
    setStore(store){return this.store=store;}
    size(){return this.getStore().length;}
    put(object){this.getStore().push(object);}
    clear(){this.create();}

    add(source){

        if (source && source.length>0)
            source.forEach( (item, index) => {
                this.put(item);
            });

    } // add

    fetch(processor){this.getStore().forEach(processor)};

    rebuilded(){return this;}

} // Ac4yArray

// *


class Ac4yMap {

    constructor(){this.create();}
    create(){this.store=new Map();}
    getStore(){return this.store;}
    setStore(store){return this.store=store;}
    get(key){return this.getStore().get(key);}
    size(){return this.getStore().size;}
    exists(key){return this.getStore().has(key);}
    put(key, value){this.getStore().set(key, value);}
    remove(key){this.getStore().delete(key);}
    clear(){this.getStore().clear();}

} // Ac4yMap

// *


class Ac4yKeyValueMemory {

    constructor(object){this.empty();}
    empty(){this.store={};}
    getStore(){return this.store;}
    setStore(store){return this.store=store;}
    get(key){return this.store[key];}
    size(){return Object.keys(this.store).length;}
    exists(key){if (this.store[key]) return true; else return false;}
    put(key, value){this.store[key]=value;}
    remove(key){delete this.store[key];}

    getKeyList(){

        var result = [];

        for (var key in this.getStore()) {result.push(key);}

        return result;

    } // getKeyList

    getArrayFromValues(){

        var result = [];

        for (var key in this.getStore()) {result.push(this.getStore()[key]);}

        return result;

    } // getArrayFromValues

    fetch(processor){

        Object.getOwnPropertyNames(this.getStore()).forEach( (key, index) => {
            processor(key, this.getStore()[key], index);
        });

    } // fetch

    add(source){source.fetch( (key, value, index) => { this.put(key, value)} )}

    rebuilded(){return this;}

} // Ac4yKeyValueMemory

// *


class Ac4yListNodeAlgebra {

    constructor(object) {

        if (object != undefined && object === 0) return;
        if (object) this.copy(object, this);

    } // constructor


    createSelf(object) {
        return new Ac4yListNodeAlgebra(object);

    } // createSelf


    setElement(aElement) {
        this.element = aElement;
    }
    getElement() {
        return this.element;
    }
    createElement() {
        this.element = new Array();
    }
    hasElement() {
        return this.element != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        if (object) {

            if (object.element != undefined) target.setElement(object.element.slice());

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        target = target || this;
        if (object) return this.rebuild(object, this.copy(object));

        else return target;

    } // rebuilded

    copy(object, target) {

        target = target || this;
        if (object) {

            if (object.element != undefined) target.setElement(object.element);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yListNodeAlgebra

// *

class Ac4yListNode extends Ac4yListNodeAlgebra {

    constructor(aObject) {

        super(aObject);

        if (!this.hasElement())
            this.create();

    } // constructor

    set(aElement){this.element = aElement;}
    get(){return this.element;}
    create(){this.set([]);};
    has(){return this.element ? true : false;}

    addElement(aElement){this.get().push(aElement);}

    delete(aIndex){
        delete this.get()[aIndex];
        this.set(this.getCleaned());
    } //delete

    getLength(){return this.element.length;}

    isEmpty(){return this.element.length===0 ? true : false;}

    getByIndex(aIndex){return this.get()[aIndex];}

    getElement(aElement){return this.getByIndex(this.getIndex(aElement));}

    getByName(aName){return this.getByIndex(this.getIndexByName(aName));}

    getFirstIndex(){return 0;}

    getLastIndex(){return this.element.length-1;}

    getFirst(){return this.get()[this.getFirstIndex()];}

    getLast(){return this.get()[this.getLastIndex()];}

    doesExistByName(aName){return this.getIndexByName(aName)!==-1;}

    getIndex(aElement){

        return this.get().findIndex(
            function(vElement){
                return vElement===aElement;
            }
        );

    } // getIndex

    getIndexByName(aName){

        return this.get().findIndex(
            function(aElement){
                return aElement.getName()===aName;
            }
        );

    } // getIndexByName

    getIndexByGUID(aGUID){

        return this.get().findIndex(
            function(aElement){
                //return aElement.getAc4yIdentification().getGUID()===aGUID;
                return aElement.ac4yIdentification.GUID===aGUID;
            }
        );

    } // getIndexByGUID

    getIndexByHumanId(aHumanId){

        return this.get().findIndex(
            function(aElement){
                return aElement.getAc4yIdentification().getHumanId()===aHumanId;
            }
        );

    } // getIndexByName

    doesExistByGUID(aGUID){return this.getIndexByGUID(aGUID)!==-1;}

    getByGUID(aGUID){return this.getByIndex(this.getIndexByGUID(aGUID));}

    deleteByGUID(aGUID){return this.delete(this.getIndexByGUID(aGUID));}

    doesExistByHumanId(aHumanId){return this.getIndexByHumanId(aHumanId)!==-1;}

    getByHumanId(aHumanId){return this.getByIndex(this.getIndexByHumanId(aHumanId));}

    getOppositeIndex(aIndex){return aIndex === 0 ? 1 : 0;}

    getCleaned(){return this.get().filter(function (aElement) {return (aElement);});}

    forEach(aProcess){this.get().forEach(aProcess)};

    fetch(processor){this.forEach(processor)}

} // Ac4yListNode

// ** ac4y-utility


class Ac4yBase64Handler {

    //encode(aString){return atob(aString);};
    //decode(aString){return btoa(aString);};

    //b64EncodeUnicode(aString) {
    encode(aString) {

        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(aString).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));

    } // b64EncodeUnicode

    //b64DecodeUnicode(str) {
    decode(aString) {

        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(aString).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

    } // b64DecodeUnicode

} // Ac4yBase64Handler


class Ac4yDateTimeHandler {

    getSystemTime(){return new Date().getTime();}

    getSystemTimeInExternalFormat(){return this.getSystemTime();}

    getDateExternalFormat(aDate) {

        var vYear = aDate.getFullYear();
        var vMonth = aDate.getMonth()+1;
        var vDay = aDate.getDate();

        return new Ac4yStringHandler().padNumber(vYear,4)+"-"
            +new Ac4yStringHandler().padNumber(vMonth,2)+"-"
            +new Ac4yStringHandler().padNumber(vDay,2);

    } // getTimeExternalFormat

    getTimeExternalFormat(aDatetime) {

        var vHour = aDatetime.getHours();
        var vMinute = aDatetime.getMinutes();
        var vSecond = aDatetime.getSeconds();

        return new Ac4yStringHandler().padNumber(vHour,2)
            +":"+new Ac4yStringHandler().padNumber(vMinute,2)
            +":"+new Ac4yStringHandler().padNumber(vSecond,2);

    } // getTimeExternalFormat

    getDateTimeExternalFormat(aDatetime) {

        return aDatetime.toJSON();

    } // getDateTimeExternalFormat


    shiftDay(date, shift){

        return new Date(new Date(date).setDate(new Date(date).getDate() + shift ));

    } // shiftDay

    getMillisecondVsSecond(){return 1000;}
    getSecondVsMinute(){return 60;}
    getMinuteVsHour(){return 60;}
    getHourVsDay(){return 24;}

    getMillisecondInSecond(aMillisecond){return Math.round(aMillisecond / this.getMillisecondVsSecond());}
    getMillisecondInMinute(aMillisecond){return Math.round(this.getMillisecondInSecond(aMillisecond) / this.getSecondVsMinute());}
    getMillisecondInHour(aMillisecond){return Math.round(this.getMillisecondInMinute(aMillisecond) / this.getMinuteVsHour());}
    getMillisecondInDay(aMillisecond){return Math.round(this.getMillisecondInHour(aMillisecond) / this.getHourVsDay());}

    //getSecondInMillisecond(aSecond){return aSecond * this.getMillisecondVsSecond();}
    getMinuteInMillisecond(aMinute){return this.getSecondInMillisecond(aSecond) * this.getSecondVsMinute();}
    getHourInMillisecond(aHour){return this.getSecondInMinute(aSecond) * this.getMinuteVsHour();}
    getDayInMillisecond(aDay){return this.getSecondInHour(aSecond) * this.getHourVsDay();}

    getSecondInMillisecond(aSecond){return aSecond * this.getMillisecondVsSecond();}
    getSecondInMinute(aSecond){return this.getSecondInMillisecond(aSecond) * this.getSecondVsMinute();}
    getSecondInHour(aSecond){return this.getSecondInMinute(aSecond) * this.getMinuteVsHour();}
    getSecondInDay(aSecond){return this.getSecondInHour(aSecond) * this.getHourVsDay();}
    /*
    getMinuteInMillisecond(aMinute){return aMinute * this.getMillisecondVsSecond();}
    getMinuteInSecond(aMinute){return this.getMinuteInMillisecond(aMinute) * this.getSecondVsMinute();}
    getMinuteInHour(aMinute){return this.getMinuteInSecond(aMinute) * this.getMinuteVsHour();}
    getMinuteInDay(aMinute){return this.getMinuteInHour(aMinute) * this.getHourVsDay();}
    */

    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    } // sleep

} // Ac4yDateTimeHandler


class Ac4yDOMHandler {

    element(aID){
        return document.getElementById(aID);
    }

    buildComboBoxFromString( aSelectElement, aSelectelementsInStringList) {

        vStringArray = aSelectelementsInStringList.split(',');

        for ( var vIndex = 0; vIndex < vStringArray.length; vIndex++) {
            aSelectElement.options[aSelectElement.options.length] = new Option(vStringArray[vIndex], vStringArray[vIndex]);
        }

    } // buildComboBoxFromString

    setSelectedIndexByValue(aSelectElement, aValue) {

        for ( var vIndex = 0; vIndex < aSelectElement.options.length; vIndex++) {
            if (aSelectElement.options[vIndex].value == aValue)
                aSelectElement.selectedIndex = vIndex;
        } // for

    } // setSelectedIndexByValue

    setupComboBox(aComboBox, aSource, aSelected) {

        buildComboBoxFromString (aComboBox, aSource);
        setSelectedIndexByValue(aComboBox, aSelected);

    } // setupComboBox

    changeComboBoxInSearchForm(aComboBox, aFilterField, aActionField, aActionValue) {

        aFilterField.value = aComboBox.options[aComboBox.selectedIndex].value;
        aActionField.value = aActionValue;
        aComboBox.form.submit();

    } // changeComboBoxInSearchForm

    getNewInputElement(aID) {

        var vInput = document.createElement("input");

        vInput.id 		= aID;

        vInput.setAttribute("style","width:100%");

        return vInput;

    } // getNewInputElement

    getNewTextAreaElement(aID) {

        var vInput = document.createElement("textarea");

        vInput.id 		= aID;

        vInput.setAttribute("style","width:100%;height:100%;");

        return vInput;

    } // getNewTextAreaElement

    genCellOnRow(aRow, aIndex){

        var vCell = aRow.insertCell(-1);

        //vCell.innerHTML = "aaaaaaaaaaa";
        var vInput = this.getNewTextAreaElement(aRow.id+"."+aIndex.toString());
        vCell.appendChild(vInput);

        return vCell;

    } // genCellOnRow

    genTableContent(aID){

        var vTable = document.getElementById(aID);

        for (var vIndex = 0; vIndex < 20; vIndex++) {

            var vRow = vTable.insertRow(-1);

            vRow.id = vIndex.toString();

            this.genCellOnRow(vRow, 1);
            this.genCellOnRow(vRow, 2);
            this.genCellOnRow(vRow, 3);

        } // for

    } // genTableContent

    getCreatedElement(aDocument, aOwner, aTagName){

        var vElement = aDocument.createElement(aTagName);

        aOwner.appendChild(vElement);

        return vElement;

    } // getCreatedElement

    getCreatedTable(aDocument, aOwner){

        var vTable = aDocument.createElement("table");

        aOwner.appendChild(vTable);

        return vTable;

    } // getCreatedTable

    getCreatedButton(aDocument, aOwner){return this.getCreatedElement(aDocument, aOwner, "button");}

    getCreatedDiv(aDocument, aOwner){return this.getCreatedElement(aDocument, aOwner, "div");}

    deleteAllChildElement(aOwner){

        if (aOwner)
            if (aOwner.hasChildNodes())
                while(aOwner.firstChild) {aOwner.removeChild(aOwner.firstChild);}

    } // deleteAllChildElement

    getURLParams() {

        var result = {};
        var tmp = [];

        location.search
            .substr (1)
            .split ("&")
            .forEach (function (item)
            {
                tmp = item.split ("=");
                result [tmp[0]] = decodeURIComponent (tmp[1]);
            });

        return result;
    } // getURLParams

    getURLParam(aName){return this.getURLParams()[aName];}

    hasURLParam(aName){return this.getURLParam(aName) ? true : false;}

    initFromURLParam(name, defaultValue){

        if (this.hasURLParam(name))
            return this.getURLParam(name);
        else
            return defaultValue;

    } // initFromURLParam

    activateWidget(aWidget){aWidget.disabled=false;}
    inactivateWidget(aWidget){aWidget.disabled=true;}

    showWidget(aWidget){aWidget.hidden=0;}
    hideWidget(aWidget){aWidget.hidden=1;}

    setID(aWidget, aID){aWidget.id=aID;}
    getID(aWidget){return aWidget.id;}

} // Ac4yDOMHandler


class Ac4yFunctionHandler {

    understandable(aSource){

        try{

            var functionOnTheFly = eval(aSource);

            return true;

        } catch(exception){
            //console.log(exception);
            //console.log(aSource);
            return false;

        }

    } // understandable

    compiled(aSource){
        return eval(aSource);
    };

} // Ac4yFunctionHandler


function Ac4yGUIDHandler(){

    this.getUUID = function(){

        var chars = '0123456789abcdef'.split('');

        var uuid = [], rnd = Math.random, r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4'; // version 4

        for (var i = 0; i < 36; i++)
        {
            if (!uuid[i])
            {
                r = 0 | rnd()*16;

                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
            }
        }

        return uuid.join('');

    } // getUUID

    this.getGUID = function() { return this.getUUID(); }

} // Ac4yGUIDHandler


class Ac4yJSONHandler {

    isValid(aJSONString){

        try {

            var vObject = JSON.parse(aJSONString);

            return true;

        } catch(exception){return false;}

    } // isValid

    serialized(aObject){return JSON.stringify(JSON.decycle(aObject));}

    deserialized(aJSONString){return JSON.parse(aJSONString);};

    tryDeserialize(aJSONString){

        if (this.isValid(aJSONString))
            return JSON.parse(aJSONString);
        else
            return {warning: "érvénytelen objektum"};

    }; // tryDeserialize

} // Ac4yJSONHandler

class Ac4yMedleyHandler {

    getSymbol(index){return String.fromCharCode(((index % 26) + 97));}

    getExponent(threshold, base){

        var exponent=1;

        while (threshold>=Math.pow(base, exponent)) {exponent++;}

        return exponent--;

    } // getExponent

    getNumberSystemValueAsText(threshold, numberSystem){

        var exponent = this.getExponent(threshold, numberSystem)-1;

        var text="";

        for (var i=exponent; i>=0; i--){
            var positionValue = Math.pow(numberSystem, i);
            var localValue = Math.trunc(threshold/positionValue);
            var threshold=threshold - localValue * positionValue;
            text+=this.getSymbol(localValue);
        }

        return text;

    } // getNumberSystemValueAsText

    random(variation){return Math.floor(Math.random() * variation);}
    randomBoolean(){return (this.random(2)===1 ? true : false)}

    getDiggedFunctionName(level) {

        var stack = new Error().stack;
        var caller = stack.split('\n')[level].trim();
        var firstSpace = caller.indexOf(" ");
        var cuttedCaller = caller.substring(firstSpace+1);
        var secondSpace = cuttedCaller.indexOf(" ");

        return cuttedCaller.substr(0,secondSpace);

    } // getDiggedFunctionName

    getFunctionName(){
        //for (var i=0;i<10;i++) console.log(new Ac4yObjectHandler().getDiggedFunctionName(i))
        return this.getDiggedFunctionName(3);
    };

} // Ac4yMedleyHandler


class Ac4yObjectHandler {

    getObjectPropertiesAsVerticalTable(aObject, aDocument, aOwner){

        var vTable = new Ac4yDOMHandler().getCreatedTable(aDocument, aOwner);

        if (aObject)
            Object.getOwnPropertyNames(aObject).forEach(

                function (aValue, aIndex, aArray) {

                    var vRow = vTable.insertRow(-1);

                    vRow.insertCell(-1).innerHTML = aValue;
                    vRow.insertCell(-1).innerHTML = aObject[aValue];

                }

            );

        return vTable;

    } // getObjectPropertiesAsVerticalTable

    getObjectPropertiesAsHorizontalTable(aObject, aDocument, aOwner){

        var vTable = new Ac4yDOMHandler().getCreatedTable(aDocument, aOwner);

        var vRow = vTable.insertRow(-1);

        if (aObject)
            Object.getOwnPropertyNames(aObject).forEach(
                function (aValue, aIndex, aArray) {

                    vRow.insertCell(-1).innerHTML = aValue;

                }

            );

        var vRow = vTable.insertRow(-1);

        if (aObject)
            Object.getOwnPropertyNames(aObject).forEach(

                function (aValue, aIndex, aArray) {

                    vRow.insertCell(-1).innerHTML = aObject[aValue];

                }

            );

        return vTable;

    } // getObjectPropertiesAsHorizontalTable

    getArrayAsVerticalTable(aObject, aDocument, aOwner){

        var vTable = null;

        if (aObject)
            if (aObject.length)
                if (aObject.length>0) {

                    vTable = new Ac4yDOMHandler().getCreatedTable(aDocument, aOwner);

                    var vRow = vTable.insertRow(-1);

                    if (aObject && aObject[0])
                        Object.getOwnPropertyNames(aObject[0]).forEach(
                            function (aKey, aIndex, aArray) {
                                vRow.insertCell(-1).innerHTML = aKey;
                            }
                        );

                    for (var vIndex = 0; vIndex < aObject.length; vIndex++) {

                        var vRow = vTable.insertRow(-1);

                        if (aObject && aObject[vIndex])
                            Object.getOwnPropertyNames(aObject[vIndex]).forEach(
                                function (aKey, aIndex, aArray) {
                                    vRow.insertCell(-1).innerHTML = aObject[vIndex][aKey];
                                }
                            );

                    }

                } // if

        return vTable;

    } // getArrayAsVerticalTable

    getArrayAsHorizontalTable(aObject, aDocument, aOwner){

        var vTable = null;

        if (
            aObject
            && aObject.length
            && aObject.length>0
            && Object.getOwnPropertyNames(aObject[0])
            && Object.getOwnPropertyNames(aObject[0]).length
        ) {

            var vRowCount = Object.getOwnPropertyNames(aObject[0]).length;
            var vColumnCount = aObject.length;

            vTable = new Ac4yDOMHandler().getCreatedTable(aDocument, aOwner);

            var vRow = vTable.insertRow(-1);

            for (var vRowIndex = 0; vRowIndex < vRowCount; vRowIndex++) {

                var vRow = vTable.insertRow(-1);

                vRow.insertCell(-1).innerHTML = Object.getOwnPropertyNames(aObject[0])[vRowIndex];

                for (var vColumnIndex = 0; vColumnIndex < vColumnCount; vColumnIndex++) {

                    vRow.insertCell(-1).innerHTML = aObject[vColumnIndex][(Object.getOwnPropertyNames(aObject[0])[vRowIndex])];

                } // for columns

            } // for rows

        } // if

        return vTable;

    } // getArrayAsHorizontalTable

    doesExist(aObject){return (aObject ? true : false);}

    isThisNothing(aObject){return (aObject ? false : true);}

    isCorrect(aObject){return (aObject ? true : false);}

    isFunction(aObject){return (((aObject) && (typeof aObject === 'function')) ? true : false );}

    default(aValue, aDefaultValue){

        if (!this.isThisNothing(aValue))
            return aValue;
        else
            return aDefaultValue;

    } // default

    getClassNameOfTheObject(aObject){return aObject.constructor.name;};

    deleteObjectTypeProperties(object){

        if (!object) throw "object is null!";
        Object.getOwnPropertyNames(Object.getOwnPropertyDescriptors(object)).forEach( (key, index) => {

            var property=Object.getOwnPropertyDescriptors(object)[key];

            if (typeof property.value === "object" || typeof property.value === "function")
                delete object[key];

        });

        return object;

    } // deleteObjectTypeProperties

} // Ac4yObjectHandler


class Ac4yStringHandler {

    getPersonalNamePart(aName){

        var vName = String(aName);
        var vResult = new Array();
        vResult = vName.split(".");
        var vResultSize = vResult.length;

        if ( vResult.length == 0 )
            return vName;
        else
            return vResult[vResult.length-1];

    } // getPersonalNamePart

    getFirstNamePart(aName){

        var vName = String(aName);
        var vResult = new Array();
        vResult = vName.split(".");
        vResultSize = vResult.length;

        if ( vResult.length == 0 )
            return vName;
        else
            return vResult[0];

    } // getFirstNamePart


    getLength(aString){return aString.length;}

    upperCase(aString){return aString.toUpperCase();}

    getFirstCharUpperCase(aString){

        if (aString)
            return this.upperCase(aString.charAt(0)) + aString.substring(1, this.getLength(aString));
        else
            return "";

    } // getFirstCharUpperCase

    replaceAll(aString, aFind, aReplace) {

        if (aString)
            while( aString.indexOf(aFind) > -1) {
                aString = aString.replace(aFind, aReplace);
            }

        return aString;

    } // replaceAll

    camelCase(aInput) {

        if (aInput) {

            var vInput = this.replaceAll(aInput, ' ', '-');

            return vInput.toLowerCase().replace(/-(.)/g, function(match, group1) {
                return group1.toUpperCase();
            });

        }

    } // camelCase

    concatSmart(aFirst, aSecond, aSeparator) {

        if (aFirst)
            return aFirst + aSeparator + aSecond;
        else
            return aSecond;

    } // concatSmart


    padLeft(aValue, aPadder, aLength){return (aPadder+aValue).slice(-aLength);}

    padNumber(aNumber, aLength){return ("0"+aNumber).slice(-aLength);}

    getValueFromKeyValuePairByKey(aPair, aSeparator, aKey){

        var vValue = null;

        if (aPair) {

            var vKeyValueInArray=aPair.split(aSeparator);

            if (vKeyValueInArray.length==2)
                vValue = vKeyValueInArray[1];

        }

        return vValue;

    } // getValueFromKeyValuePairByKey

    getValueFromKeyValuePair(aPair, aSeparator){

        var vResult = null;

        if (aPair) {

            var vKeyValueInArray=aPair.split(aSeparator);

            if (vKeyValueInArray.length==2)
                vResult = vKeyValueInArray[1];

        }

        return vResult;

    } // getValueFromKeyValuePair

    getKeyFromKeyValuePair(aPair, aSeparator){

        var vResult = null;

        if (aPair) {

            var vKeyValueInArray=aPair.split(aSeparator);

            if (vKeyValueInArray.length==2)
                vResult = vKeyValueInArray[0];

        }

        return vResult;

    } // getKeyFromKeyValuePair

    getKeyValueFromSeries(aStorage, aKeyValueSeparator, aValueSeparator, aKey){

        var vValue = null;

        if (aStorage) {

            var vKeyValueSet = aStorage.split(aKeyValueSeparator);

            var vKeyValue=vKeyValueSet.map(
                function(aElement){
                    return aElement.trim().split(aValueSeparator);
                }).filter(
                function(aElement){
                    return aElement[0]===aKey;
                }
            );

            if (vKeyValue.length>0)
                vValue = vKeyValue[0][1];

        }

        return vValue;

    } // getKeyValueFromSeries

    getSimpled (text) {

        const 	accentForm 			= "áíűőüöúóéÁÍŰŐÜÖÚÓÉ";
        const 	withoutAccentForm 	= "aiuououoeAIUOUOUOE";

        var	oneChar;
        var 	converted	= "";
        var		conversionIndex = 0;

        for (var index = 0; index < text.length; index++) {

            oneChar = text.charAt(index);

            conversionIndex = accentForm.indexOf(oneChar);

            if (conversionIndex != -1)
                oneChar = withoutAccentForm.charAt(conversionIndex);

            if (
                (oneChar == '.') ||
                ((oneChar >= 'a') && (oneChar <= 'z')) ||
                ((oneChar >= '0') && (oneChar <= '9')) ||
                ((oneChar >= 'A') && (oneChar <= 'Z'))
            )
                converted = converted + oneChar;

        }

        return converted.toUpperCase();

    } // getSimpled

    stringFromArray(data) {

        var count = data.length;
        var str = "";

        for(var index = 0; index < count; index += 1)
            str += String.fromCharCode(data[index]);

        return str;

    } // stringFromArray

} // Ac4yStringHandler


class Ac4yVideoUtility{

    setLocalCamera(aVideoElement){

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then( ( aStream => {
                aVideoElement.src = window.URL.createObjectURL(aStream);
            }))
            .catch( ( aReason => {
                console.error("ERROR in startup",new String(aReason));
            }));

    } // setLocalCamera

} // Ac4yVideoUtility

// ** ac4y-object

// *


class Ac4yIdentificationBaseAlgebra {

    constructor(object) {

        if (object != undefined && object === 0) return;
        if (object) this.copy(object, this);

    } // constructor


    createSelf(object) {
        return new Ac4yIdentificationBaseAlgebra(object);

    } // createSelf


    setGUID(aGUID) {
        this.GUID = aGUID;
    }
    getGUID() {
        return this.GUID;
    }
    hasGUID() {
        return this.GUID != undefined;
    }

    setHumanId(aHumanId) {
        this.humanId = aHumanId;
    }
    getHumanId() {
        return this.humanId;
    }
    hasHumanId() {
        return this.humanId != undefined;
    }

    setPublicHumanId(aPublicHumanId) {
        this.publicHumanId = aPublicHumanId;
    }
    getPublicHumanId() {
        return this.publicHumanId;
    }
    hasPublicHumanId() {
        return this.publicHumanId != undefined;
    }

    setCreatedAt(aCreatedAt) {
        this.createdAt = aCreatedAt;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    hasCreatedAt() {
        return this.createdAt != undefined;
    }

    setUpdatedAt(aUpdatedAt) {
        this.updatedAt = aUpdatedAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    hasUpdatedAt() {
        return this.updatedAt != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        if (object) {

            if (object.GUID != undefined) target.setGUID(object.GUID);
            if (object.humanId != undefined) target.setHumanId(object.humanId);
            if (object.publicHumanId != undefined) target.setPublicHumanId(object.publicHumanId);
            if (object.createdAt != undefined) target.setCreatedAt(object.createdAt);
            if (object.updatedAt != undefined) target.setUpdatedAt(object.updatedAt);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        target = target || this;
        if (object) return this.rebuild(object, this.copy(object));

        else return target;

    } // rebuilded

    copy(object, target) {

        target = target || this;
        if (object) {

            if (object.GUID != undefined) target.setGUID(object.GUID);
            if (object.humanId != undefined) target.setHumanId(object.humanId);
            if (object.publicHumanId != undefined) target.setPublicHumanId(object.publicHumanId);
            if (object.createdAt != undefined) target.setCreatedAt(object.createdAt);
            if (object.updatedAt != undefined) target.setUpdatedAt(object.updatedAt);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yIdentificationBaseAlgebra

// *


class Ac4yIdentificationBase extends Ac4yIdentificationBaseAlgebra {

    constructor(object) {

        super(object);
        if (object!=undefined && object===0) return;

        if (!this.hasGUID())
            this.setGUID(new Ac4yGUIDHandler().getGUID());

        if (!this.hasCreatedAt())
            this.setCreatedAt(new Ac4yDateTimeHandler().getSystemTime());

    } // constructor

} // Ac4yIdentificationBase

// *


class Ac4yObjectAlgebra {

    constructor(object) {

        if (object != undefined && object === 0) return;
        if (object) this.copy(object, this);

    } // constructor


    createSelf(object) {
        return new Ac4yObjectAlgebra(object);

    } // createSelf


    setAc4yIdentification(aAc4yIdentification) {
        this.ac4yIdentification = aAc4yIdentification;
    }
    getAc4yIdentification() {
        return this.ac4yIdentification;
    }
    createAc4yIdentification() {
        this.ac4yIdentification = new Ac4yIdentification();
    }
    hasAc4yIdentification() {
        return this.ac4yIdentification != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        if (object) {

            if (object.ac4yIdentification != undefined) target.setAc4yIdentification(new Ac4yIdentification(0).rebuilded(object.ac4yIdentification));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        target = target || this;
        if (object) return this.rebuild(object, this.copy(object));

        else return target;

    } // rebuilded

    copy(object, target) {

        target = target || this;
        if (object) {

            if (object.ac4yIdentification != undefined) target.setAc4yIdentification(object.ac4yIdentification);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yObjectAlgebra

// *


class Ac4yObject extends Ac4yObjectAlgebra {

    constructor(object) {
        super(object);
        if (object!=undefined && object===0) return;

        if (!this.hasAc4yIdentification())
            this.setAc4yIdentification(new Ac4yIdentification());

    } // constructor

    setAc4yIdentification(aAc4yIdentification){this.ac4yIdentification = aAc4yIdentification;}
    getAc4yIdentification(){return this.ac4yIdentification;}

} // Ac4yObject

// *


class Ac4yAlgebra extends Ac4yObject {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yAlgebra(object);

    } // createSelf



    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {


        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {


        } // if object does not empty

        return target;

    } // copy

} // Ac4yAlgebra
// *


class Ac4y extends Ac4yAlgebra {

    constructor(object){

        super(object);
        if (object!=undefined && object===0) return;
        this.setTemplateName();
    }

    rebuilded(object, target){return super.rebuilded(object, target);}

    objectKilledForPersistence(object){

        var object = this.createSelf(object);

        object = new Ac4yObjectHandler().deleteObjectTypeProperties(object);

        return object;

    } // objectKilledForPersistence

    killIdentification(){
        delete this.ac4yIdentification;
    }

    onlyGUIDIdentification(object){
        object = object || this;
        delete this.getAc4yIdentification().template;
        delete this.ac4yIdentification.createdAt;
        delete this.ac4yIdentification.humanId;
        delete this.ac4yIdentification.id;
        return object;
    } // onlyGUIDIdentification

    noIdentification(object){
        object = object || this;
        delete this.ac4yIdentification;
        return object;
    } // noIdentification

    lightweight(){

        var object = this.createSelf(this);

        delete object.GUID;
        delete object.createdAt;

        return object;

    } // lightweight

    lightweight4Persistence(){

        var object = this.createSelf(this);

        object = this.objectKilledForPersistence(object);

        delete object.GUID;
        delete object.createdAt;

        return object;

    } // lightweight4Persistence

    setTemplateName(){
        this.getAc4yIdentification().getTemplate().setHumanId(this.constructor.name);
    }

    getGUID(){return this.getAc4yIdentification().getGUID();};
    setGUID(aGUID){return this.getAc4yIdentification().setGUID(aGUID);};

    getHumanId(){return this.getAc4yIdentification().getGUID();};
    setHumanId(aHumanId){return this.getAc4yIdentification().setHumanId(aHumanId);};

    check(){

        this.checkIdentification();
        this.checkIdentificationGUID();

    } // check

    checkIdentification() {if (!this.hasAc4yIdentification()) throw "has no identification!";}
    checkIdentificationGUID() {if (!this.getAc4yIdentification().hasGUID()) throw "has no GUID!";}

    getSerializedSize(){return new Ac4yJSONHandler().serialized(this).length;};

} // Ac4y


// *


class Ac4yPersistentAlgebra extends Ac4y {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yPersistentAlgebra(object);

    } // createSelf


    setId(aId) {
        this.id = aId;
    }
    getId() {
        return this.id;
    }
    hasId() {
        return this.id != undefined;
    }

    setGUID(aGUID) {
        this.GUID = aGUID;
    }
    getGUID() {
        return this.GUID;
    }
    hasGUID() {
        return this.GUID != undefined;
    }

    setOwner(aOwner) {
        this.owner = aOwner;
    }
    getOwner() {
        return this.owner;
    }
    hasOwner() {
        return this.owner != undefined;
    }

    setCreatedAt(aCreatedAt) {
        this.createdAt = aCreatedAt;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    hasCreatedAt() {
        return this.createdAt != undefined;
    }

    setUpdatedAt(aUpdatedAt) {
        this.updatedAt = aUpdatedAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    hasUpdatedAt() {
        return this.updatedAt != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.id != undefined) target.setId(object.id);
            if (object.GUID != undefined) target.setGUID(object.GUID);
            if (object.owner != undefined) target.setOwner(object.owner);
            if (object.createdAt != undefined) target.setCreatedAt(object.createdAt);
            if (object.updatedAt != undefined) target.setUpdatedAt(object.updatedAt);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.id != undefined) target.setId(object.id);
            if (object.GUID != undefined) target.setGUID(object.GUID);
            if (object.owner != undefined) target.setOwner(object.owner);
            if (object.createdAt != undefined) target.setCreatedAt(object.createdAt);
            if (object.updatedAt != undefined) target.setUpdatedAt(object.updatedAt);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yPersistentAlgebra



// *


class Ac4yIdentificationAlgebra extends Ac4yIdentificationBase {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yIdentificationAlgebra(object);

    } // createSelf


    setTemplate(aTemplate) {
        this.template = aTemplate;
    }
    getTemplate() {
        return this.template;
    }
    createTemplate() {
        this.template = new Ac4yIdentificationBase();
    }
    hasTemplate() {
        return this.template != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.template != undefined) target.setTemplate(new Ac4yIdentificationBase(0).rebuilded(object.template));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.template != undefined) target.setTemplate(object.template);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yIdentificationAlgebra


// *


class Ac4yPersistent extends Ac4yPersistentAlgebra {

    constructor(object) {

        super(object);

        if (object!=undefined && object===0) return;

        if (!this.hasGUID()) this.setGUID(this.getAc4yIdentification().getGUID());

    } // constructor

    createSelf(object) {return new Ac4yPersistent(object);}

    noStandaloneIdenficationElements(object){

        object = object || this;

        delete object.createdAt;
        delete object.GUID;

        return object;

    } // noStandaloneIdenficationElements

    forPersistence(object){

        delete object.ac4yIdentification;

        //this.setCreatedAt(new Date(this.getCreatedAt()));

        if (object.hasCreatedAt()) object.setCreatedAt(new Date(object.getCreatedAt()));

        return object;

    } // forPersistence

    objectKilledForPersistence(object){

        var object = this.createSelf(object);

        object.check();

        object = new Ac4yObjectHandler().deleteObjectTypeProperties(object);

        return object;

    } // objectKilledForPersistence

    fromPersistence(){
        return this;
    }

    lightweight(){

        var object = this.createSelf(this);

        object = this.objectKilledForPersistence(object);

        delete object.GUID;
        delete object.createdAt;

        return object;

    } // lightweight

    getGUID(){

        if (this.hasGUID())
            return super.getGUID()
        else
        if (this.hasAc4yIdentification())
            return this.getAc4yIdentification().getGUID();
        else
            return null;

    } // getGUID

} // Ac4yPersistent

//*


class Ac4yIdentification extends Ac4yIdentificationAlgebra {

    constructor(object) {
        super(object);
        if (object!=undefined && object===0) return;

        //this.createTemplate(new Ac4yIdentificationBase());
        if (!this.createTemplate()) this.createTemplate();

    } // constructor

} // Ac4yIdentification

// ** ac4y-ecosystem

// *


class Ac4yEcosystemMemberConstant {

    constructor() {

        this.MESSENGER = "messenger";
        this.PARAMETER = "parameter";
        this.ENVIRONMENT = "environment";
        this.UI = "UI";
        this.LOG = "log";
        this.LOGIC = "logic";
        this.COMMANDER = "commander";
        this.SERVICE = "service";
        this.API = "api";
        this.HIBERNATOR = "hibernator";
        this.PERSISTOR = "persistor";
        this.SESSION = "session";
        this.CONDUCTOR = "conductor";
        this.INFORMATOR = "informator";
        this.SERVER = "server";
        this.CLIENT = "client";
        this.INTERPRETER = "interpreter";
        this.CONTAINER = "container";
        this.FLOW = "flow";
        this.GATE = "gate";

    } // constructor

} // Ac4yEcosystemMemberConstant

// *


class Ac4yEcosystemAlgebra {

    constructor(object) {

        if (object != undefined && object === 0) return;
        if (object) this.copy(object, this);

    } // constructor


    createSelf(object) {
        return new Ac4yEcosystemAlgebra(object);

    } // createSelf


    setMember(aMember) {
        this.member = aMember;
    }
    getMember() {
        return this.member;
    }
    createMember() {
        this.member = new Ac4yKeyValueMemory();
    }
    hasMember() {
        return this.member != undefined;
    }

    setName(aName) {
        this.name = aName;
    }
    getName() {
        return this.name;
    }
    hasName() {
        return this.name != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        if (object) {

            if (object.member != undefined) target.setMember(new Ac4yKeyValueMemory(0).rebuilded(object.member));
            if (object.name != undefined) target.setName(object.name);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        target = target || this;
        if (object) return this.copy(object, this.rebuild(object));

        else return target;

    } // rebuilded

    copy(object, target) {

        target = target || this;
        if (object) {

            if (object.member != undefined) target.setMember(object.member);
            if (object.name != undefined) target.setName(object.name);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yEcosystemAlgebra


// *


class Ac4yEcosystem extends Ac4yEcosystemAlgebra {

    constructor(object){

        super(object);
        if (object!=undefined && object===0) return;

        if (!this.hasMember()) this.createMember();

    } // constructor

    createSelf(object) {return new Ac4yEcosystem(object);}

    noEcosystem(object) {

        object = object || this;

        delete object.ecosystem;

        return object;

    } // noEcosystem

    messenger(){return this.getMember().get(new Ac4yEcosystemMemberConstant().MESSENGER);};
    log(){return this.getMember().get(new Ac4yEcosystemMemberConstant().LOG);};
    UI(){return this.getMember().get(new Ac4yEcosystemMemberConstant().UI);};
    logic(){return this.getMember().get(new Ac4yEcosystemMemberConstant().LOGIC);};
    commander(){return this.getMember().get(new Ac4yEcosystemMemberConstant().COMMANDER);};
    service(){return this.getMember().get(new Ac4yEcosystemMemberConstant().SERVICE);};
    api(){return this.getMember().get(new Ac4yEcosystemMemberConstant().API);};
    parameter(){return this.getMember().get(new Ac4yEcosystemMemberConstant().PARAMETER);};
    hibernator(){return this.getMember().get(new Ac4yEcosystemMemberConstant().HIBERNATOR);};
    persistor(){return this.getMember().get(new Ac4yEcosystemMemberConstant().PERSISTOR);};
    environment(){return this.getMember().get(new Ac4yEcosystemMemberConstant().ENVIRONMENT);};
    session(){return this.getMember().get(new Ac4yEcosystemMemberConstant().SESSION);};
    conductor(){return this.getMember().get(new Ac4yEcosystemMemberConstant().CONDUCTOR);};
    server(){return this.getMember().get(new Ac4yEcosystemMemberConstant().SERVER);};
    client(){return this.getMember().get(new Ac4yEcosystemMemberConstant().CLIENT);};
    interpreter(){return this.getMember().get(new Ac4yEcosystemMemberConstant().INTERPRETER);};
    flow(){return this.getMember().get(new Ac4yEcosystemMemberConstant().FLOW);};
    gate(){return this.getMember().get(new Ac4yEcosystemMemberConstant().GATE);};
    container(){return this.getMember().get(new Ac4yEcosystemMemberConstant().CONTAINER);};

    setEcosystemInMembers(){

        Object.keys(this.getMember().getStore()).map( (objectKey, index) => {
            var element = (this.getMember().getStore()[objectKey]).setEcosystem(this);
        });

    }; // setEcosystemInMembers

    existingMember(key){return this.getMember().exists(key);}

    addMember(aMember){this.getMember().addElement(aMember);}
    addService(aClassID, aService){this.getMember().addService(aClassID, aService);}
    addInstance(aClassID, aObjectID, aInstance){this.getMember().addInstance(aClassID, aObjectID, aInstance);}


    checkCommandManager(){if (!this.commander()) throw new Ac4yUserText().text("has no command manager!");}
    checkServiceManager(){if (!this.service()) throw new Ac4yUserText().text("has no service manager!");}

    checkMember(member){
        if (!this.existingMember(member))
            throw new Ac4yUserText().text("has no")
            +" " + member + " "
            + new Ac4yUserText().text("ecosystem member!");
    } // checkMember

} // Ac4yEcosystem

// *


class Ac4yEcosystemMemberAlgebra extends Ac4yPersistent {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yEcosystemMemberAlgebra(object);

    } // createSelf


    setEcosystem(aEcosystem) {
        this.ecosystem = aEcosystem;
    }
    getEcosystem() {
        return this.ecosystem;
    }
    createEcosystem() {
        this.ecosystem = new Ac4yEcosystem();
    }
    hasEcosystem() {
        return this.ecosystem != undefined;
    }

    setParent(aParent) {
        this.parent = aParent;
    }
    getParent() {
        return this.parent;
    }
    createParent() {
        this.parent = new Object();
    }
    hasParent() {
        return this.parent != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.ecosystem != undefined) target.setEcosystem(new Ac4yEcosystem(0).rebuilded(object.ecosystem));
            if (object.parent != undefined) target.setParent(new Object(0).rebuilded(object.parent));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.ecosystem != undefined) target.setEcosystem(object.ecosystem);
            if (object.parent != undefined) target.setParent(object.parent);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yEcosystemMemberAlgebra

// *


class Ac4yEcosystemMember extends Ac4yEcosystemMemberAlgebra {

    constructor(object){

        super(object);
        if (object!=undefined && object===0) return;
        /*
        this.createInformator();
        this.getInformator().setupScheduler(this);
      */
    } // constructor

    createSelf(object) {return new Ac4yEcosystemMember(object);}

    noEcosystem(object) {

        object = object || this;

        delete object.ecosystem;

        return object

    } // noEcosystem

    getStarGate(){return this.getEcosystem();};
    getWormhole(){return this.getEcosystem();}; // rosen bridge
    getPassageway4OtherUniverse(){return this.getEcosystem();}; //gateway
    getInterstellarGateway(){return this.getEcosystem();}; //gateway
    getRehibernator(){};

    informator(){return this.getInformator();}
    bigbrother(){return this.informator();}

    //getInformationObject(){return this;}

    lightweight(){

        var lightweight = this.createSelf(this);

        delete lightweight.ecosystem;

        return lightweight;

    } // lightweight

    checkEcosystem(){if (!this.hasEcosystem()) throw new Ac4yUserText().text("has no ecosystem!");}

} // Ac4yEcosystemMember

// ** ac4y-lifecycle

// *


class Ac4yLifecycleConstant {

    constructor() {

        this.PAUSE = "pause";
        this.LIVE = "live";
        this.STOP = "stop";
        this.ERROR = "error";
        this.BORN = "born";
        this.DEATH = "death";

        this.STATE = {
            pause: "pause"
            ,live: "live"
            ,stop: "stop"
            ,error: "error"
            ,born: "born"
            ,death: "death"
        };

        this.STAGE = {
            live: "live"
            ,idle: "idle"
            ,error: "error"
        };

        this.STEP = {
            born: "born"
            ,death: "death"
            ,error: "error"
            ,start: "start"
            ,stop: "stop"
            ,pause: "pause"
            ,continue: "continue"
        };

        this.DIMENSION = {
            state: "state"
            ,step: "step"
            ,stage: "stage"
            ,station: "station"
        };

    } // constructor

} // Ac4yLifecycleConstant

// *


class Ac4yLifecycleDimensionAlgebra extends Ac4yPersistent {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yLifecycleDimensionAlgebra(object);

    } // createSelf


    setDimension(aDimension) {
        this.dimension = aDimension;
    }
    getDimension() {
        return this.dimension;
    }
    hasDimension() {
        return this.dimension != undefined;
    }

    setFact(aFact) {
        this.fact = aFact;
    }
    getFact() {
        return this.fact;
    }
    hasFact() {
        return this.fact != undefined;
    }

    setStock(aStock) {
        this.stock = aStock;
    }
    getStock() {
        return this.stock;
    }
    createStock() {
        this.stock = new Ac4yKeyValueMemory();
    }
    hasStock() {
        return this.stock != undefined;
    }

    setHistory(aHistory) {
        this.history = aHistory;
    }
    getHistory() {
        return this.history;
    }
    createHistory() {
        this.history = new Ac4yArray();
    }
    hasHistory() {
        return this.history != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.dimension != undefined) target.setDimension(object.dimension);
            if (object.fact != undefined) target.setFact(object.fact);
            if (object.stock != undefined) target.setStock(new Ac4yKeyValueMemory(0).rebuilded(object.stock));
            if (object.history != undefined) target.setHistory(new Ac4yArray(0).rebuilded(object.history));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.dimension != undefined) target.setDimension(object.dimension);
            if (object.fact != undefined) target.setFact(object.fact);
            if (object.stock != undefined) target.setStock(object.stock);
            if (object.history != undefined) target.setHistory(object.history);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yLifecycleDimensionAlgebra

// *


class Ac4yLifecycleFactAlgebra extends Ac4yPersistent {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yLifecycleFactAlgebra(object);

    } // createSelf


    setDimension(aDimension) {
        this.dimension = aDimension;
    }
    getDimension() {
        return this.dimension;
    }
    hasDimension() {
        return this.dimension != undefined;
    }

    setName(aName) {
        this.name = aName;
    }
    getName() {
        return this.name;
    }
    hasName() {
        return this.name != undefined;
    }

    setEntry(aEntry) {
        this.entry = aEntry;
    }
    getEntry() {
        return this.entry;
    }
    hasEntry() {
        return this.entry != undefined;
    }

    setQuit(aQuit) {
        this.quit = aQuit;
    }
    getQuit() {
        return this.quit;
    }
    hasQuit() {
        return this.quit != undefined;
    }

    setStay(aStay) {
        this.stay = aStay;
    }
    getStay() {
        return this.stay;
    }
    hasStay() {
        return this.stay != undefined;
    }

    setOrigin(aOrigin) {
        this.origin = aOrigin;
    }
    getOrigin() {
        return this.origin;
    }
    hasOrigin() {
        return this.origin != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.dimension != undefined) target.setDimension(object.dimension);
            if (object.name != undefined) target.setName(object.name);
            if (object.entry != undefined) target.setEntry(object.entry);
            if (object.quit != undefined) target.setQuit(object.quit);
            if (object.stay != undefined) target.setStay(object.stay);
            if (object.origin != undefined) target.setOrigin(object.origin);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.dimension != undefined) target.setDimension(object.dimension);
            if (object.name != undefined) target.setName(object.name);
            if (object.entry != undefined) target.setEntry(object.entry);
            if (object.quit != undefined) target.setQuit(object.quit);
            if (object.stay != undefined) target.setStay(object.stay);
            if (object.origin != undefined) target.setOrigin(object.origin);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yLifecycleFactAlgebra

// *


class Ac4yLifecycleAlgebra extends Ac4yEcosystemMember {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yLifecycleAlgebra(object);

    } // createSelf


    setDimension(aDimension) {
        this.dimension = aDimension;
    }
    getDimension() {
        return this.dimension;
    }
    createDimension() {
        this.dimension = new Ac4yLCDStock();
    }
    hasDimension() {
        return this.dimension != undefined;
    }

    setIndicatorSet(aIndicatorSet) {
        this.indicatorSet = aIndicatorSet;
    }
    getIndicatorSet() {
        return this.indicatorSet;
    }
    createIndicatorSet() {
        this.indicatorSet = new Ac4yKeyValueMemory();
    }
    hasIndicatorSet() {
        return this.indicatorSet != undefined;
    }

    setSubset(aSubset) {
        this.subset = aSubset;
    }
    getSubset() {
        return this.subset;
    }
    createSubset() {
        this.subset = new Ac4yArray();
    }
    hasSubset() {
        return this.subset != undefined;
    }

    setState(aState) {
        this.state = aState;
    }
    getState() {
        return this.state;
    }
    hasState() {
        return this.state != undefined;
    }

    setStep(aStep) {
        this.step = aStep;
    }
    getStep() {
        return this.step;
    }
    hasStep() {
        return this.step != undefined;
    }

    setStage(aStage) {
        this.stage = aStage;
    }
    getStage() {
        return this.stage;
    }
    hasStage() {
        return this.stage != undefined;
    }

    setStation(aStation) {
        this.station = aStation;
    }
    getStation() {
        return this.station;
    }
    hasStation() {
        return this.station != undefined;
    }

    setStartTime(aStartTime) {
        this.startTime = aStartTime;
    }
    getStartTime() {
        return this.startTime;
    }
    hasStartTime() {
        return this.startTime != undefined;
    }

    setStopTime(aStopTime) {
        this.stopTime = aStopTime;
    }
    getStopTime() {
        return this.stopTime;
    }
    hasStopTime() {
        return this.stopTime != undefined;
    }

    setLiveIndicator(aLiveIndicator) {
        this.liveIndicator = aLiveIndicator;
    }
    getLiveIndicator() {
        return this.liveIndicator;
    }
    createLiveIndicator() {
        this.liveIndicator = new Ac4yBulb();
    }
    hasLiveIndicator() {
        return this.liveIndicator != undefined;
    }

    setOnCreate(aOnCreate) {
        this.onCreate = aOnCreate;
    }
    getOnCreate() {
        return this.onCreate;
    }
    hasOnCreate() {
        return this.onCreate != undefined;
    }
    _fireOnCreate() {
        this.onCreate();
    };
    _tryFireOnCreate() {
        if (this.onCreate) this._fireOnCreate();
    };

    setOnBorn(aOnBorn) {
        this.onBorn = aOnBorn;
    }
    getOnBorn() {
        return this.onBorn;
    }
    hasOnBorn() {
        return this.onBorn != undefined;
    }
    _fireOnBorn() {
        this.onBorn();
    };
    _tryFireOnBorn() {
        if (this.onBorn) this._fireOnBorn();
    };

    setOnDeath(aOnDeath) {
        this.onDeath = aOnDeath;
    }
    getOnDeath() {
        return this.onDeath;
    }
    hasOnDeath() {
        return this.onDeath != undefined;
    }
    _fireOnDeath() {
        this.onDeath();
    };
    _tryFireOnDeath() {
        if (this.onDeath) this._fireOnDeath();
    };

    setOnStart(aOnStart) {
        this.onStart = aOnStart;
    }
    getOnStart() {
        return this.onStart;
    }
    hasOnStart() {
        return this.onStart != undefined;
    }
    _fireOnStart() {
        this.onStart();
    };
    _tryFireOnStart() {
        if (this.onStart) this._fireOnStart();
    };

    setOnStop(aOnStop) {
        this.onStop = aOnStop;
    }
    getOnStop() {
        return this.onStop;
    }
    hasOnStop() {
        return this.onStop != undefined;
    }
    _fireOnStop() {
        this.onStop();
    };
    _tryFireOnStop() {
        if (this.onStop) this._fireOnStop();
    };

    setOnPause(aOnPause) {
        this.onPause = aOnPause;
    }
    getOnPause() {
        return this.onPause;
    }
    hasOnPause() {
        return this.onPause != undefined;
    }
    _fireOnPause() {
        this.onPause();
    };
    _tryFireOnPause() {
        if (this.onPause) this._fireOnPause();
    };

    setOnContinue(aOnContinue) {
        this.onContinue = aOnContinue;
    }
    getOnContinue() {
        return this.onContinue;
    }
    hasOnContinue() {
        return this.onContinue != undefined;
    }
    _fireOnContinue() {
        this.onContinue();
    };
    _tryFireOnContinue() {
        if (this.onContinue) this._fireOnContinue();
    };

    setOnError(aOnError) {
        this.onError = aOnError;
    }
    getOnError() {
        return this.onError;
    }
    hasOnError() {
        return this.onError != undefined;
    }
    _fireOnError() {
        this.onError();
    };
    _tryFireOnError() {
        if (this.onError) this._fireOnError();
    };


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.dimension != undefined) target.setDimension(new Ac4yLCDStock(0).rebuilded(object.dimension));
            if (object.indicatorSet != undefined) target.setIndicatorSet(new Ac4yKeyValueMemory(0).rebuilded(object.indicatorSet));
            if (object.subset != undefined) target.setSubset(new Ac4yArray(0).rebuilded(object.subset));
            if (object.state != undefined) target.setState(object.state);
            if (object.step != undefined) target.setStep(object.step);
            if (object.stage != undefined) target.setStage(object.stage);
            if (object.station != undefined) target.setStation(object.station);
            if (object.startTime != undefined) target.setStartTime(object.startTime);
            if (object.stopTime != undefined) target.setStopTime(object.stopTime);
            if (object.liveIndicator != undefined) target.setLiveIndicator(new Ac4yBulb(0).rebuilded(object.liveIndicator));
            if (object.onCreate != undefined) target.setOnCreate(object.onCreate);
            if (object.onBorn != undefined) target.setOnBorn(object.onBorn);
            if (object.onDeath != undefined) target.setOnDeath(object.onDeath);
            if (object.onStart != undefined) target.setOnStart(object.onStart);
            if (object.onStop != undefined) target.setOnStop(object.onStop);
            if (object.onPause != undefined) target.setOnPause(object.onPause);
            if (object.onContinue != undefined) target.setOnContinue(object.onContinue);
            if (object.onError != undefined) target.setOnError(object.onError);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.dimension != undefined) target.setDimension(object.dimension);
            if (object.indicatorSet != undefined) target.setIndicatorSet(object.indicatorSet);
            if (object.subset != undefined) target.setSubset(object.subset);
            if (object.state != undefined) target.setState(object.state);
            if (object.step != undefined) target.setStep(object.step);
            if (object.stage != undefined) target.setStage(object.stage);
            if (object.station != undefined) target.setStation(object.station);
            if (object.startTime != undefined) target.setStartTime(object.startTime);
            if (object.stopTime != undefined) target.setStopTime(object.stopTime);
            if (object.liveIndicator != undefined) target.setLiveIndicator(object.liveIndicator);
            if (object.onCreate != undefined) target.setOnCreate(object.onCreate);
            if (object.onBorn != undefined) target.setOnBorn(object.onBorn);
            if (object.onDeath != undefined) target.setOnDeath(object.onDeath);
            if (object.onStart != undefined) target.setOnStart(object.onStart);
            if (object.onStop != undefined) target.setOnStop(object.onStop);
            if (object.onPause != undefined) target.setOnPause(object.onPause);
            if (object.onContinue != undefined) target.setOnContinue(object.onContinue);
            if (object.onError != undefined) target.setOnError(object.onError);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yLifecycleAlgebra

// *


class Ac4yLifecycleDimension extends Ac4yLifecycleDimensionAlgebra {

    constructor(object){

        super(object);
        if (object != undefined && object === 0) return;

        if (!this.hasStock()) this.createStock();
        if (!this.hasHistory()) this.createHistory();

    } // constructor

    becomes(fact){

        this.setFact(fact);

        this.getHistory().put(fact);
        this.getStock().put(fact.getName(), fact);

    } // becomes

    realizes(fact){this.becomes(fact);}
    reaches(fact){this.becomes(fact);}

    createSelf(object) {return new Ac4yLifecycleDimension(object);}

} // Ac4yLifecycleDimension

// *


class Ac4yLifecycleFact extends Ac4yLifecycleFactAlgebra {

    createSelf(object) {return new Ac4yLifecycleFact(object);}

    constructor(object){

        super(object);
        if (object != undefined && object === 0) return;

        if (!this.hasEntry())
            this.setEntry(new Ac4yDateTimeHandler().getSystemTime());

    } // constructor

    becomes(name){this.setName(name);}

    forPersistence(object){

        var object = this.objectKilledForPersistence(object);
        var object = super.forPersistence(object);

        object.setEntry(new Date(object.entry));
        object.setQuit(new Date(object.quit));

        //object.setCreatedAt(new Date(object.getCreatedAt()));

        return object;

    } // forPersistence

} // Ac4yLifecycleFact

// *


class Ac4yLCDStage extends Ac4yLifecycleDimension {

    constructor(object){

        super(object);
        if (object != undefined && object === 0) return;

        this.setDimension(new Ac4yLifecycleConstant().DIMENSION.stage);

    } // constructor

    createSelf(object) {return new Ac4yLCDStage(object);}

    reachesByName(name){this.becomes(new Ac4yLCFStage({name: name}));}

    reachesIdle(){this.becomes(new Ac4yLCFStage({name: new Ac4yLifecycleConstant().STAGE.idle}));};
    reachesLive(){this.becomes(new Ac4yLCFStage({name: new Ac4yLifecycleConstant().STAGE.live}));};
    reachesError(){this.becomes(new Ac4yLCFStage({name: new Ac4yLifecycleConstant().STAGE.error}));};

} // Ac4yLCDStage

// *


class Ac4yLCDState extends Ac4yLifecycleDimension {

    constructor(object){

        super(object);
        if (object != undefined && object === 0) return;

        this.setDimension(new Ac4yLifecycleConstant().DIMENSION.state);

    } // constructor

    createSelf(object) {return new Ac4yLCDState(object);}

    becomesByName(name){this.becomes(new Ac4yLCFState({name: name}));}

    becomesLive(){this.becomes(new Ac4yLCFState({name: new Ac4yLifecycleConstant().STATE.live}));};
    becomesBorn(){this.becomes(new Ac4yLCFState({name: new Ac4yLifecycleConstant().STATE.born}));};
    becomesDeath(){this.becomes(new Ac4yLCFState({name: new Ac4yLifecycleConstant().STATE.death}));};
    becomesStop(){this.becomes(new Ac4yLCFState({name: new Ac4yLifecycleConstant().STATE.stop}));};
    becomesPause(){this.becomes(new Ac4yLCFState({name: new Ac4yLifecycleConstant().STATE.pause}));};
    becomesContinue(){this.becomes(new Ac4yLCFState({name: new Ac4yLifecycleConstant().STATE.continue}));};
    becomesError(){this.becomes(new Ac4yLCFState({name: new Ac4yLifecycleConstant().STATE.error}));};

} // Ac4yLCDState

// *


class Ac4yLCDStation extends Ac4yLifecycleDimension {

    constructor(object){

        super(object);
        if (object != undefined && object === 0) return;

        this.setDimension(new Ac4yLifecycleConstant().DIMENSION.station);

    } // constructor

    createSelf(object) {return new Ac4yLCDStation(object);}

} // Ac4yLCDStation

// *


class Ac4yLCDStep extends Ac4yLifecycleDimension {

    constructor(object){

        super(object);
        if (object != undefined && object === 0) return;

        this.setDimension(new Ac4yLifecycleConstant().DIMENSION.step);

    } // constructor

    createSelf(object) {return new Ac4yLCDStep(object);}

    realizesByName(name){this.becomes(new Ac4yLCFStep({name: name}));}

    realizesBorn(){this.becomes(new Ac4yLCFStep({name: new Ac4yLifecycleConstant().STEP.born}));};
    realizesDeath(){this.becomes(new Ac4yLCFStep({name: new Ac4yLifecycleConstant().STEP.death}));};
    realizesStart(){this.becomes(new Ac4yLCFStep({name: new Ac4yLifecycleConstant().STEP.start}));};
    realizesStop(){this.becomes(new Ac4yLCFStep({name: new Ac4yLifecycleConstant().STEP.stop}));};
    realizesPause(){this.becomes(new Ac4yLCFStep({name: new Ac4yLifecycleConstant().STEP.pause}));};
    realizesContinue(){this.becomes(new Ac4yLCFStep({name: new Ac4yLifecycleConstant().STEP.continue}));};
    realizesError(){this.becomes(new Ac4yLCFStep({name: new Ac4yLifecycleConstant().STEP.error}));};

} // Ac4yLCDStep

// *


class Ac4yLCDStock extends Ac4yKeyValueMemory {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;

        this.put(new Ac4yLifecycleConstant().DIMENSION.state, new Ac4yLCDState());
        this.put(new Ac4yLifecycleConstant().DIMENSION.step, new Ac4yLCDStep());
        this.put(new Ac4yLifecycleConstant().DIMENSION.stage, new Ac4yLCDStage());
        this.put(new Ac4yLifecycleConstant().DIMENSION.station, new Ac4yLCDStation());

    } // constructor

    createSelf(object) {return new Ac4yLCDStock(object);}

    rebuilded(object){

        /*this.setStore(object.store);
        return this;
        */

        Object.getOwnPropertyNames(object.store).forEach( (key, index) => {

            if (this.exists(key)){

                var dimension = this.get(key);
                var sourceHistory = object.store[key].history;

                sourceHistory.store.forEach( (item, index) => {
                    delete item.ac4yIdentification;
                    dimension.getHistory().put(new Ac4yLifecycleFact(item));
                });

            }

        });

        return this;

    } // rebuilded

    state(){return this.get(new Ac4yLifecycleConstant().DIMENSION.state);}
    step(){return this.get(new Ac4yLifecycleConstant().DIMENSION.step);}
    stage(){return this.get(new Ac4yLifecycleConstant().DIMENSION.stage);}
    station(){return this.get(new Ac4yLifecycleConstant().DIMENSION.station);}

    convert2Lightweight(history){

        for ( var index=0; index<history.size()-0; index++)
            history.getStore()[index] = history.getStore()[index].lightweight();

    } // convert2Lightweight

    lightweight(){

        this.fetch( (key, dimension, index) => {

            if (dimension.getHistory().size()==0)
                this.remove(key);

            delete dimension.ac4yIdentification;
            delete dimension.stock;
            delete dimension.fact;
            delete dimension.GUID;
            delete dimension.createdAt;

            this.convert2Lightweight(dimension.getHistory());
            delete this.ac4yIdentification;

        });

        return this;

    } // lightweight

    add(source){

        if (source)
            source.fetch( (key, dimension, index) => {

                if (this.exists(key)) {
                    this.get(key).getHistory().add(dimension.history.store);
                }

            });

        return this;

    } // add

} // Ac4yLCDStock

// *


class Ac4yLCFStage extends Ac4yLifecycleFact {

    constructor(object){

        super(object);
        if (object != undefined && object === 0) return;

        this.setDimension(new Ac4yLifecycleConstant().DIMENSION.stage);

    }

    createSelf(object) {return new Ac4yLCFStage(object);}

} // Ac4yLCFStage

// *


class Ac4yLCFState extends Ac4yLifecycleFact {

    constructor(object){

        super(object);
        if (object != undefined && object === 0) return;

        this.setDimension(new Ac4yLifecycleConstant().DIMENSION.state);

    } // constructor

    createSelf(object) {return new Ac4yLCFState(object);}

} // Ac4yLCFState

// *


class Ac4yLCFStation extends Ac4yLifecycleFact {

    constructor(object){

        super(object);
        if (object != undefined && object === 0) return;

        this.setDimension(new Ac4yLifecycleConstant().DIMENSION.station);

    } // constructor

    createSelf(object) {return new Ac4yLCFStation(object);}

} // Ac4yLCFStation

// *


class Ac4yLCFStep extends Ac4yLifecycleFact {

    constructor(object){

        super(object);
        if (object != undefined && object === 0) return;

        this.setDimension(new Ac4yLifecycleConstant().DIMENSION.step);

    } // constructor

    createSelf(object) {return new Ac4yLCFStep(object);}

} // Ac4yLCFStep

// *


class Ac4yLifecycle extends Ac4yLifecycleAlgebra {

    constructor(object) {

        super(object);

        if (object != undefined && object === 0) return;

        if (!this.hasLiveIndicator()) this.createLiveIndicator();
        if (!this.hasSubset()) this.createSubset();
        if (!this.hasIndicatorSet()) this.createIndicatorSet();

        if (!this.hasDimension()) {

            this.createDimension();
            this._tryFireOnCreate();
            this.born();
        }

    } // constructor

    createSelf(object){return new Ac4yLifecycle(object);}

    noLifecycleElements(object){

        object = object || this;

        delete object.liveIndicator;

        delete object.dimension;
        delete object.stage;
        delete object.step;
        delete object.station;
        delete object.state;

        delete object.startTime;
        delete object.stopTime;

        delete object.indicatorSet;
        delete object.subset;

        return object;

    } // noLifecycleElements

    born(){

        //console.log("Ac4yLifecycle.born");

        this.getDimension().state().becomesBorn();
        this.getDimension().stage().reachesIdle();
        this.getDimension().step().realizesBorn();

        this._tryFireOnBorn();

    }; // born

    death(){

        //console.log("Ac4yLifecycle.death");

        this.getDimension().state().becomesDeath();
        //this.getDimension().stage().reachesIdle();
        this.getDimension().step().realizesDeath();

        this._tryFireOnDeath();

    }; // death

    start(){

        //console.log("Ac4yLifecycle.start", this.getThreadId(), this.getAc4yIdentification());

        this._setStartTimeFromSystemTime();

        this.getDimension().state().becomesLive();
        //this.getDimension().stage().reachesLive();
        this.getDimension().step().realizesStart();

        this.getLiveIndicator().switchOn();

        this._tryFireOnStart();

    }; // start

    stop(){

        //console.log("Ac4yLifecycle.stop", this.getThreadId());

        this._setStopTimeFromSystemTime();

        this.getDimension().state().becomesStop();
        //this.getDimension().stage().reachesIdle();
        this.getDimension().step().realizesStop();

        this.getLiveIndicator().switchOff();

        this._tryFireOnStop();

        this._destroy();

    }; // stop

    pause(){

        //console.log("Ac4yLifecycle.pause");

        this.getDimension().state().becomesPause();
        //this.getDimension().stage().reachesIdle();
        this.getDimension().step().realizesPause();

        this._tryFireOnPause();

    }; // pause

    continue(){

        //console.log("Ac4yLifecycle.continue");

        this.getDimension().state().becomesLive();
        //this.getDimension().stage().reachesLive();
        this.getDimension().step().realizesContinue();

        this._tryFireOnContinue();

    }; // continue

    error(){

        //console.log("Ac4yLifecycle.error");

        this.getDimension().state().becomesError();
        this.getDimension().stage().reachesError();
        this.getDimension().step().realizesError();

        this._tryFireOnError();

    }; // error

    _destroy(){

        this.death();

        this._tryFireOnDeath();
    }

    _setStartTimeFromSystemTime(){this.setStartTime(new Ac4yDateTimeHandler().getSystemTime());};

    _setStopTimeFromSystemTime(){this.setStopTime(new Ac4yDateTimeHandler().getSystemTime());};

    getRunTime(){return this.getEndTime()-this.getStartTime();};

    isLive(){return this.getLiveIndicator().on();}

    //getThreadId(){return this.getAc4yIdentification().getGUID();};

    getThreadId(){return this.getGUID();};

    setIndicator(key, value){return this.getIndicatorSet().put(key, value)}
    getIndicator(key){return this.getIndicatorSet().get(key)}

    calculateTimes(history, virtualEnd){

        if (history && history.size()>0) {

            var actual = history.getStore()[history.size()-1]
            actual.setQuit(virtualEnd);
            actual.setStay(actual.getQuit()-actual.getEntry());

            //console.log("history", history);

            for ( var index=0; index<history.size()-0; index++) {

                //console.log(history.getStore()[index]);
                var actual = history.getStore()[index];
                var next = history.getStore()[index+1];

                if (actual && next && actual.hasEntry() && next.hasEntry() ) {

                    actual.setQuit(next.getEntry());
                    actual.setStay(actual.getQuit()-actual.getEntry());

                }

            } // for

        }

    } // calculateTimes

    historySimplifying(history){

        if (history && history.size()>0) {

            for ( var index=0; index<history.size()-0; index++) {
                ///history.getStore()[index].killIdentification()
                delete history.getStore()[index].GUID
            } // for

        }

    } // historySimplifying

    calculateTimesOnHistories(){

        var virtualEnd = new Ac4yDateTimeHandler().getSystemTime()

        this.calculateTimes(this.getDimension().state().getHistory(), virtualEnd);
        this.calculateTimes(this.getDimension().stage().getHistory(), virtualEnd);
        this.calculateTimes(this.getDimension().station().getHistory(), virtualEnd);
        this.calculateTimes(this.getDimension().step().getHistory(), virtualEnd);

    } // calculateTimesOnHistories

    dimensionSimplifying(dimension){

        this.historySimplifying(dimension.getHistory());
        ///dimension.killIdentification()
        //dimension.getStock().killIdentification()
        delete dimension.GUID
        delete dimension.fact
        delete dimension.stock
        delete dimension.dimension

    } // dimensionSimplifying

    dimensionsSimplifying(){

        //this.dimensionSimplifying(this.getDimension().state());
        //this.dimensionSimplifying(this.getDimension().stage());
        //this.dimensionSimplifying(this.getDimension().station());

        ///this.getDimension().killIdentification()

        this.dimensionSimplifying(this.getDimension().step());

        this.getDimension().remove(new Ac4yLifecycleConstant().DIMENSION.stage);
        this.getDimension().remove(new Ac4yLifecycleConstant().DIMENSION.state);
        this.getDimension().remove(new Ac4yLifecycleConstant().DIMENSION.station);


    } // dimensionsSimplifying

    indicatorSetSimplifying(){

        ///this.getIndicatorSet().killIdentification()

    } // indicatorSetSimplifying


    getRunningTime(){

        return this.getDimension().step().getStock().get("death").getEntry()-this.getDimension().step().getStock().get("born").getEntry();

    } // getRunningTime

    tryGetRunningTime(){

        try {
            return this.getRunningTime();
        } catch(error){
            console.error(error);
            return -2;
        }

    } // tryGetRunningTime

    getInformationObject(){

        return {
            "nĂ©v": this.getName()
            ,"elindult": new Ac4yDateTimeHandler().getDateTimeExternalFormat(new Date(this.getStartTime()))
            ,"leĂˇllt": (this.hasStopTime() ? new Ac4yDateTimeHandler().getDateTimeExternalFormat(new Date(this.getStopTime())) : "mĂ©g fut")
            ,"futĂˇsidĹ‘ (emp)": (this.hasStopTime() ? this.getStopTime()-this.getStartTime() : "mĂ©g fut")
            ,"dolgozik": this.isLive()
        };

    } // getInformationObject

} // Ac4yLifecycle

// ** ac4y-timer

// *


class Ac4yTimerConstant {

    constructor() {

        this.ONCREATE = "oncreate";
        this.ONSTART = "onstart";
        this.ONSTOP = "onstop";
        this.ONPAUSE = "onpause";
        this.ONCONTINUE = "oncontinue";
        this.ONTIMEISOVER = "ontimeisover";

    } // constructor

} // Ac4yStateMachineConstant

// *


class Ac4yTimerAlgebra extends Ac4yLifecycle {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yTimerAlgebra(object);

    } // createSelf


    setDuration(aDuration) {
        this.duration = aDuration;
    }
    getDuration() {
        return this.duration;
    }
    hasDuration() {
        return this.duration != undefined;
    }

    setDurationInSecond(aDurationInSecond) {
        this.durationInSecond = aDurationInSecond;
    }
    getDurationInSecond() {
        return this.durationInSecond;
    }
    hasDurationInSecond() {
        return this.durationInSecond != undefined;
    }

    setDurationInMinute(aDurationInMinute) {
        this.durationInMinute = aDurationInMinute;
    }
    getDurationInMinute() {
        return this.durationInMinute;
    }
    hasDurationInMinute() {
        return this.durationInMinute != undefined;
    }

    setEndTime(aEndTime) {
        this.endTime = aEndTime;
    }
    getEndTime() {
        return this.endTime;
    }
    hasEndTime() {
        return this.endTime != undefined;
    }

    setTimer(aTimer) {
        this.timer = aTimer;
    }
    getTimer() {
        return this.timer;
    }
    hasTimer() {
        return this.timer != undefined;
    }

    setOnTime(aOnTime) {
        this.onTime = aOnTime;
    }
    getOnTime() {
        return this.onTime;
    }
    hasOnTime() {
        return this.onTime != undefined;
    }
    _fireOnTime() {
        this.onTime();
    };
    _tryFireOnTime() {
        if (this.onTime) this._fireOnTime();
    };

    setOnCancel(aOnCancel) {
        this.onCancel = aOnCancel;
    }
    getOnCancel() {
        return this.onCancel;
    }
    hasOnCancel() {
        return this.onCancel != undefined;
    }
    _fireOnCancel() {
        this.onCancel();
    };
    _tryFireOnCancel() {
        if (this.onCancel) this._fireOnCancel();
    };


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.duration != undefined) target.setDuration(object.duration);
            if (object.durationInSecond != undefined) target.setDurationInSecond(object.durationInSecond);
            if (object.durationInMinute != undefined) target.setDurationInMinute(object.durationInMinute);
            if (object.endTime != undefined) target.setEndTime(object.endTime);
            if (object.timer != undefined) target.setTimer(object.timer);
            if (object.onTime != undefined) target.setOnTime(object.onTime);
            if (object.onCancel != undefined) target.setOnCancel(object.onCancel);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.duration != undefined) target.setDuration(object.duration);
            if (object.durationInSecond != undefined) target.setDurationInSecond(object.durationInSecond);
            if (object.durationInMinute != undefined) target.setDurationInMinute(object.durationInMinute);
            if (object.endTime != undefined) target.setEndTime(object.endTime);
            if (object.timer != undefined) target.setTimer(object.timer);
            if (object.onTime != undefined) target.setOnTime(object.onTime);
            if (object.onCancel != undefined) target.setOnCancel(object.onCancel);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yTimerAlgebra

// *


class Ac4yTimer extends Ac4yTimerAlgebra {

    constructor(object){

        super(object);
        if (object != undefined && object === 0) return;

        if (this.hasDurationInSecond()) this.setDuration(new Ac4yDateTimeHandler().getSecondInMillisecond(this.getDurationInSecond()));

        if (this.hasDurationInMinute()) this.setDuration(new Ac4yDateTimeHandler().getMinuteInMillisecond(this.getDurationInMinute()));

    } // constructor

    createSelf(object) {return new Ac4yTimer(object);}

    getNewTimer(){return setTimeout( _ => { this.time();}, this.getDuration());};

    getRemainingTime(){

        if (this.isLive())
            return this.getEndTime()-new Ac4yDateTimeHandler().getSystemTime();
        else
            return 0;

    }; // getRemainingTime

    getEstimatedRunTime(){

        if (this.isLive())
            return this.getEndTime()-this.getStartTime();
        else
            return 0;

    }; // getEstimatedRunTime

    start(){

        //console.log("Ac4yTimer.start", this.getThreadId(), this.getAc4yIdentification());

        //super.start();

        this.setTimer(this.getNewTimer());

        this.setEndTime(this.getStartTime()+this.getDuration());

    }; // start

    stop(){

        //console.log("Ac4yTimer.stop", this.getThreadId(), this.getAc4yIdentification());

        //super.stop();

        clearTimeout(this.getTimer());

    }; // stop

    cancel(){

        this._setStopTimeFromSystemTime();

        this.getDimension().state().becomesStop();
        this.getDimension().stage().reachesIdle();
        this.getDimension().step().realizesStop();

        this.getLiveIndicator().switchOff();

        this._tryFireOnCancel();

        this._destroy();

        clearTimeout(this.getTimer());

    }; // stop

    time(){

        this.getLiveIndicator().switchOff();

        this._setStopTimeFromSystemTime();

        this._tryFireOnTime();

//        this.stop();

    }; // time

    getInformationObject(){

        return {
            "név": this.getName()
            ,"ütemezett idő": this.getDuration()
            ,"ütemezett idő (mp)": new Ac4yDateTimeHandler().getMillisecondInSecond(this.getDuration())
            ,"elindult": new Ac4yDateTimeHandler().getDateTimeExternalFormat(new Date(this.getStartTime()))
            ,"befezés": new Ac4yDateTimeHandler().getDateTimeExternalFormat(new Date(this.getEndTime()))
            ,"leállt": new Ac4yDateTimeHandler().getDateTimeExternalFormat(new Date(this.getStopTime()))
            ,"hátralévő idő": this.getRemainingTime()
            ,"hátralévő idő (mp)": new Ac4yDateTimeHandler().getMillisecondInSecond(this.getRemainingTime())
            ,"dolgozik": this.isLive()
        };

    } // getInformationObject

    getShortInformationObject(){

        return {
            "időzítő neve" : this.getName()
            ,"hátralévő idő (mp)" :
                this.isLive() ? new Ac4yDateTimeHandler().getMillisecondInSecond(
                    this.getRemainingTime()
                ) : "nem üzemel"
        };

    } // getShortInformationObject

} // Ac4yTimer

// ** ac4y-flow

// *


class Ac4yFlowConstant {

    constructor() {

        this.TIMEOUT =  "timeout";

        this.STATE = {
            timeout: "timeout"
        };

        this.STEP = {
            timeout: "timeout"
        };

    } // constructor

} // Ac4yFlowConstant

// *


class Ac4yFlowAlgebra extends Ac4yLifecycle {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yFlowAlgebra(object);

    } // createSelf


    setDimension(aDimension) {
        this.dimension = aDimension;
    }
    getDimension() {
        return this.dimension;
    }
    createDimension() {
        this.dimension = new Ac4yFLCDStock();
    }
    hasDimension() {
        return this.dimension != undefined;
    }

    setDuration(aDuration) {
        this.duration = aDuration;
    }
    getDuration() {
        return this.duration;
    }
    hasDuration() {
        return this.duration != undefined;
    }

    setDurationInSecond(aDurationInSecond) {
        this.durationInSecond = aDurationInSecond;
    }
    getDurationInSecond() {
        return this.durationInSecond;
    }
    hasDurationInSecond() {
        return this.durationInSecond != undefined;
    }

    setDurationInMinute(aDurationInMinute) {
        this.durationInMinute = aDurationInMinute;
    }
    getDurationInMinute() {
        return this.durationInMinute;
    }
    hasDurationInMinute() {
        return this.durationInMinute != undefined;
    }

    setTimer(aTimer) {
        this.timer = aTimer;
    }
    getTimer() {
        return this.timer;
    }
    createTimer() {
        this.timer = new Ac4yTimer();
    }
    hasTimer() {
        return this.timer != undefined;
    }

    setOnTimeout(aOnTimeout) {
        this.onTimeout = aOnTimeout;
    }
    getOnTimeout() {
        return this.onTimeout;
    }
    hasOnTimeout() {
        return this.onTimeout != undefined;
    }
    _fireOnTimeout() {
        this.onTimeout();
    };
    _tryFireOnTimeout() {
        if (this.onTimeout) this._fireOnTimeout();
    };


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.dimension != undefined) target.setDimension(new Ac4yFLCDStock(0).rebuilded(object.dimension));
            if (object.duration != undefined) target.setDuration(object.duration);
            if (object.durationInSecond != undefined) target.setDurationInSecond(object.durationInSecond);
            if (object.durationInMinute != undefined) target.setDurationInMinute(object.durationInMinute);
            if (object.timer != undefined) target.setTimer(new Ac4yTimer(0).rebuilded(object.timer));
            if (object.onTimeout != undefined) target.setOnTimeout(object.onTimeout);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.dimension != undefined) target.setDimension(object.dimension);
            if (object.duration != undefined) target.setDuration(object.duration);
            if (object.durationInSecond != undefined) target.setDurationInSecond(object.durationInSecond);
            if (object.durationInMinute != undefined) target.setDurationInMinute(object.durationInMinute);
            if (object.timer != undefined) target.setTimer(object.timer);
            if (object.onTimeout != undefined) target.setOnTimeout(object.onTimeout);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yFlowAlgebra

// *


class Ac4yFLCDState extends Ac4yLCDState {

    createSelf(object) {return new Ac4yFLCDState(object);}

    becomesTimeout(){this.becomes(new Ac4yLCFState({name: new Ac4yFlowConstant().STATE.timeout}));};

} // Ac4yFLCDState

// *


class Ac4yFLCDStep extends Ac4yLCDStep {

    createSelf(object) {return new Ac4yFLCDStep(object);}

    realizesTimeout(){this.becomes(new Ac4yLCFStep({name: new Ac4yFlowConstant().STEP.timeout}));};

} // Ac4yFLCDStep

// *


class Ac4yFLCDStock extends Ac4yLCDStock {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;

        this.put(new Ac4yLifecycleConstant().DIMENSION.state, new Ac4yFLCDState());
        this.put(new Ac4yLifecycleConstant().DIMENSION.step, new Ac4yFLCDStep());
        this.put(new Ac4yLifecycleConstant().DIMENSION.stage, new Ac4yLCDStage());
        this.put(new Ac4yLifecycleConstant().DIMENSION.station, new Ac4yLCDStation());

    } // constructor

    createSelf(object) {return new Ac4yFLCDStock(object);}

} // Ac4yFLCDStock

// *


class Ac4yFlow extends Ac4yFlowAlgebra {

    constructor(object){

        //if (!this.hasStateMachine()) this.createStateMachine();

        super(object);

        if (object != undefined && object === 0) return;

        if (this.hasDurationInSecond()) this.setDuration(new Ac4yDateTimeHandler().getSecondInMillisecond(this.getDurationInSecond()));

        if (this.hasDurationInMinute()) this.setDuration(new Ac4yDateTimeHandler().getMinuteInMillisecond(this.getDurationInMinute()));

        if (!this.hasDuration())
            this.setDuration(3000);

        this.setTimer(
            new Ac4yTimer({
                name: "timeout timer"
                ,duration: this.getDuration()
                ,onTime: ( () => {this.timeout();})
            })
        );

        if (!this.getAc4yIdentification().hasTemplate()) this.getAc4yIdentification().createTemplate();
        this.getAc4yIdentification().getTemplate().setHumanId("Ac4yFlow");

    } // constructor

    createSelf(object) {return new Ac4yFlow(object);}

    noLifecycleElements(object){

        object = object || this;

        var object = super.noLifecycleElements(object);

        delete object.timer;
        delete object.duration;
        delete object.durationInSecond;
        delete object.durationInMinute;

        return object;

    } // noLifecycleElements

    forTransport(object) {

        object = object || this;

        return object
            //.noIdentification()
            .noLifecycleElements()
            .noStandaloneIdenficationElements()
            .noEcosystem()

    } // forTransport

    start(){

//        console.log("Ac4yFlow.start", this.getThreadId());

        this.getTimer().start();

        super.start();

    } // start

    stop(){

        //console.log("Ac4yFlow.stop", this.getThreadId());

        this.getTimer().stop();

        super.stop();

    } // stop

    timeout(){

        //console.log("Ac4yFlow.timeout", this.getThreadId());

        this.getDimension().state().becomesTimeout();
        this.getDimension().stage().reachesIdle();
        this.getDimension().step().realizesTimeout();

        this.stop();

    } // timeout

} // Ac4yFlow

// ** ac4y-service

// *


class Ac4yServiceConstant {

    constructor() {

        this.REQUEST = "request";
        this.RESPONSE = "response";
        this.COMMIT = "commit";
        this.ROLLBACK = "rollback";
        this.SUCCESS = "success";
        this.FAIL = "fail";
        this.DONE = "done";
        this.NOTHINGHAPPENED = "nothing happened";

        this.STATE = {
            done: "done"
            ,waiting: "waiting"
            ,processing: "processing"
            ,rollback: "rollback"
            ,transporting: "transporting"
            ,request: "request"
            ,response: "response"
            ,call: "call"
            ,reply: "reply"
            ,commit: "commit"
            ,success: "success"
            ,fail: "fail"
            ,warning: "warning"
            ,nothingHappened: "nothing happened"
        };

        this.STEP = {
            done: "done"
            ,request: "request"
            ,response: "response"
            ,process: "process"
            ,transport: "transport"
            ,call: "call"
            ,reply: "reply"
            ,rollback: "rollback"
            ,commit: "commit"
            ,success: "success"
            ,fail: "fail"
            ,warning: "warning"
            ,nothingHappened: "nothing happened"
        };

        this.STAGE = {
            waiting4Response: "waiting for response"
        };

    } // constructor

} // Ac4yServiceConstant

// *


class Ac4yProcessResultAlgebra {

    constructor(object) {

        if (object != undefined && object === 0) return;
        if (object) this.copy(object, this);

    } // constructor


    createSelf(object) {
        return new Ac4yProcessResultAlgebra(object);

    } // createSelf


    setRequestId(aRequestId) {
        this.requestId = aRequestId;
    }
    getRequestId() {
        return this.requestId;
    }
    hasRequestId() {
        return this.requestId != undefined;
    }

    setCode(aCode) {
        this.code = aCode;
    }
    getCode() {
        return this.code;
    }
    hasCode() {
        return this.code != undefined;
    }

    setMessage(aMessage) {
        this.message = aMessage;
    }
    getMessage() {
        return this.message;
    }
    hasMessage() {
        return this.message != undefined;
    }

    setDescription(aDescription) {
        this.description = aDescription;
    }
    getDescription() {
        return this.description;
    }
    hasDescription() {
        return this.description != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        if (object) {

            if (object.requestId != undefined) target.setRequestId(object.requestId);
            if (object.code != undefined) target.setCode(object.code);
            if (object.message != undefined) target.setMessage(object.message);
            if (object.description != undefined) target.setDescription(object.description);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        target = target || this;
        if (object) return this.copy(object, this.rebuild(object));

        else return target;

    } // rebuilded

    copy(object, target) {

        target = target || this;
        if (object) {

            if (object.requestId != undefined) target.setRequestId(object.requestId);
            if (object.code != undefined) target.setCode(object.code);
            if (object.message != undefined) target.setMessage(object.message);
            if (object.description != undefined) target.setDescription(object.description);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yProcessResultAlgebra

// *

class Ac4yServiceAlgebra extends Ac4yFlow {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yServiceAlgebra(object);

    } // createSelf


    setDimension(aDimension) {
        this.dimension = aDimension;
    }
    getDimension() {
        return this.dimension;
    }
    createDimension() {
        this.dimension = new Ac4ySLCDStock();
    }
    hasDimension() {
        return this.dimension != undefined;
    }

    setDataSafe(aDataSafe) {
        this.dataSafe = aDataSafe;
    }
    getDataSafe() {
        return this.dataSafe;
    }
    hasDataSafe() {
        return this.dataSafe != undefined;
    }

    setOnCommit(aOnCommit) {
        this.onCommit = aOnCommit;
    }
    getOnCommit() {
        return this.onCommit;
    }
    hasOnCommit() {
        return this.onCommit != undefined;
    }
    _fireOnCommit() {
        this.onCommit();
    };
    _tryFireOnCommit() {
        if (this.onCommit) this._fireOnCommit();
    };

    setOnRollback(aOnRollback) {
        this.onRollback = aOnRollback;
    }
    getOnRollback() {
        return this.onRollback;
    }
    hasOnRollback() {
        return this.onRollback != undefined;
    }
    _fireOnRollback() {
        this.onRollback();
    };
    _tryFireOnRollback() {
        if (this.onRollback) this._fireOnRollback();
    };

    setOnSuccess(aOnSuccess) {
        this.onSuccess = aOnSuccess;
    }
    getOnSuccess() {
        return this.onSuccess;
    }
    hasOnSuccess() {
        return this.onSuccess != undefined;
    }
    _fireOnSuccess() {
        this.onSuccess();
    };
    _tryFireOnSuccess() {
        if (this.onSuccess) this._fireOnSuccess();
    };

    setOnFail(aOnFail) {
        this.onFail = aOnFail;
    }
    getOnFail() {
        return this.onFail;
    }
    hasOnFail() {
        return this.onFail != undefined;
    }
    _fireOnFail() {
        this.onFail();
    };
    _tryFireOnFail() {
        if (this.onFail) this._fireOnFail();
    };

    setOnNothingHappened(aOnNothingHappened) {
        this.onNothingHappened = aOnNothingHappened;
    }
    getOnNothingHappened() {
        return this.onNothingHappened;
    }
    hasOnNothingHappened() {
        return this.onNothingHappened != undefined;
    }
    _fireOnNothingHappened() {
        this.onNothingHappened();
    };
    _tryFireOnNothingHappened() {
        if (this.onNothingHappened) this._fireOnNothingHappened();
    };

    setOnDone(aOnDone) {
        this.onDone = aOnDone;
    }
    getOnDone() {
        return this.onDone;
    }
    hasOnDone() {
        return this.onDone != undefined;
    }
    _fireOnDone() {
        this.onDone();
    };
    _tryFireOnDone() {
        if (this.onDone) this._fireOnDone();
    };

    setRequest(aRequest) {
        this.request = aRequest;
    }
    getRequest() {
        return this.request;
    }
    createRequest() {
        this.request = new Ac4yServiceRequest();
    }
    hasRequest() {
        return this.request != undefined;
    }

    setResponse(aResponse) {
        this.response = aResponse;
    }
    getResponse() {
        return this.response;
    }
    createResponse() {
        this.response = new Ac4yServiceResponse();
    }
    hasResponse() {
        return this.response != undefined;
    }

    setProvider(aProvider) {
        this.provider = aProvider;
    }
    getProvider() {
        return this.provider;
    }
    hasProvider() {
        return this.provider != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.dimension != undefined) target.setDimension(new Ac4ySLCDStock(0).rebuilded(object.dimension));
            if (object.dataSafe != undefined) target.setDataSafe(object.dataSafe);
            if (object.onCommit != undefined) target.setOnCommit(object.onCommit);
            if (object.onRollback != undefined) target.setOnRollback(object.onRollback);
            if (object.onSuccess != undefined) target.setOnSuccess(object.onSuccess);
            if (object.onFail != undefined) target.setOnFail(object.onFail);
            if (object.onNothingHappened != undefined) target.setOnNothingHappened(object.onNothingHappened);
            if (object.onDone != undefined) target.setOnDone(object.onDone);
            if (object.request != undefined) target.setRequest(new Ac4yServiceRequest(0).rebuilded(object.request));
            if (object.response != undefined) target.setResponse(new Ac4yServiceResponse(0).rebuilded(object.response));
            if (object.provider != undefined) target.setProvider(object.provider);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.dimension != undefined) target.setDimension(object.dimension);
            if (object.dataSafe != undefined) target.setDataSafe(object.dataSafe);
            if (object.onCommit != undefined) target.setOnCommit(object.onCommit);
            if (object.onRollback != undefined) target.setOnRollback(object.onRollback);
            if (object.onSuccess != undefined) target.setOnSuccess(object.onSuccess);
            if (object.onFail != undefined) target.setOnFail(object.onFail);
            if (object.onNothingHappened != undefined) target.setOnNothingHappened(object.onNothingHappened);
            if (object.onDone != undefined) target.setOnDone(object.onDone);
            if (object.request != undefined) target.setRequest(object.request);
            if (object.response != undefined) target.setResponse(object.response);
            if (object.provider != undefined) target.setProvider(object.provider);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yServiceAlgebra

// *


class Ac4yServiceContainerAlgebra extends Ac4yEcosystemMember {

    constructor(aObject) {

        super(aObject);
        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yServiceContainerAlgebra();

    } // createSelf

    setHost(aHost) {
        this.host = aHost;
    }
    getHost() {
        return this.host;
    }
    hasHost() {
        return this.host != undefined;
    }


    rebuild(aObject, aTarget) {

        super.rebuild(aObject, aTarget);
        if (aObject) {

            if (aObject.host != undefined) aTarget.setHost(aObject.host);

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yServiceContainerAlgebra

// *


class Ac4yServiceEnvelopeAlgebra {

    constructor(object) {

        if (object != undefined && object === 0) return;
        if (object) this.copy(object, this);

    } // constructor


    createSelf(object) {
        return new Ac4yServiceEnvelopeAlgebra(object);

    } // createSelf


    setSession(aSession) {
        this.session = aSession;
    }
    getSession() {
        return this.session;
    }
    hasSession() {
        return this.session != undefined;
    }

    setOwner(aOwner) {
        this.owner = aOwner;
    }
    getOwner() {
        return this.owner;
    }
    hasOwner() {
        return this.owner != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        if (object) {

            if (object.session != undefined) target.setSession(object.session);
            if (object.owner != undefined) target.setOwner(object.owner);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        target = target || this;
        if (object) return this.copy(object, this.rebuild(object));

        else return target;

    } // rebuilded

    copy(object, target) {

        target = target || this;
        if (object) {

            if (object.session != undefined) target.setSession(object.session);
            if (object.owner != undefined) target.setOwner(object.owner);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yServiceEnvelopeAlgebra

// *

class Ac4yServiceManagerAlgebra extends Ac4yEcosystemMember {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yServiceManagerAlgebra(object);

    } // createSelf


    setWaiting4Response(aWaiting4Response) {
        this.waiting4Response = aWaiting4Response;
    }
    getWaiting4Response() {
        return this.waiting4Response;
    }
    createWaiting4Response() {
        this.waiting4Response = new Ac4yKeyValueMemory();
    }
    hasWaiting4Response() {
        return this.waiting4Response != undefined;
    }

    setWaiting4Processing(aWaiting4Processing) {
        this.waiting4Processing = aWaiting4Processing;
    }
    getWaiting4Processing() {
        return this.waiting4Processing;
    }
    createWaiting4Processing() {
        this.waiting4Processing = new Ac4yKeyValueMemory();
    }
    hasWaiting4Processing() {
        return this.waiting4Processing != undefined;
    }

    setCompleted(aCompleted) {
        this.completed = aCompleted;
    }
    getCompleted() {
        return this.completed;
    }
    createCompleted() {
        this.completed = new Ac4yKeyValueMemory();
    }
    hasCompleted() {
        return this.completed != undefined;
    }

    setFailed(aFailed) {
        this.failed = aFailed;
    }
    getFailed() {
        return this.failed;
    }
    createFailed() {
        this.failed = new Ac4yKeyValueMemory();
    }
    hasFailed() {
        return this.failed != undefined;
    }

    setSuccess(aSuccess) {
        this.success = aSuccess;
    }
    getSuccess() {
        return this.success;
    }
    createSuccess() {
        this.success = new Ac4yKeyValueMemory();
    }
    hasSuccess() {
        return this.success != undefined;
    }

    setUseless(aUseless) {
        this.useless = aUseless;
    }
    getUseless() {
        return this.useless;
    }
    createUseless() {
        this.useless = new Ac4yKeyValueMemory();
    }
    hasUseless() {
        return this.useless != undefined;
    }

    setAll(aAll) {
        this.all = aAll;
    }
    getAll() {
        return this.all;
    }
    createAll() {
        this.all = new Ac4yKeyValueMemory();
    }
    hasAll() {
        return this.all != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.waiting4Response != undefined) target.setWaiting4Response(new Ac4yKeyValueMemory(0).rebuilded(object.waiting4Response));
            if (object.waiting4Processing != undefined) target.setWaiting4Processing(new Ac4yKeyValueMemory(0).rebuilded(object.waiting4Processing));
            if (object.completed != undefined) target.setCompleted(new Ac4yKeyValueMemory(0).rebuilded(object.completed));
            if (object.failed != undefined) target.setFailed(new Ac4yKeyValueMemory(0).rebuilded(object.failed));
            if (object.success != undefined) target.setSuccess(new Ac4yKeyValueMemory(0).rebuilded(object.success));
            if (object.useless != undefined) target.setUseless(new Ac4yKeyValueMemory(0).rebuilded(object.useless));
            if (object.all != undefined) target.setAll(new Ac4yKeyValueMemory(0).rebuilded(object.all));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.waiting4Response != undefined) target.setWaiting4Response(object.waiting4Response);
            if (object.waiting4Processing != undefined) target.setWaiting4Processing(object.waiting4Processing);
            if (object.completed != undefined) target.setCompleted(object.completed);
            if (object.failed != undefined) target.setFailed(object.failed);
            if (object.success != undefined) target.setSuccess(object.success);
            if (object.useless != undefined) target.setUseless(object.useless);
            if (object.all != undefined) target.setAll(object.all);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yServiceManagerAlgebra

// *


class Ac4yServiceRequestAlgebra extends Ac4y {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yServiceRequestAlgebra(object);

    } // createSelf


    setEnvelope(aEnvelope) {
        this.envelope = aEnvelope;
    }
    getEnvelope() {
        return this.envelope;
    }
    createEnvelope() {
        this.envelope = new Ac4yServiceEnvelope();
    }
    hasEnvelope() {
        return this.envelope != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.envelope != undefined) target.setEnvelope(new Ac4yServiceEnvelope(0).rebuilded(object.envelope));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.envelope != undefined) target.setEnvelope(object.envelope);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yServiceRequestAlgebra

// *


class Ac4yServiceResponseAlgebra extends Ac4y {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yServiceResponseAlgebra(object);

    } // createSelf


    setResult(aResult) {
        this.result = aResult;
    }
    getResult() {
        return this.result;
    }
    createResult() {
        this.result = new Ac4yProcessResult();
    }
    hasResult() {
        return this.result != undefined;
    }

    setDimension(aDimension) {
        this.dimension = aDimension;
    }
    getDimension() {
        return this.dimension;
    }
    createDimension() {
        this.dimension = new Ac4ySLCDStock();
    }
    hasDimension() {
        return this.dimension != undefined;
    }

    setIndicatorSet(aIndicatorSet) {
        this.indicatorSet = aIndicatorSet;
    }
    getIndicatorSet() {
        return this.indicatorSet;
    }
    createIndicatorSet() {
        this.indicatorSet = new Ac4yKeyValueMemory();
    }
    hasIndicatorSet() {
        return this.indicatorSet != undefined;
    }

    setSubset(aSubset) {
        this.subset = aSubset;
    }
    getSubset() {
        return this.subset;
    }
    createSubset() {
        this.subset = new Ac4yArray();
    }
    hasSubset() {
        return this.subset != undefined;
    }

    setThreadId(aThreadId) {
        this.threadId = aThreadId;
    }
    getThreadId() {
        return this.threadId;
    }
    hasThreadId() {
        return this.threadId != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.result != undefined) target.setResult(new Ac4yProcessResult(0).rebuilded(object.result));
            if (object.dimension != undefined) target.setDimension(new Ac4ySLCDStock(0).rebuilded(object.dimension));
            if (object.indicatorSet != undefined) target.setIndicatorSet(new Ac4yKeyValueMemory(0).rebuilded(object.indicatorSet));
            if (object.subset != undefined) target.setSubset(new Ac4yArray(0).rebuilded(object.subset));
            if (object.threadId != undefined) target.setThreadId(object.threadId);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.result != undefined) target.setResult(object.result);
            if (object.dimension != undefined) target.setDimension(object.dimension);
            if (object.indicatorSet != undefined) target.setIndicatorSet(object.indicatorSet);
            if (object.subset != undefined) target.setSubset(object.subset);
            if (object.threadId != undefined) target.setThreadId(object.threadId);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yServiceResponseAlgebra

// *


class Ac4yStatelessServiceAlgebra extends Ac4y {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yStatelessServiceAlgebra(object);

    } // createSelf


    setOnStart(aOnStart) {
        this.onStart = aOnStart;
    }
    getOnStart() {
        return this.onStart;
    }
    hasOnStart() {
        return this.onStart != undefined;
    }
    _fireOnStart() {
        this.onStart();
    };
    _tryFireOnStart() {
        if (this.onStart) this._fireOnStart();
    };

    setOnRequest(aOnRequest) {
        this.onRequest = aOnRequest;
    }
    getOnRequest() {
        return this.onRequest;
    }
    hasOnRequest() {
        return this.onRequest != undefined;
    }
    _fireOnRequest() {
        this.onRequest();
    };
    _tryFireOnRequest() {
        if (this.onRequest) this._fireOnRequest();
    };

    setOnCommit(aOnCommit) {
        this.onCommit = aOnCommit;
    }
    getOnCommit() {
        return this.onCommit;
    }
    hasOnCommit() {
        return this.onCommit != undefined;
    }
    _fireOnCommit() {
        this.onCommit();
    };
    _tryFireOnCommit() {
        if (this.onCommit) this._fireOnCommit();
    };

    setOnRollback(aOnRollback) {
        this.onRollback = aOnRollback;
    }
    getOnRollback() {
        return this.onRollback;
    }
    hasOnRollback() {
        return this.onRollback != undefined;
    }
    _fireOnRollback() {
        this.onRollback();
    };
    _tryFireOnRollback() {
        if (this.onRollback) this._fireOnRollback();
    };


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.onStart != undefined) target.setOnStart(object.onStart);
            if (object.onRequest != undefined) target.setOnRequest(object.onRequest);
            if (object.onCommit != undefined) target.setOnCommit(object.onCommit);
            if (object.onRollback != undefined) target.setOnRollback(object.onRollback);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.onStart != undefined) target.setOnStart(object.onStart);
            if (object.onRequest != undefined) target.setOnRequest(object.onRequest);
            if (object.onCommit != undefined) target.setOnCommit(object.onCommit);
            if (object.onRollback != undefined) target.setOnRollback(object.onRollback);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yStatelessServiceAlgebra

// *


class GetByIdRequestAlgebra {

    constructor(aObject) {

        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new GetByIdRequestAlgebra();

    } // createSelf

    setId(aId) {
        this.id = aId;
    }
    getId() {
        return this.id;
    }
    hasId() {
        return this.id != undefined;
    }


    rebuild(aObject, aTarget) {

        if (aObject) {

            if (aObject.id != undefined) aTarget.setId(aObject.id);

        } // if aObject does not empty

        return aTarget;

    } // rebuild

    getNew(aId) {

        var vObject = this.createSelf();

        if (aId) vObject.setId(aId);

        return vObject;

    } // getNew

    getNewFromObject(aObject) {
        return this.rebuild(aObject, this.createSelf());
    }

    serialized() {
        return JSON.stringify(JSON.decycle(this));
    }

    deserialized(aSerialized) {
        return this.getNewFromObject(JSON.parse(aSerialized));
    }

    hibernate() {
        new LocalStorageHandler().put('GetByIdRequest', new Ac4yBase64Handler().encode(this.serialized()));
    };

    rehibernate() {
        this.rebuild(this.deserialized(new Ac4yBase64Handler().decode(new LocalStorageHandler().get('GetByIdRequest'))), this);
    };

    getNewFromHibernation() {
        var vObject = this.createSelf();
        vObject.rehibernate();
        return vObject;
    };

} // GetByIdRequestAlgebra

// *


class GetByValueRequestAlgebra {

    constructor(aObject) {

        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new GetByValueRequestAlgebra();

    } // createSelf

    setValue(aValue) {
        this.value = aValue;
    }
    getValue() {
        return this.value;
    }
    hasValue() {
        return this.value != undefined;
    }


    rebuild(aObject, aTarget) {

        if (aObject) {

            if (aObject.value != undefined) aTarget.setValue(aObject.value);

        } // if aObject does not empty

        return aTarget;

    } // rebuild

    getNew(aValue) {

        var vObject = this.createSelf();

        if (aValue) vObject.setValue(aValue);

        return vObject;

    } // getNew

    getNewFromObject(aObject) {
        return this.rebuild(aObject, this.createSelf());
    }

    serialized() {
        return JSON.stringify(JSON.decycle(this));
    }

    deserialized(aSerialized) {
        return this.getNewFromObject(JSON.parse(aSerialized));
    }

    hibernate() {
        new LocalStorageHandler().put('GetByValueRequest', new Ac4yBase64Handler().encode(this.serialized()));
    };

    rehibernate() {
        this.rebuild(this.deserialized(new Ac4yBase64Handler().decode(new LocalStorageHandler().get('GetByValueRequest'))), this);
    };

    getNewFromHibernation() {
        var vObject = this.createSelf();
        vObject.rehibernate();
        return vObject;
    };

} // GetByValueRequestAlgebra

// *


class GetListResponseAlgebra {

    constructor(aObject) {

        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new GetListResponseAlgebra();

    } // createSelf

    setResult(aResult) {
        this.result = aResult;
    }
    getResult() {
        return this.result;
    }
    createResult() {
        this.result = new Ac4yProcessResult();
    }
    hasResult() {
        return this.result != undefined;
    }

    setList(aList) {
        this.list = aList;
    }
    getList() {
        return this.list;
    }
    createList() {
        this.list = new Object();
    }
    hasList() {
        return this.list != undefined;
    }


    rebuild(aObject, aTarget) {

        if (aObject) {

            if (aObject.result != undefined) aTarget.setResult(new Ac4yProcessResult(aObject.result));
            if (aObject.list != undefined) aTarget.setList(new Object(aObject.list));

        } // if aObject does not empty

        return aTarget;

    } // rebuild

    getNew(aResult, aList) {

        var vObject = this.createSelf();

        if (aResult) vObject.setResult(aResult);
        if (aList) vObject.setList(aList);

        return vObject;

    } // getNew

    getNewFromObject(aObject) {
        return this.rebuild(aObject, this.createSelf());
    }

    serialized() {
        return JSON.stringify(JSON.decycle(this));
    }

    deserialized(aSerialized) {
        return this.getNewFromObject(JSON.parse(aSerialized));
    }

    hibernate() {
        new LocalStorageHandler().put('GetListResponse', new Ac4yBase64Handler().encode(this.serialized()));
    };

    rehibernate() {
        this.rebuild(this.deserialized(new Ac4yBase64Handler().decode(new LocalStorageHandler().get('GetListResponse'))), this);
    };

    getNewFromHibernation() {
        var vObject = this.createSelf();
        vObject.rehibernate();
        return vObject;
    };

} // GetListResponseAlgebra

// *


class Ac4yServiceResponse extends Ac4yServiceResponseAlgebra {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
        /*
                if (!this.getAc4yIdentification().hasTemplate()) this.getAc4yIdentification().createTemplate();
                this.getAc4yIdentification().getTemplate().setHumanId("Ac4yServiceResponse");
        */
        if (!this.hasResult()) this.createResult();

    } // constructor

    createSelf(object) {return new Ac4yServiceResponse(object);}

    getErrorProcessResult(description, message){return new Ac4yProcessResult().error(description, message);}

    error(description, message){

        this.setResult(new Ac4yProcessResult().error(description, message));
        return this;

    } // error

    success(){

        this.setResult(new Ac4yProcessResult().success());
        return this;

    } // success

    nothingHappened(narrative){

        this.setResult(new Ac4yProcessResult().nothingHappened(
            new Ac4yUserText().text("nothing happened")
            ,narrative
        ));

        return this;

    } // nothingHappened

    timeout(){return new Ac4yProcessResult().error(new Ac4yUserText().text("timeout!"));}

    getErrorServiceResponse(description, message){
        return new Ac4yServiceResponse({
            result: this.getErrorProcessResult(description, message)
        });
    } // getErrorServiceResponse

    getTimeoutServiceResponse(){return new Ac4yProcessResult().error(new Ac4yUserText().text("timeout!"));}
    getSuccessProcessResult(){return new Ac4yProcessResult().success(new Ac4yUserText().text("success"));}

    getNothingHappenedProcessResult(narrative){return new Ac4yProcessResult().nothingHappened(
        new Ac4yUserText().text("nothing happened")
        , narrative);
    }

    getSuccessServiceResponse(){

        return new Ac4yServiceResponse({
            result: this.getSuccessProcessResult()
        });

    } // getSuccessServiceResponse


    getNothingHappenedServiceResponse(aNarrativa){

        return new Ac4yServiceResponse({
            result: this.getNothingHappenedProcessResult(aNarrativa)
        });

    } // getNothingHappenedServiceResponse

    itWasFailed(){return this.getResult().getCode()==-1}
    itWasNothingToDo(){return this.getResult().getCode()==0}
    itWasSuccessful(){return this.getResult().getCode()==1}

    addedRequestId(requestId){

        this.setResult(this.getResult().addedRequestId(requestId));

        return this;

    } // addedRequestId

    addedDescription(description){

        this.setResult(this.getResult().addedDescription(description));

        return this;

    } // addedDescription

    lightweight() {return this.onlyGUIDIdentification();}

} // Ac4yServiceResponse

// *


class Ac4yObjectService extends Ac4yServiceResponse {

    async getList(list, name) {

        try {

            var response = new GetListResponse();

            if (name)
                response[name]=list;
            else
                response.setList(list);

            if (response.hasList() && response.getList().length>0)
                response.setResult(new Ac4yProcessResult().success());
            else
                response.setResult(new Ac4yProcessResult().nothingHappened("the list is empty"));

        } catch (error) {response.setResult(new Ac4yProcessResult().error(error.message || error))};

        return response;

    } // getList

    async getObject(object) {

        try {

            var response = new GetObjectResponse();

            if (object) {

                response.setObject(object);
                response.setResult(new Ac4yProcessResult().success());

            }
            else
                response.setResult(new Ac4yProcessResult().nothingHappened("has no result!"));

        } catch (error) {response.setResult(new Ac4yProcessResult().error(error.message || error))};

        return response;

    } // getObject

    async getObjectResponse(service) {

        try {

            var response = new GetObjectResponse();

            var object = await service.catch( (error) => {throw error});

            if (object) {

                response.setObject(object);
                response.setResult(new Ac4yProcessResult().success());

            }
            else
                response.setResult(new Ac4yProcessResult().nothingHappened("has no result!"));

        } catch (error) {response.setResult(new Ac4yProcessResult().error(error.message || error))};

        return response;

    } // getObjectResponse

    async doesExistObjectById(service) {

        try {

            var response = new GetObjectResponse();

            var exists = await service.catch( (error) => {throw error});

            if (exists)
                response.setResult(
                    new Ac4yProcessResult({
                        code: 1
                        ,message: "exist!"
                    })
                );
            else
                response.setResult(
                    new Ac4yProcessResult({
                        code: 0
                        ,message: "does not exist!"
                    })
                );

        } catch (error) {response.setResult(new Ac4yProcessResult().error(error.message || error))};

        return response;

    } // doesExistObjectById

} // Ac4yObjectService

// *


class GetObjectResponseAlgebra extends Ac4yServiceResponse {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new GetObjectResponseAlgebra(object);

    } // createSelf


    setObject(aObject) {
        this.object = aObject;
    }
    getObject() {
        return this.object;
    }
    createObject() {
        this.object = new Object();
    }
    hasObject() {
        return this.object != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.object != undefined) target.setObject(new Object(0).rebuilded(object.object));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.object != undefined) target.setObject(object.object);

        } // if object does not empty

        return target;

    } // copy

} // GetObjectResponseAlgebra

// *


class GetListResponse extends GetListResponseAlgebra {

    createSelf(object) {return new GetListResponse(object);}

} // GetListResponse

// *


class GetObjectResponse extends GetObjectResponseAlgebra {

    createSelf(object) {return new GetObjectResponse(object);}

} // GetObjectResponse

// *


class Ac4yHttpServiceClient {

    get(options) {

        return new Promise ((resolve, reject) => {

            http.get(options, (res) => {
                resolve(res);
            }).on('error', (e) => {
                reject(e);
            });

        });

    } // get

    request(options) {

        return new Promise ((resolve, reject) => {

            http.request(options, (res) => {
                resolve(res);
            }).on('error', (e) => {
                reject(e);
            });

        });

    } // request

} // Ac4yHttpServiceClient

// *


class Ac4yHttpsServiceClient {

    get(options) {

        return new Promise ((resolve, reject) => {

            https.get(options, (res) => {
                resolve(res);
            }).on('error', (e) => {
                reject(e);
            });

        });

    } // get

    request(options) {

        return new Promise ((resolve, reject) => {

            https.request(options, (res) => {
                resolve(res);
            }).on('error', (e) => {
                reject(e);
            });

        });

    } // request

} // Ac4yHttpsServiceClient

// *


class Ac4yProcessResult extends Ac4yProcessResultAlgebra {

    error(description, message){

        this.setCode(-1);
        this.setMessage(new Ac4yUserText().text( message || "error!"));
        this.setDescription(description);

        return this;

    } // error

    success(narrative){

        this.setCode(1);

        if (narrative)
            this.setMessage(narrative);
        else
            this.setMessage(new Ac4yUserText().text("success!"));

        return this;

    } // success

    nothingHappened(message, narrative){

        this.setCode(0);

        if (message)
            this.setMessage(message);
        else
            this.setMessage(new Ac4yUserText().text("useless!"));

        if (narrative)
            this.setDescription(narrative);

        return this;

    } // nothingHappened

    itWasFailed(){return this.getCode()==-1;};
    itWasNothingToDo(){return this.getCode()==0;};
    itWasSuccessful(){return this.getCode()==1;};

    addedRequestId(requestId){

        this.setRequestId(requestId);
        return this;

    } // addedRequestId

    addedDescription(description){

        this.setDescription(description);

        return this;

    } // addedDescription

    resultCodeAsText(){

        switch (this.getCode()) {

            case 1: return "success"; break;
            case 0: return "useless"; break;
            case -1: return "failed"; break;
            default: return "wtf?!";

        } // switch

    } // resultCodeAsText

} // Ac4yProcessResult

// *


class Ac4yRestService {

    constructor(service){this.service=service;}
    getService(){return this.service}

    publication(){} // publication

} // Ac4yRestService

// *


class Ac4yRestServiceClient {

    constructor(host){this.host=host;}

    getHost(){return this.host;};

    jsonContent(){return new Headers({'Content-Type': 'application/json'});}

    async get(path) {
        const promise = await fetch(this.getHost()+path);
        return await promise.json();
    }

    async getInJson(path) {
        const promise = await fetch(this.getHost()+path);
        return await promise.json();
    }

    async getInText(path) {
        const promise = await fetch(this.getHost()+path);
        return await promise.text();
    }

    async post(path, request) {

        const promise = await fetch(
            this.getHost()+path
            ,{
                method: 'POST'
                ,body: JSON.stringify(request)
                ,headers: this.jsonContent()
            }
        );

        return await promise.json();

    } // post

} // Ac4yRestServiceClient

// *


class Ac4yService extends Ac4yServiceAlgebra {

    constructor(object) {

        super(object);

        if (object != undefined && object === 0) return;

        if (!this.hasDimension()) this.createDimension();

        if (!this.getAc4yIdentification().hasTemplate()) this.getAc4yIdentification().createTemplate();
        this.getAc4yIdentification().getTemplate().setHumanId("Ac4yService");

    } // constructor

    createSelf(object) {return new Ac4yService(object);}

    lightweight(){

        var lightweight = this.createSelf(this);

        //delete lightweight.getAc4yIdentification().template;
        delete lightweight.getAc4yIdentification().createdAt;
        delete lightweight.timer;
        delete lightweight.liveIndicator;
        delete lightweight.duration;
        delete lightweight.durationInSecond;
        delete lightweight.dimension;
        delete lightweight.startTime;
        delete lightweight.GUID;
        delete lightweight.createdAt;

        return lightweight;

    } // lightweight

    forPersistence(){

        var object = this.createSelf(this);

        if (object.hasRequest() && object.getRequest().hasEnvelope() && object.getRequest().getEnvelope().hasOwner())
            object.setOwner(object.getRequest().getEnvelope().getOwner())

        object.check();

        object = this.objectKilledForPersistence(object);
        object = super.forPersistence(object);

        delete object.duration;
        delete object.durationInSecond;

        object.startTime=new Date(object.startTime);
        object.stopTime=new Date(object.stopTime);

        return object;

    } // forPersistence

    fromPersistence(){

        this.getAc4yIdentification().setGUID(this.getGUID());

        return this;

    } // fromPersistence

    getErrorProcessResult(description, message){return new Ac4yServiceResponse().getErrorProcessResult(description, message)};

    errorResponse(description, message){return new Ac4yServiceResponse().error(description, message)};

    getErrorServiceResponse(description, message){

        return new Ac4yServiceResponse({
            result: this.getErrorProcessResult(description, message)
        });

    } // getErrorServiceResponse

    getTimeoutServiceResponse(){
        return this.getErrorServiceResponse("", "timeout");}

    getSuccessProcessResult(){return new Ac4yServiceResponse().getSuccessProcessResult()};

    getSuccessServiceResponse(){

        return new Ac4yServiceResponse({
            result: this.getSuccessProcessResult()
        });

    } // getSuccessServiceResponse

    successResponse(){return new Ac4yServiceResponse().success()};

    getNothingHappenedProcessResult(narrative){return new Ac4yServiceResponse().getNothingHappenedProcessResult(narrative)}

    getNothingHappenedServiceResponse(narrative){

        return new Ac4yServiceResponse({
            result: this.getNothingHappenedProcessResult(narrative)
        });

    } // getNothingHappenedServiceResponse

    nothingHappenedResponse(narrative){return new Ac4yServiceResponse().nothingHappened(narrative)}

    done(){

//        console.log("Ac4yService.done", this.getThreadId());

        this.getDimension().state().becomesDone();

        this._tryFireOnDone();

        switch (new Ac4yServiceResponse(0).rebuilded(this.getResponse()).getResult().getCode()) {

            case 1: this.success(); break;
            case 0: this.notingHappened(); break;
            case -1: this.fail(); break;
            default: this.fail();

        } // switch

    } // done

    rollback(){

        //console.log("Ac4yService.rollback", this.getThreadId());

        this.getDimension().state().becomesRollback();

        this._tryFireOnRollback();

    } // rollback

    commit(){

        //console.log("Ac4yService.commit", this.getThreadId());

        this.getDimension().state().becomesCommit();

        this._tryFireOnCommit();

    } // commit

    success(){

        //console.log("Ac4yService.success", this.getThreadId());

        this.getDimension().state().becomesSuccess();

        this._tryFireOnSuccess();

        this.commit();

        this.stop();

    } // success

    fail(){

        //console.log("Ac4yService.fail", this.getThreadId());

        this.getDimension().state().becomesFail();

        this._tryFireOnFail();

        this.rollback();

        this.stop();

    } // fail

    nothingHappened(){

//        console.log("Ac4yService.nothingHappened");

        this.getDimension().state().becomesNothingHappened();

        this._tryFireOnNothingHappened();

        this.rollback();

        this.stop();

    } // nothingHappened

    timeout(){

        //console.log("Ac4yService.timeout", this.getThreadId());

        this.getDimension().state().becomesTimeout();

        this._tryFireOnTimeout();

        //this.rollback();

        this.stop();

    } // timeout

    getResult(){return new Ac4yServiceResponse();}

    getServiceResponse(ecosystem){

        return new Promise ( (resolve, reject) => {

            this.onCommit = ( _ => {resolve(this.getResponse()); });
            this.onRollback = ( _ => {resolve(this.getResponse()); });

            ecosystem.service().start(this);

        });

    } // getServiceResponse

    getStartedServiceResponse(ecosystem){

        return new Promise ( (resolve, reject) => {

            this.onCommit = ( _ => {resolve(this.getResponse()); });
            this.onRollback = ( _ => {resolve(this.getResponse()); });

        });

    } // getStartedServiceResponse

}; // Ac4yService

// *


class Ac4yRunAsService extends Ac4yService {

    async execute(process, request, name) {

        this.getAc4yIdentification().setHumanId(name);

        var response = await process(request, this);

        if (!process)
            throw "undefined process in Ac4yRunAsService.execute"

        this.death();

        this.calculateTimesOnHistories();

        this.setIndicator("running time", this.tryGetRunningTime());

        this.dimensionsSimplifying();
        this.indicatorSetSimplifying()

        delete this.duration;
        delete this.timer;
        delete this.liveIndicator
        delete this.GUID;
        delete this.ac4yIdentification.template;
        //this.killIdentification()

        response.setDimension(this.getDimension())
        response.setIndicatorSet(this.getIndicatorSet())
        response.setSubset(this.getSubset())

        response.killIdentification()

        return response;

    } // execute

} // Ac4yRunAsService

// *


class Ac4yServiceEnvelope extends Ac4yServiceEnvelopeAlgebra {};

// *


class Ac4yServiceManager extends Ac4yServiceManagerAlgebra {

    constructor(object) {

        super(object);

        this.getAc4yIdentification().setHumanId("service manager");
        if (!this.getAc4yIdentification().hasTemplate()) this.getAc4yIdentification().createTemplate();
        this.getAc4yIdentification().getTemplate().setHumanId("Ac4yServiceManager");

        if (!this.hasWaiting4Response()) this.createWaiting4Response();
        if (!this.hasWaiting4Processing()) this.createWaiting4Processing();
        if (!this.hasCompleted()) this.createCompleted();
        if (!this.hasFailed()) this.createFailed();
        if (!this.hasAll()) this.createAll();
        if (!this.hasSuccess()) this.createSuccess();
        if (!this.hasUseless()) this.createUseless();

    } // constructor

    remoteCallViaMessenger(service, provider, requester){

        service.getTimer().setDuration(5000);
        this.completion(service);
        this.add(service);

        service.start();

        service.getDimension().stage().reachesWaiting4Response();
        service.getDimension().step().realizesCall();
        service.getDimension().state().becomesTransporting();

        var serviceRequest =
            new Ac4yCMDServiceRequest({
                request:
                    new Ac4yCMDServiceRequestRequest({
                        provider : provider
                        ,service : service.getCommandName() + " service remote calling"
                        ,requester : requester
                        ,request : service.createSelf(0).rebuilded(service)
                            .onlyGUIDIdentification()
                            .noLifecycleElements()
                            .noStandaloneIdenficationElements()
                    }).onlyGUIDIdentification()
                ,durationInSecond: 5
            }).onlyGUIDIdentification()
                .noLifecycleElements()
                .noStandaloneIdenficationElements()

        var message =
            new Ac4yCMDMessage({
                request:
                    new Ac4yCMDMessageRequest({
                        sender: requester
                        ,addressee: provider
                        ,subject: service.getCommandName() + " service remote calling envelope"
                        ,body: serviceRequest.onlyGUIDIdentification()
                    }).onlyGUIDIdentification()
                ,durationInSecond: 5
            });

        this.completion(message);
        this.add(message);
        message.getDimension().stage().reachesWaiting4Response();
        message.start();

        this.getWormhole().messenger().sendMessage(
            new Ac4yJSONHandler().serialized(
                message.createSelf(message).forTransport()
            )
        );

    } // remoteCallViaMessenger

    start(service){

        //console.log("Ac4yServiceManager.start", service.getThreadId(), service.getCommandName());

        //service.getTimer().setDuration(3000);
        this.completion(service);
        this.add(service);

        service.start();

        service.getDimension().stage().reachesWaiting4Response();
        service.getDimension().step().realizesCall();
        service.getDimension().state().becomesTransporting();

    } // start

    add(service){this.getWaiting4Response().put(service.getGUID(), service);};

    stillWaiting(threadId){return this.getWaiting4Response().exists(threadId);};

    get(threadId){return this.getWaiting4Response().get(threadId);}

    setResponse(threadId, aResponse){this.get(threadId).setResponse(aResponse);};

    trySetResponse(threadId, aResponse){

        if (this.stillWaiting(threadId))
            this.setResponse(threadId, aResponse);

    }; // trySetResponse

    add2Waiting4Response(service){this.add(service);}

    add2Completed(service){this.getCompleted().put(service.getGUID(), service);}
    add2Failed(service){this.getFailed().put(service.getGUID(), service);}

    getFromWaiting4Response(threadId){return this.get(threadId);}

    deleteFromWaiting4Response(service){

        this.getWaiting4Response().remove(service.getGUID());

    } // deleteFromWaiting4Response

    done(threadId, response){

        //console.log("Ac4yServiceManager.done", threadId);
//        console.log(response);

        /*
                console.log(threadId, this);
                console.log("DONE");
                console.log("begin");
                console.log(response);
        */
        //let safe = new Ac4yServiceResponse();
        //Object.assign(safe, response);

        this.trySetResponse(threadId, response);

        let service = this.getFromWaiting4Response(threadId);
        let generalResponse = new Ac4yServiceResponse(0).rebuilded(response);

        if (service) {

            service.done();

            //let response2 = new Ac4yServiceResponse(0).rebuilded(response);

            this.add2Completed(service);

            //console.log(safe);
            if (generalResponse.itWasSuccessful())
                this.getSuccess().put(service.getGUID(), service);
            else {

                if (generalResponse.itWasFailed())
                    this.add2Failed(service);
                else
                    this.getUseless().put(service.getGUID(), service);

            }

            this.deleteFromWaiting4Response(service);

        } else {

            //throw "internal error (the stored service lost)";
            console.log("internal error (the stored service lost)");
            console.log("threadId:", threadId);

        }
        //      console.log("end");

    } // done

    doneByTimeout(service){

        if (!service)
            throw("invalid service");

        this.done(service.getThreadId(), service.getTimeoutServiceResponse());

    } // doneByTimeout

    successRespone(){return new Ac4yServiceResponse().success();}
    errorRespone(description){return new Ac4yServiceResponse().error(description);}
    timeoutRespone(){return new Ac4yServiceResponse().timeout();}
    nothingHappenedRespone(narrative){return new Ac4yServiceResponse().nothingHappened(narrative);}

    completion(service){

        if (!service.hasDuration())
            service.setDuration(3000);

        if (!service.hasOnTimeout())
            service.setOnTimeout( () => {

                this.doneByTimeout(service);

            });

    } // completion

} // Ac4yServiceManager
// *


class Ac4yServiceRequest extends Ac4yServiceRequestAlgebra {

    createSelf(object) {return new Ac4yServiceRequest(object);}

    lightweight(){

        //console.log("Ac4yServiceRequest", this);
        var lightweight = this.createSelf(this);
        //console.log("Ac4yServiceRequest", lightweight);
        delete lightweight.ac4yIdentification
        //delete lightweight.getAc4yIdentification().template;
        //delete lightweight.getAc4yIdentification().createdAt;
        delete lightweight.GUID;
        delete lightweight.createdAt;

        return lightweight;

    } // lightweight

}; // Ac4yServiceRequest

// *


class Ac4ySLCDStage extends Ac4yLCDStage {

    createSelf(object) {return new Ac4ySLCDStage(object);}

    reachesWaiting4Response(){this.becomes(new Ac4yLCFStage({name: new Ac4yServiceConstant().STAGE.waiting4Response}));};

} // Ac4ySLCDStage

// *


class Ac4ySLCDState extends Ac4yFLCDState {

    createSelf(object) {return new Ac4ySLCDState(object);}

    becomesDone(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.done}));};
    becomesRollback(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.rollback}));};
    becomesCommit(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.commit}));};
    becomesSuccess(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.success}));};
    becomesFail(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.fail}));};
    becomesWarning(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.warning}));};
    becomesNothingHappened(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.nothingHappened}));};

    becomesWaiting4Response(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.waiting4Response}));};
    becomesResponseArrived(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.responseArrived}));};

    becomesWaiting(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.waiting}));};
    becomesProcessing(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.processing}));};
    becomesTransporting(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.transporting}));};
    becomesRequest(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.request}));};
    becomesResponse(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.response}));};
    becomesCall(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.call}));};
    becomesReply(){this.becomes(new Ac4yLCFState({name: new Ac4yServiceConstant().STATE.reply}));};

} // Ac4ySLCDState

// *


class Ac4ySLCDStep extends Ac4yLCDStep {

    createSelf(object) {return new Ac4ySLCDStep(object);}

    realizesDone(){this.realizes(new Ac4yLCFStep({name: new Ac4yServiceConstant().STEP.done}));};
    realizesRollback(){this.realizes(new Ac4yLCFStep({name: new Ac4yServiceConstant().STEP.rollback}));};
    realizesCommit(){this.realizes(new Ac4yLCFStep({name: new Ac4yServiceConstant().STEP.commit}));};
    realizesSuccess(){this.realizes(new Ac4yLCFStep({name: new Ac4yServiceConstant().STEP.success}));};
    realizesFail(){this.realizes(new Ac4yLCFStep({name: new Ac4yServiceConstant().STEP.fail}));};
    realizesWarning(){this.realizes(new Ac4yLCFStep({name: new Ac4yServiceConstant().STEP.warning}));};
    realizesNothingHappened(){this.realizes(new Ac4yLCFStep({name: new Ac4yServiceConstant().STEP.nothingHappened}));};

    realizesRequest(){this.realizes(new Ac4yLCFStep({name: new Ac4yServiceConstant().STEP.request}));};
    realizesResponse(){this.realizes(new Ac4yLCFStep({name: new Ac4yServiceConstant().STEP.response}));};

    realizesProcess(){this.realizes(new Ac4yLCFStep({name: new Ac4yServiceConstant().STEP.process}));};
    realizesTransport(){this.realizes(new Ac4yLCFStep({name: new Ac4yServiceConstant().STEP.transport}));};
    realizesCall(){this.realizes(new Ac4yLCFStep({name: new Ac4yServiceConstant().STEP.call}));};
    realizesReply(){this.realizes(new Ac4yLCFStep({name: new Ac4yServiceConstant().STEP.reply}));};

} // Ac4ySLCDStep

// *


class Ac4ySLCDStock extends Ac4yLCDStock {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;

        this.put(new Ac4yLifecycleConstant().DIMENSION.state, new Ac4ySLCDState());
        this.put(new Ac4yLifecycleConstant().DIMENSION.step, new Ac4ySLCDStep());
        this.put(new Ac4yLifecycleConstant().DIMENSION.stage, new Ac4ySLCDStage());
        this.put(new Ac4yLifecycleConstant().DIMENSION.station, new Ac4yLCDStation());

    } // constructor

    createSelf(object) {return new Ac4ySLCDStock(object);}

} // Ac4ySLCDStock

// *


class Ac4yStatelessService extends Ac4yStatelessServiceAlgebra {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;

        if (!this.getAc4yIdentification().hasTemplate()) this.getAc4yIdentification().createTemplate();
        this.getAc4yIdentification().getTemplate().setHumanId("Ac4yStatelessService");

    } // constructor

    createSelf(object) {return new Ac4yStatelessService(object);}

    start(){

        this._tryFireOnStart();

    } // start

    rollback(){

        this._tryFireOnRollback();

    } // rollback

    commit(){

        this._tryFireOnCommit();

    } // commit

}; // Ac4yService

// ** ac4y-command

// *


class Ac4yCommandAlgebra extends Ac4yService {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yCommandAlgebra(object);

    } // createSelf


    setCommandName(aCommandName) {
        this.commandName = aCommandName;
    }
    getCommandName() {
        return this.commandName;
    }
    hasCommandName() {
        return this.commandName != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.commandName != undefined) target.setCommandName(object.commandName);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.commandName != undefined) target.setCommandName(object.commandName);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yCommandAlgebra

// *


class Ac4yCommandRegistrationAlgebra {

    constructor(object) {

        if (object != undefined && object === 0) return;
        if (object) this.copy(object, this);

    } // constructor


    createSelf(object) {
        return new Ac4yCommandRegistrationAlgebra(object);

    } // createSelf


    setInterpreter(aInterpreter) {
        this.interpreter = aInterpreter;
    }
    getInterpreter() {
        return this.interpreter;
    }
    createInterpreter() {
        this.interpreter = new Ac4yCommandInterpreter();
    }
    hasInterpreter() {
        return this.interpreter != undefined;
    }

    setCommandName(aCommandName) {
        this.commandName = aCommandName;
    }
    getCommandName() {
        return this.commandName;
    }
    hasCommandName() {
        return this.commandName != undefined;
    }

    setTemplate(aTemplate) {
        this.template = aTemplate;
    }
    getTemplate() {
        return this.template;
    }
    hasTemplate() {
        return this.template != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        if (object) {

            if (object.interpreter != undefined) target.setInterpreter(new Ac4yCommandInterpreter(0).rebuilded(object.interpreter));
            if (object.commandName != undefined) target.setCommandName(object.commandName);
            if (object.template != undefined) target.setTemplate(object.template);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        target = target || this;
        if (object) return this.rebuild(object, this.copy(object));

        else return target;

    } // rebuilded

    copy(object, target) {

        target = target || this;
        if (object) {

            if (object.interpreter != undefined) target.setInterpreter(object.interpreter);
            if (object.commandName != undefined) target.setCommandName(object.commandName);
            if (object.template != undefined) target.setTemplate(object.template);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yCommandRegistrationAlgebra

// *


class Ac4yCommandInterpreter {

    registrateCommand(aCommandManager){

        //aCommandManager.registrateCommand(new Ac4yCommandRegistration("a", this));

    }; // registrateCommand

} // Ac4yCommandInterpreter

// *


class Ac4yCommandRegistration extends Ac4yCommandRegistrationAlgebra {

    getCommand(object){return new this.template(0).rebuilded(object);}

}; // Ac4yCommandRegistration

// *


class Ac4yCommand extends Ac4yCommandAlgebra {

    constructor(object) {

        super(object);

        if (object != undefined && object === 0) return;

        if (!this.getAc4yIdentification().hasTemplate()) this.getAc4yIdentification().createTemplate();

        this.getAc4yIdentification().getTemplate().setHumanId("Ac4yCommand");

    } // constructor

    createSelf(object) {return new Ac4yCommand(object);}

    checkRequest(){if (!this.hasRequest()) throw new Ac4yUserText().text("has no request!");}
    checkEcosystem(ecosystem){if (!ecosystem) throw new Ac4yUserText().text("has no ecosystem!");}
    checkServiceManager(ecosystem){ecosystem.checkServiceManager();}
    checkCommandManager(ecosystem){ecosystem.checkCommandManager();}

    lightweight() {
        return this.onlyGUIDIdentification().noLifecycleElements().noStandaloneIdenficationElements();
    }

    getResult(){return this.errorResponse("the getResult have to override and implement!");}

} // Ac4yCommand
// ** ac4y-command-manager

// *


class Ac4yCommandManagerAlgebra extends Ac4yEcosystemMember {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yCommandManagerAlgebra(object);

    } // createSelf


    setCommandRegister(aCommandRegister) {
        this.commandRegister = aCommandRegister;
    }
    getCommandRegister() {
        return this.commandRegister;
    }
    createCommandRegister() {
        this.commandRegister = new Ac4yListNode();
    }
    hasCommandRegister() {
        return this.commandRegister != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.commandRegister != undefined) target.setCommandRegister(new Ac4yListNode(0).rebuilded(object.commandRegister));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.commandRegister != undefined) target.setCommandRegister(object.commandRegister);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yCommandManagerAlgebra

// *


class Ac4yCommandManager extends Ac4yCommandManagerAlgebra {

    constructor(object) {

        super(object);

        this.getAc4yIdentification().setHumanId("command manager");
        this.getAc4yIdentification().createTemplate();
        this.getAc4yIdentification().getTemplate().setHumanId("Ac4yCommandManager");

        this.createCommandRegister();

    } // constructor

    registrateCommand(aAc4yCommandRegistration) {this.getCommandRegister().addElement(aAc4yCommandRegistration);}

    registrateCommandFromInterpreter(aCommandInterpreter) {aCommandInterpreter.registrateCommand(this);}

    knownCommand(commandName){return this.hasByCommandName(commandName);}

    isKnownCommand(commandName){return this.hasByCommandName(commandName);}

    checkIsKnownCommand(commandName) {

        if (!this.isKnownCommand(commandName))
            throw new Ac4yUserText().text("unknown command!")+" ('"+commandName+"')";

    } // checkIsKnownCommand

    getIndexByCommandName(aCommandName){

        return this.getCommandRegister().get().findIndex(
            function(aAc4yCommandRegistration){
                return aAc4yCommandRegistration.getCommandName()===aCommandName;
            }
        );

    } // getIndexByCommand

    hasByCommandName(aCommandName){return this.getIndexByCommandName(aCommandName)!==-1;};

    getByCommandName(aCommandName){return this.getCommandRegister().getByIndex(this.getIndexByCommandName(aCommandName));}

    getRegistrationByCommandName(name){return this.getByCommandName(name);}

    getPrecompiledCommand(command){
        return this.getRegistrationByCommandName(command.commandName).getCommand(command);}

    getInterpreterByCommandName(aCommandName){return this.getByCommandName(aCommandName).getInterpreter();}

    checkHasEcosystem() {

        if (!this.getEcosystem())
            throw "has no ecosystem!";

    } // checkHasEcosystem

    getObjectFromString(aCommandString){return new Ac4yJSONHandler().deserialized(aCommandString);}

    getCommandFromString(aCommandString){return new Ac4yCommand(this.getObjectFromString(aCommandString));}

    isValidCommand(command){return (command.commandName);}

    checkIsValidCommand(command) {

        if (!this.isValidCommand(command))
            throw "no valid command was received ('"+new Ac4yJSONHandler().serialized(command)+"')";

    } // checkIsValidCommand

    isValidObjectInTheCommandString(aCommandString){return new Ac4yJSONHandler().isValid(aCommandString);}

    isValidObjectInTheString(object){return new Ac4yJSONHandler().isValid(object);}

    checkIsValidObjectInTheString(object){

        if (!this.isValidObjectInTheString(object))
            throw "no JSON object was received ('"+object+"')";

    } // checkIsValidObjectInTheString

    getPrecompiledCommandFromString(commandString){

        var commandName = this.getCommandNameFromString(commandString);
        var command = new Ac4yJSONHandler().deserialized(commandString);

        return this.getRegistrationByCommandName(commandName).getCommand(command);

    } // getPrecompiledCommandFromString

    getCommandNameFromString(aCommandString){return this.getCommandFromString(aCommandString).getCommandName();}
    /*
        processMessage(request){

            var response = new Ac4yServiceResponse().success();

            try {

                if (!this.hasEcosystem()) throw "has no ecosystem!";
                if (!this.getEcosystem().commander()) throw "has no command interpreter!";
                if (!request) throw "has no request!";

                var requestAsObject=new VDProcessMessageRequest(request);

                if (!requestAsObject.hasMessage()) throw "has no message!";

                response = this.getEcosystem().commander().processText(requestAsObject.getMessage());

            } catch(error) {
                var response = new Ac4yServiceResponse().error(new String(error));
            }

            return response;

        }; // processMessage
    */

    processCommand(request){

        let response = new Ac4yServiceResponse().success();

        try {

            if (!this.hasEcosystem()) throw "has no ecosystem!";
            if (!this.getEcosystem().commander()) throw "has no command interpreter!";
            if (!request) throw "has no request!";

            if (!request.command) throw "has no command!";

            response = this.getEcosystem().commander().processObject(request.command);

        } catch(error) {
            let response = new Ac4yServiceResponse().error(new String(error));
        }

        return response;

    }; // processCommand

    async processText(commandInString){

        try {

            this.checkIsValidObjectInTheString(commandInString);

            return await this.processObject(this.getObjectFromString(commandInString))

        } catch(error) {return new Ac4yServiceResponse().error(error.message || error);}

    }; // processText

    async processObject(command){

        try {

            this.checkIsValidCommand(command);
            this.checkIsKnownCommand(command.commandName);

            this.checkHasEcosystem();

            return await this.getPrecompiledCommand(command).getResult(this.getEcosystem());

        } catch(error) {return new Ac4yServiceResponse().error(error.message || error);}

    }; // processObject

    send(command){

        //console.log("send command",new Ac4yJSONHandler().serialized(command.lightweight()));

    } // send

    remoteCallViaMessenger(command, provider, requester){

        return new Promise ( (resolve, reject) => {

            command["onCommit"] = ( _ => {resolve(command.getResponse()); });
            command["onRollback"] = ( _ => {reject(
                new Ac4yServiceResponse(0).rebuilded(command.getResponse()).getResult().getDescription());
            });

            //console.log("this.getWormhole().service().remoteCallViaMessenger",command);
            this.getWormhole().service().remoteCallViaMessenger(
                command
                ,provider
                ,requester
            );

        });

    } // remoteCallViaMessenger

    remoteResponse(addressee, response, sender){

        //console.log("REMOTE RESPONSE - addressee, sender:", addressee, sender);
        //console.log(response, "REMOTE RESPONSE - response");

        let ac4yCMDServiceResponseRequest =
            new Ac4yCMDServiceResponseRequest({
                response : response.lightweight()
            }).lightweight();

        let ac4yCMDServiceResponse =
            new Ac4yCMDServiceResponse({
                request:
                    new Ac4yCMDServiceResponseRequest({
                        response : response.lightweight()
                    }).lightweight()
                ,provider: addressee
            });

        //console.log("REMOTE RESPONSE - SERVICERESPONSE - threadId", ac4yCMDServiceResponse.getThreadId());

        //let lv = (new Ac4yCMDServiceResponse(0).rebuilded(ac4yCMDServiceResponse)).lightweight();

        let ac4ySVCMessage =
            new Ac4ySVCMessage({
                request:
                    new Ac4ySVCMessageRequest({
                        addressee : addressee
                        ,sender : sender
                        ,subject : "service response"
                        ,body : (new Ac4yCMDServiceResponse(0).rebuilded(ac4yCMDServiceResponse)).lightweight()
                        ,oneway : true
                    }).lightweight()
                ,provider: addressee
            });
/*
        console.log(
            "REMOTE RESPONSE - MESSAGE - addressee, sender, threadId"
            , ac4ySVCMessage.getRequest().getAddressee()
            , ac4ySVCMessage.getRequest().getSender()
            , ac4ySVCMessage.getThreadId()
        );
*/
        this.getWormhole().service().start(ac4yCMDServiceResponse);
        this.getWormhole().service().start(ac4ySVCMessage);

        this.getWormhole().service().done(
            ac4yCMDServiceResponse.getThreadId()
            ,new Ac4yServiceResponse({
                result : new Ac4yProcessResult({
                    code: 1
                    ,message: "success"
                    ,description: "credited"
                })
            })
        );

        this.getWormhole().service().done(
            ac4ySVCMessage.getThreadId()
            ,new Ac4yServiceResponse({
                        result : new Ac4yProcessResult({
                                code: 1
                                ,message: "success"
                                ,description: "credited"
                            })
            })
        );

        return ac4ySVCMessage.getResult(this.getWormhole());

    } // remoteResponse

    sendServiceRequest(ecosystem, serviceRequest, serviceRequestLightweight, addressee, sender){

//        console.log("serviceRequest - sender, addressee:", sender, addressee);
//        console.log("serviceRequest - COMMAND:", serviceRequest.getCommandName() );
        //console.log("serviceRequest", serviceRequest);
        //console.log("addressee", addressee);

        ecosystem.service().start(serviceRequest);

        let ac4ySVCMessage =
            new Ac4ySVCMessage({
                request:
                    new Ac4ySVCMessageRequest({
                        addressee : addressee
                        ,sender : sender
                        ,subject : serviceRequest.getCommandName() + " service request"
                        ,body : serviceRequestLightweight
                    }).lightweight()
                ,provider: addressee
            });

        ecosystem.service().start(ac4ySVCMessage);

        ecosystem.messenger().sendTo(
            addressee
            ,new Ac4ySVCMessage(0).rebuilded(ac4ySVCMessage).lightweight()
            ,ac4ySVCMessage.getThreadId()
        );

    } // sendServiceRequest

} // Ac4yCommandManager


// ** command-message

// *


class Ac4yCMDMessageAlgebra extends Ac4yCommand {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yCMDMessageAlgebra(object);

    } // createSelf


    setRequest(aRequest) {
        this.request = aRequest;
    }
    getRequest() {
        return this.request;
    }
    createRequest() {
        this.request = new Ac4yCMDMessageRequest();
    }
    hasRequest() {
        return this.request != undefined;
    }

    setResponse(aResponse) {
        this.response = aResponse;
    }
    getResponse() {
        return this.response;
    }
    createResponse() {
        this.response = new Ac4yCMDMessageResponse();
    }
    hasResponse() {
        return this.response != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(new Ac4yCMDMessageRequest(0).rebuilded(object.request));
            if (object.response != undefined) target.setResponse(new Ac4yCMDMessageResponse(0).rebuilded(object.response));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(object.request);
            if (object.response != undefined) target.setResponse(object.response);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yCMDMessageAlgebra

// *


class Ac4yCMDMessageRequestAlgebra extends Ac4yServiceRequest {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yCMDMessageRequestAlgebra(object);

    } // createSelf


    setSender(aSender) {
        this.sender = aSender;
    }
    getSender() {
        return this.sender;
    }
    hasSender() {
        return this.sender != undefined;
    }

    setAddressee(aAddressee) {
        this.addressee = aAddressee;
    }
    getAddressee() {
        return this.addressee;
    }
    hasAddressee() {
        return this.addressee != undefined;
    }

    setSubject(aSubject) {
        this.subject = aSubject;
    }
    getSubject() {
        return this.subject;
    }
    hasSubject() {
        return this.subject != undefined;
    }

    setBody(aBody) {
        this.body = aBody;
    }
    getBody() {
        return this.body;
    }
    hasBody() {
        return this.body != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.sender != undefined) target.setSender(object.sender);
            if (object.addressee != undefined) target.setAddressee(object.addressee);
            if (object.subject != undefined) target.setSubject(object.subject);
            if (object.body != undefined) target.setBody(object.body);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.sender != undefined) target.setSender(object.sender);
            if (object.addressee != undefined) target.setAddressee(object.addressee);
            if (object.subject != undefined) target.setSubject(object.subject);
            if (object.body != undefined) target.setBody(object.body);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yCMDMessageRequestAlgebra

// *


class Ac4yCMDMessage extends Ac4yCMDMessageAlgebra {

    constructor(object){

        super(object);
        if (object !== undefined && object === 0) return;

        this.setCommandName("MESSAGE");

    } // constructor

    createSelf(object) {return new Ac4yCMDMessage(object);}

    getResult(ecosystem){


        try {

            this.checkRequest();

            this.getRequest().checkBody();

            this.checkEcosystem(ecosystem);
            ecosystem.checkCommandManager();

            if (ecosystem.commander().isValidCommand(this.getRequest().getBody()))
                return ecosystem.commander().processObject(
                    this.getRequest().getBody()
                    ,ecosystem
                );
            else
                return this.nothingHappened(
                    "just a simple message ("+this.getRequest().getBody()+")"
                );

        } catch(error) {return this.error(error.message || error);}

    } // getResult

}; // Ac4yCMDMessage

// *


class Ac4yCMDMessageRequest extends Ac4yCMDMessageRequestAlgebra {

    createSelf(object) {return new Ac4yCMDMessageRequest(object);}

    checkBody(){
        if (!this.hasBody()) throw new Ac4yUserText().text("has no message body!");
        if (this.getBody()==="") throw new Ac4yUserText().text("empty message body!");
    }

    checkAddressee(){if (!this.hasAddressee()) throw "has no addressee!";}

}; // Ac4yCMDMessageRequest

// *


class Ac4yCMDMessageResponse extends Ac4yServiceResponse {

    createSelf() {return new Ac4yCMDMessageResponse();}

}; // Ac4yCMDMessageResponse

// ** ac4y-command-service

// *


class Ac4yCMDServiceRequestAlgebra extends Ac4yCommand {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yCMDServiceRequestAlgebra(object);

    } // createSelf


    setRequest(aRequest) {
        this.request = aRequest;
    }
    getRequest() {
        return this.request;
    }
    createRequest() {
        this.request = new Ac4yCMDServiceRequestRequest();
    }
    hasRequest() {
        return this.request != undefined;
    }

    setResponse(aResponse) {
        this.response = aResponse;
    }
    getResponse() {
        return this.response;
    }
    createResponse() {
        this.response = new Ac4yServiceResponse();
    }
    hasResponse() {
        return this.response != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(new Ac4yCMDServiceRequestRequest(0).rebuilded(object.request));
            if (object.response != undefined) target.setResponse(new Ac4yServiceResponse(0).rebuilded(object.response));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(object.request);
            if (object.response != undefined) target.setResponse(object.response);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yCMDServiceRequestAlgebra

// *


class Ac4yCMDServiceRequestRequestAlgebra extends Ac4yServiceRequest {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yCMDServiceRequestRequestAlgebra(object);

    } // createSelf


    setProvider(aProvider) {
        this.provider = aProvider;
    }
    getProvider() {
        return this.provider;
    }
    hasProvider() {
        return this.provider != undefined;
    }

    setService(aService) {
        this.service = aService;
    }
    getService() {
        return this.service;
    }
    hasService() {
        return this.service != undefined;
    }

    setRequester(aRequester) {
        this.requester = aRequester;
    }
    getRequester() {
        return this.requester;
    }
    hasRequester() {
        return this.requester != undefined;
    }

    setRequest(aRequest) {
        this.request = aRequest;
    }
    getRequest() {
        return this.request;
    }
    hasRequest() {
        return this.request != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.provider != undefined) target.setProvider(object.provider);
            if (object.service != undefined) target.setService(object.service);
            if (object.requester != undefined) target.setRequester(object.requester);
            if (object.request != undefined) target.setRequest(object.request);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.provider != undefined) target.setProvider(object.provider);
            if (object.service != undefined) target.setService(object.service);
            if (object.requester != undefined) target.setRequester(object.requester);
            if (object.request != undefined) target.setRequest(object.request);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yCMDServiceRequestRequestAlgebra

// *


class Ac4yCMDServiceResponseAlgebra extends Ac4yCommand {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yCMDServiceResponseAlgebra(object);

    } // createSelf


    setRequest(aRequest) {
        this.request = aRequest;
    }
    getRequest() {
        return this.request;
    }
    createRequest() {
        this.request = new Ac4yCMDServiceResponseRequest();
    }
    hasRequest() {
        return this.request != undefined;
    }

    setResponse(aResponse) {
        this.response = aResponse;
    }
    getResponse() {
        return this.response;
    }
    createResponse() {
        this.response = new Ac4yServiceResponse();
    }
    hasResponse() {
        return this.response != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(new Ac4yCMDServiceResponseRequest(0).rebuilded(object.request));
            if (object.response != undefined) target.setResponse(new Ac4yServiceResponse(0).rebuilded(object.response));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(object.request);
            if (object.response != undefined) target.setResponse(object.response);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yCMDServiceResponseAlgebra

// *


class Ac4yCMDServiceResponseRequestAlgebra extends Ac4yServiceRequest {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yCMDServiceResponseRequestAlgebra(object);

    } // createSelf


    setResponse(aResponse) {
        this.response = aResponse;
    }
    getResponse() {
        return this.response;
    }
    hasResponse() {
        return this.response != undefined;
    }

    setDimension(aDimension) {
        this.dimension = aDimension;
    }
    getDimension() {
        return this.dimension;
    }
    createDimension() {
        this.dimension = new Ac4yLCDStock();
    }
    hasDimension() {
        return this.dimension != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.response != undefined) target.setResponse(object.response);
            if (object.dimension != undefined) target.setDimension(new Ac4yLCDStock(0).rebuilded(object.dimension));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.response != undefined) target.setResponse(object.response);
            if (object.dimension != undefined) target.setDimension(object.dimension);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yCMDServiceResponseRequestAlgebra

// *


class Ac4yCMDServiceRequest extends Ac4yCMDServiceRequestAlgebra {

    constructor(aObject){

        super(aObject);

        this.setCommandName("SERVICEREQUEST");

    } // constructor

    createSelf(object) {return new Ac4yCMDServiceRequest(object);}

    remoteResponse(serviceRequest, response, ecosystem){

        var service=new Ac4y(0).rebuilded(serviceRequest.getRequest().getRequest());

        response.setResult(
            response.getResult().addedRequestId(
                service.getGUID()
            )
        );

        var message =
            new Ac4yCMDMessage({
                request:
                    new Ac4yCMDMessageRequest({
                        sender: serviceRequest.getRequest().getProvider()
                        ,addressee: serviceRequest.getRequest().getRequester()
                        ,subject: "service response "
                            + serviceRequest.getRequest().getRequest().commandName
                            + " remote calling"
                        ,body:
                            new Ac4yCMDServiceResponse({
                                request:
                                    new Ac4yCMDServiceResponseRequest({
                                        requestID: serviceRequest.request.request.ac4yIdentification.GUID
                                        ,response: response
                                    })
                            }).lightweight()

                    })
            });

        ecosystem.messenger().sendMessage(
            new Ac4yJSONHandler().serialized(
                message.lightweight()
            )
        );

    } // remoteResponse

    async getResult(ecosystem){

        try {

            if (!ecosystem) throw "has no wormhole!";
            if (!ecosystem.hasMember()) throw "empty ecosystem!";

            if (!this.hasRequest()) throw "has no request!";
            if (!this.getRequest) throw "has no request!";

            if (!this.getRequest().getRequest) throw "has no embedded request!";

            if (!ecosystem.commander()) throw "has no command interpreter!";

            if (!this.getRequest().getRequester) throw "has no requester!";
            if (!this.getRequest().getProvider) throw "has no provider!";

            if (!this.getRequest().getRequest().ac4yIdentification
                || !this.getRequest().getRequest().ac4yIdentification.GUID)
                throw "has no thread ID!";

            var dimension = new Ac4ySLCDStock();

            dimension.step().realizesProcess();
            dimension.state().becomesProcessing();

            var response = await ecosystem.commander().processObject(
                this.getRequest().getRequest()
                ,ecosystem
            );

            dimension.step().realizesReply();
            dimension.state().becomesTransporting();

            response.setDimension(dimension.lightweight());

            //console.log("GUID",this.getRequest(), this.getRequest().getRequest().ac4yIdentification.GUID, response);
            this.remoteResponse(this, response, ecosystem);

            return new Ac4yServiceResponse().success();

        } catch(error) {return new Ac4yServiceResponse().error(error.message || error);}

    } // getResult

}; // Ac4yCMDServiceRequest

// *


class Ac4yCMDServiceRequestRequest extends Ac4yCMDServiceRequestRequestAlgebra {

    createSelf(object) {return new Ac4yCMDServiceRequestRequest(object);}

}; // Ac4yCMDServiceRequestRequest

// *


class Ac4yCMDServiceResponse extends Ac4yCMDServiceResponseAlgebra {

    constructor(object){

        super(object);

        this.setCommandName("SERVICERESPONSE");

    } // constructor

    createSelf(object) {return new Ac4yCMDServiceResponse(object);}

    checkResponse(){if (!this.getRequest().hasResponse()) throw new Ac4yUserText().text("has no response!");}

    checkWaiting4ResponseContainer(ecosystem){if (!ecosystem.service().hasWaiting4Response()) throw new Ac4yUserText().text("has no 'waiting for response' queue!");}

    getResult(ecosystem){

        try {

//            console.log("SERVICERESPONSE");

            this.checkRequest();
            this.checkResponse();

            var response = new Ac4yServiceResponse(0).rebuilded(this.getRequest().getResponse());

//            console.log(response, "SERVICERESPONSE - response");

            if (!response.hasResult()) throw new Ac4yUserText().text("has no process result!");
            if (!response.getResult().hasCode()) throw new Ac4yUserText().text("has no process result code!");

            this.checkEcosystem(ecosystem);
            ecosystem.checkServiceManager();
            this.checkWaiting4ResponseContainer(ecosystem);

            if (response.getResult().hasRequestId()) {

                var threadId=response.getResult().getRequestId();

//                console.log("SERVICERESPONSE - requestId", response.getResult().getRequestId());

                if (ecosystem.service().stillWaiting(threadId)) {

                    if (response.hasDimension()) {

                        var dimension = response.getDimension();

                        var service = ecosystem.service().get(threadId);

                        if (service)
                            service.getDimension().add(dimension);

                    }

                    let a = this.getRequest();
                    let b = a.getResponse();

                    ecosystem.service().done(
                        threadId
                        ,this.getRequest().getResponse()
                        //,response
                    );

                    return new Ac4yServiceResponse().success();
                }
                else
                    return new Ac4yServiceResponse().nothingHappened(
                        new Ac4yUserText().text("late response!")
                        +"('"+threadId+"')"
                    );

            }
            else
                return new Ac4yServiceResponse().nothingHappened(
                    new Ac4yUserText().text("has no threadId!")
                );

        } catch(error) { return new Ac4yServiceResponse().error(error.message || error);}

    } // getResult

}; // Ac4yCMDServiceResponse

// *


class Ac4yCMDServiceResponseRequest extends Ac4yCMDServiceResponseRequestAlgebra {

    createSelf(object) {return new Ac4yCMDServiceResponseRequest(object);}

}; // Ac4yCMDServiceResponseRequest

// ** ac4y-service-message

// *


class Ac4ySVCMessageAlgebra extends Ac4yCommand {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4ySVCMessageAlgebra(object);

    } // createSelf


    setRequest(aRequest) {
        this.request = aRequest;
    }
    getRequest() {
        return this.request;
    }
    createRequest() {
        this.request = new Ac4ySVCMessageRequest();
    }
    hasRequest() {
        return this.request != undefined;
    }

    setResponse(aResponse) {
        this.response = aResponse;
    }
    getResponse() {
        return this.response;
    }
    createResponse() {
        this.response = new Ac4yServiceResponse();
    }
    hasResponse() {
        return this.response != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(new Ac4ySVCMessageRequest(0).rebuilded(object.request));
            if (object.response != undefined) target.setResponse(new Ac4yServiceResponse(0).rebuilded(object.response));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(object.request);
            if (object.response != undefined) target.setResponse(object.response);

        } // if object does not empty

        return target;

    } // copy

} // Ac4ySVCMessageAlgebra

// *


class Ac4ySVCMessageRequestAlgebra extends Ac4yServiceRequest {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4ySVCMessageRequestAlgebra(object);

    } // createSelf


    setSender(aSender) {
        this.sender = aSender;
    }
    getSender() {
        return this.sender;
    }
    hasSender() {
        return this.sender != undefined;
    }

    setAddressee(aAddressee) {
        this.addressee = aAddressee;
    }
    getAddressee() {
        return this.addressee;
    }
    hasAddressee() {
        return this.addressee != undefined;
    }

    setSubject(aSubject) {
        this.subject = aSubject;
    }
    getSubject() {
        return this.subject;
    }
    hasSubject() {
        return this.subject != undefined;
    }

    setBody(aBody) {
        this.body = aBody;
    }
    getBody() {
        return this.body;
    }
    hasBody() {
        return this.body != undefined;
    }

    setOneway(aOneway) {
        this.oneway = aOneway;
    }
    getOneway() {
        return this.oneway;
    }
    hasOneway() {
        return this.oneway != undefined;
    }
    isOneway() {
        return this.oneway;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.sender != undefined) target.setSender(object.sender);
            if (object.addressee != undefined) target.setAddressee(object.addressee);
            if (object.subject != undefined) target.setSubject(object.subject);
            if (object.body != undefined) target.setBody(object.body);
            if (object.oneway != undefined) target.setOneway(object.oneway);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.sender != undefined) target.setSender(object.sender);
            if (object.addressee != undefined) target.setAddressee(object.addressee);
            if (object.subject != undefined) target.setSubject(object.subject);
            if (object.body != undefined) target.setBody(object.body);
            if (object.oneway != undefined) target.setOneway(object.oneway);

        } // if object does not empty

        return target;

    } // copy

} // Ac4ySVCMessageRequestAlgebra

// *


class Ac4ySVCMessageRequest extends Ac4ySVCMessageRequestAlgebra {

    createSelf(object) {return new Ac4ySVCMessageRequest(object);}

    checkBody(){
        if (!this.hasBody()) throw new Ac4yUserText().text("has no message body!");
        if (this.getBody()==="") throw new Ac4yUserText().text("empty message body!");
    }

    checkAddressee(){if (!this.hasAddressee()) throw new Ac4yUserText().text("has no addressee!");}
    checkSender(){if (!this.hasSender()) throw new Ac4yUserText().text("has no sender!");}

} // Ac4ySVCMessageRequest

// *


class Ac4ySVCMessage extends Ac4ySVCMessageAlgebra {

    constructor(object){

        super(object);
        if (object!=undefined && object===0) return;

        this.setCommandName("MESSAGE");

    } // constructor

    createSelf(object) {return new Ac4ySVCMessage(object);}

    getResult(ecosystem){

        try {

            this.check(ecosystem);
            this.checkRequest();

            ecosystem.messenger().sendTo(
                this.getRequest().getAddressee()
                ,new Ac4ySVCMessage(0).rebuilded(this).lightweight()
                ,this.getThreadId()
            );

            return this.successResponse();

        } catch(error) {return this.errorResponse(error.message || error);}

    } // getResult

    getMessageCommandFromMessage(ecosystem, message){

        ecosystem.commander().checkIsValidObjectInTheString(message);

        let ac4yCommandObject = ecosystem.commander().getObjectFromString(message);

        ecosystem.commander().checkIsValidCommand(ac4yCommandObject);

        let ac4yCommand = new Ac4yCommand(0).rebuilded(ac4yCommandObject);

        ecosystem.commander().checkIsKnownCommand(ac4yCommand.getCommandName());

        if (!ac4yCommand.getCommandName() === new Ac4ySVCMessage().getCommandName())
            throw new Ac4yUserText().text("not Message command!");

        ac4yCommand = ecosystem.commander().getPrecompiledCommand(ac4yCommandObject);

        return ecosystem.commander().getPrecompiledCommand(ac4yCommand);

    } // getMessageCommandFromMessage

    getCommandFromMessage(ecosystem, message){
        /*
                ecosystem.commander().checkIsValidObjectInTheString(message);

                let ac4yCommandObject = ecosystem.commander().getObjectFromString(message);

                ecosystem.commander().checkIsValidCommand(ac4yCommandObject);

                let ac4yCommand = new Ac4yCommand(0).rebuilded(ac4yCommandObject);

                ecosystem.commander().checkIsKnownCommand(ac4yCommand.getCommandName());

                if (!ac4yCommand.getCommandName() === new Ac4ySVCMessage().getCommandName())
                    throw new Ac4yUserText().text("not Message command!");

                ac4yCommand = ecosystem.commander().getPrecompiledCommand(ac4yCommandObject);
        */

        message.checkRequest();
        message.getRequest().checkBody();

        //console.log(message.getRequest().getBody());

        let ac4yCommand = new Ac4yCommand(0).rebuilded(message.getRequest().getBody());

        //console.log(ac4yCommand);

        ecosystem.commander().checkIsValidCommand(ac4yCommand);

        ecosystem.commander().checkIsKnownCommand(ac4yCommand.getCommandName());

        return ecosystem.commander().getPrecompiledCommand(message.getRequest().getBody());

    } // getCommandFromMessage

    getEmbeddedCommand(ecosystem){

        this.checkRequest();

        this.getRequest().checkBody();

        return ecosystem.commander().getPrecompiledCommand(this.getRequest().getBody());

    } // getEmbeddedCommand

}; // Ac4ySVCMessage

// ** ac4y-service-common

// *


class Ac4ySVCValueServiceRequestAlgebra extends Ac4yServiceRequest {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4ySVCValueServiceRequestAlgebra(object);

    } // createSelf


    setValue(aValue) {
        this.value = aValue;
    }
    getValue() {
        return this.value;
    }
    hasValue() {
        return this.value != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.value != undefined) target.setValue(object.value);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.value != undefined) target.setValue(object.value);

        } // if object does not empty

        return target;

    } // copy

} // Ac4ySVCValueServiceRequestAlgebra

// *


class Ac4ySVCValueServiceResponseAlgebra extends Ac4yServiceResponse {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4ySVCValueServiceResponseAlgebra(object);

    } // createSelf


    setValue(aValue) {
        this.value = aValue;
    }
    getValue() {
        return this.value;
    }
    hasValue() {
        return this.value != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.value != undefined) target.setValue(object.value);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.value != undefined) target.setValue(object.value);

        } // if object does not empty

        return target;

    } // copy

} // Ac4ySVCValueServiceResponseAlgebra

// *


class Ac4ySVCValueServiceRequest extends Ac4ySVCValueServiceRequestAlgebra {

    createSelf(object) {return new Ac4ySVCValueServiceRequest(object);}

    checkValue(){if (!this.hasValue()) throw new Ac4yUserText().text("has no value!");}

} // Ac4ySVCMessageRequest

// *


class Ac4ySVCValueServiceResponse extends Ac4ySVCValueServiceResponseAlgebra {

    createSelf(object) {return new Ac4ySVCValueServiceResponse(object);}

} // Ac4ySVCMessageRequest

class Ac4ySVCKeyValueAlgebra extends Ac4yCommand {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4ySVCKeyValueAlgebra(object);

    } // createSelf


    setRequest(aRequest) {
        this.request = aRequest;
    }
    getRequest() {
        return this.request;
    }
    createRequest() {
        this.request = new Ac4ySVCKeyValueServiceRequest();
    }
    hasRequest() {
        return this.request != undefined;
    }

    setResponse(aResponse) {
        this.response = aResponse;
    }
    getResponse() {
        return this.response;
    }
    createResponse() {
        this.response = new Ac4ySVCValueServiceResponse();
    }
    hasResponse() {
        return this.response != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(new Ac4ySVCKeyValueServiceRequest(0).rebuilded(object.request));
            if (object.response != undefined) target.setResponse(new Ac4ySVCValueServiceResponse(0).rebuilded(object.response));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(object.request);
            if (object.response != undefined) target.setResponse(object.response);

        } // if object does not empty

        return target;

    } // copy

} // Ac4ySVCKeyValueAlgebra

class Ac4ySVCKeyValueServiceRequestAlgebra extends Ac4yServiceRequest {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4ySVCKeyValueServiceRequestAlgebra(object);

    } // createSelf


    setKey(aKey) {
        this.key = aKey;
    }
    getKey() {
        return this.key;
    }
    hasKey() {
        return this.key != undefined;
    }

    setValue(aValue) {
        this.value = aValue;
    }
    getValue() {
        return this.value;
    }
    hasValue() {
        return this.value != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.key != undefined) target.setKey(object.key);
            if (object.value != undefined) target.setValue(object.value);

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.key != undefined) target.setKey(object.key);
            if (object.value != undefined) target.setValue(object.value);

        } // if object does not empty

        return target;

    } // copy

} // Ac4ySVCKeyValueServiceRequestAlgebra

class Ac4ySVCKeyValueServiceRequest extends Ac4ySVCKeyValueServiceRequestAlgebra {

    createSelf(object) {return new Ac4ySVCKeyValueServiceRequest(object);}

    checkKey(){if (!this.hasKey()) throw new Ac4yUserText().text("has no key!");}
    checkValue(){if (!this.hasValue()) throw new Ac4yUserText().text("has no value!");}

} // Ac4ySVCMessageRequest

class Ac4ySVCKeyValue extends Ac4ySVCKeyValueAlgebra {

    constructor(object){

        super(object);
        if (object!=undefined && object===0) return;

        this.setCommandName("KEYVALUESERVICE");

    } // constructor

    createSelf(object) {return new Ac4ySVCKeyValue(object);}

}; // Ac4ySVCKeyValue

// ** ac4y-service-operation

// *** get service container

// *


class Ac4yOSVCGetServiceContainerAlgebra extends Ac4yCommand {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yOSVCGetServiceContainerAlgebra(object);

    } // createSelf


    setRequest(aRequest) {
        this.request = aRequest;
    }
    getRequest() {
        return this.request;
    }
    createRequest() {
        this.request = new Ac4yOSVCServiceContainerByFilterRequest();
    }
    hasRequest() {
        return this.request != undefined;
    }

    setResponse(aResponse) {
        this.response = aResponse;
    }
    getResponse() {
        return this.response;
    }
    createResponse() {
        this.response = new Ac4ySVCValueServiceResponse();
    }
    hasResponse() {
        return this.response != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(new Ac4yOSVCServiceContainerByFilterRequest(0).rebuilded(object.request));
            if (object.response != undefined) target.setResponse(new Ac4ySVCValueServiceResponse(0).rebuilded(object.response));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(object.request);
            if (object.response != undefined) target.setResponse(object.response);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yOSVCGetServiceContainerAlgebra

// *


class Ac4yOSVCGetServiceContainer extends Ac4yOSVCGetServiceContainerAlgebra {

    constructor(object){

        super(object);

        if (object!=undefined && object===0) return;

        this.setCommandName("GETSERVICECONTAINER");

    } // constructor

    createSelf(object) {return new Ac4yOSVCGetServiceContainer(object);}

    getResult(ecosystem){

        try {

            let ac4yStringHandler = new Ac4yStringHandler();

            this.check(ecosystem);
            this.checkRequest();
            //this.getRequest().checkValue();

            let container = {};

            if (this.getRequest().getValue() === "waiting4response")
                container = ecosystem.service().getWaiting4Response().getArrayFromValues()
            else if (this.getRequest().getValue() === "completed")
                container = ecosystem.service().getCompleted().getArrayFromValues()
            else if (this.getRequest().getValue() === "failed")
                container = ecosystem.service().getFailed().getArrayFromValues()
            else
                throw new Ac4yUserText().text("unknown container type!");

            let ac4ySVCValueServiceResponse = new Ac4ySVCValueServiceResponse();
            let request = this.getRequest();

            ac4ySVCValueServiceResponse.setValue(
                Enumerable.from(container)
                    .select(function (command) {

                        let ac4yCommand = new Ac4yCommand(0).rebuilded(command)

                        let result = new Object({
                            "service": ac4yCommand.getCommandName()
                            , "threadId": ac4yCommand.getThreadId()
                            , "result": ac4yCommand.hasResponse() ?
                                            ac4yCommand.getResponse().hasResult() ?
                                                ac4yCommand.getResponse().getResult().resultCodeAsText()
                                                : "-"
                                            : "-"
                            , "resultMessage": ac4yCommand.hasResponse() ?
                                                    ac4yCommand.getResponse().hasResult() ?
                                                        ac4yCommand.getResponse().getResult().getMessage()
                                                        : "-"
                                                : "-"
                            , "resultDescription": ac4yCommand.hasResponse() ?
                                                        ac4yCommand.getResponse().hasResult() ?
                                                            ac4yCommand.getResponse().getResult().getDescription()
                                                            : "-"
                                                    : "-"
                            , "provider": ac4yCommand.getProvider()
                        });

                            return result;

                    })
                    .where(function (result) {

                        let serviceNameFilterResult = new Boolean(!request.getCommandName() || (!((result.service) && (result.service !== "")) || ac4yStringHandler.getSimpled(result.service).includes(ac4yStringHandler.getSimpled(request.getCommandName()))));

                        let serviceStatusFilterResult = new Boolean(!request.getStatus() || (!((result.result) && (result.result !== "")) || ac4yStringHandler.getSimpled(result.result).includes(ac4yStringHandler.getSimpled(request.getStatus()))));

                        let providerFilterResult = new Boolean(!request.getProvider() || (!((result.provider) && (result.provider !== "")) || ac4yStringHandler.getSimpled(result.provider).includes(ac4yStringHandler.getSimpled(request.getProvider()))));

                        //return true;
                        return serviceNameFilterResult.valueOf()
                            && serviceStatusFilterResult.valueOf()
                            && providerFilterResult.valueOf()
                    })
                    .toArray()
            );

            ac4ySVCValueServiceResponse.setResult(new Ac4yProcessResult().success());

            return ac4ySVCValueServiceResponse;

        } catch(error) {
            return this.errorResponse(error.message || error);
        }

    } // getResult

}; // Ac4yOSVCGetServiceContainer

// *** get service

// *


class Ac4yOSVCGetServiceAlgebra extends Ac4yCommand {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yOSVCGetServiceAlgebra(object);

    } // createSelf


    setRequest(aRequest) {
        this.request = aRequest;
    }
    getRequest() {
        return this.request;
    }
    createRequest() {
        this.request = new Ac4ySVCValueServiceRequest();
    }
    hasRequest() {
        return this.request != undefined;
    }

    setResponse(aResponse) {
        this.response = aResponse;
    }
    getResponse() {
        return this.response;
    }
    createResponse() {
        this.response = new Ac4ySVCValueServiceResponse();
    }
    hasResponse() {
        return this.response != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(new Ac4ySVCValueServiceRequest(0).rebuilded(object.request));
            if (object.response != undefined) target.setResponse(new Ac4ySVCValueServiceResponse(0).rebuilded(object.response));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(object.request);
            if (object.response != undefined) target.setResponse(object.response);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yOSVCGetServiceAlgebra

// *


class Ac4yOSVCGetService extends Ac4yOSVCGetServiceAlgebra {

    constructor(object){

        super(object);
        if (object!=undefined && object===0) return;

        this.setCommandName("GETSERVICE");

    } // constructor

    createSelf(object) {return new Ac4yOSVCGetService(object);}

    getResult(ecosystem){

        try {

            this.check(ecosystem);
            this.checkRequest();
            this.getRequest().checkValue();

            let service = {};
            let threadId = this.getRequest().getValue();

            if (ecosystem.service().getWaiting4Response().exists(threadId)){
                service = ecosystem.service().getWaiting4Response().get(threadId);
            }
            else if (ecosystem.service().getCompleted().exists(threadId)){
                service = ecosystem.service().getCompleted().get(threadId);
            }
            else if (ecosystem.service().getFailed().exists(threadId)){
                service = ecosystem.service().getFailed().get(threadId);
            }
            else
                throw new Ac4yUserText().text("unknown service threadId!");

            let ac4ySVCValueServiceResponse = new Ac4ySVCValueServiceResponse();

            ac4ySVCValueServiceResponse.setValue(service);

            ac4ySVCValueServiceResponse.setResult(new Ac4yProcessResult().success());

            return ac4ySVCValueServiceResponse;

        } catch(error) {
            return this.errorResponse(error.message || error);
        }

    } // getResult

}; // Ac4yOSVCGetService


// *** heartbeat

// *


class TCMDHeartbeatAlgebra extends Ac4yCommand {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new TCMDHeartbeatAlgebra(object);

    } // createSelf


    setRequest(aRequest) {
        this.request = aRequest;
    }
    getRequest() {
        return this.request;
    }
    createRequest() {
        this.request = new Ac4yServiceRequest();
    }
    hasRequest() {
        return this.request != undefined;
    }

    setResponse(aResponse) {
        this.response = aResponse;
    }
    getResponse() {
        return this.response;
    }
    createResponse() {
        this.response = new Ac4yServiceResponse();
    }
    hasResponse() {
        return this.response != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(new Ac4yServiceRequest(0).rebuilded(object.request));
            if (object.response != undefined) target.setResponse(new Ac4yServiceResponse(0).rebuilded(object.response));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(object.request);
            if (object.response != undefined) target.setResponse(object.response);

        } // if object does not empty

        return target;

    } // copy

} // TCMDHeartbeatAlgebra

// *


class TCMDHeartbeat extends TCMDHeartbeatAlgebra {

    constructor(object){

        super(object);
        if (object!=undefined && object===0) return;

        this.setCommandName("HEARTBEAT");

    } // constructor

    createSelf(object) {return new TCMDHeartbeat(object);}

    getResult(ecosystem){

        try {

            this.check(ecosystem);

            return this.successResponse();

        } catch(error) {
            return this.errorResponse(error.message || error);
        }

    } // getResult

}; // TCMDHeartbeat

// *** process service container

// *


class Ac4yOSVCProcessServiceContainerAlgebra extends Ac4yCommand {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor


    createSelf(object) {
        return new Ac4yOSVCProcessServiceContainerAlgebra(object);

    } // createSelf


    setRequest(aRequest) {
        this.request = aRequest;
    }
    getRequest() {
        return this.request;
    }
    createRequest() {
        this.request = new Ac4ySVCValueServiceRequest();
    }
    hasRequest() {
        return this.request != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(new Ac4ySVCValueServiceRequest(0).rebuilded(object.request));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(object.request);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yOSVCProcessServiceContainerAlgebra

// *


class Ac4yOSVCProcessServiceContainerRequest extends Ac4ySVCValueServiceRequestAlgebra {

    createSelf(object) {return new Ac4yOSVCProcessServiceContainerRequest(object);}

}; // Ac4yOSVCProcessServiceContainerRequest

// *


class Ac4yOSVCProcessServiceContainer extends Ac4yOSVCProcessServiceContainerAlgebra {

    constructor(object){

        super(object);
        if (object!=undefined && object===0) return;

        this.setCommandName("PROCESSSERVICECONTAINER");

    } // constructor

    createSelf(object) {return new Ac4yOSVCProcessServiceContainer(object);}

    getResult(ecosystem){

        try {

            this.check(ecosystem);
            this.checkRequest();
            this.getRequest().checkValue();
            /*
                        ecosystem.messenger().sendTo(
                            this.getRequest().getAddressee()
                            ,new Ac4ySVCMessage(0).rebuilded(this).lightweight()
                            ,this.getThreadId()
                        );
            */
            let tableTemplate = doT.template(document.getElementById('tableTemplate').text, undefined, this.getRequest().getValue());
            document.getElementById('contentcustom').innerHTML = tableTemplate(this.getRequest().getValue());

            return this.successResponse();

        } catch(error) {return this.errorResponse(error.message || error);}

    } // getResult

}; // Ac4yOSVCProcessServiceContainer

// *
/*
class Ac4yOSVCGetServiceStatisticAlgebra extends Ac4yCommand {

    constructor(object) {

        super(object);
        if (object != undefined && object === 0) return;
    } // constructor

    createSelf(object) {
        return new Ac4yOSVCGetServiceStatisticAlgebra(object);

    } // createSelf

    setRequest(aRequest) {
        this.request = aRequest;
    }
    getRequest() {
        return this.request;
    }
    createRequest() {
        this.request = new Ac4ySVCValueServiceRequest();
    }
    hasRequest() {
        return this.request != undefined;
    }

    setResponse(aResponse) {
        this.response = aResponse;
    }
    getResponse() {
        return this.response;
    }
    createResponse() {
        this.response = new Ac4ySVCValueServiceResponse();
    }
    hasResponse() {
        return this.response != undefined;
    }


    rebuild(object, target) {

        target = target || this;
        super.rebuild(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(new Ac4ySVCValueServiceRequest(0).rebuilded(object.request));
            if (object.response != undefined) target.setResponse(new Ac4ySVCValueServiceResponse(0).rebuilded(object.response));

        } // if object does not empty

        return target;

    } // rebuild

    rebuilded(object, target) {
        return super.rebuilded(object, target);
    }

    copy(object, target) {

        target = target || this;
        super.copy(object, target);
        if (object) {

            if (object.request != undefined) target.setRequest(object.request);
            if (object.response != undefined) target.setResponse(object.response);

        } // if object does not empty

        return target;

    } // copy

} // Ac4yOSVCGetServiceStatisticAlgebra

// *

class Ac4yOSVCGetServiceStatistic extends Ac4yOSVCGetServiceStatisticAlgebra {

    constructor(object) {

        super(object);

        this.template = Ac4yOSVCGetServiceStatistic;

        if (object != undefined && object === 0) return;

        this.setCommandName("GETSERVICESTATISTIC");

    } // constructor

    createSelf(object) {
        return new Ac4yOSVCGetServiceStatistic(object);
    }

    getResult(ecosystem) {

        try {

            this.check(ecosystem);

            let response = new Ac4ySVCValueServiceResponse();

            response.setValue(
                new Object({
                    waiting4Response: ecosystem.service().getWaiting4Response().getArrayFromValues().length
                    , completed: ecosystem.service().getCompleted().getArrayFromValues().length
                    , failed: ecosystem.service().getFailed().getArrayFromValues().length
                })
            );

            response.setResult(new Ac4yProcessResult().success());

            return response;

        } catch (error) {
            return this.errorResponse(error.message || error);
        }

    } // getResult

}; // Ac4yGetServiceStatistic
// ** ac4y-vix-client
*/
// *


class VixAsyncLoader {

    loadStyleAsync(uri){
        return new Promise((resolve, reject) => {
            let css = document.createElement( "link" );
            css.rel = "stylesheet";
            css.href = uri;
            css.onload = () => {
                resolve();
            };
            css.onerror = () => {
                reject();
            };
            document.head.append( css );
        });
    }

    loadScriptAsync(uri){
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.src = uri;
            script.async = true;
            script.type = 'text/javascript';
            script.onload = () => {
                resolve();
            };
            script.onerror = () => {
                reject();
            };
            document.head.append( script );
        });
    }

} // VixAsyncLoader

// *


class VixConstant {

    constructor() {

        this.CONNECTING = 200;
        this.CONNECTED = 210;
        this.DISCONNECTED= 220;
        this.ERROR= 230;
        this.CLOSED= 240;

    } // constructor

} // VixConstant

// *


class VixHttpRequest{

    register(myserverUri) {
        return new Promise(function (s, f) {
            try {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", myserverUri, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.withCredentials = true;
                xhr.send(null);
                xhr.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let json = JSON.parse(this.responseText);
                        if (json.authkey != undefined && json.authkey != null){
                            s(json.authkey);
                        } else {
                            f();
                        }

                    }
                };
            } catch (error){
                f();
            }
        });
    }

} // VixHttpRequest

// *

Promise.wait = function (ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
};

Promise.prototype.timeout = function(ms) {
    return Promise.race([
        this,
        Promise.wait(ms).then(function () {
            throw new Error("timeout");
        })
    ])
};

// *


class Ac4yVixClient extends Ac4yEcosystemMember {

    constructor(object){

        super(object);

        this.name ="vix";
        this.onconnected=( (event) => {console.log("onconnected fabric version");} );
        this.onmessage=( (event) => {console.log("onmessage fabric version");} );
        this.ongotuser=( (event) => {console.log("ongotuser fabric version");} );

        this.onmessage = (event) => {

//            console.log("new onmessage event");
            //console.log(event);
            //console.log(JSON.stringify(event));
//            console.log(event.data[0], "message");

            let sender = event.data[0].user.userid;
//            console.log("sender", sender);

            try {

                let ac4ySVCMessage = new Ac4ySVCMessage().getMessageCommandFromMessage(this.getWormhole(), event.data[0].message);

//                console.log("Ac4yVixClient.Ac4ySVCMessage commandName, threadId", ac4ySVCMessage.getCommandName(), ac4ySVCMessage.getThreadId());
//                console.log(ac4ySVCMessage, "ac4ySVCMessage");

                ac4ySVCMessage.checkRequest();
                ac4ySVCMessage.getRequest().checkSender();
                ac4ySVCMessage.getRequest().checkAddressee();

//                console.log("Ac4yVixClient.Ac4ySVCMessage - sender, oneway", ac4ySVCMessage.getRequest().getSender(), ac4ySVCMessage.getRequest().isOneway());

                if (!ac4ySVCMessage.getRequest().isOneway())
                    this.getWormhole().commander().remoteResponse(
                        ac4ySVCMessage.getRequest().getSender()
                        ,ac4ySVCMessage.successResponse().addedRequestId(ac4ySVCMessage.getThreadId())
                        ,ac4ySVCMessage.getRequest().getAddressee()
                    );
                /*else
                    this.getWormhole().service().done(
                        ac4ySVCMessage.getThreadId()
                        ,ac4ySVCMessage.successResponse("Credited.")
                    );*/

                //console.log("Ac4yVixClient.Ac4ySVCMessage", ac4ySVCMessage.getAc4yIdentification().getTemplate(), ac4ySVCMessage.getThreadId());
                //console.log("Ac4yVixClient.Ac4ySVCMessage", ac4ySVCMessage.getThreadId(), ac4ySVCMessage);
                //this.getWormhole().service().done(ac4ySVCMessage.getThreadId(), ac4ySVCMessage.successResponse());

                //let ac4yCommand = new Ac4ySVCMessage().getCommandFromMessage(this.getWormhole(), event.data[0].message);
                let ac4yCommand = new Ac4ySVCMessage().getCommandFromMessage(this.getWormhole(), ac4ySVCMessage);
                ///getEmbeddedCommand

//                console.log("Ac4yVixClient.Ac4yCommand name, threadId, oneway", ac4yCommand.getCommandName(), ac4yCommand.getThreadId(), ac4ySVCMessage.getRequest().isOneway());
//                console.log(ac4yCommand, "Ac4yVixClient.command itself");
                //(async () => {

                let commandResponse = ac4yCommand.getResult(this.getWormhole());

                if (!ac4ySVCMessage.getRequest().isOneway())
                    this.getWormhole().commander().remoteResponse(
                        ac4ySVCMessage.getRequest().getSender()
                        ,commandResponse.addedRequestId(ac4yCommand.getThreadId())
                        ,ac4ySVCMessage.getRequest().getAddressee()
                    );
                /*else
                    this.getWormhole().service().done(
                        ac4yCommand.getThreadId()
                        ,new Ac4yService().successResponse("Credited.")
                    );*/

//                console.log(commandResponse.lightweight(), "commandResponse");

                //});

                //console.info("done", ac4yCommand.getThreadId());
                //this.getWormhole().service().done(ac4yCommand.getThreadId(), ac4yCommand.getResult(this.getWormhole()));
                //console.info("done", ac4yCommand.getThreadId(), "kész");

            }
            catch(error) {
                console.error(error);
            }

        };

        this.ongotusers = (event) => {
            //console.log("ongotusers event");
            //console.log(event);
        };

    } // constructor

    getService(){return this.service;}
    setService(){this.service=service;}

    start(){

        Promise.resolve().then( () => {

            return new VixHttpRequest().register("https://www.vix.hu/example.php").timeout(4000);

        }).then( (authkey) => {

            let serviceSriptUri = "https://vix.hu/service";

            //console.log("authkey", authkey);
            //console.log("address", serviceSriptUri+"?authkey="+authkey);

            return new VixAsyncLoader().loadScriptAsync(serviceSriptUri+"?authkey="+authkey).timeout(20000);

        }).then( () => {

            this.setService();

            service.start();

            //els[i].addEventListener("click", function(e){/*do something*/}, false);

            this.getService().onconnected = (event) => {
                //console.log("new onconnected event");
                //console.log(this);
                //console.log(event);
                this.onconnected(event);
            };

            this.getService().onmessage = (event) => {this.onmessage(event)};

            this.getService().ondisconnectuser = (event) => {
                //console.log("new ondisconnectuser event", event);
                console.log(event.name, ">", event.target.userid);
            };

            this.getService().onusers = (event) => {this.ongotusers(event)};

            this.getService().onsent = (event) => {
                //console.log("new onsent event", event);
                //console.log(event.name, ">", event.target.userid);
            };

            this.getService().onarrived = (event) => {
                //console.log("new onarrived event", event);
                //console.log(event.name, ">", event.target.userid);
            };

            this.getService().ontargetdisconnected = (event) => {
                console.log("new ontargetdisconnected event", event);
                //console.log(event.name, ">", event.target.userid);
            };

            this.getService().ontargetunknown  = (event) => {

                console.log("new ontargetunknown  event", event);
                //console.log(event.name, ">", event.target.userid);

                this.getWormhole().service().done(event.echo, new Ac4yService().errorResponse("addressee unknown!"));

            };

            service.addEventListener("connection", "new Ac4yVixClient().onconnectionhandler");
            service.addEventListener("message", "new Ac4yVixClient().onmessagehandler");

            //setInterval(function(){}, 5000);

            //console.log(service.WID);
            //console.log(service);

            //this.setUser("A");
            //console.log("getUser:");
            //await ac4yVixClient.getUser();

        }).catch(function(error){
            //console.log(JSON.stringify(error.stack))
        });

    } // start

    onconnectionhandler(event){

        //console.log("embedded connectionHandler event: "+event);
        //document.getElementById("display").innerHTML  = document.getElementById("display").innerHTML +"<div>connection: "+event+"</div>";
        //window.scrollTo(0,document.body.scrollHeight);
        event = JSON.parse(event);

        if (event.code == new VixConstant().CONNECTED){
            this.onopen();
        }

    }; // onconnection

    onmessagehandler(event){
        //console.log("onmessage event: "+event);
        //console.log("messageHandler event object: "+JSON.parse(event));
        //document.getElementById("display").innerHTML  = document.getElementById("display").innerHTML +"<div>message: "+event+"</div>";
        //window.scrollTo(0,document.body.scrollHeight);
        //Az event propertyk használatához parseolni kell az eventet
        event = JSON.parse(event);
    };

    setUser(userid){
        service.user.userid = userid;
        service.user.csoport = 0;
    }

    getUser(){
        let datas = new Array();
        let data = {csoport:0};
        datas.push(data);
        //console.log("service.message(getUser)");
        service.message("getUser", datas, service.getnextHex(12));
    };

    sendTo(addressee, message, threadId){
        //console.log("sendTo", addressee, threadId, message);
        let datas = new Array();
        let data = {userid:addressee};
        data.message = message;
        datas.push(data);
        service.message("sendTo", datas, threadId);
    };

} // Ac4yVixClient

export {
    Ac4yKeyValueMemory
};
