export const utilsMixin = {
  methods: {
   $_utilsMixin_export(content) {
      try {
        this.$vs.notify({
          title: "Success",
          text: content,
          color: "success",
          iconPack: "feather",
          icon: "icon-check"
        });
      } catch (e) {
        console.log(e);
      }
    }   
}}