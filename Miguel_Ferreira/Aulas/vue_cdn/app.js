const meuAppVue = {
    data() {
        return {
            nome: "Miguel Ferreira",
            idade: 19,
            inputText: ""
        };
    },
};

Vue.createApp(meuAppVue).mount("#app");