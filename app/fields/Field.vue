<template>
    <div class="field">
        <div class="field-inner" v-if="Field.options.length">
            <label :for="Field.name">{{property}}</label>
            <select v-bind:id="Field.name" v-bind:name="Field.name" v-on:change="$emit('change', $event.target.value)">
                <option v-for="(option, inx) in Field.options" v-bind:key="inx" v-bind:value="option" :selected="option == value">{{option}}</option>
            </select>
        </div>
        <div class="field-inner" v-else-if="Field.type == 'number'">
            <label :for="Field.name">{{property}}</label>
            <input v-if="Field.min != null && Field.max != null" v-bind:id="Field.name" v-bind:name="Field.name" type="number" v-bind:min="Field.min" v-bind:max="Field.max" v-bind:value="value" v-bind:step="Field.isInteger ? 1: 0.01" v-on:input="$emit('input', $event.target.value)" />
            <input v-if="Field.min != null && Field.max == null" v-bind:id="Field.name" v-bind:name="Field.name" type="number" v-bind:min="Field.min" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
            <input v-if="Field.min == null && Field.max != null" v-bind:id="Field.name" v-bind:name="Field.name" type="number" v-bind:max="Field.max" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
        </div>
        <div class="field-inner" v-else-if="Field.type == 'string'">
            <label :for="Field.name">{{property}}</label>
            <input v-bind:id="Field.name" v-bind:name="Field.name" type="text" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
        </div>
        <div class="field-inner" v-else-if="Field.type == 'object'">
            <label :for="Field.name">{{property}}</label>
            <div class="object">
                <div v-for="(fItem, fieldInx) in ObjectFields" v-bind:key="fieldInx">
                    <geometrize-field v-bind:modelName="Field.objectName" v-bind:property="fItem.name" v-model="value[fItem.name]"></geometrize-field>
                </div>
                <!-- <geometrize-field v-bind:field="GetObject(Field.objectName)" v-bind:modelName="modelName" v-bind:property="fName" v-bind:value="fVal" ></geometrize-field> -->
            </div>
        </div>
    </div>
</template>

<script>
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
            Model(){
                return this.GetConfiguration(this.modelName);
            },
            Field(){
                return this.GetField(this.Model.fields);
            },
            ObjectFields(){
                if(this.Field.type == 'object'){
                    console.log(this.Field);
                    console.log(this.Field.objectName);
                    let mdl = this.GetConfiguration(this.Field.objectName);
                    console.log(mdl);
                    return mdl.fields;
                }else{
                    return null;
                }
            }
        },
        methods:{
            GetConfiguration: function(target){
                if(Array.isArray(this.ConfigFields)){
                    let mdl = this.ConfigFields.find((el) => {
                        return el.model == target;
                    });
                    console.log(mdl);
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
            }
        }
    }
</script>

<style lang="sass">

</style>
