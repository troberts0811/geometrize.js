<template>
    <div class="field">
        <div class="field-inner" v-if="Field.options.length">
            <label :for="Field.name">{{Field.displayName}}</label>
            <select v-bind:id="Field.name" v-bind:name="Field.name" v-bind:disabled="!Field.isEditable" v-on:change="UpdateField">
                <option v-for="(option, inx) in Field.options" v-bind:key="inx" v-bind:value="option" :selected="option == value">{{option}}</option>
            </select>
        </div>
        <div class="field-inner" v-else-if="Field.type == 'number' || Field.isInteger">
            <label :for="Field.name">{{Field.displayName}}</label>
            <input v-if="Field.min != null && Field.max != null" v-bind:id="Field.name" v-bind:name="Field.name" type="number" v-bind:min="Field.min" v-bind:max="Field.max" v-bind:value="value" v-bind:step="Field.isInteger ? 1: 0.01" v-on:change="UpdateField" />
            <input v-if="Field.min != null && Field.max == null" v-bind:id="Field.name" v-bind:name="Field.name" type="number" v-bind:min="Field.min" v-bind:value="value" v-on:change="UpdateField" />
            <input v-if="Field.min == null && Field.max != null" v-bind:id="Field.name" v-bind:name="Field.name" type="number" v-bind:max="Field.max" v-bind:value="value" v-on:change="UpdateField" />
        </div>
        <div class="field-inner" v-else-if="Field.type == 'string'">
            <label :for="Field.name">{{Field.displayName}}</label>
            <input v-bind:id="Field.name" v-bind:name="Field.name" type="text" v-bind:value="value" v-on:change="UpdateField" />
        </div>
        <div class="field-inner" v-else-if="Field.type == 'color'">
            <label :for="Field.name">{{Field.displayName}}</label>
            <div class="field-colour-wrapper">
                <button v-bind:id="Field.name" type="button" class="field-colour" :style="{background: GetColour(value), color: GetTextColor(GetColour(value))}" @click="TriggerColourPicker">{{GetColour(value)}}</button>
            </div>
        </div>
        <div class="field-inner" v-else-if="Field.type == 'checkbox'">
            <label :for="Field.name">{{Field.displayName}}</label>
            <input v-bind:id="Field.name" v-bind:name="Field.name" type="checkbox" v-bind:checked="value" v-on:change="UpdateField($event, !value)" />
        </div>
        <div class="field-inner" v-else-if="Field.objectName != ''">
            <label :for="Field.name">{{Field.displayName}}</label>
            <div class="object">
                <div v-for="(fItem, fieldInx) in ObjectFields" v-bind:key="fieldInx">
                    <geometrize-field v-bind:modelName="Field.objectName" v-bind:property="fItem.name" v-model="value[fItem.name]" v-on:change="UpdateNestedField" v-on:input="UpdateNestedField"></geometrize-field>
                </div>
            </div>
        </div>
        <div class="field-inner" v-else-if="Field.type == 'array'">
            <label :for="Field.name">{{Field.displayName}}</label>
            <div class="array">
                <div v-for="(arrayItem, arrayIndex) in value" v-bind:key="arrayIndex">
                    <geometrize-field v-bind:modelName="Field.objectName" v-bind:property="fItem.name" v-model="value[fItem.name]" v-on:change="UpdateNestedField" v-on:input="UpdateNestedField"></geometrize-field>
                </div>
                <div v-for="(fItem, fieldInx) in ObjectFields" v-bind:key="fieldInx">
                    <geometrize-field v-bind:modelName="Field.objectName" v-bind:property="fItem.name" v-model="value[fItem.name]" v-on:change="UpdateNestedField" v-on:input="UpdateNestedField"></geometrize-field>
                </div>
            </div>
        </div>
        <div class="field-inner" v-else-if="Field.type == 'gradient'">
            <div class="gradient">
                <geometrize-field-gradient :model="modelName + '.' + property" :milestones="value" :direction="ConfigData[modelName].Direction" :updateFunction="UpdateField" />
            </div>
        </div>
    </div>
</template>

<script>
    import helpers from 'geometrize/helpers';
    import { mapActions } from 'vuex';
    export default {
        name: 'geometrize-field',
        props:{
            modelName: String,
            property: String,
            value: [String, Number, Boolean, Array, Object, Function]
        },
        computed:{
            ConfigFields(){
                return this.$store.state.configFields;
            },
            ConfigData(){
                return this.$store.state.geometrizeConfig;
            },
            Model(){
                return this.GetConfiguration(this.modelName);
            },
            Field(){
                return this.GetField(this.Model.fields);
            },
            ObjectFields(){
                if(this.Field.type == 'object'){
                    let mdl = this.GetConfiguration(this.Field.objectName);
                    return mdl.fields;
                }else{
                    return null;
                }
            },
            ColourStatus(){
                return this.$store.state.colourStatus;
            }
        },
        methods:{
            ...mapActions([
                'setColourStatus'
            ]),
            GetConfiguration: function(target){
                if(Array.isArray(this.ConfigFields)){
                    let mdl = this.ConfigFields.find((el) => {
                        return el.model == target;
                    });
                    return mdl;
                }
            },
            GetField: function(modelFields){
                if(Array.isArray(modelFields)){
                    let fld = modelFields.find((el) => {
                        return el.name == this.property;
                    });
                    return fld;
                }
            },
            GetColour: function(val){
                const hexRegExp = new RegExp(/\#(..){3}/);
                const rgbRegExp = new RegExp(/rgb\((.*)\)/);

                if(hexRegExp.test(val)){
                    return val;
                }else{
                    let string = "#";
                    if(rgbRegExp.test(val)){
                        val.replace(rgbRegExp, '$1').replace(/\ /g, "").split(",").forEach(colour => {
                            string += helpers.covertNumberToHex(colour);
                        });
                        return string;
                    }
                }

                return val;
            },
            GetTextColor: function(hex){
                let total = Object.values(helpers.convertHexToRGBObject(hex)).reduce((a,b) => {
                    return a + b
                }, 0);
                return total <= 382 ? "#FFF" : "#000";
            },
            TriggerColourPicker:function(){
                this.setColourStatus(this.modelName + "." + this.property);
                this.ColourStatus.Picker.movePopup({color: this.GetColour(this.value)}, true);
            },
            UpdateField: function(event, value = null){
                if(value === null){
                    if(this.Field.type === 'number'){
                        this.$emit('change', {[this.modelName + "." + this.property]: Number(event.target.value)});
                    }else{
                        this.$emit('change', {[this.modelName + "." + this.property]: event.target.value});
                    }
                }else{
                    if(this.Field.type === 'number' && typeof value === 'string'){
                        this.$emit('change', {[this.modelName + "." + this.property]: Number(value)});
                    }else{
                        this.$emit('change', {[this.modelName + "." + this.property]: value});
                    }
                }
            },
            UpdateNestedField: function(payload){
                this.$emit('change', {[Object.getOwnProeprtyNames(payload)[0].split(".").splice(0,1,this.modelName, this.property).join(".")]: Object.values(payload)[0]});
            }
        }
    }
</script>

<style lang="sass">
    input[type="number"] {
        width: 3.5rem;
        font-size: 11px;
        height: 2.25em;
        border: 1px solid #f2f2f2;
    }

    h1{
        margin: 0;
        font-size: 1.125em;
    }

    h2{
        margin: 0;
        font-size: 1.0625em;
    }

    h3 {
        margin-top: 0;
        margin-bottom: 0.75em;
        font-size: 1em;
    }

    .field-inner {
        margin-bottom: 0.375em;
    }

    label {
        font-size: 13px;
    }

    .field-colour{
        width: 6.75em;
        height: 2.25em;
        border: 1px solid #f2f2f2;
        text-align: center;
        &:before{
            content: none;
        }
    }

    button{
        border: 1px solid #f2f2f2;
        background: none;
        color: #000;
        position: relative;
        padding: 0.2em 1em;
        z-index: 0;
        cursor: pointer;
        min-height: 2.25em;

        &:before{
            content: '';
            position: absolute;
            top: 1px;
            left: 1px;
            background: #f2f2f2;
            width: calc(100% - 2px);
            height: calc(100% - 2px);
            z-index: -1;
        }

        &.config-button {
            margin-top: 2em;
        }
    }
</style>
