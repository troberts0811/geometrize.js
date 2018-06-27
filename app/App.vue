<template>
    <div id="main">
        <main>
            <div id="geometrize-wrapper">
                <canvas id="geometrize"></canvas>
            </div>
        </main>
        <aside v-bind:class="{close: !menuOpen}">
            <div class="open-button" v-on:click="toggleMenu"><span>&gt;</span></div>
            <div class="side-content">
                <geometrize-settings v-bind:config="GeometrizeConfig"></geometrize-settings>
            </div>
        </aside>
    </div>
</template>

<script>
    import { mapMutations, mapActions } from 'vuex'

    export default {
        name: "geometrize-demo",
        computed: {
            GeometrizeConfig(){
                return this.$store.state.geometrizeConfig;
            },
            Geometrize(){
                return this.$store.state.geometrize;
            },
            menuOpen(){
                return this.$store.state.menuOpen;
            }
        },
        methods:{
            ...mapMutations([
                'setGeometrize',
                'setGeometrizeId'
            ]),
            ...mapActions([
                'toggleMenu'
            ])
        },
        created(){
            this.setGeometrizeId("geometrize");
        },
        mounted(){
            this.setGeometrize();
        }
    }
</script>

<style lang="sass">
    html, body{
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }

    html{
        overflow-y: hidden;
    }

    body{
        overflow-y: auto;
    }

    #main, #geometrize-wrapper{
        height: 100%;
    }

    main, aside{
        height: 100%;
    }

    aside{
        position: absolute;
        top: 0;
        right: 0;
        width: calc(33vw + 3rem);
        transform: translateX(0);
        transition: transform 0.5s ease-in-out;
        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;

        &.close{
            transform: translateX(33vw);

            & .open-button{
                span{
                    transform: rotate(-180deg);
                }
            }
        }

        .open-button{
            background: #f3f3f3;
            width: 3rem;
            height: 3rem;
            border: 1px solid #565656;
            border-top-width: 0;
            border-right-width: 0;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            span{
                font-weight: bold;
                transform: rotate(0deg);
                transition: transform 0.5s ease-in-out;
            }
        }

        .side-content{
            background:#f3f3f3;
            border-left: 1px solid #565656;
            height: 100%;
            width: 33vw;
            overflow-y:scroll;
        }
    }

    #geometrize-wrapper{
        position: relative;
        canvas{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height:100%;
        }
    }

    
</style>
