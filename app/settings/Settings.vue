<template>
    <div id="settings">
        <div v-for="(cItem, cKey, cIdx) in config" v-bind:key="cIdx">
            <h4>{{cKey}}</h4>
            <div class="fields">
                <div v-for="(fVal, fName, fieldInx) in cItem" v-bind:key="fieldInx">
                    <geometrize-field v-bind:modelName="cKey" v-bind:property="fName" v-bind:value="fVal"></geometrize-field>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "geometrize-settings",
        props: {
            config: Object
        }
    }
</script>
<style lang="sass">
</style>
