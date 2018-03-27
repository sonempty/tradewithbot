<template>
  <v-layout row wrap>
    <v-flex xs6 sm6>
      <v-select
        label="Choose Coin"
        :items="people"
        v-model="e11"
        item-text="name"
        item-value="name"
        max-height="300"
        autocomplete
      >
        <template slot="selection" slot-scope="data">
          <v-chip
            dark
            @input="data.parent.selectItem(data.item)"
            :selected="data.selected"
            :key="JSON.stringify(data.item)"
          >
            <v-avatar>
              <img :src="data.item.avatar">
            </v-avatar>
            {{ data.item.name }}
          </v-chip>
        </template>
        <template slot="item" slot-scope="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-tile-content v-text="data.item"></v-list-tile-content>
          </template>
          <template v-else>
            <v-list-tile-avatar>
              <img :src="data.item.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
            </v-list-tile-content>
          </template>
        </template>
      </v-select>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      let srcs = {
        binance: require('@/assets/coins/b.png'),
        bittrex: require('@/assets/coins/2.jpg')
      }

      return {
        e11: [],
        people: [
          { name: 'Sandra Adams', group: 'Group 1', avatar: srcs['binance'] },
          { name: 'Ali Connors', group: 'Group 1', avatar: srcs['bittrex'] },
          { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs['binance']  },
          { name: 'Tucker Smith', group: 'Group 1', avatar: srcs['bittrex'] },
          { name: 'Britta Holt', group: 'Group 2', avatar: srcs['bittrex'] },
          { name: 'Jane Smith ', group: 'Group 2', avatar: srcs['binance']  },
          { name: 'John Smith', group: 'Group 2', avatar: srcs['bittrex'] },
          { name: 'Sandra Williams', group: 'Group 2', avatar: srcs['binance']  }
        ]
      }
    }
  }
</script>
