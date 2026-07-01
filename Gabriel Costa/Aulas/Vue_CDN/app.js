const meuAppVue = {
    data() {
        return{
            nome: 'Gabriel Costa',
            idade: 19,
            inputText: "",
        };
    }
};

Vue.createApp(meuAppVue).mount("#app");
