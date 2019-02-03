<template>
  <div :id="this.$options.name">
    <div class="row p-2">
      <div class="col">
        <template v-for="outing in outings">
          <div class="row py-2" :key="outing.id">
            <div class="col">
              <outing-card :outing="outing"/>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OutingsList",
  components: {
    OutingCard: () => import("./OutingCard.vue")
  },
  data: function() {
    return {
      outings: {
        tempOuting: {
          id: "0",
          name: "MET Rave",
          date: "2/3/19",
          location: "70 Morningside Dr",
          organizer: "Alistair Kapadia",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non massa orci. Pellentesque consectetur nisi nulla, malesuada eleifend tortor dignissim in. Donec ut facilisis eros. Duis sit amet enim urna. Proin pellentesque tortor eu consectetur tempus. Ut elit mauris, congue et malesuada eget, porta at quam. Morbi suscipit quis arcu ut sollicitudin. Praesent ullamcorper in nulla in tincidunt. Vestibulum ultricies ultricies quam sed malesuada. In mollis nisl et aliquam mattis. Proin id odio quis purus suscipit commodo non vel orci. Nunc non purus consectetur, pharetra orci quis, sollicitudin quam. Sed vitae odio ante. Nulla ac nisl urna."
        },
        tempOuting2: {
          id: "1",
          name: "METT Rave",
          date: "2/3/19",
          location: "70 Morningside Dr",
          organizer: "Alistair Kapadia",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non massa orci. Pellentesque consectetur nisi nulla, malesuada eleifend tortor dignissim in. Donec ut facilisis eros. Duis sit amet enim urna. Proin pellentesque tortor eu consectetur tempus. Ut elit mauris, congue et malesuada eget, porta at quam. Morbi suscipit quis arcu ut sollicitudin. Praesent ullamcorper in nulla in tincidunt. Vestibulum ultricies ultricies quam sed malesuada. In mollis nisl et aliquam mattis. Proin id odio quis purus suscipit commodo non vel orci. Nunc non purus consectetur, pharetra orci quis, sollicitudin quam. Sed vitae odio ante. Nulla ac nisl urna."
        }
      }
    };
  }
};
</script>
