<template>
    <div>
        <footer>
            <p>Bem-vindo! {{ nome }}, Aproveite o código <b>Vue com CLI</b></p>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'HomeComponente',
        data() {
            return {
                nome: "Miguel"
            };
        },
    };
</script>
