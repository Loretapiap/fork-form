new Vue({
  el: '#app',
  data() {
    return {
      form: {
        nombre: "",
        apellido: "",
        edad: "",
        correo: "",
        rut: ""
      },
      submitted: false,
      rutError : null,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

    }
  },

  methods: {
    submit() {

      if (
        this.isNameValid() &&
        this.islastnameValid() &&
        this.checkRut() &&
        this.isAgeValid() &&
        this.isEmailValid()) {
        this.submitted = true;
      } else {
        $('#myModal').modal('show')
      }


    },
    isNameValid() {
      if (this.form.nombre.length >= 3 && this.form.nombre.length <= 30) {
        return true;
      } else {
        return false;
      }
    },
    islastnameValid() {
      if (this.form.apellido.length >= 3 && this.form.apellido.length <= 30) {
        return true;
      } else {
        return false;
      }
    },
    isAgeValid() {
      if (this.form.edad > 0 && this.form.edad <= 99) {
        return true;
      } else {
        return false;
      }
    },
    isEmailValid() {
      return (this.form.correo == "") ? "" : (this.reg.test(this.form.correo)) ? true : false;
    },
    checkRut() {

      let valor = this.form.rut.split('.').join("");
      valor = valor.split('-').join("");

      cuerpo = valor.slice(0, -1);
      dv = valor.slice(-1).toUpperCase();

      rut.value = cuerpo + '-' + dv

      if (cuerpo.length < 7) { 
        this.rutError = 'Rut incompleto';
        return false; 
      }

      suma = 0;
      multiplo = 2;

      for (i = 1; i <= cuerpo.length; i++) {

        index = multiplo * valor.charAt(cuerpo.length - i);

        suma = suma + index;

        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

      }

      dvEsperado = 11 - (suma % 11);

      dv = (dv == 'K') ? 10 : dv;
      dv = (dv == 0) ? 11 : dv;

      if (dvEsperado != dv) { 
        this.rutError = 'Rut no válido';
        return false; 
      }

      // Si todo sale bien, eliminar errores (decretar que es válido)
      this.rutError = null;
      return true;
    }

  }
});
